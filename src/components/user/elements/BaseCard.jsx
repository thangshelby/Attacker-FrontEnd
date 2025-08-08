import React from "react";

/**
 * Một BaseCard linh hoạt, hỗ trợ Dark Mode và các khu vực nội dung riêng biệt.
 *
 * @param {string} className - Prop quan trọng nhất để truyền các class layout (col-span, row-span).
 * @param {React.ReactNode} title - Nội dung cho phần header của card.
 * @param {React.ReactNode} headerActions - Các nút hoặc icon ở góc phải header.
 * @param {React.ReactNode} children - Nội dung chính của card.
 * @param {React.ReactNode} footer - Nội dung cho phần footer của card.
 * @param {string} padding - Class padding cho phần body (mặc định là 'p-6').
 */

const BaseCard = ({
  className = "",
  title,
  headerActions,
  children,
  footer,
  padding = "p-6", // Cho phép tùy chỉnh padding của body
}) => {
  return (
    // THAY ĐỔI 1: Áp dụng Dark Mode và loại bỏ prop `color` không cần thiết.
    // Class layout sẽ được truyền trực tiếp qua `className`.
    <div
      className={`flex flex-col rounded-xl border bg-white shadow-sm transition-shadow dark:border-gray-700 dark:bg-gray-800 ${className} `}
    >
      {/* THAY ĐỔI 2: Tạo khu vực Header riêng biệt */}
      {/* Header chỉ render nếu có title hoặc headerActions */}
      {(title || headerActions) && (
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          {typeof title === "string" ? (
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          ) : (
            title // Cho phép truyền cả component vào title
          )}
          <div>{headerActions}</div>
        </div>
      )}

      {/* THAY ĐỔI 3: Khu vực Body (children) có padding tùy chỉnh */}
      {children && <div className={`flex-grow ${padding}`}>{children}</div>}

      {/* THAY ĐỔI 4: Tạo khu vực Footer riêng biệt */}
      {/* Footer chỉ render nếu có prop footer */}
      {footer && (
        <div className="border-t p-4 dark:border-gray-700">{footer}</div>
      )}
    </div>
  );
};

export default BaseCard;
