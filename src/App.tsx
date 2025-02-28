import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./Major Pages/Dashboards/Registered/Elements/sidebar";
import HomePage from "./Major Pages/Dashboards/Unregistered/homepage"; // Non-registered home
import HomePageDark from "./Major Pages/Dashboards/Unregistered/HomePageDark"; // Non-registered dark
import LoginPage from "./Major Pages/Login Page/Elements/IndividualVendorLoginPage (Light Mode)"; // Login page
import LoginPageDark from "./Major Pages/Login Page/Elements/IndividualVendorLoginPage (Dark Mode)"; // Login page
import Dashboard from "./Major Pages/Dashboards/Registered/Main Page/page"; // Registered user homepage

import RoleSelection from "./Major Pages/Login Page/Elements/RoleSelection (Light Mode)";
import RoleSelectionDark from "./Major Pages/Login Page/Elements/RoleSelection (Dark Mode)";
import IndividualRegistration from "./Major Pages/Login Page/Elements/IndividualRegistration (Light Mode)";
import IndividualRegistrationDark from "./Major Pages/Login Page/Elements/IndividualRegistration (Dark Mode)";
import OrganizerRegistration from "./Major Pages/Login Page/Elements/OrganizerRegistration (Light Mode)";
import OrganizerRegistrationDark from "./Major Pages/Login Page/Elements/OrganizerRegistration (Dark Mode)";
import VendorRegistration from "./Major Pages/Login Page/Elements/VendorRegistration (Light Mode)";
import VendorRegistrationDark from "./Major Pages/Login Page/Elements/VendorRegistration (Dark Mode)";

import DashboardPOV from "./Layout/Sidebar/Dashboard/index";
import Bookings from "./Layout/Sidebar/Bookings/index";
import Favorites from "./Layout/Sidebar/Favorites/index";
import Packages from "./Layout/Sidebar/Packages/index";
import Settings from "./Layout/Sidebar/Settings/index";
import Help from "./Layout/Sidebar/Help/index";

import About from "./Layout/Header/About/index";
import Contact from "./Layout/Header/Contact/index";

import CustomerPage from "./Major Pages/Dashboards/Registered/Main Page/customer/page";
import OrganizerPage from "./Major Pages/Dashboards/Registered/Main Page/organizer/page";
import VendorPage from "./Major Pages/Dashboards/Registered/Main Page/vendor/page";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);


  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUserType = localStorage.getItem("userType");

    setIsAuthenticated(authStatus);
    setUserType(storedUserType);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
  };

  // Function to determine the correct route based on userType
  const getDashboardRoute = () => {
    switch (userType) {
      case "individual":
        return "/customer";
      case "organizer":
        return "/organizer";
      case "vendor":
        return "/vendor";
      default:
        return "/";
    }
  };

  return (
    <Router>
    <Sidebar logout={logout} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content Wrapper */}
        <Routes>
            {/* Public routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <HomePage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <LoginPage login={login} />} />

            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/register/individual" element={<IndividualRegistration />} />
            <Route path="/register/individual/dark" element={<IndividualRegistrationDark />} />
            <Route path="/register/organizer" element={<OrganizerRegistration />} />
            <Route path="/register/organizer/dark" element={<OrganizerRegistrationDark />} />
            <Route path="/register/vendor" element={<VendorRegistration />} />
            <Route path="/register/vendor/dark" element={<VendorRegistrationDark />} />
            <Route path="/home-dark" element={<HomePageDark />} />

            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />}
            />
            <Route
            path="/login"
            element={isAuthenticated ? <Navigate to={`/${userType}`} /> : <LoginPage login={login} />}
            />


            <Route path="/individual-vendor-login-dark" element={<LoginPageDark />} />
            <Route path="/role-selection-dark" element={<RoleSelectionDark />} />

            {/* Protected routes */}
            <Route
              path="/customer"
              element={
                isAuthenticated && userType === "individual" ? (
                  <CustomerPage logout={logout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route 
              path="/organizer" 
              element={
                isAuthenticated && userType === "organizer" ?( 
                  <OrganizerPage logout={logout}/> 
                ): ( 
                <Navigate to="/" />
                )
              } 
              />
            <Route
              path="/vendor"
              element={
                isAuthenticated && userType === "vendor" ? (
                  <VendorPage logout={logout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard /> }
            />
            <Route
              path="/bookings"
              element={isAuthenticated ? <Bookings /> : <Navigate to="/" />}
            />
            <Route
              path="/favorites"
              element={isAuthenticated ? <Favorites /> : <Navigate to="/" />}
            />
            <Route
              path="/packages"
              element={isAuthenticated ? <Packages /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
            />
            <Route
              path="/help"
              element={isAuthenticated ? <Help /> : <Navigate to="/" />}
            />

            {/* Debugging and additional pages */}
            <Route path="/customer" element={<CustomerPage logout={logout} />} />
            <Route path="/organizer" element={<OrganizerPage logout={logout}/>} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/dashboard-pov" element={<DashboardPOV />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
    </Router>
  );
};

export default App;