import { useEffect, useRef } from "react";
import { useTopStore } from "@/store/useTopStore";

const TopButton = () => {
  const setIsTopVisible = useTopStore((state) => state.setIsTopVisible);
  const topRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!topRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(topRef.current);

    return () => observer.disconnect();
  }, [setIsTopVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button ref={topRef} onClick={handleScrollToTop} className="text-white md:hidden">
      맨 위로
    </button>
  );
};

export default TopButton;
