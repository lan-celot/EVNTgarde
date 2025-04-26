import React from "react";
import { X } from "lucide-react";

interface EventModalProps {
  isOpen: boolean;
  event: {
    title: string;
    price: string;
  };
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
  // If modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Wedding Planning content - we'll use this as a mock example
  // In a real app, you would pass this data from the parent component
  const mockContent = {
    intro: "Let us handle every detail, so you can fully savor your special day.",
    fullDetails: "At Eventify, we understand that planning a wedding can be both exciting and overwhelming. Our full Wedding Planning service is designed to take the stress out of the process, allowing you to relax and enjoy every moment leading up to and on your wedding day.",
    included: [
      {
        section: "Initial Consultation & Vision Development:",
        items: [
          "In-depth discussions to understand your vision, preferences, style, and budget.",
          "Conceptualization of the wedding theme, color palette, and overall aesthetic.",
          "Development of a detailed wedding plan and timeline."
        ]
      },
      {
        section: "Budget Management:",
        items: [
          "Creation of a realistic and detailed budget.",
          "Tracking expenses and ensuring adherence to the agreed-upon budget.",
          "Negotiation with vendors to secure the best possible rates."
        ]
      },
      {
        section: "Venue Sourcing & Management:",
        items: [
          "Scheduling and accompanying you on venue visits.",
          "Negotiating and managing venue contracts.",
          "Liaison with the venue coordinator throughout the planning process."
        ]
      }
    ]
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh] mx-4"
        style={{ border: "2px solid #3061AD" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pt-4 pr-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 pt-0">
          {/* Title with checkmark */}
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
            <span className="text-green-600 ml-2">✓</span>
          </div>

          {/* Introduction */}
          <p className="text-gray-700 mb-6">{mockContent.intro}</p>

          {/* Full Details */}
          <p className="text-gray-600 mb-8">{mockContent.fullDetails}</p>

          {/* What's included */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold">What's included:</h3>
              <span className="text-green-600 ml-2">✓</span>
            </div>

            {mockContent.included.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="font-bold mb-2">{section.section}</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-8">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold">Pricing</h3>
              <span className="text-green-600 ml-2">✓</span>
            </div>
            <p className="text-gray-700 mb-2">Full Package</p>
            <p className="text-right font-bold">
              Starts at <span className="text-blue-700">{event.price.replace("Php", "PHP")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal; 