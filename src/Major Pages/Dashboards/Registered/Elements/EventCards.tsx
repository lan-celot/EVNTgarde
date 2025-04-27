import React from "react";

interface EventCardProps {
  title: string;
  price: string;
  onView: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, price, onView }) => {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col justify-between w-[250px] flex-shrink-0">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
      </div>
      <button
        onClick={onView}
        className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
      >
        View
      </button>
    </div>
  );
};

export default EventCard;
