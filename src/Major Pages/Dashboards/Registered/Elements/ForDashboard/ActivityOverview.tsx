import { CalendarCard } from "./calendar-card"
import type React from "react"
import { ArrowUp } from "lucide-react"
import { Star } from "lucide-react"

const ActivityOverview: React.FC = () => {
  const takenDates = ["April 10, 2025", "April 11, 2025", "April 15, 2025", "April 16, 2025", "April 22, 2025"]

  const cardClass = "bg-white p-4 rounded-lg border-2 border-[#3B82F6] shadow-sm"

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-4">1,020</p>
          </div>

          {/* Revenue for August */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Revenue for August</h3>
            <p className="text-3xl font-bold mt-4">$124,205.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% increase since July</span>
            </div>
          </div>

         {/* Customer Satisfaction */}
        <div className={cardClass}>
          <h3 className="text-sm font-medium text-gray-500">Customer Satisfaction Rating</h3>
          <div className="flex items-center mt-4 gap-3">
            <p className="text-5xl font-bold">4.5</p>
            <div className="flex items-center gap-8">
              {[1, 2, 3, 4, 5].map((_, index) => {
                if (index < 4) {
                  return (
                    <Star
                      key={index}
                      className="h-7 w-7 text-yellow-400 fill-yellow-400"
                    />
                  );
                }
                if (index === 4) {
                  return (
                    <Star
                      key={index}
                      className="h-7 w-7 text-yellow-400 fill-yellow-400 opacity-50"
                    />
                  );
                }
                return null; // No empty stars
              })}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on 43 reviews</p>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Job Requests */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Total Job Requests</h3>
            <p className="text-3xl font-bold mt-4">180,329</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>15% increase since July</span>
            </div>
          </div>

          {/* Total Revenue Earned */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue Earned</h3>
            <p className="text-3xl font-bold mt-4">$298,349.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>10% increase since 2023</span>
            </div>
          </div>

       {/* Vendor Satisfaction */}
      <div className={cardClass}>
        <h3 className="text-sm font-medium text-gray-500">Vendor Satisfaction Rating</h3>
        <div className="flex items-center mt-4 gap-3">
          <p className="text-5xl font-bold">4.5</p>
          <div className="flex items-center gap-8">
            {[1, 2, 3, 4, 5].map((_, index) => {
              if (index < 4) {
                return (
                  <Star
                    key={index}
                    className="h-7 w-7 text-yellow-400 fill-yellow-400"
                  />
                );
              }
              if (index === 4) {
                return (
                  <Star
                    key={index}
                    className="h-7 w-7 text-yellow-400 fill-yellow-400 opacity-50"
                  />
                );
              }
              return null; // No empty stars
            })}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Based on 43 reviews</p>
      </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardClass} md:col-span-1`}>
          <CalendarCard initialMonth="April" initialYear={2025} takenDates={takenDates} />
        </div>
        <div className={`${cardClass} md:col-span-2`}>
          for upcoming events
        </div>
      </div>
    </div>
  )
}

export default ActivityOverview
