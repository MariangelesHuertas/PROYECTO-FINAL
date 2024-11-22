import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Button, Divider, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IconLocation2 from '../../../../assets/icons/location2.svg';
import IconTypemoney1 from '../../../../assets/icons/typemoney1.svg';
import IconClock from '../../../../assets/icons/clock.svg';
import IconComment from '../../../../assets/icons/comment.svg';
import IconPersons from '../../../../assets/icons/persons.svg';
import IconTag from '../../../../assets/icons/tag.svg';
import IconShield from '../../../../assets/icons/shield.svg';
import IconFile from '../../../../assets/icons/file.svg';
import IconCheck from '../../../../assets/icons/check.svg';
import IconShield2 from '../../../../assets/icons/IconShield2.svg';
import 'tailwindcss/tailwind.css';
import '../../../styles/pages/employment/recommendations/Information.css';

interface InformationProps {
  title: string;  
  company: string;
  location: string;
  employmentType: string;
  salary: string;
  comments: number;
  applicantsCount: string;
  introText: string;
  requirements: string[];
  responsibilities: string[];
  extraText: string[];
  extraText2: string[];
  postedTime: string;
  applied: boolean;
  onApply: () => void;
  loading: boolean;
  partialLoading?: boolean;
  saved: boolean;
}

const Information: React.FC<InformationProps> = ({
  title,
  company,
  location,
  employmentType,
  salary,
  comments,
  applicantsCount,
  introText,
  requirements,
  responsibilities,
  extraText,
  extraText2,
  postedTime,
  applied,
  onApply,
  loading,
  partialLoading = false,
  saved=true
}) => {
  const [isApplied, setIsApplied] = useState(applied);
  const [isSaved, setIsSaved] = useState(true); // Estado para el botón de guardar

  useEffect(() => {
    setIsApplied(applied);
  }, [applied]);

  const handleApplyClick = () => {
    setIsApplied(!isApplied);
    setIsSaved(!isSaved); // Cambiar el estado de guardar al aplicar
    onApply();
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className="mx-auto bg-white rounded-none border-sky-blue0 p-2">
      <Skeleton loading={loading && !partialLoading} avatar active>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div className="flex items-center mb-4 lg:mb-0">
            <Avatar size={40} icon={<UserOutlined />} shape="circle" />
            <div className="ml-3">
              <h3 className="text-base m-0 font-bold">{title}</h3>
              <h4 className="text-sm font-medium m-0">{company}</h4>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <Button
              className={`btn-guardar border-none text-blue3 mb-2 lg:mb-0 lg:ml-1 font-bold text-sm${isSaved ? 'guardar' : ''}`}
              icon={<img src={isSaved || saved ? IconShield2 : IconShield} alt="icono" />}
              onClick={handleSaveClick}
            >
              {isSaved ? 'Guardada' : 'Guardada'}
            </Button>
            
            <Button
              className={`btn-inscribirte rounded text-blue3 lg:ml-4 font-bold text-base h-[44px] ${isApplied ? 'inscrito' : ''}`}
              icon={isApplied ? <img src={IconCheck} /> : <img src={IconFile} />}
              onClick={handleApplyClick}
            >
              {isApplied ? 'Inscrito' : 'Inscribirte'}
            </Button>
          </div>
        </div>
      </Skeleton>
      
      <Skeleton loading={loading && !partialLoading} active paragraph={{ rows: 2 }}>
        <Row className="mb-2">
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconLocation2} className="p-1" /> {location}
          </Col>
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconTypemoney1} className="p-1" /> {salary}
          </Col>
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconClock} className="p-1" /> {employmentType}
          </Col>
        </Row>
        <Row className="mb-4">
          <Button className="rounded-full p-1 mr-2" icon={<img src={IconComment} className="text-blue4" />}>
            {comments}
          </Button>
          <Button className="rounded-full p-1 mr-2" icon={<img src={IconPersons} className="text-blue4" />}>
            {applicantsCount}
          </Button>
          <img src={IconTag} className="text-blue4 mr-2" />
          <Button className="rounded-full p-2 mr-2">
            Inglés
          </Button>
          <Button className="rounded-full p-2 mr-2">
            Reponedor
          </Button>
          <Button className="rounded-full p-2 mr-2">
            Responsabilidad media
          </Button>
        </Row>
        <div className="text-xs text-black text-right font-medium mb-4">
          {postedTime}
        </div>
        <Divider className="border-gray-300" />
      </Skeleton>

      {/* Descripción con efecto de carga condicional */}
      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: 3 }}>
        <div className="mb-4">
          <p className="text-base font-sans font-medium">{introText}</p>
        </div>
      </Skeleton>

      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: requirements.length }}>
        <div className="mb-4">
          <h2 className="text-base font-sans font-medium">Requisitos:</h2>
          <ul>
            {requirements.map((requirement, index) => (
              <li key={index} className="text-base font-sans font-medium">{requirement}</li>
            ))}
          </ul>
        </div>
      </Skeleton>

      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: responsibilities.length }}>
        <div className="mb-4">
          <h2 className="text-base font-bold font-sans">Responsabilidades:</h2>
          <ul>
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="text-base font-sans font-medium pt-5">{responsibility}</li>
            ))}
          </ul>
        </div>
      </Skeleton>

      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: extraText.length + 1 }}>
        <div className="mb-4">
          <ul>
            {extraText.map((extra, index) => (
              <li key={index} className="text-base font-sans font-medium">{extra}</li>
            ))}
            <p className="text-base font-sans font-bold pt-6">{extraText2}</p>
          </ul>
        </div>
      </Skeleton>
    </Card>
  );
};

export default Information;
