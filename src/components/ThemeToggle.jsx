import React from "react";
import { useTheme } from "../hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="cursor-pointer" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </div>
    </div>
  );
};

export default ThemeToggle;
