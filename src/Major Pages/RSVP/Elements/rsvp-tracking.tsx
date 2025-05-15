import React from "react";
import PaginatedTable from "./PaginatedTable";

interface RSVPTrackingProps {
  onBackClick: () => void;
}

const RSVPTracking: React.FC<RSVPTrackingProps> = ({ onBackClick }) => {
  return (
    <div className="w-full min-h-screen flex flex-col mx-auto font-poppins p-4">
      {" "}
      {/* Added p-4 for padding and min-h-screen */}
      {/* Back Button */}
      <div className="mb-4">
        {" "}
        {/* Reduced mb-5 to mb-4 */}
        <button
          onClick={onBackClick}
          className="flex items-center bg-transparent border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-arrow-left w-4 h-4"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          <span className="ml-2">Back</span>
        </button>
      </div>
      <div className="mb-4">
        {" "}
        {/* Reduced mb-5 to mb-4 */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-3xl font-bold text-gray-800">Guests</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-lg px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded shadow">1</div>
        <div className="bg-white p-6 rounded shadow">2</div>
        <div className="bg-white p-6 rounded shadow">3</div>
        <div className="bg-white p-6 rounded shadow">4</div>
      </div>
      <div className="mt-4">
        {" "}
        {/* Added mt-4 to separate from grid */}
        <PaginatedTable />
      </div>
    </div>
  );
};

export default RSVPTracking;
