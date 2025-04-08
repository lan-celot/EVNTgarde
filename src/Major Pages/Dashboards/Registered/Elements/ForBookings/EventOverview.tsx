"use client";

import React from "react";
import { User, MapPin, Clock } from "lucide-react";

// Type for the booking structure - imported from parent component
type Booking = {
  id: number;
  date: string;
  day: string;
  title: string;
  startTime: string;
  endTime: string;
  customer: string;
  location: string;
  guests: string;
};

type BookingDetailsProps = {
  activeStatus: string;
  selectedBooking: Booking;
};

const BookingDetails: React.FC<BookingDetailsProps> = ({
  activeStatus,
  selectedBooking,
}) => {
  // Sample services
  const services = [
    { id: 1, name: "Catering Services", price: "PHP 560,000" },
    { id: 2, name: "Catering Services", price: "PHP 560,000" },
    { id: 3, name: "Catering Services", price: "PHP 560,000" },
  ];

  // Sample timeline
  const timeline = [
    { id: 1, time: "7:00 AM - 8:00 AM", activity: "Ingress" },
    { id: 2, time: "8:00 AM - 10:00 AM", activity: "Registration and Tabing" },
    { id: 3, time: "10:00 AM - 11:00 AM", activity: "Processional Lineup" },
    { id: 4, time: "11:00 AM - 12:00 PM", activity: "Processional March" },
    { id: 5, time: "12:00 PM - 12:45 PM", activity: "Opening Program" },
    { id: 6, time: "12:45 PM - 1:00 PM", activity: "Keynote Speech" },
    { id: 7, time: "1:00 PM - 3:00 PM", activity: "Awarding of Honors" },
  ];

  // Sample venue details
  const venueDetails = {
    name: "Blessed Pier Giorgio Frassati Building Auditorium",
    floor: "21st Floor, Blessed Pier Giorgio Frassati Building",
    zipCode: "101",
    street: "España Blvd, Sampaloc, Manila, Metro Manila",
    country: "Philippines",
  };

  // Convert number of guests from "1,234 Guests" to just number
  const guestsNumber = selectedBooking.guests.split(" ")[0];

  // Conditionally render content based on activeStatus
  const renderContent = () => {
    // Services tab content is the same for all statuses
    const servicesContent = (
      <div className="p-4">
        <p className="text-gray-600 mb-4">
          List of requested services by the customer
        </p>
        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-between items-center mb-4 border-b pb-4"
          >
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <User size={20} className="text-gray-500" />
              </div>
              <span>{service.name}</span>
            </div>
            <div>
              <p className="text-blue-600 font-medium">{service.price}</p>
              <p className="text-gray-500 text-sm">Included</p>
            </div>
          </div>
        ))}
      </div>
    );

    // Venue tab content
    const venueContent = (
      <div className="p-4">
        <div className="bg-gray-100 rounded-lg w-full h-48 relative mb-6">
          {/* Map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto text-red-500 mb-2" size={32} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {venueDetails.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Floor, Building</p>
              <p className="font-medium">{venueDetails.floor}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">ZIP Code</p>
              <p className="font-medium">{venueDetails.zipCode}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Street Address, District, City, Province/State
            </p>
            <p className="font-medium">{venueDetails.street}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">Country</p>
            <p className="font-medium">{venueDetails.country}</p>
          </div>
        </div>
      </div>
    );

    // Timeline tab content varies by status
    const pendingTimelineContent = (
      <div className="p-4 flex flex-col items-center justify-center h-48">
        <div className="bg-yellow-100 p-4 rounded-full mb-4">
          <Clock className="text-yellow-500" size={24} />
        </div>
        <p className="text-base text-center">
          Your proposal is still under review. Once the organizer accepts it,
          the event timeline will appear here.
        </p>
      </div>
    );

    const upcomingTimelineContent = (
      <div className="p-4 flex flex-col items-center justify-center h-48">
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <Clock className="text-blue-500" size={24} />
        </div>
        <p className="text-base text-center">
          Your proposal is now accepted! Once the organizer sets the event
          timeline, it will appear here.
        </p>
      </div>
    );

    const pastTimelineContent = (
      <div className="p-4">
        {timeline.map((item) => (
          <div key={item.id} className="flex mb-2">
            <div className="w-1/3 text-blue-600 font-medium">{item.time}</div>
            <div className="w-2/3 bg-blue-50 p-2 rounded">{item.activity}</div>
          </div>
        ))}
      </div>
    );

    // Return the appropriate timeline content based on status
    const timelineContent =
      activeStatus === "Pending"
        ? pendingTimelineContent
        : activeStatus === "Upcoming"
          ? upcomingTimelineContent
          : pastTimelineContent;

    return {
      servicesContent,
      venueContent,
      timelineContent,
    };
  };

  const { servicesContent, venueContent, timelineContent } = renderContent();

  // State for active tab
  const [activeTab, setActiveTab] = React.useState<
    "Services" | "Venue Map" | "Timeline"
  >("Services");

  return (
    <div className="bg-white h-fit w-full">
      <div className="flex flex-col gap-5 mx-4">
        {/* Event Name and Description Box */}
        <div className="border border-gray-300 rounded-md p-4 mt-5">
          <div className="mb-2">
            <h2 className="text-blue-600 font-bold text-xl">
              {selectedBooking.title}
            </h2>
            <p className="text-gray-500 text-sm">Concert</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              This is a placeholder for the description of the event, this one's
              for the boys with the booming system
            </p>
          </div>

          {/* Event Details Box */}
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs">Date</p>
              <p className="font-medium text-sm">
                {selectedBooking.date} ({selectedBooking.day})
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Organizer</p>
              <p className="font-medium text-sm">{selectedBooking.customer}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Time</p>
              <p className="font-medium text-sm">
                {selectedBooking.startTime} - {selectedBooking.endTime}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Guests</p>
              <p className="font-medium text-sm">{guestsNumber}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500 text-xs">Location</p>
              <p className="font-medium text-sm">{selectedBooking.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Box */}
        <div className="border-b border-gray-300 flex">
          {["Services", "Venue Map", "Timeline"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "Services" | "Venue Map" | "Timeline")
              }
              className={`flex-1 py-2 border-none bg-transparent cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="border border-gray-300 rounded-md mb-5">
          {activeTab === "Services" && servicesContent}
          {activeTab === "Venue Map" && venueContent}
          {activeTab === "Timeline" && timelineContent}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
