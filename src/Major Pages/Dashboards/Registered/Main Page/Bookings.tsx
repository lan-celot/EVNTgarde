import BookingDetails from "../Elements/ForBookings/BookingDetails";
import { useState } from "react";
import { User, MapPin } from "lucide-react";

const Bookings: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<
    "bookings" | "details"
  >("bookings");
  const [activeStatus, setActiveStatus] = useState<
    "Pending" | "Upcoming" | "Past"
  >("Pending");

  const handleSwitch = (component: "bookings" | "details") => {
    setCurrentComponent(component);
  };

  const handleStatusChange = (status: "Pending" | "Upcoming" | "Past") => {
    setActiveStatus(status);
  };

  const bookingsData = [
    {
      id: 1,
      date: "Apr 3",  
      day: "Wednesday",
      title: "Super Duper Long Event Placeholder",
      startTime: "5:30 PM",
      endTime: "10:00 PM",
      customer: "Customer Name",
      location: "Location Name",
      guests: "1,234 Guests",
      status: "Pending",
    },
    {
      id: 2,
      date: "Apr 4",  
      day: "Thursday",
      title: "Super Duper Long Event Placeholder",
      startTime: "5:30 PM",
      endTime: "10:00 PM",
      customer: "Customer Name",
      location: "Location Name",
      guests: "1,234 Guests",
      status: "Upcoming",
    },
    {
      id: 3,
      date: "Apr 1",  
      day: "Monday",
      title: "Super Duper Long Event Placeholder",
      startTime: "5:30 PM",
      endTime: "10:00 PM",
      customer: "Customer Name",
      location: "Location Name",
      guests: "1,234 Guests",
      status: "Past",
    },
    {
      id: 4,
      date: "Apr 5",  
      day: "Friday",
      title: "Another Event Placeholder",
      startTime: "3:00 PM",
      endTime: "8:00 PM",
      customer: "Another Customer",
      location: "Another Location",
      guests: "567 Guests",
      status: "Pending",
    },
    {
      id: 5,
      date: "Apr 6",  
      day: "Saturday",
      title: "Yet Another Event Placeholder",
      startTime: "6:00 PM",
      endTime: "11:00 PM",
      customer: "Yet Another Customer",
      location: "Yet Another Location",
      guests: "890 Guests",
      status: "Pending",
    },
    {
      id: 6,
      date: "Apr 7",  
      day: "Sunday",
      title: "Upcoming Event Placeholder",
      startTime: "2:00 PM",
      endTime: "7:00 PM",
      customer: "Upcoming Customer",
      location: "Upcoming Location",
      guests: "456 Guests",
      status: "Upcoming",
    },
    {
      id: 7,
      date: "Apr 8",  
      day: "Monday",
      title: "Next Event Placeholder",
      startTime: "4:00 PM",
      endTime: "9:00 PM",
      customer: "Next Customer",
      location: "Next Location",
      guests: "789 Guests",
      status: "Upcoming",
    },
    {
      id: 8,
      date: "Apr 2",  
      day: "Tuesday",
      title: "Past Event Placeholder",
      startTime: "1:00 PM",
      endTime: "6:00 PM",
      customer: "Past Customer",
      location: "Past Location",
      guests: "345 Guests",
      status: "Past",
    },
    {
      id: 9,
      date: "Mar 31",  
      day: "Sunday",
      title: "Previous Event Placeholder",
      startTime: "7:00 PM",
      endTime: "11:00 PM",
      customer: "Previous Customer",
      location: "Previous Location",
      guests: "678 Guests",
      status: "Past",
    },
  ];

  // Filter bookings based on active status
  let displayedBookings = bookingsData.filter(booking => booking.status === activeStatus);


  if (activeStatus === "Upcoming") {
    // For Upcoming, show in chronological order
    displayedBookings = [...displayedBookings].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  } else if (activeStatus === "Past") {
    // For Past, show most recent first
    displayedBookings = [...displayedBookings].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  return (
    <div style={{ marginLeft: "16rem" }}>
      <div className="mb-4">
        <button
          onClick={() => handleSwitch("bookings")}
          className="bg-blue-500 text-white p-2 rounded mr-4"
        >
          Bookings
        </button>
        <button
          onClick={() => handleSwitch("details")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Details
        </button>
      </div>

      {currentComponent === "bookings" && (
        <div>
          <h3 className="text-4xl font-bold ml-6 mt-4 text-[#2D2C3C]">
            Bookings
          </h3>
          {/* Status buttons */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {["Pending", "Upcoming", "Past"].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    handleStatusChange(status as "Pending" | "Upcoming" | "Past")
                  }
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeStatus === status
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-[12.95rem] w-0.5 bg-gray-600"
              style={{
                top: "2rem",
                bottom: "0",
                height: `calc(100% - ${displayedBookings.length * 0}rem)`,
              }}
            ></div>
            {displayedBookings.map((booking) => (
              <div key={booking.id} className="flex mb-12 relative">
                {/* Date and Day Section */}
                <div className="w-32 text-center mr-4 relative">
                  <div className="font-bold">{booking.date}</div>
                  <div className="text-gray-500 text-sm">{booking.day}</div>

                  {/* Timeline Circle */}
                  <div className="absolute left-[13rem] top-[calc(50%-2.3rem)] transform -translate-y-1/2 -translate-x-1/2">
                    <div className="w-4.5 h-4.5 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                {/* Event details */}
                <div className="flex-1 border-transparent rounded-lg p-6 shadow-sm bg-white ml-25">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {booking.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {booking.startTime} – {booking.endTime}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="text-gray-400 mr-2" size={18} />
                      <span className="text-gray-600">{booking.customer}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-gray-400 mr-2" size={18} />
                      <span className="text-gray-600">{booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentComponent === "details" && <BookingDetails />}
    </div>
  );
};

export default Bookings;