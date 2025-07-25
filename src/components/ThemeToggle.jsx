import React from "react";
import { useTheme } from "../contexts/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </div>
    </div>
  );
};

export default ThemeToggle;
