import React from "react";

/**
 * Component Bảng có thể tái sử dụng, responsive và hỗ trợ dark mode.
 * @param {Array<Object>} columns - Cấu hình các cột. Mỗi object chứa:
 *   - header: (string) Tiêu đề của cột.
 *   - accessor: (string) Key để truy cập dữ liệu trong mỗi hàng.
 *   - render: (function, optional) Hàm tùy chỉnh cách hiển thị cell. Nhận vào nguyên object của hàng.
 * @param {Array<Object>} data - Mảng dữ liệu để hiển thị trong bảng.
 */
const ReusableTable = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
        Không có dữ liệu để hiển thị.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ================================================================== */}
      {/* Dạng Bảng cho màn hình lớn (từ md trở lên)                      */}
      {/* ================================================================== */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 shadow-sm md:block dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-600/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {/* Nếu có hàm render thì dùng, không thì lấy dữ liệu từ accessor */}
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {row[col.accessor]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================================================================== */}
      {/* Dạng Card cho màn hình nhỏ (dưới md)                           */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="space-y-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
          >
            {columns.map((col) => (
              <div
                key={col.accessor}
                className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-none dark:border-gray-700"
              >
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {col.header}
                </div>
                {/* Dùng lại logic render của bảng lớn */}
                <div className="text-right">
                  {col.render ? (
                    col.render(row)
                  ) : (
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {row[col.accessor]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableTable;
