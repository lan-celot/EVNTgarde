import { X, Check } from "lucide-react";
import { EventData } from "../../../../functions/types";

interface ServicesStepProps {
  eventData: EventData;
  errors: { [key: string]: boolean | string };
  onInputChange: (field: keyof EventData, value: any) => void;
  onServiceToggle: (service: string) => void;
  customService: string;
  setCustomService: (service: string) => void;
  onAddCustomService: () => void;
}

export function ServicesStep({
  eventData,
  errors,
  onInputChange,
  onServiceToggle,
  customService,
  setCustomService,
  onAddCustomService,
}: ServicesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Required Services</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {["Catering", "Decor", "Entertainment", "Photography"].map((service) => (
            <button
              key={service}
              className={`flex items-center px-4 py-2 rounded-lg border text-base ${
                eventData.services.includes(service)
                  ? "border-[#3061AD] text-[#3061AD]"
                  : "border-gray-300 text-gray-700"
              }`}
              onClick={() => onServiceToggle(service)}
            >
              {service}
              <span className="ml-2 w-5 h-5 rounded-full border flex items-center justify-center">
                {eventData.services.includes(service) && <Check size={14} />}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Custom Services</label>
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Add custom service"
            className="flex-1 p-3 border border-gray-300 rounded-lg text-base"
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddCustomService();
              }
            }}
          />
          <button
            className="bg-gray-100 text-[#3061AD] px-4 py-3 rounded-lg hover:bg-gray-200 text-base"
            onClick={onAddCustomService}
          >
            Add Service
          </button>
        </div>

        {eventData.customServices.length > 0 && (
          <div className="space-y-2">
            {eventData.customServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-base">
                <span>{service}</span>
                <button
                  className="text-red-500"
                  onClick={() => {
                    const updatedServices = [...eventData.customServices];
                    updatedServices.splice(index, 1);
                    onInputChange("customServices", updatedServices);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
        <input
          type="text"
          placeholder="e.g., PHP 100,000"
          className={`w-full p-3 border ${errors.budget ? "border-red-500" : "border-gray-300"} rounded-lg text-base`}
          value={eventData.budget}
          onChange={(e) => onInputChange("budget", e.target.value)}
        />
        {errors.budget && <p className="text-red-500 text-sm mt-1">Budget is required</p>}
      </div>
    </div>
  );
}