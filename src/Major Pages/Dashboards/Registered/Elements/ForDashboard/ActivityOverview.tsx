import React from "react";

const ActivityOverview: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            For Pending Approvals
          </div>
          <div className="bg-white p-4 rounded shadow">
            For revenue chuchu stuff
          </div>
          <div className="bg-white p-4 rounded shadow">
            for customer satisfaction
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            for total job request
          </div>
          <div className="bg-white p-4 rounded shadow">
            for total revenue earned
          </div>
          <div className="bg-white p-4 rounded shadow">
            for vendor satisfaction
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow md:col-span-1">
          for calendar funcs
        </div>
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          for upcoming events
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
