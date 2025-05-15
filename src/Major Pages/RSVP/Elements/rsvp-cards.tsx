import React from "react";
import { Calendar, MapPin } from "lucide-react";

export interface RSVPCardProps {
  eventName: string;
  date: string;
  location: string;
  rsvpCreated: boolean;
  onViewTracker?: () => void;
}

const RSVPCard: React.FC<RSVPCardProps> = ({
  eventName,
  date,
  location,
  rsvpCreated,
  onViewTracker,
}) => {
  const getStatusColor = (created: boolean): string => {
    return created ? "bg-green-500" : "bg-gray-400";
  };

  const getStatusText = (created: boolean): string => {
    return created ? "RSVP List: Created" : "RSVP List: Not Created";
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6 **w-full**">
      {" "}
      {/* Added w-full here */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{eventName}</h2>
      <div className="flex items-center text-gray-600 mb-1">
        <Calendar className="h-5 w-5 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-3">
        <MapPin className="h-5 w-5 mr-2" />
        <span>{location}</span>
      </div>
      <div className="flex items-center mb-3">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(rsvpCreated)}`}
        ></span>
        <span className="text-sm text-gray-700">
          {getStatusText(rsvpCreated)}
        </span>
      </div>
      <button
        onClick={onViewTracker}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        View Tracker
      </button>
    </div>
  );
};

export default RSVPCard;
