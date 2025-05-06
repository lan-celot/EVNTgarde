import React, { useState } from "react"
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react"
import LeaveReview from "./LeaveReview"

interface StatusProps {
  activeStatus?: "Pending" | "Upcoming" | "Past" | "Rejected"
  selectedBooking?: any
  organizer?: {
    name?: string
    role?: string
    email?: string
    phone?: string
    avatar?: string
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    website?: string
  }
  onMarkCompleted?: () => void
  onShareExperience?: () => void
}

const Status: React.FC<StatusProps> = ({
  activeStatus,
  selectedBooking,
  organizer,
  socialLinks = {
    facebook: "@linktofacebook",
    instagram: "@linktoinstagram",
    linkedin: "@linktolinkedin",
    website: "@linktowebsite",
  },
  onMarkCompleted,
  onShareExperience,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false)

  const dates = {
    requestDate: "Aug 1, 2025",
    acceptedDate: "Aug 10, 2025",
    paymentDueDate: "Sept 1, 2025",
    paidDate: "Sept 1, 2025",
    paymentDate: "Aug 1, 2025",
    completedDate: "Aug 10, 2025",
  }

  const displayStatus = activeStatus
    ? activeStatus === "Pending"
      ? "awaiting"
      : activeStatus === "Upcoming"
      ? "accepted"
      : activeStatus === "Past"
      ? "completed"
      : activeStatus === "Rejected"
      ? "rejected"
      : "awaiting"
    : "awaiting"

  const renderOrganizerInfo = () => {
    return (
      <div className="border border-gray-300 rounded-md p-4 bg-white">
        <div className="flex items-center gap-4 mb-4">
          {organizer?.avatar ? (
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={organizer.avatar || "/placeholder.svg"}
                alt={organizer?.name || "Organizer"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-200"></div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{organizer?.name || "Organizer Name"}</h1>
            <p className="text-gray-500">{organizer?.role || "Organizer"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-500">{organizer?.email || "santo.tomas@gmail.com"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-500">{organizer?.phone || "0919-683-2396"}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderStatusContent = () => {
    switch (displayStatus) {
      case "awaiting":
        return (
          <>
            {renderOrganizerInfo()}
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              <h2 className="text-3xl font-bold mb-2">Awaiting Response</h2>
              <p className="text-gray-500">
                You have booked this organizer, please wait for the organizer to respond to your event request.
              </p>
            </div>

            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-500">{socialLinks.facebook}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-500">{socialLinks.instagram}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-500">{socialLinks.linkedin}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-500">{socialLinks.website}</span>
                </div>
              </div>
            </div>
          </>
        )
      case "accepted":
        return (
          <>
            {renderOrganizerInfo()}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-yellow-400 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Accepted</h2>
                <p>
                  The event has been accepted, and all the payments for the vendor <strong>have been settled.</strong>
                </p>
              </div>
              <div className="p-4 space-y-4 bg-white">
                <div>
                  <h3 className="text-lg font-semibold">Request Date</h3>
                  <p className="text-gray-500">{dates.requestDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Accepted</h3>
                  <p className="text-gray-500">{dates.acceptedDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Payment Due Date</h3>
                  <p className="text-gray-500">{dates.paymentDueDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Paid</h3>
                  <p className="text-gray-500">{dates.paidDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Completed</h3>
                  <p className="text-gray-500">-</p>
                </div>
                <button
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-black font-medium hover:bg-gray-300"
                  onClick={onMarkCompleted}
                >
                  Mark Event as Completed
                </button>
              </div>
            </div>
          </>
        )
      case "completed":
        return (
          <>
            {renderOrganizerInfo()}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-green-700 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Completed</h2>
                <p>The event has concluded, and all the payments have been received</p>
              </div>
              <div className="p-4 space-y-4 bg-white">
                <div>
                  <h3 className="text-lg font-semibold">Request Date</h3>
                  <p className="text-gray-500">{dates.requestDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Accepted</h3>
                  <p className="text-gray-500">{dates.acceptedDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Completed</h3>
                  <p className="text-gray-500">{dates.completedDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Payment Date</h3>
                  <p className="text-gray-500">{dates.paymentDate}</p>
                </div>
                <button
                  className="w-full bg-blue-600 rounded-md py-3 px-4 text-white font-medium hover:bg-blue-800"
                  onClick={() => setShowReviewModal(true)}
                >
                  Share Experience
                </button>
              </div>
            </div>
          </>
        )
      case "rejected":
        return (
          <>
            {renderOrganizerInfo()}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="bg-red-700 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Rejected</h2>
                <p>The event proposal has been rejected, and will not proceed to event planning.</p>
              </div>
              <div className="p-4 space-y-4 bg-white">
                <div>
                  <h3 className="text-lg font-semibold">Request Date</h3>
                  <p className="text-gray-500">{dates.requestDate}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Date Rejected</h3>
                  <p className="text-gray-500">Aug 2, 2025</p>
                </div>
                <button
                  className="w-full bg-blue-600 rounded-md py-3 px-4 text-white font-medium hover:bg-blue-800"
                  onClick={() => console.log("Browsing vendors")}
                >
                  Browse Other Vendors
                </button>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-5 pr-5">
      {renderStatusContent()}
      {showReviewModal && <LeaveReview onClose={() => setShowReviewModal(false)} />}
    </div>
  )
}

export default Status