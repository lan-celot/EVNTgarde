import { EventData } from "../../../../functions/types";

interface PreviewStepProps {
  eventData: EventData;
  eventTypes: { event_type_id: number; event_type_name: string }[];
}

export function PreviewStep({ eventData, eventTypes }: PreviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Name</h4>
          <p className="text-base font-medium">{eventData.name}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Type</h4>
          <p className="text-base">
            {eventTypes.find(type => type.event_type_id === eventData.event_type_id)?.event_type_name || "Unknown"}
          </p>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm text-gray-500 mb-2">Overview</h4>
          <p className="text-base">{eventData.overview}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Date</h4>
          <p className="text-base">
            {new Date(eventData.startDate).toLocaleDateString()} to{" "}
            {new Date(eventData.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Time</h4>
          <p className="text-base">
            {eventData.startTime} to {eventData.endTime}
          </p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Guests</h4>
          <p className="text-base">{eventData.numberOfGuests}</p>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Attire</h4>
          <p className="text-base">{eventData.attire}</p>
        </div>
        <div className="col-span-2">
          <h4 className="text-sm text-gray-500 mb-2">Location</h4>
          <p className="text-base">{eventData.location}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-gray-500 mb-3">Services</h4>
        <div className="space-y-2">
          {eventData.services.map((service, index) => (
            <div key={index} className="text-base bg-gray-50 p-3 rounded-lg">
              {service}
            </div>
          ))}
          {eventData.customServices.map((service, index) => (
            <div key={`custom-${index}`} className="text-base bg-gray-50 p-3 rounded-lg">
              {service}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <h4 className="text-base font-medium text-[#3061AD]">Total Budget</h4>
        <p className="text-lg font-semibold text-[#3061AD]">{eventData.budget}</p>
      </div>
    </div>
  );
}