import React from 'react';
import CreateGuestListModal from "../../../components/CreateGuestListModal";

const TestGuestListPage: React.FC = () => {
  const dummyEventId = 1; // ✅ use a real integer ID from your events table

  const handleGuestListSubmit = async (guests: any[]) => {
    try {
      const response = await fetch("http://localhost:5000/api/createGuestList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: dummyEventId, guests }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Guest list created successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Something went wrong: ${error.message || error}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Guest List Modal</h1>
      <CreateGuestListModal eventId={dummyEventId} onSubmit={handleGuestListSubmit} />
    </div>
  );
};

export default TestGuestListPage;