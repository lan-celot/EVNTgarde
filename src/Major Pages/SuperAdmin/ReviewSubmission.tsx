import { useState } from "react"
import { ArrowLeft, FileText, Check, X } from "lucide-react"

interface ReviewSubmissionProps {
  verificationId?: string
  businessData?: {
    verificationId: string
    businessName: string
    ownerName: string
    userType: string
    submittedDate: string
    status: string
  } | null
  onBack?: () => void
  onUpdateStatus?: (verificationId: string, status: string) => void
}

export default function ReviewSubmission({
  verificationId = "#VER_ID_01",
  businessData,
  onBack,
  onUpdateStatus,
}: ReviewSubmissionProps) {
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "not-verified">("pending")
  const [notes, setNotes] = useState("")

  // Use the passed business data or fallback to sample data
  const submissionData = {
    verificationId: businessData?.verificationId || verificationId,
    businessName: businessData?.businessName || "Online Retail Shop Business",
    ownerName: businessData?.ownerName || "John Doe",
    businessAddress: "123 Ayala Avenue, Makati City, Metro Manila",
    email: "johndoe@gmail.com",
    phone: "+63 912 345 6789",
    submittedDate: businessData?.submittedDate || "January 30, 2025",
    documents: [
      {
        name: "Business_registration.pdf",
        size: "900 KB",
        uploadDate: "January 15, 2025",
        expiryDate: "January 15, 2027",
        status: "Valid",
      },
      {
        name: "Other_license.pdf",
        size: "760 KB",
        uploadDate: "January 15, 2025",
        expiryDate: "January 30, 2027",
        status: "Valid",
      },
    ],
    requirements: [
      { name: "Business registration document provided", completed: true },
      { name: "Business registration not expired", completed: true },
      { name: "Owner name matches valid documents", completed: true },
      { name: "Valid ID(s) provided", completed: true },
      { name: "Valid ID(s) not expired", completed: true },
      { name: "Face verification (optional)", completed: false, optional: true },
    ],
  }

  const handleApprove = () => {
    setVerificationStatus("verified")
    if (onUpdateStatus) {
      onUpdateStatus(verificationId, "Verified")
    }
  }

  const handleReject = () => {
    if (!notes.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setVerificationStatus("not-verified")
    if (onUpdateStatus) {
      onUpdateStatus(verificationId, "Not Verified")
    }
  }

  const RequirementItem = ({ requirement }: { requirement: any }) => {
    let isCompleted = requirement.completed
    let showAsIncomplete = false

    if (verificationStatus === "verified") {
      isCompleted = requirement.completed
    } else if (verificationStatus === "not-verified") {
      isCompleted = false
      showAsIncomplete = !requirement.optional
    }

    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-sm text-gray-500">{requirement.name}</span>
        <div className="flex items-center">
          {requirement.optional && !isCompleted ? (
            <span className="text-xs text-gray-400 mr-2">Not Required</span>
          ) : showAsIncomplete ? (
            <span className="text-xs text-red-600 mr-2">Not Accomplished</span>
          ) : null}
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isCompleted ? "bg-green-500" : showAsIncomplete ? "bg-red-500" : "bg-gray-300"
            }`}
          >
            {isCompleted ? (
              <Check className="w-3 h-3 text-white" />
            ) : showAsIncomplete ? (
              <X className="w-3 h-3 text-white" />
            ) : (
              <div className="w-2 h-2 bg-gray-500 rounded-full" />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ml-64 min-h-screen">
      {/* Header */}
      <div className="px-6 py-4">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Submission Details Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">Submission Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Business Name</label>
                  <p className="text-gray-700 font-medium">{submissionData.businessName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Email Address</label>
                  <p className="text-gray-700">{submissionData.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Owner Name</label>
                  <p className="text-gray-700">{submissionData.ownerName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                  <p className="text-gray-700">{submissionData.phone}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500 block mb-1">Business Address</label>
                  <p className="text-gray-700">{submissionData.businessAddress}</p>
                </div>
              </div>
            </div>

            {/* Submitted Documents Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">Submitted Documents</h2>

              <div className="space-y-4">
                {submissionData.documents.map((doc, index) => (
                  <div key={index} className="rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-700">{doc.name}</h3>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{doc.size}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">Date Uploaded:</span>
                            <br />
                            {doc.uploadDate}
                          </div>
                          <div>
                            <span className="font-medium">Document Expiration:</span>
                            <br />
                            {doc.expiryDate}
                          </div>
                          <div>
                            <span className="font-medium">Validity Status:</span>
                            <br />
                            {doc.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Requirements Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">Verification Requirements</h2>

              <div className="space-y-1">
                {submissionData.requirements.map((requirement, index) => (
                  <RequirementItem key={index} requirement={requirement} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Verification Actions Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Verification Actions</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Notes/Reason (Required for rejection)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter notes or reason for rejection..."
                  />
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleApprove}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      verificationStatus === "verified"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {verificationStatus === "verified" ? "Verified ✓" : "Verify Business"}
                  </button>

                  <button
                    onClick={handleReject}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium border transition-colors ${
                      verificationStatus === "not-verified"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {verificationStatus === "not-verified" ? "Not Verified ✗" : "Mark as Not Verified"}
                  </button>
                </div>
              </div>
            </div>

            {/* Submission Details Summary Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Submission Details</h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 block">Submitted Date</label>
                  <p className="text-sm text-gray-700">{submissionData.submittedDate}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block">Document Count</label>
                  <p className="text-sm text-gray-700">{submissionData.documents.length} files</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block">Face Verification</label>
                  <p className="text-sm text-gray-700">Not Accomplished</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
