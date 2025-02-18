import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SoloRegistrationDark from "./components/IndividualRegistration (Dark Mode)";
import SoloRegistration from "./components/IndividualRegistration (Light Mode)";
import LoginDark from "./components/IndividualVendorLoginPage (Dark Mode)";
import LoginPage from "./components/IndividualVendorLoginPage (Light Mode)";
import OrganizerDark from "./components/OrganizerLogin (Dark Mode)";
import OrganizerLogin from "./components/OrganizerLogin (Light Mode)";
import OrganizerRegistrationDark from "./components/OrganizerRegistration (Dark Mode)";
import OrganizerRegistration from "./components/OrganizerRegistration (Light Mode)";
import RoleSelectionDark from "./components/RoleSelection (Dark Mode)";
import RoleSelection from "./components/RoleSelection (Light Mode)";
import VendorRegistrationDark from "./components/VendorRegistration (Dark Mode)";
import VendorRegistration from "./components/VendorRegistration (Light Mode)";

const RegistrationLogin: React.FC = () => {
  const userType = localStorage.getItem("userType"); // "user" or "organizer"

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userType === "organizer" ? (
              <Navigate to="/organizer-login" />
            ) : (
              <Navigate to="/individualvendor-login" />
            )
          }
        />
        <Route path="/individualvendor-login" element={<LoginPage />} />
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/roleselection" element={<RoleSelection />} />
        <Route path="/roleselection-dark" element = {<RoleSelectionDark />} />
        <Route path="/individualvendor-logindark" element={<LoginDark />} />
        <Route path="/organizer-logindarK" element ={<OrganizerDark />} />
        <Route path="/individualregistration" element ={<SoloRegistration />} />
        <Route path="/individualregistrationdark" element ={<SoloRegistrationDark />} />
        <Route path="/organizerregistration" element = {<OrganizerRegistration />} />
        <Route path="/organizerregistrationdark" element = {<OrganizerRegistrationDark />} />
        <Route path= "/vendorregistration" element = {<VendorRegistration />} />
        <Route path= "/vendorregistrationdark" element = {<VendorRegistrationDark />} />
      </Routes>
    </Router>
  );
};

export default RegistrationLogin;