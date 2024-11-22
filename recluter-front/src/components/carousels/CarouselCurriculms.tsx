import React, { useState } from 'react'
import { Grid } from 'antd';
import { motion } from "framer-motion";
import IconRight from '../../assets/icons/arrow_right.svg';
import IconLeft from '../../assets/icons/arrow_left.svg';
import CardCurriculum from '../cards/CardCurriculum';
import moment from 'moment';

const { useBreakpoint } = Grid;

interface ReviewsProps {
  title?: string;
  border?: boolean;
  data_curriculumns: any[];
  loading: boolean;
  onSelect: (id: number) => void;
  selectedCVId: number | null;
}

const CarouselCurriculms: React.FC<ReviewsProps> = ({
  title, 
  border = true, 
  data_curriculumns = [], 
  loading = false,
  onSelect,
  selectedCVId
}) => {
  const screens = useBreakpoint();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  const handleCurriculumSelect = (id: number) => {
    onSelect(id);
  };

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
          position: 'absolute',
          right: "0px",
          top: '0px', zIndex: '1', background: 'white', height: '100%',
          alignContent: 'center', paddingRight: '30px', opacity: '0.8'
        }}>
          <img src={IconRight} />
        </div>

        <div style={{
          position: 'absolute',
          left: "25px",
          top: '0px', zIndex: '1', background: 'white', height: '100%',
          alignContent: 'center', opacity: '0.8'
        }}>
          <img src={IconLeft} />
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
          gridAutoColumns: '260px',
          gap: '10',
          overflowX: 'hidden',
          height: "135px",
          alignContent: "center",
          paddingLeft: '5px'
        }}>
         {loading ? (
          <p>Cargando curriculums...</p>
        ) : data_curriculumns && data_curriculumns.length > 0 ? (
          data_curriculumns.map((curriculum: any) => (
            <motion.div
              key={curriculum.id}
              className="box"
              animate={{ x, y, rotate }}
              transition={{ type: "spring" }}
            >
              <CardCurriculum
                fileName={curriculum.nombre}
                jobTitle={curriculum.nombre_archivo}
                description={moment(curriculum.createdAt).format("DD/MM/YYYY H:mm")}
                onEdit={() => console.log('Edit button clicked')}
                isSelected={selectedCVId === curriculum.id}
                onSelect={() => handleCurriculumSelect(curriculum.id)}
                showCustomRadio={true}
                showEditIcon={false}
              />
            </motion.div>
          ))
        ) : (
          <p>No hay curriculums disponibles para este usuario.</p>
        )}
      </div>
    </div>
    </>
  )
}

export default CarouselCurriculms;