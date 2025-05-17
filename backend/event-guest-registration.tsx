import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  contactNumber: string;
  organization: string;
  gender: string;
}

interface EventRegistrationFormProps {
  eventId: number;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventId }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    contactNumber: '',
    organization: '',
    gender: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({
    text: '',
    type: null,
  });
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        text: 'Please enter a valid email address.',
        type: 'error',
      });
      return false;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      setMessage({
        text: 'Please enter a valid contact number.',
        type: 'error',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First validate the form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage({ text: '', type: null });

    /* try {
      const response = await axios.post('/backend/register', {
        ...formData,
        eventId,
      });

      setMessage({
        text: 'Registration successful! Please check your email and phone for the invitation.',
        type: 'success',
      });
      
      // Save the registration ID if returned
      if (response.data.data && response.data.data.registration_id) {
        setRegistrationId(response.data.data.registration_id);
      }
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        organization: '',
        gender: '',
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Handle specific error responses
      if (error.response) {
        setMessage({
          text: error.response.data.message || 'Registration failed. Please try again later.',
          type: 'error',
        });
      } else {
        setMessage({
          text: 'Unable to connect to the server. Please check your internet connection.',
          type: 'error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }*/
  }; 

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      organization: '',
      gender: '',
    });
    setMessage({ text: '', type: null });
    setRegistrationId(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Event Guest Registration Form</h1>
      <p className="mb-6 text-gray-700">
        Hey there! Please fill out the details below to register for the event.
      </p>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
          {registrationId && (
            <div className="mt-2 font-semibold">
              Your registration ID: {registrationId}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 mb-2">
            What's your full name? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g.: John Doe"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            What's your email address? <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g.: johndoe@email.com"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-gray-700 mb-2">
            What's your contact number? <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="e.g.: +63 9123456789"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organization" className="block text-gray-700 mb-2">
            Which organization are you representing? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="e.g., Company, School, Church, etc."
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="gender" className="block text-gray-700 mb-2">
            What's your gender? <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="text-gray-700 text-sm mb-6">
          <strong>Note:</strong> Once you're registered, we'll send your invitation via email and SMS. Keep an eye on your inbox and phone for updates!
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/2 p-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-1/2 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistrationForm;