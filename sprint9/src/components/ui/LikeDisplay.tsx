import React from "react";
import HeartIcon from "@/public/images/icons/ic_heart.svg";

interface LikeDisplayProps {
  count: number;
  iconWidth?: number;
  fontSize?: number;
  gap?: number;
  className?: string;
}

const LikeDisplay: React.FC<LikeDisplayProps> = ({
  count,
  iconWidth = 16,
  fontSize = 16,
  gap = 4,
  className,
}) => {
  const displayCount = count >= 10000 ? "9999+" : count.toString();

  return (
    <div className={`flex items-center text-gray-500 ${className}`} style={{ fontSize: `${fontSize}px`, gap: `${gap}px` }}>
      <HeartIcon width={iconWidth} alt="좋아요 아이콘" />
      <span>{displayCount}</span>
    </div>
  );
};

export default LikeDisplay;