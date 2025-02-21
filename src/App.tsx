import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./Major Pages/Dashboards/Unregistered/homepage"; // Non-registered home
import LoginPage from "./Major Pages/Login Page/Elements/IndividualVendorLoginPage (Light Mode)"; // Login page
import Dashboard from "./Major Pages/Dashboards/Registered/Main Page/page"; // Registered user homepage

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = () => {
		setIsAuthenticated(true);
	};

	return (
		<Router>
			<Routes>
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
				<Route
					path="/dashboard"
					element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
