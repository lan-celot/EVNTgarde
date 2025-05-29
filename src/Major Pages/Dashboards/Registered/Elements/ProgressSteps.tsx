import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
            currentStep >= 1 ? "bg-[#3061AD] text-white" : "border-2 border-gray-300 text-gray-500"
          }`}
        >
          {currentStep > 1 ? <Check size={18} /> : "01"}
        </div>
        <div className={`ml-3 text-sm ${currentStep === 1 ? "text-[#3061AD] font-medium" : "text-gray-500"}`}>
          Event Details
        </div>
      </div>

      <div className={`flex-1 h-1 mx-4 ${currentStep > 1 ? "bg-[#3061AD]" : "bg-gray-200"}`}></div>

      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
            currentStep >= 2 ? "bg-[#3061AD] text-white" : "border-2 border-gray-300 text-gray-500"
          }`}
        >
          {currentStep > 2 ? <Check size={18} /> : "02"}
        </div>
        <div className={`ml-3 text-sm ${currentStep === 2 ? "text-[#3061AD] font-medium" : "text-gray-500"}`}>
          Services
        </div>
      </div>

      <div className={`flex-1 h-1 mx-4 ${currentStep > 2 ? "bg-[#3061AD]" : "bg-gray-200"}`}></div>

      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-base ${
            currentStep === 3 ? "bg-[#3061AD] text-white" : "border-2 border-gray-300 text-gray-500"
          }`}
        >
          03
        </div>
        <div className={`ml-3 text-sm ${currentStep === 3 ? "text-[#3061AD] font-medium" : "text-gray-500"}`}>
          Preview
        </div>
      </div>
    </div>
  );
}