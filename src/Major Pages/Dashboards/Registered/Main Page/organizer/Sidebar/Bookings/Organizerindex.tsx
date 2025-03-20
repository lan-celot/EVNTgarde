import { useState, useEffect } from "react";
import { Sidebar } from "../../../../Elements/sidebar";
import CombinedLayout from "../../../../../../../Layout/combined-layout";
import RequestDetails from "./OrganizerRequestDetails";
import { getRequestsByStatusGroup as getAllOrganizerRequests } from "../../../../../../../functions/OrganizerRequestService";
import type { CustomerRequest } from "../../../../../../../functions/types";

interface BookingsProps {
  logout: () => void;
}

export default function Bookings({ logout }: BookingsProps) {
  const [selectedTab, setSelectedTab] = useState("Organizer");
  const [activeSection, setActiveSection] = useState("Requests");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [requests, setRequests] = useState<{
    pending: CustomerRequest[];
    accepted: CustomerRequest[];
    rejected: CustomerRequest[];
    negotiating: CustomerRequest[];
  }>({
    pending: [],
    accepted: [],
    rejected: [],
    negotiating: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock organizer ID
  const organizerId = "123";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    try {
      setLoading(true);
      const allRequests = getAllOrganizerRequests();
      setRequests(allRequests);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load requests");
      setLoading(false);
    }
  };

  const handleStatusChange = () => {
    // Refresh the requests list when a status changes
    fetchRequests();
  };

  // Get the current requests based on the active section
  const getCurrentRequests = (): CustomerRequest[] => {
    switch (activeSection) {
      case "Requests":
        return [...requests.pending, ...requests.negotiating];
      case "Accepted":
        return requests.accepted;
      case "Rejected":
        return requests.rejected;
      default:
        return [];
    }
  };

  // Get the count of pending requests for the badge
  const getPendingCount = (): number => {
    return requests.pending.length;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar
        //isCollapsed={isSidebarCollapsed}
        //setIsCollapsed={setIsSidebarCollapsed}
        logout={logout}
      />
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: "16rem" }}
      >
        <CombinedLayout showWelcomeBanner={false}>
          <div className="container px-4 py-8 sm:px-6 lg:px-8">
            {selectedRequest !== null ? (
              <RequestDetails
                requestId={selectedRequest}
                organizerId={organizerId}
                onClose={() => setSelectedRequest(null)}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <>
                <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">
                  Organizer Bookings
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="inline-flex rounded-lg bg-gray-100 p-0.5">
                    <button
                      onClick={() => setSelectedTab("Organizer")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTab === "Organizer"
                          ? "bg-white text-gray-900 shadow"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                    >
                      Organizer
                    </button>
                  </div>
                </div>
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-8">
                    {["Requests", "Accepted", "Rejected"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveSection(tab)}
                        className={`pb-4 relative ${
                          activeSection === tab
                            ? "text-blue-600 font-medium border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab}
                        {tab === "Requests" && getPendingCount() > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {getPendingCount()}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                ) : getCurrentRequests().length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No {activeSection.toLowerCase()} found.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getCurrentRequests().map((request) => (
                      <div
                        key={request.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedRequest(request.id)}
                      >
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          {["CICS", "Electric", "Microsoft"].some((keyword) =>
                            request.title.includes(keyword)
                          ) ? (
                            <img
                              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                              alt={request.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400">No Image</div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg text-gray-900 font-medium leading-tight">
                              {request.title}
                            </h3>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${
                                request.status === "pending"
                                  ? "bg-blue-100 text-blue-800"
                                  : request.status === "negotiating"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {request.organization}
                          </p>
                          <p className="text-sm text-gray-500">
                            {request.dates.length > 0 &&
                              formatDate(request.dates[0].start)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </CombinedLayout>
      </div>
    </div>
  );
}
