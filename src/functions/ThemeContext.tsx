import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type ThemeContextType = {
	isDarkMode: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme === "dark";
	});

	// Single useEffect for theme persistence and applying the class
	useEffect(() => {
		const theme = isDarkMode ? "dark" : "light";

		// Ensure only one class is applied
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(theme);

		// Save to localStorage
		localStorage.setItem("theme", theme);
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
