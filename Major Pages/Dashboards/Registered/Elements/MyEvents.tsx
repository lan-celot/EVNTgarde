import React, { useState } from "react";
import Card from "./EventCards";
import EventModal from "./EventModal";
import clipboardImage from "../../../../assets/clipboard.png";

// mockEvents if there are no events
const allEvents: any[] = [];

// mockEvents if there are events
/*
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
];
*/

interface Props {
  onBack: () => void;
  onAdd: () => void;
}

const MyEvents: React.FC<Props> = ({ onAdd }) => {
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
      <div>
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-semibold">My Events</h1>
          <button
            onClick={onAdd}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            + Create Event
          </button>
        </div>
        <p className="text-gray-600">{allEvents.length} events created</p>
      </div>

      {/* Check if there are no events */}
      {allEvents.length === 0 && (
        <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center space-y-4">
          <img src={clipboardImage} alt="Clipboard" className="w-16 h-16" />
          <p className="text-gray-700 text-lg font-semibold">
            You have not created an event yet.
          </p>
        </div>
      )}

      {/* Display event cards if there are events */}
      {allEvents.length > 0 && (
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
      )}

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

export default MyEvents;
