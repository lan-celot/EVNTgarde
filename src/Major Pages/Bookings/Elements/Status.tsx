import type React from "react";
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react";

interface StatusProps {
  activeStatus?: string;
  selectedBooking?: any;
  userRole?: 'organizer' | 'individual' | 'vendor';
  organizer?: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  onMarkCompleted?: () => void;
  onShareExperience?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

const Status: React.FC<StatusProps> = ({
  activeStatus,
  selectedBooking,
  userRole,
  organizer,
  customer,
  socialLinks = {
    facebook: "@linktofacebook",
    instagram: "@linktoinstagram",
    linkedin: "@linktolinkedin",
    website: "@linktowebsite",
  },
  onMarkCompleted,
  onShareExperience,
  onAccept,
  onReject,
}) => {
  const dates = {
    requestDate: "Aug 1, 2025",
    acceptedDate: "Aug 10, 2025",
    paymentDueDate: "Sept 1, 2025",
    paidDate: "Sept 1, 2025",
    paymentDate: "Aug 1, 2025",
    completedDate: "Aug 10, 2025",
  };

  const displayStatus = activeStatus
    ? activeStatus === "Pending"
      ? "awaiting"
      : activeStatus === "Upcoming"
        ? "accepted"
        : "completed"
    : "awaiting";

  // Render the status section based on current status
  const renderStatusContent = () => {
    // If userRole is organizer, show customer info instead of organizer info
    const personToShow = userRole === 'organizer' ? customer : organizer;
    const roleLabel = userRole === 'organizer' ? 'Customer' : 'Organizer';
    
    switch (displayStatus) {
      case "awaiting":
        return (
          <>
            <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {personToShow?.avatar ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={personToShow.avatar || "/placeholder.svg"}
                        alt={personToShow?.name || roleLabel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-200"></div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold">
                      {personToShow?.name || `${roleLabel} Name`}
                    </h1>
                    <p className="text-gray-500">{userRole === 'organizer' ? 'Customer' : (personToShow as any)?.role || roleLabel}</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-500">
                      {personToShow?.email || "santo.tomas@gmail.com"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-500">
                      {personToShow?.phone || "0919-683-2396"}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Get in Touch</h2>
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
              </div>

              {userRole === 'organizer' && (
                <div className="border-t border-gray-300 mt-2">
                  <div className="flex">
                    <button
                      className="flex-1 py-4 px-4 font-medium border-r border-gray-300 text-black hover:bg-gray-50"
                      onClick={onReject}
                    >
                      Reject
                    </button>
                    <button
                      className="flex-1 bg-blue-600 py-4 px-4 text-white font-medium hover:bg-blue-700"
                      onClick={onAccept}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case "accepted":
        return (
          <>
            <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {personToShow?.avatar ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={personToShow.avatar || "/placeholder.svg"}
                        alt={personToShow?.name || roleLabel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-200"></div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold">
                      {personToShow?.name || `${roleLabel} Name`}
                    </h1>
                    <p className="text-gray-500">{userRole === 'organizer' ? 'Customer' : (personToShow as any)?.role || roleLabel}</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-500">
                      {personToShow?.email || "santo.tomas@gmail.com"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-500">
                      {personToShow?.phone || "0919-683-2396"}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="space-y-4">
                  <div className="bg-yellow-400 p-4 text-white rounded-md">
                    <h2 className="text-xl font-bold mb-1">Accepted</h2>
                    <p>
                      The event has been accepted, and all the payments for the
                      vendor <strong>have been settled.</strong>
                    </p>
                  </div>
                
                  <div>
                    <h3 className="font-medium">Request Date</h3>
                    <p className="text-gray-500">{dates.requestDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date Accepted</h3>
                    <p className="text-gray-500">{dates.acceptedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Due Date</h3>
                    <p className="text-gray-500">{dates.paymentDueDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date Paid</h3>
                    <p className="text-gray-500">{dates.paidDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date Completed</h3>
                    <p className="text-gray-500">-</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-300 mt-2">
                <button
                  className="w-full bg-blue-600 py-4 px-4 text-white font-medium hover:bg-blue-700"
                  onClick={onMarkCompleted}
                >
                  Mark Event as Completed
                </button>
              </div>
            </div>
          </>
        );
      case "completed":
        return (
          <>
            <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {personToShow?.avatar ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={personToShow.avatar || "/placeholder.svg"}
                        alt={personToShow?.name || roleLabel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-200"></div>
                  )}
                  <div>
                    <h1 className="text-xl font-bold">
                      {personToShow?.name || `${roleLabel} Name`}
                    </h1>
                    <p className="text-gray-500">{userRole === 'organizer' ? 'Customer' : (personToShow as any)?.role || roleLabel}</p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-500">
                      {personToShow?.email || "santo.tomas@gmail.com"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-500">
                      {personToShow?.phone || "0919-683-2396"}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="space-y-4">
                  <div className="bg-green-700 p-4 text-white rounded-md">
                    <h2 className="text-xl font-bold mb-1">Completed</h2>
                    <p>
                      The event has concluded, and all the payments have been
                      received
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Request Date</h3>
                    <p className="text-gray-500">{dates.requestDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date Accepted</h3>
                    <p className="text-gray-500">{dates.acceptedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date Completed</h3>
                    <p className="text-gray-500">{dates.completedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Date</h3>
                    <p className="text-gray-500">{dates.paymentDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-300 mt-2">
                <button
                  className="w-full bg-blue-600 py-4 px-4 text-white font-medium hover:bg-blue-700"
                  onClick={onShareExperience}
                >
                  Share Experience
                </button>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-fit w-full">
      <div className="flex flex-col gap-5 pr-5 p-5">
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default Status;
