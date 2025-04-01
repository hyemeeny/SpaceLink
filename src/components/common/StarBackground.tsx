"use client";

import { useEffect, useState } from "react";
import { count, MAX_STAR_COUNT, colors } from "@/constants/constants";
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}
interface ShootingStar {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  color: string;
  size: string;
  transform: string;
}

const StarBackground = () => {
  const starCount = count < MAX_STAR_COUNT ? count : MAX_STAR_COUNT;
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [starLength, setStarLength] = useState(500);

  useEffect(() => {
    const updateStarLength = () => {
      setStarLength(window.innerWidth < 768 ? 200 : 500);
    };

    updateStarLength();
    window.addEventListener("resize", updateStarLength);
    return () => {
      window.removeEventListener("resize", updateStarLength);
    };
  }, []);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return Array.from({ length: starLength }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 1,
      }));
    };
    setStars(generateStars());

    const generateShootingStars = (): ShootingStar[] => {
      return Array.from({ length: starCount }).map((_, i) => {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const leftStart = Math.random() * 100;
        const topStart = Math.random() * 50;
        const isLeftToRight = leftStart < 50;

        return {
          id: i,
          left: `${leftStart}vw`,
          top: `${topStart}vh`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
          color: colors[colorIndex],
          size: `${2 + Math.floor(Math.random() * 5)}px`,
          transform: `rotate(${isLeftToRight ? 30 : -30}deg)`,
        };
      });
    };
    setShootingStars(generateShootingStars());
  }, [starLength, starCount]);

  return (
    <div className="fixed top-0 left-0 w-full h-full gradient-background overflow-hidden -z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}vh`,
            left: `${star.x}vw`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {shootingStars.map((shootingStar) => (
        <div
          key={shootingStar.id}
          className="absolute star"
          style={{
            left: shootingStar.left,
            top: shootingStar.top,
            animationDelay: shootingStar.animationDelay,
            animationDuration: shootingStar.animationDuration,
            width: shootingStar.size,
            height: shootingStar.size,
            backgroundColor: shootingStar.color,
            transform: shootingStar.transform,
            boxShadow: `0px 0px 10px 3px ${shootingStar.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
