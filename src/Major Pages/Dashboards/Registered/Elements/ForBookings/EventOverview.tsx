import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

// Services Tab Content
const ServicesContent = ({ services = [] }) => {
  const defaultServices = [
    { name: "Catering Services", price: "Php 560,000", included: true },
    { name: "Lighting Services", price: "Php 120,000", included: true },
    { name: "Sound System", price: "Php 80,000", included: true },
  ];

  const servicesToRender = services.length > 0 ? services : defaultServices;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Requested Services
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        List of requested services by the customer
      </p>
      <ul className="space-y-3">
        {servicesToRender.map((service, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span className="text-blue-600 font-medium">{service.name}</span>
            <span className="text-gray-900 font-semibold">{service.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Venue Map Content
const VenueMapContent = ({ venue = null }) => {
  const defaultVenue = {
    name: "Blessed Pier Giorgio Frassati Building Auditorium",
    floor: "21st Floor",
    zipCode: "1011",
    address: "España Blvd., Sampaloc, Manila, Metro Manila",
    country: "Philippines",
  };

  const venueToRender = venue || defaultVenue;

  // Coordinates for the Frassati Building (replace with actual coordinates if different)
  const frassatiCoords = {
    lat: 14.6091, // Latitude for Sampaloc, Manila
    lng: 120.9898, // Longitude for Sampaloc, Manila
  };

  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Dynamically load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&callback=initMap&v=weekly`;
    script.defer = true;

    // Initialize map once the script is loaded
    script.onload = () => {
      window.initMap = () => {
        if (mapContainerRef.current) {
          const map = new window.google.maps.Map(mapContainerRef.current, {
            zoom: 16,
            center: frassatiCoords,
          });

          new window.google.maps.Marker({
            position: frassatiCoords,
            map,
            title: "Frassati Building Giorgio Frassati Sampaloc Manila",
          });
        }
      };
    };

    // Append the script to the document head
    document.head.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      const existingScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&callback=initMap&v=weekly"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="border border-gray-900 rounded-md overflow-hidden w-full max-w-4xl mx-auto">
      {/* Map Container - Interactive Google Map */}
      <div
        ref={mapContainerRef}
        style={{ height: '400px', width: '100%' }}
      ></div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{venueToRender.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-blue-600 font-medium text-sm">Floor</p>
            <p className="text-gray-700">{venueToRender.floor}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium text-sm">ZIP Code</p>
            <p className="text-gray-700">{venueToRender.zipCode}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium text-sm">Address</p>
            <p className="text-gray-700">{venueToRender.address}</p>
          </div>
          <div>
            <p className="text-blue-600 font-medium text-sm">Country</p>
            <p className="text-gray-700">{venueToRender.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline Content
const TimelineContent = ({ timeline = [], isPending = false }) => {
  const defaultTimeline = [
    { time: "7:00 AM - 8:00 AM", activity: "Ingress" },
    { time: "8:00 AM - 10:00 AM", activity: "Registration and Robing" },
    { time: "10:00 AM - 11:00 AM", activity: "Processional Lineup" },
    { time: "11:00 AM - 12:00 PM", activity: "Processional March" },
    { time: "12:00 PM - 12:45 PM", activity: "Opening Program" },
    { time: "12:45 PM - 1:00 PM", activity: "Keynote Speech" },
    { time: "1:00 PM - 3:00 PM", activity: "Awarding of Honors" },
  ];

  const timelineToRender = timeline.length > 0 ? timeline : defaultTimeline;

  return (
    <div className="border border-gray-700 rounded-md p-4 w-full max-w-4xl mx-auto">
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mb-6">
            <Clock className="h-6 w-6" />
          </div>
          <p className="text-center text-gray-700 text-lg">
            Your proposal is now accepted! Once the<br />
            organizer sets the event timeline, it will appear<br />
            here.
          </p>
        </div>
      ) : (
        <div>
          {timelineToRender.map((item, index) => (
            <div key={index} className="flex mb-4">
              {/* Time Container */}
              <div className="w-40 text-blue-600 font-bold py-2">{item.time}</div>

              {/* Lighter Gray Activity Container */}
              <div className="flex-1 bg-gray-300 rounded-md py-3 px-4 text-gray-900">
                {item.activity}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Event Details Component
const EventDetails = ({
  eventName = "PLACEHOLDER EVENT NAME",
  description = "This is a placeholder for the description of the event.",
  date = "Sep 11, 2021 (Wednesday)",
  time = "5:30PM - 10:00PM",
  location = "Location Name",
  organizer = "Organizer Name",
  guests = 1234,
  vendors = 16,
}) => {
  const [activeTab, setActiveTab] = useState("services");
  const [timelinePending, setTimelinePending] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-8 bg-gray-100">
      {/* Event Overview */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600">{eventName}</h2>
        <p className="text-gray-600 italic">Concert</p>
        <p className="text-gray-700 mt-2">{description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-800">
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Organizer:</strong> {organizer}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Guests:</strong> {guests}
          </p>
          <p className="col-span-2">
            <strong>Location:</strong> {location}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-300 w-full max-w-4xl mx-auto">
        {["services", "venue", "timeline"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 ${
              activeTab === tab
                ? "font-semibold text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "services" && <ServicesContent />}
      {activeTab === "venue" && <VenueMapContent />}
      {activeTab === "timeline" && <TimelineContent isPending={timelinePending} />}

      {/* Toggle Button for Timeline Pending Demo */}
      {activeTab === "timeline" && (
        <button
          onClick={() => setTimelinePending(!timelinePending)}
          className="self-start mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm"
        >
          Toggle Timeline Status (Demo)
        </button>
      )}
    </div>
  );
};

export default EventDetails;
