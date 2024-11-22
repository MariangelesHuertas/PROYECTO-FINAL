import React from "react";
import { Rate } from "antd";

interface RatingStarProps {
  value: number; // Valor de la calificación
}

const RatingStar: React.FC<RatingStarProps> = ({ value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Rate
        disabled
        allowHalf
        value={value}
        count={1}
        className="text-blue3 w-[20px]"
      />
    </div>
  );
};

export default RatingStar;
