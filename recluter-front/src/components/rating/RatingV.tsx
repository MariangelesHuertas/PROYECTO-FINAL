import React from 'react';
import Star from '../../assets/icons/Star.svg';
import FilledStar from '../../assets/icons/starV.svg';

interface RatingProps {
  totalStars?: number;
  filledStars?: number;
  onChange?: (value: number) => void;
  filledStarClass?: string;
  emptyStarClass?: string;
  filledStarStyle?: React.CSSProperties;
  emptyStarStyle?: React.CSSProperties;
  filledStarSize?: { width?: string; height?: string; marginTop?: string; marginRight?: string };
  emptyStarSize?: { width?: string; height?: string; marginLeft?: string };
  showRatingValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({ 
  totalStars = 5, 
  filledStars = 0, 
  onChange,
  filledStarClass = "filled-star", 
  emptyStarClass = "empty-star", 
  filledStarStyle = {}, 
  emptyStarStyle = {}, 
  filledStarSize = { width: '32px', height: '32px'}, 
  emptyStarSize = { width: '32px', height: '32px' },
  showRatingValue = true
}) => {
  const handleStarClick = (index: number) => {
    if (onChange) {
      onChange(index + 1);
    }
  };

  const starsArray = Array(totalStars).fill(0).map((_, index) => (
    <img 
      key={index} 
      src={index < filledStars ? FilledStar : Star} 
      alt={index < filledStars ? "Filled Star" : "Empty Star"} 
      className={index < filledStars ? filledStarClass : emptyStarClass} 
      style={{
        cursor: 'pointer', // Añadimos cursor pointer
        ...(
          index < filledStars 
            ? { ...filledStarStyle, ...filledStarSize } 
            : { ...emptyStarStyle, ...emptyStarSize }
        )
      }}
      onClick={() => handleStarClick(index)} 
    />
  ));

  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center' }}>
      {showRatingValue && (
        <span className="rating-value" style={{ marginRight: '8px' }}>
          {filledStars.toFixed(1)}
        </span>
      )}
      {starsArray}
    </div>
  );
};

export default Rating;
