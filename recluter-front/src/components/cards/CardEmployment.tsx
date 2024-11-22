import React, { useState } from 'react';
import { Card, Avatar, Button, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
import IconLocation2 from '../../assets/icons/location2.svg';
import IconTypemoney1 from '../../assets/icons/typemoney1.svg';
import IconClock from '../../assets/icons/clock.svg';
import IconUsers from '../../assets/icons/IconUsers.svg';
import IconB from '../../assets/icons/IconB.svg';
import IconCheck from '../../assets/icons/IconCheck.svg';
import IconC from '../../assets/icons/IconC.svg'
import IconSavedOffer from '../../assets/icons/saved.svg'
import DiferenciaFecha from '../../utils/CalculateDifferentDate';

interface CardEmpleoProps {
  companyName: string;
  jobTitle: string;
  location: string;
  salary: string;
  schedule: string;
  ratings: string;
  activeOffers: string;
  followers: string;
  description: string;
  postedTime: string;
  applied: boolean;
  avatarSize?: number;
  // avatarShape?: 'circle' | 'square';
  avatarShape?: string;
  // styleType?: 'default' | 'type1' | 'type2' | 'type4';
  styleType?: string;
  loading?: boolean;
  stepsComponent?: React.ReactNode; // New prop
  currentStep: number; // New prop, required
  createdAt?: string;
  saveOffer?: boolean;
}

const CardEmpleo: React.FC<CardEmpleoProps> = ({
  companyName,
  jobTitle,
  location,
  salary,
  schedule,
  ratings,
  activeOffers,
  followers,
  description,
  postedTime,
  avatarSize = 40,
  // avatarShape = 'circle',
  avatarShape,
  applied,
  styleType = 'default',
  loading = false,
  stepsComponent,
  currentStep,
  createdAt,
  saveOffer=false
}: any) => {
  
  const formattedDescription = description.replace(/(?:\r\n|\r|\n)/g, '<br>');

  return (
    <div className="mb-[12px] flex justify-center cursor-pointer">
      <Card
        bordered={false}
        className={`w-full h-auto rounded-lg bg-white pt-3 ${styleType === 'type4' ? 'pb-0' : ''}`}
        style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)' }}
      >
        {loading ? (
          <Skeleton avatar active paragraph={{ rows: 4 }} />
        ) : (
          <>
            {
              applied
                ? <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#FDBCB4] rounded-l-lg"></div>
                : null
            }
            <div className="flex items-center justify-between mb-2 -mt-7">
              <div className="flex items-center">
                <Avatar
                  size={avatarSize}
                  icon={<UserOutlined />}
                  shape={avatarShape}
                />
                <div className="ml-3">
                  <h3 className="text-sm font-medium m-0">{companyName}</h3>
                  <h4 className="text-base m-0 font-bold">{jobTitle}</h4>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {
                  saveOffer
                    ? <img src={IconSavedOffer} className="text-sm" />
                    : styleType === 'type4'
                      ? 'Ya no estoy interesado(a)'
                      : styleType === 'type3'
                        ? <img src={IconSavedOffer} className="text-sm" />
                        : <img src={IconC} className="text-lg" />
                }
              </div>
            </div>
            <div className="flex flex-wrap justify-start items-center mb-2 space-x-4">
              <div className="flex items-center font-medium"><img src={IconLocation2} className="p-1" />{location}</div>
              <div className="flex items-center font-medium"><img src={IconTypemoney1} className="p-1" /> {salary}</div>
              <div className="flex items-center font-medium"><img src={IconClock} className="p-1" />{schedule}</div>
            </div>
            <div className="flex flex-wrap justify-start items-center mb-2 space-x-2">
              <Button icon={<img src={IconCheck} />} className="border border-gray-300 text-gray-600 text-xs rounded-full pl-2">{ratings}</Button>
              <Button icon={<img src={IconB} />} className="border border-gray-300 text-gray-600 text-xs rounded-full pl-1">{activeOffers}</Button>
              <Button icon={<img src={IconUsers} />} className="border border-gray-300 text-gray-600 text-xs rounded-full pl-1">{followers}</Button>
            </div>
            {styleType === 'type4' ? (
              <>
                <p className="text-sm font-sans font-medium mt-2" dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
                <div className="text-xs text-gray-500 text-right font-medium mt-2">
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-sans font-medium mt-2" dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
                <div className="text-xs text-gray-500 text-right font-medium mt-2">
                  {/* {postedTime} */}
                  <DiferenciaFecha fecha={createdAt} />
                </div>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CardEmpleo;