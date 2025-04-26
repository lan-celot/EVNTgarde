import React, { useRef, useState } from "react";
import EventCard from "./EventCards";
import EventModal from "./EventModal";

// Mock data for events and only up to 3 for now to avoid cluttering the UI
// need to add the carousel effect for the cards first before adding more mock data
const mockEvents = [
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
];

const mockServiceInclusions = [
  { title: "Catering Service", price: "Php 88,999" },
  { title: "Photography Service", price: "Php 88,999" },
  { title: "Decoration Service", price: "Php 88,999" },
];

interface EventCarouselProps {
  onManageEvents: () => void;
  onManageServices: () => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ onManageEvents, onManageServices }) => {
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<{ title: string; price: string }>({ title: "", price: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollEvents = (direction: "left" | "right") => {
    if (eventsScrollRef.current) {
      const { scrollLeft } = eventsScrollRef.current;
      const scrollAmount = 300;

      eventsScrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollServices = (direction: "left" | "right") => {
    if (servicesScrollRef.current) {
      const { scrollLeft } = servicesScrollRef.current;
      const scrollAmount = 300;

      servicesScrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleView = (item: { title: string; price: string }) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add console logging for debugging
  console.log("Modal state:", { isOpen: isModalOpen, selectedItem });

  return (
    <div className="space-y-4 relative">
      {/* Event Management Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold cursor-pointer" onClick={onManageEvents}>
          Event Management &gt;
        </h2>
      </div>

      <div className="relative">
        {/* Left button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scrollEvents("left")}
        >
          &lt;
        </button>

        {/* Scrollable cards */}
        <div
          ref={eventsScrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ justifyContent: mockEvents.length <= 3 ? "center" : "flex-start" }}
        >
          {mockEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              price={event.price}
              onView={() => handleView(event)}
            />
          ))}
        </div>

        {/* Right button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scrollEvents("right")}
        >
          &gt;
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 pt-2">
        {[0, 1, 2].map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === 1 ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>


      {/* Service Inclusion Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold cursor-pointer" onClick={onManageServices}>
          Service Inclusion &gt;
        </h2>
      </div>

      <div className="relative">
        {/* Left button for Service Inclusion */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scrollServices("left")}
        >
          &lt;
        </button>

        {/* Scrollable cards for Service Inclusion */}
        <div
          ref={servicesScrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ justifyContent: mockServiceInclusions.length <= 3 ? "center" : "flex-start" }}
        >
          {mockServiceInclusions.map((service, index) => (
            <EventCard
              key={index}
              title={service.title}
              price={service.price}
              onView={() => handleView(service)}
            />
          ))}
        </div>

        {/* Right button for Service Inclusion */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => scrollServices("right")}
        >
          &gt;
        </button>
      </div>

      {/* Pagination dots for Service Inclusion */}
      <div className="flex justify-center space-x-2 pt-2">
        {[0, 1, 2].map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === 1 ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {/* Event Modal */}
      <EventModal 
        isOpen={isModalOpen}
        event={selectedItem}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventCarousel;