// contexts/ThemeProvider.jsx (Đã sửa lỗi)

import React, { useState, useEffect } from "react";

import { ThemeContext } from "./ThemeContext.ts";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Khởi tạo với theme mặc định để tránh null state
  const [theme, setTheme] = useState(() => {
    // Chỉ trong môi trường browser
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "light"; // fallback cho SSR
  });

  // Effect để đồng bộ theme với DOM khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const finalTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    if (theme !== finalTheme) {
      setTheme(finalTheme);
    }
  }, []);

  // Effect để cập nhật DOM và localStorage khi theme thay đổi
  useEffect(() => {
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

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
