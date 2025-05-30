import {/* SetStateAction*/ useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import ReviewSubmission from "./ReviewSubmission"

// Define interfaces
interface User {
  userId: string
  businessName: string
  userName: string
  gender: string
  sms: string
  email: string
  userType: string
  status: string
}

interface VerificationItem {
  verificationId: string
  businessName: string
  ownerName: string
  userType: string
  submittedDate: string
  status: string
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("userList")
  const [currentPage, setCurrentPage] = useState(1)
  const [showReviewSubmission, setShowReviewSubmission] = useState(false)
  const [selectedVerificationId, setSelectedVerificationId] = useState("")
  const [selectedBusinessData, setSelectedBusinessData] = useState<VerificationItem | null>(null)
  const itemsPerPage = 10

  // Sample data for User List
  const userListData: User[] = [
    {
      userId: "#USR01",
      businessName: "Online Retail Shop Business",
      userName: "John Doe",
      gender: "Male",
      sms: "+639123456789",
      email: "jd@gmail.com",
      userType: "Vendor",
      status: "Active",
    },
    {
      userId: "#USR02",
      businessName: "Tech Solutions Inc.",
      userName: "Jane Doe",
      gender: "Female",
      sms: "+639123456789",
      email: "jd@gmail.com",
      userType: "Organizer",
      status: "Inactive",
    },
    {
      userId: "#USR03",
      businessName: "Online Retail Shop Business",
      userName: "Doe Doe",
      gender: "Male",
      sms: "+639123456789",
      email: "dd@gmail.com",
      userType: "Vendor",
      status: "Active",
    },
    {
      userId: "#USR04",
      businessName: "Tech Solutions Inc.",
      userName: "John John",
      gender: "Male",
      sms: "+639123456789",
      email: "jj@gmail.com",
      userType: "Organizer",
      status: "Active",
    },
    {
      userId: "#USR05",
      businessName: "-",
      userName: "Jane Jane",
      gender: "Female",
      sms: "+639123456789",
      email: "jj@gmail.com",
      userType: "Customer",
      status: "Inactive",
    },
    {
      userId: "#USR06",
      businessName: "-",
      userName: "Jane Jane",
      gender: "Male",
      sms: "+639123456789",
      email: "jd@gmail.com",
      userType: "Customer",
      status: "Active",
    },
    {
      userId: "#USR07",
      businessName: "Digital Marketing Co.",
      userName: "Jane Jane",
      gender: "Female",
      sms: "+639123456789",
      email: "jd@gmail.com",
      userType: "Organizer",
      status: "Inactive",
    },
    {
      userId: "#USR08",
      businessName: "Digital Marketing Co.",
      userName: "Jane Jane",
      gender: "Male",
      sms: "+639123456789",
      email: "dd@gmail.com",
      userType: "Organizer",
      status: "Active",
    },
    {
      userId: "#USR09",
      businessName: "Digital Marketing Co.",
      userName: "Jane Jane",
      gender: "Female",
      sms: "+639123456789",
      email: "jj@gmail.com",
      userType: "Organizer",
      status: "Active",
    },
    {
      userId: "#USR10",
      businessName: "Food Delivery Service",
      userName: "Jane Jane",
      gender: "Female",
      sms: "+639123456789",
      email: "jj@gmail.com",
      userType: "Vendor",
      status: "Inactive",
    },
    {
      userId: "#USR11",
      businessName: "Software Development Firm",
      userName: "Alice Smith",
      gender: "Female",
      sms: "+639876543210",
      email: "as@gmail.com",
      userType: "Vendor",
      status: "Active",
    },
    {
      userId: "#USR12",
      businessName: "Consulting Group",
      userName: "Bob Johnson",
      gender: "Male",
      sms: "+639214365879",
      email: "bj@gmail.com",
      userType: "Organizer",
      status: "Inactive",
    },
    {
      userId: "#USR13",
      businessName: "E-commerce Platform",
      userName: "Charlie Brown",
      gender: "Male",
      sms: "+639321547896",
      email: "cb@gmail.com",
      userType: "Customer",
      status: "Active",
    },
    {
      userId: "#USR14",
      businessName: "Financial Services Company",
      userName: "Diana Miller",
      gender: "Female",
      sms: "+639432659870",
      email: "dm@gmail.com",
      userType: "Vendor",
      status: "Inactive",
    },
  ]

  // Sample data for User Verification - using state to allow updates
  const [verificationData, setVerificationData] = useState<VerificationItem[]>([
    {
      verificationId: "#VER_ID_01",
      businessName: "Online Retail Shop Business",
      ownerName: "John Doe",
      userType: "Vendor",
      submittedDate: "January 30, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_02",
      businessName: "Tech Solutions Inc.",
      ownerName: "Jane Doe",
      userType: "Organizer",
      submittedDate: "February 3, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_03",
      businessName: "Online Retail Shop Business",
      ownerName: "Doe Doe",
      userType: "Vendor",
      submittedDate: "June 16, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_04",
      businessName: "Digital Marketing Co.",
      ownerName: "John John",
      userType: "Organizer",
      submittedDate: "July 7, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_05",
      businessName: "Food Delivery Service",
      ownerName: "Jane Jane",
      userType: "Vendor",
      submittedDate: "July 27, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_06",
      businessName: "Tech Startup",
      ownerName: "John Smith",
      userType: "Vendor",
      submittedDate: "August 5, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_07",
      businessName: "Local Restaurant",
      ownerName: "Mary Johnson",
      userType: "Vendor",
      submittedDate: "August 12, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_08",
      businessName: "Global Corp",
      ownerName: "David Williams",
      userType: "Vendor",
      submittedDate: "September 1, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_09",
      businessName: "Green Energy Solutions",
      ownerName: "Emily Davis",
      userType: "Organizer",
      submittedDate: "October 10, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_10",
      businessName: "AI Innovations Ltd.",
      ownerName: "Chris Wilson",
      userType: "Vendor",
      submittedDate: "November 15, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_11",
      businessName: "Sustainable Farms",
      ownerName: "Linda Rodriguez",
      userType: "Vendor",
      submittedDate: "December 20, 2025",
      status: "Pending",
    },
    {
      verificationId: "#VER_ID_12",
      businessName: "Creative Design Agency",
      ownerName: "Kevin Martinez",
      userType: "Organizer",
      submittedDate: "January 1, 2026",
      status: "Pending",
    },
  ])

  // Pagination logic
  const getCurrentData = <T,>(data: T[], page: number, itemsPerPage: number): T[] => {
    const startIndex = (page - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }

  const totalUserPages = Math.ceil(userListData.length / itemsPerPage)
  const totalVerificationPages = Math.ceil(verificationData.length / itemsPerPage)

  const currentUserData = getCurrentData(userListData, currentPage, itemsPerPage)
  const currentVerificationData = getCurrentData(verificationData, currentPage, itemsPerPage)

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
    // Find the verification item to get the business data
    const verificationItem = verificationData.find((item) => item.verificationId === verificationId)
    setSelectedVerificationId(verificationId)
    setSelectedBusinessData(verificationItem || null)
    setShowReviewSubmission(true)
  }

  const handleBackToUserManagement = (): void => {
    setShowReviewSubmission(false)
    setSelectedVerificationId("")
  }

  // Function to update verification status
  const updateVerificationStatus = (verificationId: string, newStatus: string): void => {
    // Map the status to the correct terminology
    const mappedStatus = newStatus === "Approved" ? "Verified" : newStatus === "Rejected" ? "Not Verified" : newStatus
    setVerificationData((prevData) =>
      prevData.map((item) => (item.verificationId === verificationId ? { ...item, status: mappedStatus } : item)),
    )
    handleBackToUserManagement()
  }

  // Generate page numbers for pagination
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

  const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status === "Active"
    return (
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full mr-1.5 ${isActive ? "bg-green-500" : "bg-gray-400"}`}></span>
        <span className={`text-sm ${isActive ? "text-green-600" : "text-gray-500"}`}>{status}</span>
      </div>
    )
  }

  const VerificationStatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Verified":
          return "bg-green-500 text-green-600"
        case "Not Verified":
          return "bg-red-500 text-red-600"
        default:
          return "bg-yellow-500 text-yellow-600"
      }
    }

    return (
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(status).split(" ")[0]}`}></span>
        <span className={`text-sm ${getStatusColor(status).split(" ")[1]}`}>{status}</span>
      </div>
    )
  }

  // Show review submission if selected
  if (showReviewSubmission) {
    return (
      <ReviewSubmission
        verificationId={selectedVerificationId}
        businessData={selectedBusinessData}
        onBack={handleBackToUserManagement}
        onUpdateStatus={updateVerificationStatus}
      />
    )
  }

  return (
    <div className="ml-64">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
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
            User List
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

      {/* Table */}
      {activeTab === "userList" && (
        <div className="bg-white rounded-md shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>User ID</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Gender</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">SMS</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUserData.map((user: User, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.userId}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.businessName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.sms}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.userType}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between">
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

      {activeTab === "userVerification" && (
        <div className="bg-white rounded-md shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>Verification ID</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Business Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Owner Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Submitted Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVerificationData.map((item: VerificationItem, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.verificationId}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.businessName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.ownerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.userType}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.submittedDate}</td>
                  <td className="px-6 py-4">
                    <VerificationStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleReviewSubmission(item.verificationId)}
                      className="px-3 py-1 text-sm border rounded text-gray-700 hover:bg-gray-50"
                    >
                      Review Submission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between">
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
    </div>
  )
}