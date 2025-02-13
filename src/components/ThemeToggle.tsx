'use client';

import { useEffect, useState } from "react";

const ThemeToggleSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0">
      <input
        type="checkbox"
        id="theme-toggle"
        className="hidden"
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label
        htmlFor="theme-toggle"
        className="relative inline-block w-20 h-10 cursor-pointer"
      >
        {/* Background track */}
        <span className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors"></span>
        {/* Sun icon on the left */}
        <span className="absolute left-2 top-2 text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l-1.414 1.414M7.05 7.05L5.636 5.636"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
        {/* Moon icon on the right */}
        <span className="absolute right-2 top-2 text-gray-800 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        </span>
        {/* Toggle knob */}
        <span
          className={`absolute top-0 left-0 w-10 h-10 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
            darkMode ? "translate-x-10" : "translate-x-0"
          } flex items-center justify-center`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeToggleSwitch;
