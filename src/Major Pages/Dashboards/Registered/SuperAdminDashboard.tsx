import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Menu,
  X,
  Settings,
  Sun,
  Moon
} from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '#'
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      href: '/user-management'
    },
    {
      id: 'profile-settings',
      label: 'Profile Settings',
      icon: Settings,
      href: '/event-management'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New user verification request',
      message: 'John Doe submitted business documents',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'Verification approved',
      message: 'Tech Solutions Inc. has been verified',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'System maintenance',
      message: 'Scheduled maintenance completed',
      time: '2 hours ago',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 border-b border-blue-700 fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Menu Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              
              {/* Logo */}
              <div className="flex items-center ml-4 lg:ml-0">
               <img
                src="/OrganizerLogo.png"
                alt="Organizer Logo"
                className="h-8 w-8 rounded-full"
              />
                <span className="ml-3 text-xl font-semibold text-gray-900 hidden sm:block">
                  Admin Portal
                </span>
              </div>
            </div>

            {/* Right side - Theme Toggle and Notifications only */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-blue-200 hover:text-white hover:bg-blue-700 rounded-lg transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-blue-200 hover:text-white hover:bg-blue-700 rounded-lg relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            )}
                            <div className={notification.unread ? '' : 'ml-5'}>
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-full bg-blue-600 border-r border-blue-700 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden lg:w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenuItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenuItem(item.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white border-r-2 border-blue-300'
                      : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Info at Bottom */}
          <div className="p-4 border-t border-blue-700">
            <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">SA</span>
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Super Admin</p>
                  <p className="text-xs text-blue-200 truncate">Online</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <div className="p-6">
          {/* Sample Dashboard Content */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, Super Admin</p>
          </div>

          {/* Sample Content Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="flex flex-col items-center justify-center py-32 px-8">
              <div className="text-gray-400 mb-4">
                <LayoutDashboard className="h-16 w-16" />
              </div>
              <p className="text-gray-500 text-center">
                Embedded Dashboard from Microsoft Power BI would be displayed here.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}