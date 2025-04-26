import React, { useState } from "react";
import EventCard from "./EventCards";

const mockEvents = [
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
  { title: "Corporate Event Planning", price: "Php 99,999" },
  { title: "Charity Gala", price: "Php 120,000" },
  { title: "Debut Planning", price: "Php 120,000" },
  { title: "Social Event Planning", price: "Php 88,999" },
  { title: "Corporate Event Planning", price: "Php 99,999" },
  { title: "Test", price: "Php 99,999" },
];

const mockServiceInclusions = [
  { title: "Catering Service", price: "Php 88,999" },
  { title: "Photography Service", price: "Php 88,999" },
  { title: "Decoration Service", price: "Php 88,999" },
  { title: "Lighting Service", price: "Php 88,999" },
  { title: "Venue Rental", price: "Php 88,999" },
  { title: "Entertainment Service", price: "Php 88,999" },
  { title: "Photography Service", price: "Php 88,999" },
  { title: "Decoration Service", price: "Php 88,999" },
  { title: "Test", price: "Php 88,999" },
];

interface EventCarouselProps {
  onManageEvents: () => void;
  onManageServices: () => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ onManageEvents, onManageServices }) => {
  const [eventPage, setEventPage] = useState(0);
  const [servicePage, setServicePage] = useState(0);

  const cardsPerPage = 3;

  const eventPages = Math.ceil(mockEvents.length / cardsPerPage);
  const servicePages = Math.ceil(mockServiceInclusions.length / cardsPerPage);

  const nextEvent = () => {
    if (eventPage < eventPages - 1) {
      setEventPage(eventPage + 1);
    }
  };

  const prevEvent = () => {
    if (eventPage > 0) {
      setEventPage(eventPage - 1);
    }
  };

  const nextService = () => {
    if (servicePage < servicePages - 1) {
      setServicePage(servicePage + 1);
    }
  };

  const prevService = () => {
    if (servicePage > 0) {
      setServicePage(servicePage - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Event Management Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={onManageEvents}
          >
            Event Management &gt;
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevEvent}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            &lt;
          </button>

          {mockEvents
            .slice(eventPage * cardsPerPage, (eventPage + 1) * cardsPerPage)
            .map((event, index) => (
              <div key={index} className="w-[75vw] sm:w-[300px] md:w-[340px] lg:w-[380px]">
                <EventCard
                  title={event.title}
                  price={event.price}
                  onView={() => alert(`Viewing ${event.title}`)}
                />
              </div>
          ))}

          <button
            onClick={nextEvent}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: eventPages }).map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === eventPage ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Service Inclusion Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={onManageServices}
          >
            Service Inclusion &gt;
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevService}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            &lt;
          </button>

          {mockServiceInclusions
            .slice(servicePage * cardsPerPage, (servicePage + 1) * cardsPerPage)
            .map((service, index) => (
              <div key={index} className="w-full sm:w-[300px] md:w-[340px] lg:w-[380px]">
                <EventCard
                  title={service.title}
                  price={service.price}
                  onView={() => alert(`Viewing ${service.title}`)}
                />
              </div>
          ))}

          <button
            onClick={nextService}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          {Array.from({ length: servicePages }).map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === servicePage ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;
