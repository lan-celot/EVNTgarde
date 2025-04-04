import { useState } from "react";

const EventOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="w-145 ml-5 p-5 bg-white rounded-md shadow-md">
      {/* Event Name and Description Box */}
      <div className="rounded-md p-4">
        <h2 className="text-xl text-gray-900 font-semibold mb-2">
          Annual Tech Conference 2025
        </h2>
        <p className="text-gray-700">
          A premier event bringing together industry leaders, innovators, and
          tech enthusiasts to discuss the future of technology.
        </p>
        <div className="p-4 text-gray-900">
          <p>
            <strong>Date:</strong> April 15, 2025
          </p>
          <p>
            <strong>Organizer:</strong> Tech Global Inc.
          </p>
          <p>
            <strong>Time:</strong> 10:00 AM - 5:00 PM
          </p>
          <p>
            <strong>Guests:</strong> 500+ Attendees
          </p>
          <p>
            <strong>Location:</strong> Silicon Valley Convention Center
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-300 flex">
        <button
          className={`flex-1 py-2 bg-transparent cursor-pointer ${
            activeTab === "services"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={`flex-1 py-2 bg-transparent cursor-pointer ${
            activeTab === "venue"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("venue")}
        >
          Venue Map
        </button>
        <button
          className={`flex-1 py-2 bg-transparent cursor-pointer ${
            activeTab === "timeline"
              ? "border-b-2 border-blue-500 text-black"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("timeline")}
        >
          Timeline
        </button>
      </div>

      {/* Tab Content */}
      <div className="rounded-md p-4 text-gray-900">
        {activeTab === "services" && (
          <>
            <h3 className="text-lg font-semibold mb-2">Requested Services</h3>
            <p className="text-sm text-gray-500 mb-2">
              List of requested services by the customer
            </p>
            <ul className="list-none p-0">
              <li className="flex justify-between items-center">
                <span>Audio/Visual Equipment Setup</span>
                <span>
                  <span className="text-blue-600">Php 5,000</span>
                  <p className="text-xs text-gray-500 ml-6">included</p>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Catering Services</span>
                <span>
                  <span className="text-blue-600">Php 10,000</span>
                  <p className="text-xs text-gray-500 ml-7">included</p>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Security Personnel</span>
                <span>
                  <span className="text-blue-600">Php 8,000</span>
                  <p className="text-xs text-gray-500 ml-6">included</p>
                </span>
              </li>
            </ul>
          </>
        )}
        {activeTab === "venue" && (
          <div className="flex justify-center">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=14.609149,120.989953&zoom=16&size=400x400&key=YOUR KEY"
              alt="Venue Map"
              className="w-full max-w-lg h-80 rounded-md"
            />
          </div>
        )}
        {activeTab === "timeline" && (
          <div className="h-40 flex items-center justify-center text-center">
            <p className="text-blue-800 text-md max-w-sm">
              The event proposal is awaiting customer's acceptance. Once they
              confirm, you can create an event timeline here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventOverview;
