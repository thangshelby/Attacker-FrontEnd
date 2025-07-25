// contexts/ThemeProvider.jsx (Đã sửa lỗi)

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Bắt đầu với `null` để tránh lỗi hydration mismatch
  const [theme, setTheme] = useState(null);

  // Effect đầu tiên: Chỉ chạy một lần khi component mount để lấy theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  // Effect thứ hai: Chạy mỗi khi `theme` thay đổi
  useEffect(() => {
    // Nếu theme chưa được xác định (vẫn là null), không làm gì cả
    if (theme === null) return;

    const root = document.documentElement; // Đây là thẻ <html>

    // Xóa class cũ trước khi thêm class mới để đảm bảo sạch sẽ
    root.classList.remove("light", "dark");

    // Thêm class hiện tại vào thẻ <html>
    root.classList.add(theme);

    // Lưu lựa chọn mới nhất vào localStorage
    localStorage.setItem("theme", theme);
  }, [theme]); // Phụ thuộc vào `theme`

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Tránh render children khi theme chưa được xác định ở client
  if (theme === null) {
    return null;
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
