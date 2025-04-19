import { useEffect, useState } from "react";
import AttachedFiles from "./AttachedFiles";
import BudgetBreakdown from "./BudgetBreakdown";
import EventOverview from "./EventOverview";
import Status from "./Status";

type DetailsProps = {
  onBackClick: () => void;
  activeStatus: "Pending" | "Upcoming" | "Past" | "Rejected";
  selectedBooking: any;
};

const BookingDetails: React.FC<DetailsProps> = ({
  onBackClick,
  activeStatus,
  selectedBooking,
}) => {
  // Get user type from localStorage
  const [userRole, setUserRole] = useState<'organizer' | 'individual' | 'vendor'>('individual');

  useEffect(() => {
    // Read user type from localStorage
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === 'organizer' || storedUserType === 'individual' || storedUserType === 'vendor') {
      setUserRole(storedUserType as 'organizer' | 'individual' | 'vendor');
    }
  }, []);
  
  return (
    <div
      className="flex flex-col mx-auto font-poppins"
      style={{ width: "calc(100vw - 21rem)", marginLeft: "16rem" }}
    >
      {/* Back Button */}
      <div className="mb-5 font-poppins">
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

      <div className="grid grid-cols-1 lg:grid-cols-[45%_27%_28%] gap-5 font-poppins">
        <EventOverview
          activeStatus={activeStatus}
          selectedBooking={selectedBooking}
          userRole={userRole}
        />

        {/* Middle Column (Attached Files & Budget) */}
        <div className="bg-white h-fit w-full">
          <div className="flex flex-col gap-5 pr-5 p-5 font-poppins">
            {/* Attached Files Box */}
            <AttachedFiles />

            {/* Budget Breakdown Box */}
            <BudgetBreakdown />
          </div>
        </div>

        {/* Right Column (Organizer Info & Get in Touch) */}
        <div className="font-poppins">
          <Status
            activeStatus={activeStatus}
            selectedBooking={selectedBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
