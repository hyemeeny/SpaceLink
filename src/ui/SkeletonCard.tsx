import clsx from "clsx";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";

interface SkeletonBarProps {
  className?: string;
}

const SkeletonBar = ({ className }: SkeletonBarProps) => (
  <div className={clsx("rounded bg-gray03/40 shimmer", className)} />
);

const ICON_CLASS = "pointer-events-none text-gray04 opacity-60";

const SkeletonCard = () => {
  return (
    <li className="mx-auto w-full rounded-2xl overflow-hidden shadow-custom bg-white/20">
      {/* 이미지 영역 */}
      <div className="relative w-full h-[192px] md:h-[200px] overflow-hidden bg-gray03/40 shimmer">
        <FaRegStar className={clsx("absolute top-4 right-4 text-2xl", ICON_CLASS)} aria-hidden="true" />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-4 h-[164px] flex flex-col justify-center gap-[10px]">
        {/* 시간 + 케밥 */}
        <div className="flex justify-between items-center">
          <SkeletonBar className="w-16 h-4" />
          <GoKebabHorizontal className={ICON_CLASS} aria-hidden="true" />
        </div>

        {/* 제목 + 설명 */}
        <div className="flex flex-col gap-2">
          <SkeletonBar className="w-3/4 h-5" />
          <SkeletonBar className="w-full h-4" />
          <SkeletonBar className="w-2/3 h-4" />
        </div>

        {/* 날짜 */}
        <SkeletonBar className="w-24 h-4" />
      </div>
    </li>
  );
};

export default SkeletonCard;
