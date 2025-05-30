import React from 'react';
import CreateGuestListModal from "../../../components/CreateGuestListModal";

const TestGuestListPage: React.FC = () => {
  const handleGuestListSubmit = async (guests: any[]) => {
    try {
      const response = await fetch("http://localhost:5000/api/createGuestList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guests }), // 👈 removed eventId
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

  const handleCsvUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // 👈 removed eventId

    try {
      const response = await fetch("http://localhost:5000/api/uploadGuestCSV", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("CSV uploaded successfully!");
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (error: any) {
      console.error("CSV Upload Error:", error);
      alert(`Something went wrong: ${error.message || error}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Test Guest List Modal</h1>
      <CreateGuestListModal
        eventId={1}
        onSubmit={handleGuestListSubmit}
        onUploadCsv={handleCsvUpload}
      />
    </div>
  );
};

export default TestGuestListPage;
