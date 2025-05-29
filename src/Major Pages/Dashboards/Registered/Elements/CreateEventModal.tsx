import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { EventDetailsStep } from "./EventDetailsStep";
import { ServicesStep } from "./ServicesStep";
import { PreviewStep } from "./PreviewStep";
import { ProgressSteps } from "./ProgressSteps";
import { EventData as EventDataType } from "../../../../functions/types";

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (eventData: EventDataType) => void
}

interface EventData {
  name: string
  overview: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  numberOfGuests: number
  location: string
  event_type_id: number
  attire: string
  services: string[]
  customServices: string[]
  budget: string
  files: File[]
}

interface ErrorState {
  [key: string]: boolean | string;
}

export function CreateEventModal({ isOpen, onClose, onSave }: CreateEventModalProps) {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<ErrorState>({})
  const [loading, setLoading] = useState(false)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [customService, setCustomService] = useState("")
  const [eventTypes, setEventTypes] = useState<{ event_type_id: number; event_type_name: string }[]>([])
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    overview: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    numberOfGuests: 0,
    location: "",
    event_type_id: 0,
    attire: "",
    services: [],
    customServices: [],
    budget: "",
    files: []
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Add authentication state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCustomerId(user.uid);
      } else {
        setCustomerId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/event-types")
      .then((res) => res.json())
      .then((data) => {
        setEventTypes(data);
        console.log("Fetched event types:", data);
      })
      .catch((err) => console.error("Failed to fetch event types", err));
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof EventData, value: any) => {
    setEventData({ ...eventData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const handleServiceToggle = (service: string) => {
    const updatedServices = [...eventData.services]
    const serviceIndex = updatedServices.indexOf(service)

    if (serviceIndex === -1) {
      updatedServices.push(service)
    } else {
      updatedServices.splice(serviceIndex, 1)
    }

    setEventData({
      ...eventData,
      services: updatedServices,
    })
  }

  const addCustomService = () => {
    if (customService.trim()) {
      setEventData({
        ...eventData,
        customServices: [...eventData.customServices, customService.trim()],
      })
      setCustomService("")
    }
  }

  const validateStep1 = () => {
    const newErrors: ErrorState = {}

    if (!eventData.name.trim()) newErrors.name = true
    if (!eventData.overview.trim()) newErrors.overview = true
    if (!eventData.startDate) newErrors.startDate = true
    if (!eventData.endDate) newErrors.endDate = true
    if (!eventData.startTime) newErrors.startTime = true
    if (!eventData.endTime) newErrors.endTime = true
    if (eventData.numberOfGuests <= 0) newErrors.numberOfGuests = true
    if (!eventData.attire) newErrors.attire = true
    if (!eventData.location.trim()) newErrors.location = true
    if (!eventData.event_type_id || eventData.event_type_id === 0) newErrors.event_type_id = "Please select an event type";

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: ErrorState = {}

    if (eventData.services.length === 0) {
      newErrors.services = true
    }

    if (!eventData.budget.trim()) {
      newErrors.budget = true
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validators = {
    1: validateStep1,
    2: validateStep2,
    3: () => true
  };

  const handleNext = () => {
    if (validators[step as keyof typeof validators]()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (!customerId) {
        setErrors({ auth: true, message: "You must be logged in to create an event" });
        setLoading(false);
        return;
      }

      // Validate all required fields
      const requiredFields = {
        name: "Event Name",
        overview: "Event Overview",
        startDate: "Start Date",
        endDate: "End Date",
        startTime: "Start Time",
        endTime: "End Time",
        numberOfGuests: "Number of Guests",
        event_type_id: "Event Type",
        location: "Location",
        attire: "Attire",
        budget: "Budget"
      };

      const missingFields = [];
      for (const [field, label] of Object.entries(requiredFields)) {
        const value = eventData[field as keyof EventData];
        if (!value || 
            (typeof value === 'string' && value.trim() === '')) {
          missingFields.push(label);
        }
      }

      if (missingFields.length > 0) {
        setErrors({ 
          save: true,
          message: `Please fill in all required fields: ${missingFields.join(', ')}`
        });
        setLoading(false);
        return;
      }

      // Map form data to database schema
      const selectedType = eventTypes.find(t => t.event_type_id === eventData.event_type_id);
      const eventPayload = {
        eventName: eventData.name,
        eventOverview: eventData.overview,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        guests: eventData.numberOfGuests,
        eventTypeId: eventData.event_type_id,
        location: eventData.location,
        attire: eventData.attire,
        services: eventData.services.join(", ") || null,
        budget: eventData.budget,
        files: eventData.files,
        customerId: customerId,
        organizerId: null,
        vendorId: null,
        venueId: null
      };
      console.log("Sending eventPayload:", eventPayload);

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      // Call the original onSave callback
      onSave(eventData);
      onClose();
    } catch (err) {
      setErrors({ 
        save: true,
        message: err instanceof Error ? err.message : "Failed to create event. Please try again."
      });
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  const incrementGuests = () => {
    handleInputChange("numberOfGuests", eventData.numberOfGuests + 1)
  }

  const decrementGuests = () => {
    if (eventData.numberOfGuests > 0) {
      handleInputChange("numberOfGuests", eventData.numberOfGuests - 1)
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-2xl mx-4 my-4 overflow-hidden shadow-xl transform transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#3061AD]">Create Event</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <ProgressSteps currentStep={step} />

          {/* Error Messages */}
          {errors.auth && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              You must be logged in to create an event
            </div>
          )}
          {errors.save && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errors.message || "Failed to create event. Please try again."}
            </div>
          )}

          {/* Form Content */}
          <div className="max-h-[65vh] overflow-y-auto space-y-6">
            {/* Step 1: Event Details */}
            {step === 1 && (
              <EventDetailsStep
                eventData={eventData}
                errors={errors}
                onInputChange={handleInputChange}
                eventTypes={eventTypes}
                onIncrementGuests={incrementGuests}
                onDecrementGuests={decrementGuests}
              />
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <ServicesStep
                eventData={eventData}
                errors={errors}
                onInputChange={handleInputChange}
                onServiceToggle={handleServiceToggle}
                customService={customService}
                setCustomService={setCustomService}
                onAddCustomService={addCustomService}
              />
            )}

            {/* Step 3: Preview */}
            {step === 3 && (
              <PreviewStep
                eventData={eventData}
                eventTypes={eventTypes}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            {step === 1 ? (
              <button
                className="px-6 py-3 border border-gray-300 rounded-lg text-base text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
            ) : (
              <button
                className="px-6 py-3 border border-gray-300 rounded-lg text-base text-gray-700 hover:bg-gray-50"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button 
                className="px-6 py-3 bg-[#3061AD] text-white rounded-lg hover:bg-[#2B579A] text-base" 
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button 
                className="px-6 py-3 bg-[#3061AD] text-white rounded-lg hover:bg-[#2B579A] text-base disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save & View Vendors"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}