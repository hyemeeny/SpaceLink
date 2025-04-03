"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
}: {
  totalCount: number;
  currentPage: number;
  pageSize: number;
}) => {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / pageSize);

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));

    return `?${params.toString()}`;
  };

  const buttonStyle =
    "text-xl min-w-[35px] min-h-[35px] md:size-[40px] rounded-full transition-transform duration-200 active:scale-90 flex items-center justify-center";
  const buttonDisabled = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex gap-2 md:gap-3 mt-8 md:mt-12 items-center justify-center">
      <Link href={getPageLink(1)} className={currentPage === 1 ? buttonDisabled : ""}>
        <MdKeyboardDoubleArrowLeft className="size-6 md:size-8" />
      </Link>

      <Link href={getPageLink(currentPage - 1)} className={currentPage === 1 ? buttonDisabled : ""}>
        <MdKeyboardArrowLeft className="size-6 md:size-8" />
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={getPageLink(page)}
          className={`${buttonStyle} ${currentPage === page ? "bg-purple01" : "border"}`}
        >
          {page}
        </Link>
      ))}

      <Link href={getPageLink(currentPage + 1)} className={currentPage === totalPages ? buttonDisabled : ""}>
        <MdKeyboardArrowRight className="size-6 md:size-8" />
      </Link>

      <Link href={getPageLink(totalPages)} className={currentPage === totalPages ? buttonDisabled : ""}>
        <MdKeyboardDoubleArrowRight className="size-6 md:size-8" />
      </Link>
    </div>
  );
};

export default Pagination;
