import { useState } from 'react';
import { Link } from 'react-router-dom';
import evntLogo from '../../../../assets/OrganizerLogo.png';
import { Sidebar } from '../Dashboard';

const Bookings = () => {
  const [selectedTab, setSelectedTab] = useState('Customer');

  const events = [
    {
      title: "Event title that can go up to two lines",
      date: "NOV 22",
      time: "00:00 - 00:00",
      category: "Technology & Innovation",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      interested: 0
    },
    // Add more events as needed
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-16">
        {/* Navigation Bar */}
        <nav className="bg-[#3B5998] text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">EVNTgarde</Link>
              <div className="flex space-x-6">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/about" className="hover:text-gray-300">About</Link>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              </div>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="pl-8 pr-4 py-1 rounded-md text-gray-900"
              />
              <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold">EVNTgarde</h1>
            <p className="text-gray-600">Food Vendor</p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex rounded-lg bg-gray-100 p-0.5 mb-6">
            <button
              onClick={() => setSelectedTab('Customer')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'Customer' 
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setSelectedTab('Organizer')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'Organizer' 
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Organizer
            </button>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(9).fill(events[0]).map((event, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 rounded-full bg-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                  <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    {event.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">NOV</p>
                      <p className="text-2xl font-bold">22</p>
                    </div>
                    <h3 className="text-lg font-medium flex-1 ml-3">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Venue</p>
                  <p className="text-sm text-gray-600 mb-3">{event.time}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {event.interested} interested
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 