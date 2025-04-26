import { CalendarCard } from "./calendar-card";
import type React from "react";
import { ArrowUp } from "lucide-react";
import { Star } from "lucide-react";

const ActivityOverview: React.FC = () => {
  const takenDates = [
    "April 10, 2025",
    "April 11, 2025",
    "April 15, 2025",
    "April 16, 2025",
    "April 22, 2025",
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Approvals
            </h3>
            <p className="text-3xl font-bold mt-2">1,020</p>
          </div>

          {/* Revenue for August */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Revenue for August
            </h3>
            <p className="text-3xl font-bold mt-2">$ 124,205.00</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% increase since July</span>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Customer Satisfaction Rating
            </h3>
            <div className="flex items-center mt-2">
              <p className="text-3xl font-bold mr-2">4.5</p>{" "}
              {/* Add margin-right */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : index === 4
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 43 reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Job Requests */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Job Requests
            </h3>
            <p className="text-3xl font-bold mt-2">180,329</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>15% increase since July</span>
            </div>
          </div>

          {/* Total Revenue Earned */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Revenue Earned
            </h3>
            <p className="text-3xl font-bold mt-2">$ 298,349.00</p>
            <div className="flex items-center mt-2 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>10% increase since 2023</span>
            </div>
          </div>

          {/* Vendor Satisfaction */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Vendor Satisfaction Rating
            </h3>
            <div className="flex items-center mt-2">
              <p className="text-3xl font-bold mr-2">4.5</p>{" "}
              {/* Add some margin */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : index === 4
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 43 reviews</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow md:col-span-1">
          <CalendarCard
            initialMonth="April"
            initialYear={2025}
            takenDates={takenDates}
          />
        </div>
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          for upcoming events
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
