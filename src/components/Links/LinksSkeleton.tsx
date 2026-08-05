"use client";

import SkeletonCard from "@/ui/SkeletonCard";
import SkeletonBar from "@/ui/SkeletonBar";
import FolderAddButton from "@/components/Folders/FolderAddButton";

const LinksSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* FolderList + FolderAddButton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
        <div className="w-full overflow-hidden">
          <div className="flex flex-nowrap gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <SkeletonBar key={index} className="h-8 md:h-10 w-16 md:w-20 rounded-md md:rounded-lg" />
            ))}
          </div>
        </div>
        <FolderAddButton />
      </div>

      {/* SearchInput */}
      <SkeletonBar className="h-[43px] md:h-[54px] rounded-md" />

      {/* LinkList */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    </div>
  );
};

export default LinksSkeleton;
