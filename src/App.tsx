import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import HomePage from "./Major Pages/Dashboards/Unregistered/homepage"; // Non-registered home
import LoginPage from "./Major Pages/Login Page/Elements/IndividualVendorLoginPage (Light Mode)"; // Login page
import Dashboard from "./Major Pages/Dashboards/Registered/Main Page/page"; // Registered user homepage
import Bookings from "./Major Pages/Organize/VendorsPOV/Bookings";
import Favorites from "./Major Pages/Organize/VendorsPOV/Favorites";
import Packages from "./Major Pages/Organize/VendorsPOV/Packages";
import Settings from "./Major Pages/Organize/VendorsPOV/Settings";
import Help from "./Major Pages/Organize/VendorsPOV/Help";

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = () => {
		setIsAuthenticated(true);
	};

	return (
		<Router>
			<Routes>
				{/* Public routes */}
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
			</Routes>
		</Router>
	);
};

export default App;
