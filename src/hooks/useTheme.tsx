import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.ts";

export const useTheme = () => useContext(ThemeContext);
