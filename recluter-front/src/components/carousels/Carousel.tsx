import React, { useState } from 'react'
import { Grid } from 'antd';
import { motion } from "framer-motion";
import IconRight from '../../assets/icons/arrow_right.svg';
import IconLeft from '../../assets/icons/arrow_left.svg';
import ReviewCard from '../pages/myPortal/CardProfile';

const { useBreakpoint } = Grid;

interface ReviewsProps {
  title?: string;
  border?: boolean;
  data_reviews: {}[];
  loading: boolean;
  text_no_data: string;
  CardComponent: any;
}

const Carousel: React.FC<ReviewsProps> = ({
  title, border = true, data_reviews = [], loading = false,
  text_no_data, CardComponent
}) => {

  const screens = useBreakpoint();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <>
      <div
        className={
          border
            ? "border border-blue3 rounded-lg mt-4 pt-[29px] pl-[62px] pb-[29px] relative"
            : "rounded-lg mt-4 pt-[29px] pl-[62px] pb-[29px] relative"
        }
        style={{ width: '100%' }}
      >

        <div style={{
          position: 'absolute', right: "0px", top: '0px', zIndex: '1', background: 'white', height: '100%',
          alignContent: 'center', paddingRight: '30px', opacity: '0.8'
        }}>
          <img src={IconRight} />
        </div>
        <div
          onClick={() => {
            if (screens.xxl) {
              if (x > -2680) {
                setX((prev) => (prev - 335));
              }
            } else if (screens.xl && x > -3350) {
              setX((prev) => (prev - 335));
            } else if (screens.md && x > -3350) {
              setX((prev) => (prev - 335));
            } else {
              // setVisibleItems(2);
            }
          }}
          style={{
            position: 'absolute', right: "0px", top: '0px', zIndex: '1', height: '100%',
            alignContent: 'center', paddingRight: '30px', cursor: 'pointer'
          }}
        >
          <img src={IconRight} />
        </div>
        <div
          onClick={() => {
            if (x != 0) {
              setX((prev) => (prev + 335));
            }
          }}
          style={{ position: 'absolute', left: "25px", top: '0px', zIndex: '1', height: '100%', alignContent: 'center', cursor: 'pointer' }}

        >
          <img src={IconLeft} />
        </div>
        {title && <h4 className="font-bold text-xl mb-6">{title}</h4>}

        <div style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '335px',
          gap: '10',
          overflowX: 'hidden'
        }}>
          {loading ? (
            <p>Cargando valoraciones...</p>
          ) : data_reviews && data_reviews.length > 0 ? (
            data_reviews.map((rating: any, index: number) => (
              <motion.div
                key={rating.id}
                className="box"
                animate={{ x, y, rotate }}
                transition={{ type: "spring" }}
              >
                {/* <ReviewCard {...rating} /> */}
                <CardComponent />
              </motion.div>
            ))
          ) : (
            <p>{text_no_data}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Carousel;