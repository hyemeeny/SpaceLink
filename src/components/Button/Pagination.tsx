import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalCount, currentPage, pageSize, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const navigateToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const buttonStyle =
    "text-xl min-w-[35px] min-h-[35px] md:size-[40px] rounded-full transition-transform duration-200 active:scale-90 flex items-center justify-center";
  const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex gap-2 md:gap-3 mt-8 md:mt-12 items-center justify-center">
      {/* 첫 페이지 */}
      <button
        onClick={() => navigateToPage(1)}
        className={`${buttonStyle} ${currentPage === 1 ? disabledStyle : ""}`}
        aria-label="첫 페이지"
        aria-disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft className="size-6 md:size-8" />
      </button>

      {/* 이전 페이지 */}
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        className={`${buttonStyle} ${currentPage === 1 ? disabledStyle : ""}`}
        aria-label="이전 페이지"
        aria-disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft className="size-6 md:size-8" />
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => navigateToPage(page)}
          className={`${buttonStyle} ${currentPage === page ? "bg-purple01" : "border"}`}
          aria-label={`${page} 페이지`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => navigateToPage(currentPage + 1)}
        className={`${buttonStyle} ${currentPage === totalPages ? disabledStyle : ""}`}
        aria-label="다음 페이지"
        aria-disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight className="size-6 md:size-8" />
      </button>

      {/* 마지막 페이지 */}
      <button
        onClick={() => navigateToPage(totalPages)}
        className={`${buttonStyle} ${currentPage === totalPages ? disabledStyle : ""}`}
        aria-label="마지막 페이지"
        aria-disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight className="size-6 md:size-8" />
      </button>
    </div>
  );
};

export default Pagination;
