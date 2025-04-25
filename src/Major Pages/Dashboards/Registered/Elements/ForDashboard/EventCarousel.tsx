import React from "react";
import EventCard from "./EventCards";

const mockEvents = [
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
];

interface EventCarouselProps {
  onManage: () => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ onManage }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold cursor-pointer" onClick={onManage}>
          Event Management &gt;
        </h2>
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {mockEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            price={event.price}
            onView={() => alert(`Viewing ${event.title}`)}
          />
        ))}
      </div>

      {/* Pagination dots (static mock) */}
      <div className="flex justify-center space-x-2 pt-2">
        {[0, 1, 2].map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
