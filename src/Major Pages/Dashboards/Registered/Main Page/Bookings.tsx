import React, { useState } from "react";
import BookingLanding from "../Elements/ForBookings/BookingLanding";
import BookingDetails from "../Elements/ForBookings/BookingDetails";

const Bookings: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<"bookings" | "details">("bookings");

    return (
        <div style={{ marginLeft: "16rem" }}>
        {currentTab === "bookings" ? (
          <BookingLanding onDetailsClick={() => setCurrentTab("details")} />
        ) : (
          <BookingDetails onBackClick={() => setCurrentTab("bookings")} />
        )}
      </div>
    );
  };

export default Bookings;
