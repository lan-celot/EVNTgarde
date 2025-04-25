"use client"

import type React from "react"
import { CalendarCard } from "./calendar-card"

const Dashboard: React.FC = () => {
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

          {/* Activity Overview */}
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">For Pending Approvals</div>
                <div className="bg-white p-4 rounded shadow">For revenue chuchu stuff</div>
                <div className="bg-white p-4 rounded shadow">for customer satisfaction</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">for total job request</div>
                <div className="bg-white p-4 rounded shadow">for total revenue earned</div>
                <div className="bg-white p-4 rounded shadow">for vendor satisfaction</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                {/* Calendar Card Component */}
                <CalendarCard initialMonth="April" initialYear={2025} takenDates={takenDates} />
              </div>
              <div className="bg-white p-4 rounded shadow md:col-span-2">for upcoming events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
