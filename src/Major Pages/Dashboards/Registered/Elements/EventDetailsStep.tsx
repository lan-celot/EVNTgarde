import { Calendar, Clock, Plus, Minus, ChevronDown } from "lucide-react";
import { EventData } from "../../../../functions/types";

interface EventDetailsStepProps {
  eventData: EventData;
  errors: { [key: string]: boolean | string };
  onInputChange: (field: keyof EventData, value: any) => void;
  eventTypes: { event_type_id: number; event_type_name: string }[];
  onIncrementGuests: () => void;
  onDecrementGuests: () => void;
}

export function EventDetailsStep({
  eventData,
  errors,
  onInputChange,
  eventTypes,
  onIncrementGuests,
  onDecrementGuests,
}: EventDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
        <input
          type="text"
          placeholder="e.g., Annual Business Conference 2025"
          className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg text-base`}
          value={eventData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">Event name is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Overview</label>
        <textarea
          placeholder="Provide an overview of your event"
          className={`w-full p-3 border ${errors.overview ? "border-red-500" : "border-gray-300"} rounded-lg text-base h-24`}
          value={eventData.overview}
          onChange={(e) => onInputChange("overview", e.target.value)}
        />
        {errors.overview && <p className="text-red-500 text-sm mt-1">Event overview is required</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <div className="relative">
            <input
              type="date"
              className={`w-full p-3 border ${errors.startDate ? "border-red-500" : "border-gray-300"} rounded-lg text-base pr-10`}
              value={eventData.startDate}
              onChange={(e) => onInputChange("startDate", e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <div className="relative">
            <input
              type="date"
              className={`w-full p-3 border ${errors.endDate ? "border-red-500" : "border-gray-300"} rounded-lg text-base pr-10`}
              value={eventData.endDate}
              onChange={(e) => onInputChange("endDate", e.target.value)}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
          <div className="relative">
            <input
              type="time"
              className={`w-full p-3 border ${errors.startTime ? "border-red-500" : "border-gray-300"} rounded-lg text-base pr-10`}
              value={eventData.startTime}
              onChange={(e) => onInputChange("startTime", e.target.value)}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <div className="relative">
            <input
              type="time"
              className={`w-full p-3 border ${errors.endTime ? "border-red-500" : "border-gray-300"} rounded-lg text-base pr-10`}
              value={eventData.endTime}
              onChange={(e) => onInputChange("endTime", e.target.value)}
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
          <div className="flex items-center">
            <button className="p-3 border border-gray-300 rounded-l-lg" onClick={onDecrementGuests}>
              <Minus size={18} />
            </button>
            <input
              type="text"
              className={`flex-1 p-3 border-y ${errors.numberOfGuests ? "border-red-500" : "border-gray-300"} text-base text-center`}
              value={eventData.numberOfGuests || ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value) || 0;
                onInputChange("numberOfGuests", value);
              }}
            />
            <button className="p-3 border border-gray-300 rounded-r-lg" onClick={onIncrementGuests}>
              <Plus size={18} />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
          <div className="relative">
            <select
              className={`w-full p-3 border ${errors.event_type_id ? "border-red-500" : "border-gray-300"} rounded-lg text-base appearance-none pr-10`}
              value={eventData.event_type_id}
              onChange={(e) => onInputChange("event_type_id", Number(e.target.value))}
            >
              <option value={0}>Choose Event Type</option>
              {eventTypes.map((type) => (
                <option key={type.event_type_id} value={type.event_type_id}>
                  {type.event_type_name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          {errors.event_type_id && <p className="text-red-500 text-sm mt-1">Event type is required</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Attire</label>
        <div className="relative">
          <select
            className={`w-full p-3 border ${errors.attire ? "border-red-500" : "border-gray-300"} rounded-lg text-base appearance-none pr-10`}
            value={eventData.attire}
            onChange={(e) => onInputChange("attire", e.target.value)}
          >
            <option value="">Choose Attire</option>
            <option value="Casual">Casual</option>
            <option value="Business Casual">Business Casual</option>
            <option value="Formal">Formal</option>
            <option value="Black Tie">Black Tie</option>
            <option value="White Tie">White Tie</option>
            <option value="Costume">Costume</option>
            <option value="School Uniform">School Uniform</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          placeholder="Enter event location"
          className={`w-full p-3 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-lg text-base`}
          value={eventData.location}
          onChange={(e) => onInputChange("location", e.target.value)}
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">Location is required</p>}
      </div>
    </div>
  );
}