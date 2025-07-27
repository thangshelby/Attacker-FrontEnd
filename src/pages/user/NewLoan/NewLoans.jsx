import React, { useState, useMemo } from "react";
import "./NewLoans.css";
import { newLoanData } from "./mocknewloandata";

const NewLoans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const itemsPerPage = 10;

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = newLoanData.map(item => item.loanDate.split('/')[2]);
    return [...new Set(years)].sort();
  }, []);

  // Filter active loans only and by date
  const filteredData = useMemo(() => {
    const today = new Date();
    return newLoanData.filter((item) => {
      const [day, month, year] = item.loanDate.split('/');
      const [dueDay, dueMonth, dueYear] = item.dueDate.split('/');
      const dueDate = new Date(dueYear, dueMonth - 1, dueDay);
      
      const isActive = dueDate > today && item.remainingAmount !== "0";
      const matchMonth = selectedMonth === "" || month === selectedMonth;
      const matchYear = selectedYear === "" || year === selectedYear;
      
      return isActive && matchMonth && matchYear;
    });
  }, [selectedMonth, selectedYear]);

  // Calculate pagination for filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    handleFilterChange();
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    handleFilterChange();
  };

  return (
    <div className="newloan-container">
      <h2 className="newloan-title">My Current Loans</h2>

      <div className="newloan-table-wrapper">
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
        </div>

        <table className="newloan-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày vay</th>
              <th>Số tiền vay</th>
              <th>Tổng số kỳ</th>
              <th>Đã trả</th>
              <th>Ngày trả tiếp theo</th>
              <th>Ngày đáo hạn</th>
              <th>Số tiền còn nợ</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={`${row.stt}-${index}`}>
                <td>{startIndex + index + 1}</td>
                <td>{row.loanDate}</td>
                <td>{row.loanAmount}</td>
                <td>{row.totalInstallments}</td>
                <td>{row.paidInstallments}</td>
                <td>{row.nextPaymentDate}</td>
                <td>{row.dueDate}</td>
                <td>{row.remainingAmount}</td>
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
  );
};

export default NewLoans;
