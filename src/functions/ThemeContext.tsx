import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	isDarkMode: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		return localStorage.getItem("theme") === "dark";
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark"); // 🟢 Add "dark" class to <html>
		} else {
			document.documentElement.classList.remove("dark"); // 🔴 Remove "dark" class from <html>
		}
		localStorage.setItem("theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	const toggleTheme = () => setIsDarkMode((prev) => !prev);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
