"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalCount: number;
}

const Pagination2 = ({ totalCount }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 페이지, 페이지 사이즈, 검색 쿼리값 가져오기
  const currentPage = Number(searchParams.get("page")) || 1; // 현재 페이지
  const pageSize = Number(searchParams.get("pageSize")) || 9; // 기본 페이지 사이즈는 12
  const searchQuery = searchParams.get("search") || "";

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    // URL을 업데이트하며 pageSize와 searchQuery는 그대로 유지
    router.push(`?page=${page}&pageSize=${pageSize}${searchQuery ? `&search=${searchQuery}` : ""}`);
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className="flex gap-2 mt-4 justify-center">
      {/* First Page Button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded ${currentPage === page ? "bg-gray-300" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Next
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination2;
