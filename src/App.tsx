import React from "react";
import AccountPassword from "./Major Pages/Accounts Page/AccountPassword";
import RegistrationLogin from "./RegistrationLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Major Pages/Organize/VendorsPOV/Dashboard';
import Bookings from './Major Pages/Organize/VendorsPOV/Bookings';
import Favorites from './Major Pages/Organize/VendorsPOV/Favorites';
import Packages from './Major Pages/Organize/VendorsPOV/Packages';
import Settings from './Major Pages/Organize/VendorsPOV/Settings';
import Help from './Major Pages/Organize/VendorsPOV/Help';

const App: React.FC = () => {
	return <RegistrationLogin />;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/bookings" element={<Bookings />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/packages" element={<Packages />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/help" element={<Help />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;