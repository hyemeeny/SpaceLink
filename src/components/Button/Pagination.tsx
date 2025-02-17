import clsx from "clsx";
import React from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number; // 현재 페이지 상태
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 핸들러
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50",
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-100",
        )}
      >
        <MdOutlineKeyboardArrowLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={clsx(
            "px-4 py-2 border rounded-lg text-gray-600",
            page === currentPage ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-4 py-2 border rounded-lg text-gray-600 disabled:opacity-50",
          currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-gray-100",
        )}
      >
        <MdOutlineKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
