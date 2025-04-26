import React, { useState } from "react";
import EventManagement from "./EventManagement";
import ServiceInclusion from "./ServiceInclusion";
import EventCarousel from "./EventCarousel";

type ManagementView = "none" | "events" | "services";

const EventSection: React.FC = () => {
  const [view, setView] = useState<ManagementView>("none");

  if (view === "events") {
    return (
      <EventManagement
        onBack={() => setView("none")}
        onAdd={() => {
          /* open your “Add Event” modal or form here */
        }}
      />
    );
  }

  if (view === "services") {
    return (
      <ServiceInclusion
        onBack={() => setView("none")}
        onAdd={() => {
          /* open your “Add Service” modal or form here */
        }}
      />
    );
  }

  return (
    <EventCarousel
      onManageEvents={() => setView("events")}
      onManageServices={() => setView("services")}
    />
  );
};

export default EventSection;
