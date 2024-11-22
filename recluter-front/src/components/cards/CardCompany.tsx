import React from 'react';
import { Avatar, Card, Button } from 'antd';
import IconUsers from '../../assets/icons/IconUsers.svg';
import IconB from '../../assets/icons/IconB.svg';
import IconCheck from '../../assets/icons/IconCheck.svg';
import IconTag from '../../assets/icons/tag.svg';
import IconPersons from '../../assets/icons/persons.svg';
import IconAlerts from '../../assets/icons/alerts.svg';

const { Meta } = Card;

interface CardEmpresaProps {
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
  onClick: () => void;
  className?: string;
  sector: string;
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({
  title,
  description,
  location,
  link,
  avatarUrl,
  reviews,
  activeOffers,
  followers,
  workers,
  onClick,
  className,
  sector,
}) => {
 
  const handleClick = () => {
    onClick();
  };

  return (
    <Card
      onClick={handleClick}
      className={`p-5 bg-white overflow-hidden relative cursor-pointer ${className} shadow-md hover:shadow-lg hover:border-[#81BFEC]`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        borderRadius: '0',
        height: 'auto',
      }}
    >
        <Meta
          avatar={<Avatar className="w-24 h-24 mb-2 md:mb-0" src={avatarUrl} />}
          title={
            <div className="flex items-center justify-between w-full -mb-1">
              <span className="text-lg font-bold text-black">{title}</span>
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
                  icon={<img src={IconUsers} className=""  />}
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
                  {sector}
                </Button> 
              </div>
            </div>
          }
        />     
        <img src={IconAlerts} className="absolute top-4 right-7 text-2xl hidden text-blue3 md:block" />
    </Card>
  );
};

export default CardEmpresa;
