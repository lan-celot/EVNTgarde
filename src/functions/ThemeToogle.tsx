import type React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

export const ThemeToggle: React.FC = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<motion.button
			onClick={toggleTheme}
			className={`p-2 rounded-full transition-all duration-300 shadow-md 
        ${
					isDarkMode
						? "bg-[#1E3A6D] text-yellow-300"
						: "bg-[#2B579A] text-white"
				}
        hover:scale-105 active:scale-95
      `}
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			whileTap={{ scale: 0.9 }}
		>
			<motion.div
				key={isDarkMode ? "moon" : "sun"}
				initial={{ rotate: 180, opacity: 0 }}
				animate={{ rotate: 0, opacity: 1 }}
				exit={{ rotate: -180, opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				{isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
			</motion.div>
		</motion.button>
	);
};
