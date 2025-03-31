import React from "react";

const SkeletonCard = () => {
  return (
    <li className="mx-auto w-full rounded-2xl overflow-hidden shadow-custom bg-white bg-opacity-20 animate-pulse">
      <div className="w-full h-[192px] md:h-[200px] bg-gray-300"></div>

      <div className="p-4 h-[164px] flex flex-col justify-center gap-2">
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-full h-5 bg-gray-300 rounded"></div>
        <div className="w-full h-5 bg-gray-300 rounded"></div>
      </div>
    </li>
  );
};

export default SkeletonCard;
