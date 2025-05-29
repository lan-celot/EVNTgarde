import type React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import HomePage from "./Major Pages/Dashboards/Unregistered/homepage"; // Non-registered home
import AboutLoggedOut from "./Major Pages/Dashboards/Unregistered/about-loggedout";
import LoginPage from "./Major Pages/Login Page/LoginPage"; // Login page

// Wrappers
import ProtectedLayout from "./functions/ProtectedRoute";
import CombinedLayout from "./Layout/combined-layout";

// consolidated role selection
import RoleSelection from "./Major Pages/Login Page/RoleSelection";

// Registration Components
import OrganizerRegistration from "./Major Pages/Login Page/OrganizerRegistration";
import IndividualRegistration from "./Major Pages/Login Page/IndividualRegistration";
import VendorRegistration from "./Major Pages/Login Page/VendorRegistration";

// Main Pages
import Dashboard from "./Major Pages/Dashboards/Registered/Dashboard";
import Bookings from "./Major Pages/Bookings/Bookings";
import RSVP from "./Major Pages/RSVP/RSVP";
import UserManagement from "./Major Pages/Dashboards/Registered/UserManagement";
import Track from "./Major Pages/Dashboards/Registered/Track";
import ProfileSettings from "./Major Pages/Dashboards/Registered/ProfileSettings";
import Reviews from "./Major Pages/Reviews/Reviews";

// Misc Pages
import OrganizerDetails from "./Major Pages/Dashboards/Registered/Elements/OrganizerDetails";

// Test Page for Create Guest List
import TestGuestListPage from "./Major Pages/RSVP/TestGuestListPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUserType = localStorage.getItem("userType");

    setIsAuthenticated(authStatus);
    setUserType(storedUserType);
  }, []);

  const login = async () => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
    setIsAuthenticated(true);
    console.log("Login called with userType:", storedUserType);
  };

  const getDashboardRoute = () => {
    const currentUserType = localStorage.getItem("userType");

    switch (currentUserType) {
      case "individual":
      case "organizer":
      case "vendor":
        return "/dashboard";
      default:
        console.log("No userType found, defaulting to /", currentUserType);
        return "/dashboard";
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={getDashboardRoute()} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={getDashboardRoute()} />
            ) : (
              <LoginPage login={login} />
            )
          }
        />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route
          path="/role-selection-dark"
          element={<Navigate to="/role-selection" />}
        />
        <Route
          path="/register/organizer"
          element={<OrganizerRegistration step={1} />}
        />
        <Route
          path="/register/organizer/step2"
          element={<OrganizerRegistration step={2} />}
        />
        <Route
          path="/register/organizer/step3"
          element={<OrganizerRegistration step={3} />}
        />
        <Route
          path="/register/individual"
          element={<IndividualRegistration step={1} />}
        />
        <Route
          path="/register/individual/step2"
          element={<IndividualRegistration step={2} />}
        />
        <Route
          path="/register/individual/step3"
          element={<IndividualRegistration step={3} />}
        />
        <Route
          path="/register/vendor"
          element={<VendorRegistration step={1} />}
        />
        <Route
          path="/register/vendor/step2"
          element={<VendorRegistration step={2} />}
        />
        <Route
          path="/register/vendor/step3"
          element={<VendorRegistration step={3} />}
        />
        <Route path="/about" element={<AboutLoggedOut />} />

        {/* ✅ Test route for Guest List Modal */}
        <Route path="/test-guestlist" element={<TestGuestListPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<CombinedLayout isLoggedIn={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/track" element={<Track />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/organizers/:id" element={<OrganizerDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;