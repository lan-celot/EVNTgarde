import React, { useState, useEffect } from "react";

interface EventFormState {
  eventName: string;
  eventOverview: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  guests: number;
  location: string;
  eventTypeId: number | "";
  attire: string;
  services: string[];
  additionalServices: string;
  budget: string;
  files: File[];
}

const initialForm: EventFormState = {
  eventName: "",
  eventOverview: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  guests: 1,
  location: "",
  eventTypeId: "",
  attire: "",
  services: [],
  additionalServices: "",
  budget: "",
  files: [],
};

const steps = ["Event Details", "Services", "Preview"];

const EventForm = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<EventFormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventTypes, setEventTypes] = useState<{ event_type_id: number, event_type_name: string }[]>([]);

  // Get customer ID from localStorage or your auth context
  const customerId = localStorage.getItem('customerId'); // or however you store the customer ID

  useEffect(() => {
    fetch('http://localhost:5000/api/event-types')
      .then(res => res.json())
      .then(data => setEventTypes(data))
      .catch(err => console.error('Failed to fetch event types', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "guests") {
      setForm((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "eventTypeId") {
      setForm((prev) => ({ ...prev, eventTypeId: value === "" ? "" : Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm((prev) => ({ ...prev, services: options }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, files: e.target.files ? Array.from(e.target.files) : [] }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if customer is logged in
    if (!customerId) {
      setError("You must be logged in to create an event");
      setLoading(false);
      return;
    }

    // Frontend validation for numeric fields
    if (isNaN(Number(form.guests)) || isNaN(Number(form.budget))) {
      setError("Guests and budget must be numbers");
      setLoading(false);
      return;
    }

    // Validate eventTypeId
    if (!form.eventTypeId || isNaN(Number(form.eventTypeId))) {
      setError("Please select a valid event type");
      setLoading(false);
      return;
    }

    try {
      // Log form state before processing
      console.log('Form state before submission:', form);

      // Combine date and time fields
      const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
      const endDateTime = new Date(`${form.endDate}T${form.endTime}`);

      // Validate that end date/time is after start date/time
      if (endDateTime <= startDateTime) {
        setError("End date/time must be after start date/time");
        setLoading(false);
        return;
      }

      const eventData = {
        customerId: parseInt(customerId),
        eventName: form.eventName,
        eventOverview: form.eventOverview,
        startDate: form.startDate,
        endDate: form.endDate,
        startTime: form.startTime,
        endTime: form.endTime,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        guests: form.guests,
        location: form.location,
        eventTypeId: form.eventTypeId,
        attire: form.attire,
        services: form.services,
        additionalServices: form.additionalServices,
        budget: form.budget
      };

      // Log the data being sent
      console.log('Data being sent to backend:', eventData);

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const data = await response.json();
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl relative" onSubmit={handleSubmit}>
        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Create Event</h2>
        <div className="flex justify-between mb-6">
          {steps.map((label, idx) => (
            <div key={label} className={`flex-1 text-center pb-2 border-b-2 ${step === idx ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-400"}`}>{label}</div>
          ))}
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <input name="eventName" value={form.eventName} onChange={handleChange} placeholder="Event Name" className="w-full border rounded p-2" required />
            <textarea name="eventOverview" value={form.eventOverview} onChange={handleChange} placeholder="Event Overview" className="w-full border rounded p-2" required />
            <div className="flex space-x-2">
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="border rounded p-2 flex-1" required />
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="border rounded p-2 flex-1" required />
            </div>
            <div className="flex space-x-2">
              <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="border rounded p-2 flex-1" required />
              <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="border rounded p-2 flex-1" required />
            </div>
            <div className="flex items-center space-x-2">
              <span>Guests:</span>
              <input type="number" name="guests" value={form.guests} min={1} onChange={handleChange} className="border rounded p-2 w-24" required />
            </div>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Event Location" className="w-full border rounded p-2" required />
            <select name="eventTypeId" value={form.eventTypeId} onChange={handleChange} className="w-full border rounded p-2" required>
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type.event_type_id} value={type.event_type_id}>{type.event_type_name}</option>
              ))}
            </select>
            <input name="attire" value={form.attire} onChange={handleChange} placeholder="Attire" className="w-full border rounded p-2" required />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <select multiple name="services" value={form.services} onChange={handleServiceChange} className="w-full border rounded p-2">
              <option value="Educational Convention Planning">Educational Convention Planning</option>
              <option value="Birthday Planning">Birthday Planning</option>
              <option value="Wedding Planning">Wedding Planning</option>
            </select>
            <input name="additionalServices" value={form.additionalServices} onChange={handleChange} placeholder="Additional Services (optional)" className="w-full border rounded p-2" />
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="Total Event Budget" className="w-full border rounded p-2" />
            <input type="file" multiple onChange={handleFileChange} className="w-full border rounded p-2" />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Overview</h3>
              <div>{form.eventName}</div>
              <div>{form.eventOverview}</div>
              <div>
                {form.startDate} to {form.endDate}
              </div>
              <div>
                {form.startTime} to {form.endTime}
              </div>
              <div>Guests: {form.guests}</div>
              <div>Location: {form.location}</div>
              <div>Type: {eventTypes.find(type => type.event_type_id === form.eventTypeId)?.event_type_name || form.eventTypeId}</div>
              <div>Attire: {form.attire}</div>
            </div>
            <div>
              <h3 className="font-semibold">Requested Services</h3>
              <div>{form.services.join(", ")}</div>
              <div>Additional: {form.additionalServices}</div>
              <div>Budget: {form.budget}</div>
            </div>
          </div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={handleBack} disabled={loading}>
              Back
            </button>
          ) : <span />}
          {step < steps.length - 1 ? (
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleNext} disabled={loading}>
              Next
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
              {loading ? "Saving..." : "Save Draft & View Organizers"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm; 