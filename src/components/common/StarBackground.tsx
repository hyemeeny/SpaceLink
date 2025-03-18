"use client";

import { useEffect, useState } from "react";
import { count, MAX_STAR_COUNT, colors } from "@/constants/constants";

// 🌟 별 데이터 타입 정의
interface Star {
  id: number;
  x: number; // 뷰포트 가로 위치 (vw 단위)
  y: number; // 뷰포트 세로 위치 (vh 단위)
  size: number; // 별 크기 (px 단위)
  duration: number; // 반짝이는 애니메이션 지속 시간 (초 단위)
}

const StarBackground = () => {
  const starCount = count < MAX_STAR_COUNT ? count : MAX_STAR_COUNT;
  const [starInterval, setStarInterval] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const calcStarInterval = () => {
      let innerWidth = window.innerWidth;
      // window.innerWidth값을 별의 개수 의 배수로 나눠서 최소 간격을 지정
      // 화면 밖에서 떨어지기 시작하는 별을 위해서 innerWidth에 1.5배를 해줬다.
      setStarInterval(Math.floor((innerWidth * 1.5) / (count * 5)));
    };
    calcStarInterval();
    // resize로 innerWidth값이 변경 되었을 때 별 간격을 다시 계산하기 위한 resize 이벤트 핸들러
    window.addEventListener("resize", calcStarInterval);
    return () => {
      window.removeEventListener("resize", calcStarInterval);
    };
  }, []);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // 뷰포트 너비 퍼센트
        y: Math.random() * 100, // 뷰포트 높이 퍼센트
        size: Math.random() * 2 + 1, // 1px ~ 3px 크기
        duration: Math.random() * 3 + 1, // 1초 ~ 4초 애니메이션 지속시간
      }));
    };
    setStars(generateStars());
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full gradient-background overflow-hidden -z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}vh`,
            left: `${star.x}vw`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {new Array(starCount).fill(0).map((_, idx) => {
        const left = `${Math.random() * count * 5 * starInterval}px`;
        const animationDelay = `${Math.random() * 15}s`;
        const animationDuration = `${2 + Math.random() * 4}s`;
        const colorIndex = Math.floor(Math.random() * colors.length - 0.001); // 별 색상
        const size = `${2 + Math.floor(Math.random() * 5)}px`; // 별 크기
        const boxShadow = `0px 0px 10px 3px ${colors[colorIndex]}`;
        return (
          <div
            key={idx}
            style={{ left, animationDelay, animationDuration, boxShadow, width: size, height: size }}
            className="star"
          ></div>
        );
      })}
    </div>
  );
};

export default StarBackground;
