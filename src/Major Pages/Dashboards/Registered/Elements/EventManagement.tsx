import React, { useState } from "react";
import Card from "./EventCards";
import EventModal from "./EventModal";

const allEvents = [
  {
    title: "Wedding Planning",
    price: "Php 90,000",
    intro: "Let us handle every detail for your wedding day.",
    fullDetails:
      "We specialize in making your wedding stress-free, memorable, and beautiful...",
    included: [
      {
        section: "Planning",
        bullets: ["Timeline creation", "Theme selection", "Budget management"],
      },
    ],
  },
  {
    title: "Birthday Planning",
    price: "Php 50,000",
    intro: "Celebrate birthdays in unforgettable ways.",
    fullDetails:
      "Whether for kids, teens, or adults, we plan birthday parties tailored to your dream theme...",
    included: [
      {
        section: "Birthday Setup",
        bullets: ["Decorations", "Games", "Cake setup"],
      },
    ],
  },
  {
    title: "Social Event Planning",
    price: "Php 70,000",
    intro: "Memorable social events made simple.",
    fullDetails:
      "From intimate gatherings to grand socials, we ensure your event is remarkable...",
    included: [
      {
        section: "Social Coordination",
        bullets: ["Guest management", "Program hosting"],
      },
    ],
  },
  {
    title: "Corporate Event Planning",
    price: "Php 99,999",
    intro: "Professional and seamless corporate events.",
    fullDetails:
      "Be it seminars, launches, or year-end parties, we handle the pressure so you don’t have to...",
    included: [
      {
        section: "Corporate Services",
        bullets: ["Venue booking", "Speaker management"],
      },
    ],
  },
  {
    title: "Charity Gala Planning",
    price: "Php 120,000",
    intro: "Elegant and impactful charity galas.",
    fullDetails:
      "From donor engagement to event execution, we help you make a difference in style...",
    included: [
      {
        section: "Charity Setup",
        bullets: ["Auction management", "Guest VIP handling"],
      },
    ],
  },
  {
    title: "Debut Planning",
    price: "Php 85,000",
    intro: "A magical debut night, just for you.",
    fullDetails:
      "Celebrate your milestone with an unforgettable debut experience...",
    included: [
      {
        section: "Debut Coordination",
        bullets: ["18 Roses", "18 Candles", "18 Treasures"],
      },
    ],
  },
];

interface Props {
  onBack: () => void;
  onAdd: () => void;
}

const EventManagement: React.FC<Props> = ({ onBack, onAdd }) => {
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof allEvents)[0] | null
  >(null);

  const handleView = (event: (typeof allEvents)[0]) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-blue-600 font-medium hover:underline"
        >
          &larr; Back
        </button>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allEvents.map((event, idx) => (
          <Card
            key={idx}
            title={event.title}
            price={event.price}
            onView={() => handleView(event)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <EventModal
          title={selectedEvent.title}
          intro={selectedEvent.intro}
          fullDetails={selectedEvent.fullDetails}
          included={selectedEvent.included}
          price={selectedEvent.price}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default EventManagement;
