import React from 'react';
import Star from '../../assets/icons/Star.svg';
import FilledStar from '../../assets/icons/FilledStar.svg';

const Rating = ({
  totalStars = 5,
  filledStars = 0,
  filledStarClass = "filled-star",
  emptyStarClass = "empty-star",
  filledStarStyle = {},
  emptyStarStyle = {},
  filledStarSize = { width: '21px', height: '21px', marginTop: '2px', marginRight: '2px' },
  emptyStarSize = { width: '27px', height: '27px', marginLeft: '-2px' },
  showRatingValue = true // Nueva prop para mostrar o esconder el contador
}) => {
  const roundedFilledStars = Math.floor(filledStars);

  const starsArray = Array(totalStars).fill(0).map((_, index) => (
    <img
      key={index}
      src={index < roundedFilledStars ? FilledStar : Star}
      alt={index < roundedFilledStars ? "Filled Star" : "Empty Star"}
      className={index < roundedFilledStars ? filledStarClass : emptyStarClass}
      style={index < roundedFilledStars ? { ...filledStarStyle, ...filledStarSize } : { ...emptyStarStyle, ...emptyStarSize }}
    />
  ));

  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center' }}>
      {starsArray}
      {showRatingValue && (
        <span className="rating-value" style={{ marginLeft: '8px' }}>
          {filledStars ?parseFloat(filledStars.toString()).toFixed(1) :0}
          {/* {filledStars} */}
        </span>
      )}
    </div>
  );
};

export default Rating;
