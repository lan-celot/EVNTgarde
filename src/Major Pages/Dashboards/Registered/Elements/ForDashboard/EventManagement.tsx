import React, { useState } from "react";
import Card from "./EventCards";
import EventModal from "./EventModal";

const allEvents = [
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
  { title: "Corporate Event Planning", price: "Php 99,999" },
  { title: "Charity Gala", price: "Php 120,000" },
  { title: "Debut Planning", price: "Php 120,000" },
  { title: "Wedding Planning", price: "Php 88,999" },
  { title: "Birthday Planning", price: "Php 88,999" },
  { title: "Social Event Planning", price: "Php 88,999" },
  // ...add more for pagination
];

interface Props {
  onBack: () => void;
  onAdd: () => void;
}

const EventManagement: React.FC<Props> = ({ onBack, onAdd }) => {
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; price: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (event: { title: string; price: string }) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

      {/* Event details modal */}
      <EventModal 
        isOpen={isModalOpen}
        event={selectedEvent || { title: "", price: "" }}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventManagement;
