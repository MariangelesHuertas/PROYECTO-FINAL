import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../myPortal/CardProfile';
import { Row, Col } from 'antd';
import IconShare from '../../../assets/icons/shareP.svg';
import "tailwindcss/tailwind.css";
import { AppDispatch, RootState } from '../../../redux/store/store';
import { GetUserRatingsByTokenReducer } from '../../../redux/actions/pages/myPortal/ratings/GetRatingPortal';
import CarouselReviews from '../../carousels/CarouselReviews';

const handleAddClick = () => {
  console.log("Add button clicked");
};

const ReviewSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_userRatingsByToken,
    rex_loading,
    rex_error
  } = useSelector(({ getRatingsPortal }: any) => getRatingsPortal);

  useEffect(() => {
    dispatch(GetUserRatingsByTokenReducer());
  }, []);

  if (rex_loading) return <div>Cargando valoraciones...</div>;
  if (rex_error) return <div>Error: {rex_error}</div>;

  return (
    <div className="pb-10">
      <h1 className="text-heading-md font-bold pb-3 flex items-center">
        Valoraciones
        <img
          src={IconShare}
          alt="Compartir"
          onClick={handleAddClick}
          className="inline-block text-sky-blue0 pl-3 cursor-pointer"
        />
      </h1>
      <Row align="top">
        <CarouselReviews
          border={true}
          data_reviews={rex_userRatingsByToken?.valoraciones_usuarios}
          loading={false}
        />
        {/* {rex_userRatingsByToken && rex_userRatingsByToken.map((rating) => (
          <Col key={rating.id} xxl={24} xs={24} sm={24} lg={9}>
            <ReviewCard rating={rating} type="user" />
          </Col>
        ))} */}
      </Row>
    </div>
  );
};

export default ReviewSection;