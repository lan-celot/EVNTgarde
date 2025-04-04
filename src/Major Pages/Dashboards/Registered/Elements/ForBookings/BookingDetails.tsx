import AttachedFiles from "./AttachedFiles";
import BudgetBreakdown from "./BudgetBreakdown";
import EventOverview from "./EventOverview";
import Status from "./Status";

const BookingDetails: React.FC = () => {
  return (
    <div className="flex flex-col w-full mx-auto">
      {/* Back Button */}
      <div className="mb-5">
        <button className="flex items-center bg-transparent border-none cursor-pointer">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <EventOverview />

        {/* Middle Column (Attached Files & Budget) */}
        <div className="flex flex-col gap-5">
          {/* Attached Files Box */}
          <AttachedFiles />

          {/* Budget Breakdown Box */}
          <BudgetBreakdown />
        </div>

        {/* Right Column (Organizer Info & Get in Touch) */}
        <Status />
      </div>
    </div>
  );
};

export default BookingDetails;
