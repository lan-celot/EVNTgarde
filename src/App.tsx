import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router
import Navigator from "./temp/navigator";
import ChapterOne from "./temp/chapter1";
import ChapterTwo from "./temp/chapter2";
import ChapterThree from "./temp/chapter3";
import ChapterFour from "./temp/chapter4";
import AccountPassword from "./Major Pages/Accounts Page/AccountPassword";
import HomePage from "./Major Pages/Accounts Page/homepage";
import RegistrationLogin from "./RegistrationLogin";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigator />} />
				<Route path="/chapterOne/*" element={<ChapterOne />} />
				<Route path="/chapterTwo/*" element={<ChapterTwo />} />{" "}
				<Route path="/chapterThree/*" element={<ChapterThree />} />
				<Route path="/chapterFour/*" element={<ChapterFour />} />
				<Route path="/chapterOne/accpass" element={<AccountPassword />} />
				<Route path="/chapterOne/reglog/*" element={<RegistrationLogin />} />
				<Route path="/chapterOne/homepage" element={<HomePage />} />
			</Routes>
		</Router>
	);
};

export default App;
