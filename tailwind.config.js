/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Ensure Tailwind's dark mode uses a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
