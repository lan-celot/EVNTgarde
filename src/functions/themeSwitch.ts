import { useEffect, useState } from "react";

export function themeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return { theme, setTheme };
}
