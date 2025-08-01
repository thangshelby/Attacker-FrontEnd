import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.js";

export const useTheme = () => useContext(ThemeContext);
