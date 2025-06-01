import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

// Define interfaces
interface User {
  user_id: string
  name: string
  email: string
  user_type: string
  rating: number | null
  review_count: number
}

interface VerificationRequest {
  verification_id: string
  user_id: string
  user_type: string
  user_name: string
  user_email: string
  status: string
  submitted_at: string
  admin_notes?: string
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("userList")
  const [currentPage, setCurrentPage] = useState(1)
  const [showReviewSubmission, setShowReviewSubmission] = useState(false)
  const [selectedVerificationId, setSelectedVerificationId] = useState("")
  const [selectedBusinessData, setSelectedBusinessData] = useState<VerificationRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // State for backend data
  const [lowReviewedUsers, setLowReviewedUsers] = useState<User[]>([])
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([])
  
  const itemsPerPage = 10

  // Fetch low-reviewed users
  const fetchLowReviewedUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/superadmin/low-reviewed-users?threshold=3.0')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      if (data.success) {
        setLowReviewedUsers(data.users)
      } else {
        throw new Error(data.message || 'Failed to fetch users')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching low-reviewed users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch verification requests
  const fetchVerificationRequests = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/superadmin/verification-requests')
      if (!response.ok) {
        throw new Error('Failed to fetch verification requests')
      }
      const data = await response.json()
      if (data.success) {
        setVerificationRequests(data.requests)
      } else {
        throw new Error(data.message || 'Failed to fetch verification requests')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching verification requests:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update verification request status
  const updateVerificationStatus = async (verificationId: string, status: string, adminNotes: string = '') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/superadmin/verification-requests/${verificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status.toLowerCase(),
          admin_notes: adminNotes,
          admin_id: 1 // You should get this from your auth context
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update verification request')
      }

      const data = await response.json()
      if (data.success) {
        // Refresh the verification requests
        await fetchVerificationRequests()
        handleBackToUserManagement()
      } else {
        throw new Error(data.message || 'Failed to update verification request')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error updating verification status:', err)
    } finally {
      setLoading(false)
    }
  }

  // Suspend/unsuspend user
  const updateUserStatus = async (userId: string, userType: string, action: 'suspend' | 'unsuspend', reason: string = '') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/superadmin/users/${userId}/suspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_type: userType,
          action,
          admin_id: 1, // You should get this from your auth context
          reason
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update user status')
      }

      const data = await response.json()
      if (data.success) {
        // Refresh the users list
        await fetchLowReviewedUsers()
      } else {
        throw new Error(data.message || 'Failed to update user status')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error updating user status:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load data when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "userList") {
      fetchLowReviewedUsers()
    } else if (activeTab === "userVerification") {
      fetchVerificationRequests()
    }
  }, [activeTab])

  // Pagination logic
  const getCurrentData = <T,>(data: T[], page: number, itemsPerPage: number): T[] => {
    const startIndex = (page - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }

  const totalUserPages = Math.ceil(lowReviewedUsers.length / itemsPerPage)
  const totalVerificationPages = Math.ceil(verificationRequests.length / itemsPerPage)

  const currentUserData = getCurrentData(lowReviewedUsers, currentPage, itemsPerPage)
  const currentVerificationData = getCurrentData(verificationRequests, currentPage, itemsPerPage)

  const handlePreviousPage = (): void => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = (): void => {
    const maxPages = activeTab === "userList" ? totalUserPages : totalVerificationPages
    setCurrentPage((prev) => Math.min(prev + 1, maxPages))
  }

  const handlePageClick = (page: number | string): void => {
    if (typeof page === "number") {
      setCurrentPage(page)
    }
  }

  const handleReviewSubmission = (verificationId: string): void => {
    const verificationItem = verificationRequests.find((item) => item.verification_id === verificationId)
    setSelectedVerificationId(verificationId)
    setSelectedBusinessData(verificationItem || null)
    setShowReviewSubmission(true)
  }

  const handleBackToUserManagement = (): void => {
    setShowReviewSubmission(false)
    setSelectedVerificationId("")
    setSelectedBusinessData(null)
  }

  const getPageNumbers = (totalPages: number): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }


  const VerificationStatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case "approved":
          return "bg-green-500 text-green-600"
        case "rejected":
          return "bg-red-500 text-red-600"
        default:
          return "bg-yellow-500 text-yellow-600"
      }
    }

    return (
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(status).split(" ")[0]}`}></span>
        <span className={`text-sm ${getStatusColor(status).split(" ")[1]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    )
  }

  if (showReviewSubmission) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <button
            onClick={handleBackToUserManagement}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to User Management
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Review Submission</h2>
          <p className="text-gray-600">Verification ID: {selectedVerificationId}</p>
          {selectedBusinessData && (
            <div className="mt-4 space-y-2">
              <p><strong>User:</strong> {selectedBusinessData.user_name}</p>
              <p><strong>Email:</strong> {selectedBusinessData.user_email}</p>
              <p><strong>Type:</strong> {selectedBusinessData.user_type}</p>
              <p><strong>Submitted:</strong> {new Date(selectedBusinessData.submitted_at).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedBusinessData.status}</p>
              {selectedBusinessData.admin_notes && (
                <p><strong>Admin Notes:</strong> {selectedBusinessData.admin_notes}</p>
              )}
            </div>
          )}
          <div className="mt-6">
            <textarea
              placeholder="Add notes (required for rejection)..."
              className="w-full p-3 border rounded-md mb-4"
              rows={3}
              id="adminNotes"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const notes = (document.getElementById('adminNotes') as HTMLTextAreaElement)?.value || ''
                  updateVerificationStatus(selectedVerificationId, "approved", notes)
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={() => {
                  const notes = (document.getElementById('adminNotes') as HTMLTextAreaElement)?.value || ''
                  if (!notes.trim()) {
                    alert('Please provide a reason for rejection')
                    return
                  }
                  updateVerificationStatus(selectedVerificationId, "rejected", notes)
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        {error && (
          <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-md overflow-hidden w-fit">
          <button
            onClick={() => {
              setActiveTab("userList")
              setCurrentPage(1)
            }}
            className={`px-6 py-3 text-sm font-medium ${activeTab === "userList" ? "bg-gray-200" : "bg-transparent"}`}
          >
            Low-Reviewed Users
          </button>
          <button
            onClick={() => {
              setActiveTab("userVerification")
              setCurrentPage(1)
            }}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "userVerification" ? "bg-gray-200" : "bg-transparent"
            }`}
          >
            User Verification
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* User List Table */}
      {activeTab === "userList" && !loading && (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>User ID</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="w-40 px-3 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="w-32 px-3 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">User Type</th>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">Rating</th>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">Reviews</th>
                <th className="w-24 px-3 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUserData.map((user: User, index: number) => (
                <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 truncate">{user.user_id}</td>
                  <td className="px-3 py-3 text-sm text-gray-500 truncate" title={user.name}>{user.name}</td>
                  <td className="px-3 py-3 text-sm text-gray-500 truncate" title={user.email}>{user.email}</td>
                  <td className="px-3 py-3 text-sm text-gray-500">{user.user_type}</td>
                  <td className="px-3 py-3 text-sm text-gray-500">
                    {user.rating ? user.rating.toFixed(1) : 'N/A'}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-500">{user.review_count}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => {
                        const reason = prompt('Enter reason for suspension:')
                        if (reason) {
                          updateUserStatus(user.user_id, user.user_type, 'suspend', reason)
                        }
                      }}
                      className="px-2 py-1 text-xs border rounded text-red-700 hover:bg-red-50 disabled:opacity-50"
                      disabled={loading}
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination for Users */}
          <div className="px-4 py-3 flex items-center justify-between border-t">
            <button
              className={`flex items-center px-3 py-1 text-sm text-gray-500 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {getPageNumbers(totalUserPages).map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && handlePageClick(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page === currentPage ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-100"
                  } ${typeof page !== "number" ? "cursor-default" : ""}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={`flex items-center px-3 py-1 text-sm text-gray-500 border rounded ${currentPage === totalUserPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              onClick={handleNextPage}
              disabled={currentPage === totalUserPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Verification Requests Table */}
      {activeTab === "userVerification" && !loading && (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-24 px-3 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>Verification ID</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="w-32 px-3 py-3 text-left text-sm font-medium text-gray-500">User Name</th>
                <th className="w-32 px-3 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">User Type</th>
                <th className="w-28 px-3 py-3 text-left text-sm font-medium text-gray-500">Submitted Date</th>
                <th className="w-20 px-3 py-3 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="w-24 px-3 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVerificationData.map((item: VerificationRequest, index: number) => (
                <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 truncate">{item.verification_id}</td>
                  <td className="px-3 py-3 text-sm text-gray-500 truncate" title={item.user_name}>{item.user_name}</td>
                  <td className="px-3 py-3 text-sm text-gray-500 truncate" title={item.user_email}>{item.user_email}</td>
                  <td className="px-3 py-3 text-sm text-gray-500">{item.user_type}</td>
                  <td className="px-3 py-3 text-sm text-gray-500">
                    {new Date(item.submitted_at).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-3">
                    <VerificationStatusBadge status={item.status} />
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => handleReviewSubmission(item.verification_id)}
                      className="px-2 py-1 text-xs border rounded text-gray-700 hover:bg-gray-50"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination for Verification Requests */}
          <div className="px-4 py-3 flex items-center justify-between border-t">
            <button
              className={`flex items-center px-3 py-1 text-sm text-gray-500 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {getPageNumbers(totalVerificationPages).map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && handlePageClick(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page === currentPage ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-100"
                  } ${typeof page !== "number" ? "cursor-default" : ""}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={`flex items-center px-3 py-1 text-sm text-gray-500 border rounded ${currentPage === totalVerificationPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              onClick={handleNextPage}
              disabled={currentPage === totalVerificationPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && ((activeTab === "userList" && lowReviewedUsers.length === 0) || 
       (activeTab === "userVerification" && verificationRequests.length === 0)) && (
        <div className="bg-white rounded-md shadow-sm p-8 text-center">
          <p className="text-gray-500">
            {activeTab === "userList" ? "No low-reviewed users found." : "No verification requests found."}
          </p>
        </div>
      )}
    </div>
  )
}