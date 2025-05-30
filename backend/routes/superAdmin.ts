import express, { type Request, type Response, type NextFunction } from "express"
import bcrypt from "bcryptjs"
import { query } from "../db"

const router = express.Router()

// Super Admin Authentication
router.post("/superadmin/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const result = await query("SELECT * FROM Super_Admin_Account_Data WHERE admin_email = $1", [email.trim()]);

        if (result.rows.length === 0) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }

        const admin = result.rows[0];

        // If email matches, return success (skip password check)
        if (admin.admin_email === email.trim()) {
            res.json({
                success: true,
                admin: {
                    id: admin.admin_id,
                    email: admin.admin_email,
                    permissions: admin.admin_permissions,
                },
            });
            return;
        }

        res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        console.error("Super admin login error:", error);
        next(error);
    }
});

// Get all user verification requests
router.get(
  "/superadmin/verification-requests",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await query(`
      SELECT 
        uvr.*,
        CASE 
          WHEN uvr.user_type = 'customer' THEN cad.customer_first_name || ' ' || cad.customer_last_name
          WHEN uvr.user_type = 'vendor' THEN vad.vendor_business_name
          WHEN uvr.user_type = 'organizer' THEN eoad.organizer_company_name
        END as user_name,
        CASE 
          WHEN uvr.user_type = 'customer' THEN cad.customer_email
          WHEN uvr.user_type = 'vendor' THEN vad.vendor_email
          WHEN uvr.user_type = 'organizer' THEN eoad.organizer_email
        END as user_email
      FROM User_Verification_Requests uvr
      LEFT JOIN Customer_Account_Data cad ON uvr.user_id = cad.customer_id AND uvr.user_type = 'customer'
      LEFT JOIN Vendor_Account_Data vad ON uvr.user_id = vad.vendor_id AND uvr.user_type = 'vendor'
      LEFT JOIN Event_Organizer_Account_Data eoad ON uvr.user_id = eoad.organizer_id AND uvr.user_type = 'organizer'
      ORDER BY uvr.verification_id DESC
    `)

      res.json({ success: true, requests: result.rows })
    } catch (error) {
      console.error("Error fetching verification requests:", error)
      next(error)
    }
  },
)

// Update verification request status
router.put(
  "/superadmin/verification-requests/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { status, admin_notes, admin_id } = req.body

      if (!["approved", "rejected", "pending"].includes(status)) {
        res.status(400).json({ success: false, message: "Invalid status" })
        return
      }

      await query(
        `UPDATE User_Verification_Requests 
       SET status = $1, admin_notes = $2, reviewed_by = $3, reviewed_at = NOW()
       WHERE verification_id = $4`,
        [status, admin_notes, admin_id, id],
      )

      // Log admin action
      await query(
        `INSERT INTO Admin_Actions (action_id, admin_id, action_type, target_id, action_details, timestamp)
       VALUES (DEFAULT, $1, 'verification_review', $2, $3, NOW())`,
        [admin_id, id, `Status changed to ${status}: ${admin_notes || "No notes"}`],
      )

      res.json({ success: true, message: "Verification request updated successfully" })
    } catch (error) {
      console.error("Error updating verification request:", error)
      next(error)
    }
  },
)

// Get all event cancellation requests
router.get(
  "/superadmin/cancellation-requests",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await query(`
      SELECT 
        ecr.*,
        e.event_name,
        e.start_date,
        e.budget,
        CASE 
          WHEN ecr.requested_by = e.customer_id THEN cad.customer_first_name || ' ' || cad.customer_last_name
          WHEN ecr.requested_by = e.organizer_id THEN eoad.organizer_company_name
          WHEN ecr.requested_by = e.vendor_id THEN vad.vendor_business_name
        END as requester_name
      FROM Event_Cancellation_Requests ecr
      JOIN Events e ON ecr.event_id = e.event_id
      LEFT JOIN Customer_Account_Data cad ON ecr.requested_by = cad.customer_id
      LEFT JOIN Event_Organizer_Account_Data eoad ON ecr.requested_by = eoad.organizer_id
      LEFT JOIN Vendor_Account_Data vad ON ecr.requested_by = vad.vendor_id
      ORDER BY ecr.cancellation_id DESC
    `)

      res.json({ success: true, requests: result.rows })
    } catch (error) {
      console.error("Error fetching cancellation requests:", error)
      next(error)
    }
  },
)

// Update cancellation request status
router.put(
  "/superadmin/cancellation-requests/:id",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { status, refund_amount, penalty_amount, admin_notes, admin_id } = req.body

      if (!["approved", "rejected", "pending"].includes(status)) {
        res.status(400).json({ success: false, message: "Invalid status" })
        return
      }

      await query(
        `UPDATE Event_Cancellation_Requests 
       SET status = $1, refund_amount = $2, penalty_amount = $3, admin_notes = $4
       WHERE cancellation_id = $5`,
        [status, refund_amount, penalty_amount, admin_notes, id],
      )

      // If approved, update event status
      if (status === "approved") {
        const eventResult = await query("SELECT event_id FROM Event_Cancellation_Requests WHERE cancellation_id = $1", [
          id,
        ])

        if (eventResult.rows.length > 0) {
          await query("UPDATE Events SET event_status = 'cancelled' WHERE event_id = $1", [
            eventResult.rows[0].event_id,
          ])
        }
      }

      // Log admin action
      await query(
        `INSERT INTO Admin_Actions (action_id, admin_id, action_type, target_id, action_details, timestamp)
       VALUES (DEFAULT, $1, 'cancellation_review', $2, $3, NOW())`,
        [admin_id, id, `Status changed to ${status}. Refund: ${refund_amount || 0}, Penalty: ${penalty_amount || 0}`],
      )

      res.json({ success: true, message: "Cancellation request updated successfully" })
    } catch (error) {
      console.error("Error updating cancellation request:", error)
      next(error)
    }
  },
)

// Get low-reviewed users
router.get("/superadmin/low-reviewed-users", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const threshold = Number.parseFloat(req.query.threshold as string) || 3.0

    // Get low-reviewed vendors
    const vendorResult = await query(
      `
      SELECT 
        'vendor' as user_type,
        vendor_id as user_id,
        vendor_business_name as name,
        vendor_email as email,
        vendor_review_rating as rating,
        COUNT(r.review_id) as review_count
      FROM Vendor_Account_Data vad
      LEFT JOIN Review r ON r.receiving_vendor_id = vad.vendor_id
      WHERE vad.vendor_review_rating < $1 OR vad.vendor_review_rating IS NULL
      GROUP BY vad.vendor_id, vad.vendor_business_name, vad.vendor_email, vad.vendor_review_rating
      HAVING COUNT(r.review_id) >= 3 OR vad.vendor_review_rating IS NULL
    `,
      [threshold],
    )

    // Get low-reviewed organizers
    const organizerResult = await query(
      `
      SELECT 
        'organizer' as user_type,
        organizer_id as user_id,
        organizer_company_name as name,
        organizer_email as email,
        organizer_review_rating as rating,
        COUNT(r.review_id) as review_count
      FROM Event_Organizer_Account_Data eoad
      LEFT JOIN Review r ON r.receiving_vendor_id = eoad.organizer_id
      WHERE eoad.organizer_review_rating < $1 OR eoad.organizer_review_rating IS NULL
      GROUP BY eoad.organizer_id, eoad.organizer_company_name, eoad.organizer_email, eoad.organizer_review_rating
      HAVING COUNT(r.review_id) >= 3 OR eoad.organizer_review_rating IS NULL
    `,
      [threshold],
    )

    const lowReviewedUsers = [...vendorResult.rows, ...organizerResult.rows]

    res.json({ success: true, users: lowReviewedUsers })
  } catch (error) {
    console.error("Error fetching low-reviewed users:", error)
    next(error)
  }
})

// Suspend/unsuspend user
router.put("/superadmin/users/:id/suspend", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { user_type, action, admin_id, reason } = req.body // action: 'suspend' or 'unsuspend'

    let tableName: string
    let statusColumn: string

    switch (user_type) {
      case "vendor":
        tableName = "Vendor_Account_Data"
        statusColumn = "vendor_status"
        break
      case "organizer":
        tableName = "Event_Organizer_Account_Data"
        statusColumn = "organizer_status"
        break
      case "customer":
        tableName = "Customer_Account_Data"
        statusColumn = "customer_status"
        break
      default:
        res.status(400).json({ success: false, message: "Invalid user type" })
        return
    }

    const newStatus = action === "suspend" ? "suspended" : "active"

    await query(`UPDATE ${tableName} SET ${statusColumn} = $1 WHERE ${user_type}_id = $2`, [newStatus, id])

    // Log admin action
    await query(
      `INSERT INTO Admin_Actions (action_id, admin_id, action_type, target_id, action_details, timestamp)
       VALUES (DEFAULT, $1, 'user_suspension', $2, $3, NOW())`,
      [admin_id, id, `${action} user: ${reason || "No reason provided"}`],
    )

    res.json({ success: true, message: `User ${action}ed successfully` })
  } catch (error) {
    console.error("Error updating user status:", error)
    next(error)
  }
})

// Get admin actions log
router.get("/superadmin/actions", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 50
    const offset = (page - 1) * limit

    const result = await query(
      `
      SELECT 
        aa.*,
        saad.admin_email
      FROM Admin_Actions aa
      JOIN Super_Admin_Account_Data saad ON aa.admin_id = saad.admin_id
      ORDER BY aa.timestamp DESC
      LIMIT $1 OFFSET $2
    `,
      [limit, offset],
    )

    const countResult = await query("SELECT COUNT(*) FROM Admin_Actions")
    const totalCount = Number.parseInt(countResult.rows[0].count)

    res.json({
      success: true,
      actions: result.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching admin actions:", error)
    next(error)
  }
})

// Dashboard statistics
router.get("/superadmin/dashboard-stats", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get pending verification requests count
    const pendingVerifications = await query("SELECT COUNT(*) FROM User_Verification_Requests WHERE status = 'pending'")

    // Get pending cancellation requests count
    const pendingCancellations = await query(
      "SELECT COUNT(*) FROM Event_Cancellation_Requests WHERE status = 'pending'",
    )

    // Get low-reviewed users count
    const lowReviewedUsers = await query(`
      SELECT COUNT(*) FROM (
        SELECT vendor_id FROM Vendor_Account_Data WHERE vendor_review_rating < 3.0
        UNION
        SELECT organizer_id FROM Event_Organizer_Account_Data WHERE organizer_review_rating < 3.0
      ) as low_reviewed
    `)

    // Get total users count
    const totalUsers = await query(`
      SELECT 
        (SELECT COUNT(*) FROM Customer_Account_Data) +
        (SELECT COUNT(*) FROM Vendor_Account_Data) +
        (SELECT COUNT(*) FROM Event_Organizer_Account_Data) as total
    `)

    // Get total events count
    const totalEvents = await query("SELECT COUNT(*) FROM Events")

    // Get recent admin actions
    const recentActions = await query(`
      SELECT 
        aa.*,
        saad.admin_email
      FROM Admin_Actions aa
      JOIN Super_Admin_Account_Data saad ON aa.admin_id = saad.admin_id
      ORDER BY aa.timestamp DESC
      LIMIT 10
    `)

    res.json({
      success: true,
      stats: {
        pendingVerifications: Number.parseInt(pendingVerifications.rows[0].count),
        pendingCancellations: Number.parseInt(pendingCancellations.rows[0].count),
        lowReviewedUsers: Number.parseInt(lowReviewedUsers.rows[0].count),
        totalUsers: Number.parseInt(totalUsers.rows[0].total),
        totalEvents: Number.parseInt(totalEvents.rows[0].count),
        recentActions: recentActions.rows,
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    next(error)
  }
})

export default router
