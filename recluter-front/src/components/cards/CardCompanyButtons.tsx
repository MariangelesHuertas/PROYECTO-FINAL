import React from 'react';
import { Avatar, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import IconUsers from '../../assets/icons/IconUsers.svg';
import IconB from '../../assets/icons/IconB.svg';
import IconCheck from '../../assets/icons/IconCheck.svg';
import IconC from '../../assets/icons/shieldB.svg';
import IconTag from '../../assets/icons/tag.svg';
import IconPersons from '../../assets/icons/persons.svg';
import Notification from '../../assets/icons/notification.svg';
import RatingBlue from '../rating/RatingBlue';

const { Meta } = Card;

interface CardCompanyButtonsProps {
  title: string;
  description: string;
  location: string;
  link: string;
  avatarUrl: string;
  reviews: number;
  activeOffers: number;
  followers: number;
  workers: number;
  categories: string[];
  cardType?: number;
  rating?: number;
  onClick: () => void;
  className?: string;
}

const getCardStyle = (cardType?: number): React.CSSProperties => {
  switch (cardType) {
    case 2:
      return { border: '1px solid #81BFEC' };
    case 3:
      return { border: '1px solid #81BFEC' };
    case 4:
      return { backgroundColor: '#FCFCFC', border: 'none', width: '100%', height: '200px' };
    case 1:
    default:
      return { border: '1px solid #d9d9d9' };
  }
};

const CardCompanyButtons: React.FC<CardCompanyButtonsProps> = ({
  title,
  description,
  location,
  link,
  avatarUrl,
  reviews,
  activeOffers,
  followers,
  workers,
  categories,
  cardType,
  rating = 5,
  onClick,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick();
  };

  return (
    <Card
      className={`p-5 mb-6 bg-white overflow-hidden relative cursor-pointer ${className} shadow-md hover:shadow-lg hover:border-[#81BFEC]`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        borderRadius: '0',
        height: 'auto',
        ...getCardStyle(cardType),
      }}
    >
      <Meta
        avatar={<Avatar className="w-24 h-24 mb-2 md:mb-0" src={avatarUrl} />}
        title={
          <div className="flex items-center justify-between w-full -mb-1">
            <span className="text-lg font-bold text-black flex items-center">
              {title}
              {rating && (
                <span className="ml-8 flex items-center">
                  <span className="mr-1 text-lg text-[#00476D]">{rating}</span> {/* Mostrar el número del rating */}
                  <RatingBlue
                    // rating={rating}
                    showRatingValue={false}
                    filledStars={5}
                  />
                </span>
              )}
            </span>
          </div>
        }
        description={
          <div className="text-sm text-black">
            <span className='text-body-sm font-medium text-[#333333]'>{description} • {location} • Valoraciones • +{workers} trabajadores</span>
            <br />
            <a className="text-sm font-bold text-[#666666]" href={link}>{link}</a>
            <div className="flex mt-2 overflow-hidden space-x-1 flex-wrap">
              <Button
                className="bg-white border border-[#E1E1E2] rounded-full flex-none"
                icon={<img src={IconCheck} className="" />}
              >
                {reviews} valoraciones
              </Button>
              <Button
                className="bg-white border border-gray-300 rounded-full flex-none"
                icon={<img src={IconB} className="" />}
              >
                {activeOffers} Ofertas activas
              </Button>
              <Button
                className="bg-white border border-gray-300 rounded-full flex-none"
                icon={<img src={IconUsers} className="" />}
              >
                {followers} Seguidores
              </Button>
              <Button
                className="bg-white border border-gray-300 rounded-full flex-none"
                icon={<img src={IconPersons} className="text-blue4 bg-white" />}
              >
                +{workers} trabajadores
              </Button>
              <img src={IconTag} className="text-blue4 mr-2" />
              <Button
                className="bg-white border border-gray-300 rounded-full flex-none"
              >
                Administrativo
              </Button>
            </div>
          </div>
        }
      />
      <div className="flex justify-between absolute bottom-4 left-4 right-4">
        <span className="text-[#006497] text-sm font-semibold cursor-pointer flex items-center" style={{ textDecoration: 'underline' }}>
          <img src={Notification} alt="Notification Icon" className="mr-2" /> Gestionar notificaciones
        </span>
        <span 
          className="text-[#006497] text-sm font-semibold cursor-pointer" 
          style={{ textDecoration: 'underline' }} 
          onClick={handleClick}  // O agregando un onClick directo aquí.
        >
          Ver detalle
        </span>
      </div>
      <img src={IconC} className="absolute top-4 right-7 text-2xl hidden text-blue3 md:block" />
    </Card>
  );
};

export default CardCompanyButtons;
