"use client";

import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { useRouter } from "next/navigation";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PaginationProps {
  totalCount: number;
}

const Pagination = ({ totalCount }: PaginationProps) => {
  const router = useRouter();
  const { searchParams } = useCustomSearchParams();
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 9;

  const totalPages = Math.ceil(totalCount / pageSize);

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const buttonStyle = "px-2 md:px-3 py-1 border rounded-lg transition-transform duration-200 active:scale-90";
  const buttonDisabled = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex gap-2 mt-12 justify-center">
      {/* First Page Button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`${buttonStyle} ${currentPage === 1 ? `${buttonDisabled}` : ""}`}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonStyle} ${currentPage === 1 ? `${buttonDisabled}` : ""}`}
      >
        <MdKeyboardArrowLeft />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${buttonStyle} ${currentPage === page ? "bg-gray01 text-black02" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonStyle} ${currentPage === totalPages ? `${buttonDisabled}` : ""}`}
      >
        <MdKeyboardArrowRight />
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`${buttonStyle} ${currentPage === totalPages ? `${buttonDisabled}` : ""}`}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
