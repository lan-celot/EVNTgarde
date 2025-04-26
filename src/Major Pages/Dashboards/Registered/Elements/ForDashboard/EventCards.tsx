import React from "react";

interface EventCardProps {
  title: string;
  price: string;
  onView: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, price, onView }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow p-4 flex flex-col justify-between flex-shrink-0 w-[85vw] sm:w-[300px] md:w-[340px] lg:w-[380px] h-[250px] transform transition-transform duration-300 hover:-translate-y-2">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
      </div>
      <button
        onClick={onView}
        className="bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        View
      </button>
    </div>
  );
};

export default EventCard;
