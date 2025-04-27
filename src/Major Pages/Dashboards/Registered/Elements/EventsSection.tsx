import React, { useState } from "react";
import EventManagement from "./EventManagement";
import EventCarousel from "./EventCarousel";

const EventSection: React.FC = () => {
  const [isManaging, setIsManaging] = useState(false);

  return isManaging ? (
    <EventManagement
      onBack={() => setIsManaging(false)}
      onAdd={() => {
        /* open your “Add Event” modal or form here */
      }}
    />
  ) : (
    <EventCarousel onManage={() => setIsManaging(true)} />
  );
};

export default EventSection;
