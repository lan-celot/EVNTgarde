import { CalendarCard } from "./calendar-card"
import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { Star } from "lucide-react"

const Dashboard = () => {
  const [activePOV, setActivePOV] = useState("organizer") // Default view is organizer
  
  const takenDates = ["April 10, 2025", "April 11, 2025", "April 15, 2025", "April 16, 2025", "April 22, 2025"]
  const cardClass = "bg-white p-4 rounded-lg border-2 border-[#3B82F6] shadow-sm"

  // Tabs for switching between POVs
  const renderPOVSelector = () => (
    <div className="flex space-x-4 mb-6">
      <button 
        className={`px-4 py-2 rounded-md ${activePOV === "organizer" ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
        onClick={() => setActivePOV("organizer")}
      >
        Organizer
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${activePOV === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
        onClick={() => setActivePOV("customer")}
      >
        Customer
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${activePOV === "companyVendor" ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
        onClick={() => setActivePOV("companyVendor")}
      >
        Company Vendor
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${activePOV === "soloVendor" ? "bg-blue-500 text-white" : "bg-gray-200"}`} 
        onClick={() => setActivePOV("soloVendor")}
      >
        Solo Vendor
      </button>
    </div>
  )

  
  const OrganizerView = () => {
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
    );
  };


  const CustomerView = () => {
    return (
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-4">1,020</p>
          </div>

          {/* Total Events Held */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Total Events Held</h3>
            <p className="text-3xl font-bold mt-4">23</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>10% increase since July</span>
            </div>
          </div>

          {/* What Organizers Say About You */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">What Organizers Say About You</h3>
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
          {/* Spendings for August */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Spendings for August</h3>
            <p className="text-3xl font-bold mt-4">$ 24,205.00</p>
          </div>
        </div>
      </div>
    );
  };

 
  const CompanyVendorView = () => {
    return (
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-4">1,020</p>
          </div>

          {/* Revenue for August */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Revenue for August</h3>
            <p className="text-3xl font-bold mt-4">$ 124,205.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12.6% increase since July</span>
            </div>
          </div>

          {/* What Organizers Say About You */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">What Organizers Say About You</h3>
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
            <p className="text-3xl font-bold mt-4">$ 298,349.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>15% increase since 2023</span>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const SoloVendorView = () => {
    return (
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-4">1,020</p>
          </div>

          {/* Revenue for August */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">Revenue for August</h3>
            <p className="text-3xl font-bold mt-4">$ 124,205.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12.6% increase since July</span>
            </div>
          </div>

          {/* What Organizers Say About You */}
          <div className={cardClass}>
            <h3 className="text-sm font-medium text-gray-500">What Organizers Say About You</h3>
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
            <p className="text-3xl font-bold mt-4">$ 298,349.00</p>
            <div className="flex items-center mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>15% increase since 2023</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <div className="flex items-center space-x-2 text-gray-600">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
          </svg>
          Activity Overview
        </div>
        <span>|</span>
        {(activePOV === "customer") && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
            </svg>
            My Events
          </div>
        )}
        {(activePOV === "companyVendor" || activePOV === "soloVendor") && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
            My Services
          </div>
        )}
      </div>
    </div>
  );

  // Main render function that determines which POV to show
  return (
    <div className="container mx-auto px-4 py-6">
      {renderPOVSelector()}
      {renderHeader()}
      
      {activePOV === "organizer" && <OrganizerView />}
      {activePOV === "customer" && <CustomerView />}
      {activePOV === "companyVendor" && <CompanyVendorView />}
      {activePOV === "soloVendor" && <SoloVendorView />}
    </div>
  );
};

export default Dashboard