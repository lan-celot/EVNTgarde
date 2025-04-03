import { useState } from "react";

const EventOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="w-[430px] mx-auto p-5 bg-white rounded-md shadow-md">
      {/* Event Name and Description Box */}
      <div className="border border-gray-300 rounded-md p-4">
        {/* Event Name */}
        <h2 className="text-xl font-semibold mb-2">
          Annual Tech Conference 2025
        </h2>
        {/* Event Description */}
        <p className="text-gray-700">
          A premier event bringing together industry leaders, innovators, and
          tech enthusiasts to discuss the future of technology.
        </p>
        {/* Event Details Box */}
        <div className="p-4 grid grid-cols-2 gap-2">
          {/* Date */}
          <p>
            <strong>Date:</strong> April 15, 2025
          </p>
          {/* Organizer */}
          <p>
            <strong>Organizer:</strong> Tech Global Inc.
          </p>
          {/* Time */}
          <p>
            <strong>Time:</strong> 10:00 AM - 5:00 PM
          </p>
          {/* Guests */}
          <p>
            <strong>Guests:</strong> 500+ Attendees
          </p>
          {/* Location */}
          <p className="col-span-2">
            <strong>Location:</strong> Silicon Valley Convention Center
          </p>
        </div>
      </div>

      {/* Navigation Tabs Box */}
      <div className="border-b border-gray-300 flex">
        <button
          className={`flex-1 py-2 border-none bg-transparent cursor-pointer font-semibold ${
            activeTab === "services"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={`flex-1 py-2 border-none bg-transparent cursor-pointer ${
            activeTab === "venue"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("venue")}
        >
          Venue Map
        </button>
        <button
          className={`flex-1 py-2 border-none bg-transparent cursor-pointer ${
            activeTab === "timeline"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </div>

      {/* Requested Services Box */}
      <div className="border border-gray-300 rounded-md p-4">
        {/* Requested Services Title */}
        <h3 className="text-lg font-semibold mb-2">Requested Services</h3>
        {/* List of Services */}
        <ul className="list-disc pl-5">
          <li>Audio/Visual Equipment Setup</li>
          <li>Catering Services</li>
          <li>Security Personnel</li>
        </ul>
      </div>
    </div>
  );
};

export default EventOverview;
