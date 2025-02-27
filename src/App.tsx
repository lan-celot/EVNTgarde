import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import HomePage from "./Major Pages/Dashboards/Unregistered/homepage"; // Non-registered home
import HomePageDark from "./Major Pages/Dashboards/Unregistered/HomePageDark"; //non-registered dark
import LoginPage from "./Major Pages/Login Page/Elements/IndividualVendorLoginPage (Light Mode)"; // Login page
import Dashboard from "./Major Pages/Dashboards/Registered/Main Page/page"; // Registered user homepage

import RoleSelection from "./Major Pages/Login Page/Elements/RoleSelection (Light Mode)";
import IndividualRegistration from "./Major Pages/Login Page/Elements/IndividualRegistration (Light Mode)";
import OrganizerRegistration from "./Major Pages/Login Page/Elements/OrganizerRegistration (Light Mode)";
import VendorRegistration from "./Major Pages/Login Page/Elements/VendorRegistration (Light Mode)";


import DashboardPOV from "./Layout/Sidebar/Dashboard/index"
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

	const login = () => {
		setIsAuthenticated(true);
	};

	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<Route path="/role-selection" element={<RoleSelection />} />
				<Route path="/register/individual" element={<IndividualRegistration />} />
				<Route path="/register/organizer" element={<OrganizerRegistration />} />
				<Route path="/register/vendor" element={<VendorRegistration />} />
				
				<Route path="/home-dark" element={<HomePageDark />} />


				<Route
					path="/"
					element={
						isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />
					}
				/>

			
				<Route
					path="/login"
					element={
						isAuthenticated ? (
							<Navigate to="/dashboard" />
						) : (
							<LoginPage login={login} />
						)
					}
				/>

		

				{/* Protected routes for authenticated users */}
				<Route
					path="/dashboard"
					element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
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
				
				{/* For debugging purpose only, need to update and add auth */}
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/organizer" element={<OrganizerPage />} />
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