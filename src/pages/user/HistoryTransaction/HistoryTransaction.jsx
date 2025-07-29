// src/pages/HistoryTransaction.tsx

import React, { useState, useMemo } from "react";
import "./HistoryTransaction.css";
import { historyData } from "./mockdatahistory";

const getStatusClass = (status) => {
  switch (status) {
    case "Thành công":
      return "success";
    case "Thất bại":
      return "failed";
    case "Đang xử lý":
      return "pending";
    default:
      return "";
  }
};

const HistoryTransaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = historyData.map(item => item.date.split('/')[2]);
    return [...new Set(years)].sort();
  }, []);

  // Filter data based on selected month, year and status
  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const [day, month, year] = item.date.split('/');
      const matchMonth = selectedMonth === "" || month === selectedMonth;
      const matchYear = selectedYear === "" || year === selectedYear;
      const matchStatus = selectedStatus === "" || item.status === selectedStatus;
      return matchMonth && matchYear && matchStatus;
    });
  }, [selectedMonth, selectedYear, selectedStatus]);

  // Calculate pagination for filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    handleFilterChange();
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    handleFilterChange();
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    handleFilterChange();
  };

  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLoan(null);
  };

  return (
    <>
      {/* Modal for loan details */}
      {showModal && selectedLoan && (
        <div className="fixed inset-0 bg-neutral-800/10 backdrop-blur-none flex items-center justify-center pr-8" style={{ zIndex: 9999 }}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Chi tiết khoản vay
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Người lập hồ sơ
                  </label>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedLoan.applicant || "Nguyễn Văn A"}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Ngày lập hồ sơ
                  </label>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedLoan.date}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Số tiền vay
                  </label>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {selectedLoan.amount} VNĐ
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Ngày duyệt
                  </label>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedLoan.approvedDate}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Tình trạng vay
                  </label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedLoan.status === 'Thành công' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                      : selectedLoan.status === 'Thất bại'
                      ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                  }`}>
                    {selectedLoan.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Số kỳ
                  </label>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedLoan.totalInstallments || "12"} kỳ
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Số kỳ đã đóng
                  </label>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {selectedLoan.paidInstallments || "3"} kỳ
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Ngày đóng tiếp theo
                  </label>
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    {selectedLoan.nextPaymentDate || "15/3/2025"}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Ngày đáo hạn
                  </label>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {selectedLoan.dueDate || "15/1/2026"}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Tiền nợ còn lại
                  </label>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {selectedLoan.remainingAmount || "27.000.000"} VNĐ
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="history-container">
        <h2 className="history-title">My History Transaction</h2>

        <div className="history-table-wrapper">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="month-filter">Lọc theo tháng:</label>
              <select 
                id="month-filter"
                value={selectedMonth} 
                onChange={handleMonthChange}
                className="filter-select"
              >
                <option value="">Tất cả tháng</option>
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                <option value="4">Tháng 4</option>
                <option value="5">Tháng 5</option>
                <option value="6">Tháng 6</option>
                <option value="7">Tháng 7</option>
                <option value="8">Tháng 8</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="year-filter">Lọc theo năm:</label>
              <select 
                id="year-filter"
                value={selectedYear} 
                onChange={handleYearChange}
                className="filter-select"
              >
                <option value="">Tất cả năm</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>Năm {year}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="status-filter">Lọc theo tình trạng:</label>
              <select 
                id="status-filter"
                value={selectedStatus} 
                onChange={handleStatusChange}
                className="filter-select"
              >
                <option value="">Tất cả tình trạng</option>
                <option value="Thành công">Thành công</option>
                <option value="Thất bại">Thất bại</option>
                <option value="Đang xử lý">Đang xử lý</option>
              </select>
            </div>
          </div>

          <table className="history-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày lập hồ sơ</th>
                <th>Thời gian lập hồ sơ</th>
                <th>Số tiền vay</th>
                <th>Ngày duyệt</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr 
                  key={`${row.stt}-${index}`}
                  onClick={() => handleRowClick(row)}
                  className="cursor-pointer"
                >
                  <td>{startIndex + index + 1}</td>
                  <td>{row.date}</td>
                  <td>{row.time || "09:30"}</td>
                  <td>{row.amount}</td>
                  <td>{row.approvedDate}</td>
                  <td>
                    <span className={`status-tag ${getStatusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ←
              </button>
              <div className="pagination-info">
                Showing{" "}
                {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} items
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTransaction;

