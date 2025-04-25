import { Star } from "lucide-react"
import { CalendarCard } from "./calendar-card"

export default function Dashboard() {
  // Sample taken dates for demonstration
  const takenDates = ["April 10, 2025", "April 11, 2025", "April 15, 2025", "April 16, 2025", "April 22, 2025"]

  return (
    <div className="w-full">
      {/* Main Content */}
      <div className="overflow-auto bg-gray-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <div className="mr-6 border-b-2 pb-2 font-medium flex items-center" style={{ borderColor: "#3061AD" }}>
              <span style={{ color: "#3061AD" }} className="mr-1">
                •
              </span>{" "}
              Activity Overview
            </div>
            <div className="mr-6 pb-2 text-gray-500">My Services</div>
            <div className="pb-2 text-gray-500">Explore</div>
          </div>

          {/* KPI Cards - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Pending Approvals</div>
              <div className="text-2xl font-bold">1,020</div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Revenue for August</div>
              <div className="text-2xl font-bold">$ 124,205.00</div>
              <div className="text-xs text-green-600 flex items-center">
                <span>↑ 15% Increase since July</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Customer Satisfaction Rating</div>
              <div className="text-2xl font-bold">4.5</div>
              <div className="flex text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" strokeWidth={1} fill="none" />
              </div>
              <div className="text-xs text-gray-500">Based on 50 reviews</div>
            </div>
          </div>

          {/* KPI Cards - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Total Job Requests</div>
              <div className="text-2xl font-bold">180,329</div>
              <div className="text-xs text-green-600 flex items-center">
                <span>↑ 8% Increase since 2022</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
              <div className="text-2xl font-bold">$ 298,349.00</div>
              <div className="text-xs text-green-600 flex items-center">
                <span>↑ 12% Increase since 2022</span>
              </div>
            </div>
          </div>

          {/* Calendar and Events Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <CalendarCard initialMonth="April" initialYear={2025} takenDates={takenDates} />

            {/* Events List */}
            <div className="md:col-span-2">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-md shadow-sm p-4 mb-4">
                  <div className="text-sm text-gray-500 mb-1">Mar 26</div>
                  <h3 className="font-semibold mb-2" style={{ color: "#3061AD" }}>
                    Super Duper Long Event Place Holder As In Super Long
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Start: 10:00 AM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Duration: 2 hours</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Organizer: Admin</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                      <span className="text-gray-600">Attendees: 15</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
