import React, { useRef } from "react";
import EventCard from "./EventCards";

// Mock data for events and only up to 3 for now to avoid cluttering the UI
// need to add the carousel effect for the cards first before adding more data
const mockEvents = [
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
];

const mockServiceInclusions = [
  { title: "Catering Service", price: "Php 20,000" },
  { title: "Photography Service", price: "Php 15,000" },
  { title: "Decoration Service", price: "Php 12,000" },
];

interface EventCarouselProps {
  onManage: () => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ onManage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = 300;

      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Event Management Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold cursor-pointer" onClick={onManage}>
          Event Management &gt;
        </h2>
      </div>

      <div className="relative">
        {/* Left button */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 sm:hidden"
          onClick={() => scroll("left")}
        >
          &lt;
        </button>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ justifyContent: mockEvents.length <= 3 ? "center" : "flex-start" }}
        >
          {mockEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              price={event.price}
              onView={() => alert(`Viewing ${event.title}`)}
            />
          ))}
        </div>

        {/* Right button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 sm:hidden"
          onClick={() => scroll("right")}
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
        <h2 className="text-xl font-bold cursor-pointer" onClick={onManage}>
          Service Inclusion &gt;
        </h2>
      </div>

      <div className="relative">
        {/* Left button for Service Inclusion */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 sm:hidden"
          onClick={() => scroll("left")}
        >
          &lt;
        </button>

        {/* Scrollable cards for Service Inclusion */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ justifyContent: mockServiceInclusions.length <= 3 ? "center" : "flex-start" }}
        >
          {mockServiceInclusions.map((service, index) => (
            <EventCard
              key={index}
              title={service.title}
              price={service.price}
              onView={() => alert(`Viewing ${service.title}`)}
            />
          ))}
        </div>

        {/* Right button for Service Inclusion */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 sm:hidden"
          onClick={() => scroll("right")}
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
    </div>
  );
};

export default EventCarousel;
