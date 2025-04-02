import type React from "react"
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react"

interface StatusProps {
  status?: "awaiting" | "accepted" | "completed"
  organizer?: {
    name?: string
    role?: string
    email?: string
    phone?: string
    avatar?: string
  }
  dates?: {
    request?: string
    accepted?: string
    completed?: string
    payment?: string
    paymentDue?: string
    paid?: string
  }
  onMarkCompleted?: () => void // define this function to change to completed status once clicked
  onShareExperience?: () => void 
}

const Status: React.FC<StatusProps> = ({
  status = "awaiting",
  organizer,
  dates, // to be used in accepted and completed status
  onMarkCompleted, // on click function for "Mark Event as Completed" button inside accepted status
  onShareExperience, // on click function for "Share Experience" button
}) => {

  const renderOrganizerInfo = () => (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="flex items-center gap-4 mb-4">
        {organizer?.avatar ? (
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={organizer.avatar || "/placeholder.svg"}
              alt={organizer?.name || "Organizer Name"}
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
          <p className="text-gray-500">{organizer?.email || "organizer@gmail.com"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-500">{organizer?.phone || "09123456789"}</p>
        </div>
      </div>
    </div>
  )

  // status box based on current status (awaiting, accepted, completed)
  const renderStatusSection = () => {
    switch (status) {
      case "awaiting":
        return (
			<div className="border border-gray-300 rounded-md p-4 bg-gray-50">
			  <h2 className="text-2xl font-bold mb-2">Awaiting Response</h2>
			  <p className="text-gray-500">
				You have booked this organizer, please wait for the organizer to respond to your event request.
			  </p>
		<div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5 text-gray-600" />
              <span className="text-gray-500">@linktofacebook</span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-gray-600" />
              <span className="text-gray-500">@linktoinstagram</span>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-500">@linktolinkedin</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-gray-500">@linktowebsite</span>
            </div>
          </div>
        </div>
      </div>
    )
		  case "accepted":
			return (
			  <>
				{/* Accepted status content */}
			  </>
			)
      case "completed":
        return (
          <div className="border border-gray-300 rounded-md overflow-hidden">
			    {/* Completed status content */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {renderOrganizerInfo()}
      {renderStatusSection()}
    </div>
  )
}

export default Status