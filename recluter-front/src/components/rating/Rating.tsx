import { Rate } from 'antd';
import React from 'react';
import { FC } from 'react';

const Rating: FC<RatingProps> = ({
  value = 0,
  max = 5,
  size = 24,
  activeColor = '#FB923C',
  inactiveColor = 'black',
  ...props
}) => {
  return (
    <div className="flex items-center mb-4"> {/* Cambié mb-10 a mb-2 */}
      <Rate
        {...props}
        value={value}
        count={max}
        style={{ fontSize: size }}
        className="custom-rate"
      />
      <style>{`
        .custom-rate .ant-rate-star {
          color: ${inactiveColor};
        }
        .custom-rate .ant-rate-star-full .ant-rate-star-second,
        .custom-rate .ant-rate-star-full .ant-rate-star-first {
          color: ${activeColor};
        }
        .custom-rate .ant-rate-star svg {
          stroke: #D37C36;
          stroke-width: 70; /* Ajusta el grosor del borde */
        }
      `}</style>
    </div>
  );
};

interface RatingProps {
  value?: number;
  max?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default Rating;
