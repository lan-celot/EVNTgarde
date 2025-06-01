import React from 'react';
import { TrendingUp, Menu, Bell, Sun } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="flex-1">
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Sun className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="pt-20 h-screen bg-gray-50">
        <div className="h-full bg-white border-l border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium mb-2">Power BI Dashboard</p>
            <p className="text-sm">Embedded Dashboard from Microsoft Power BI would be displayed here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
