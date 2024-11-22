import React from 'react';
import { Card, Avatar, Row, Col, Button } from 'antd';
import { UserOutlined, EnvironmentTwoTone, EuroTwoTone, ClockCircleTwoTone, HeartTwoTone, AlertTwoTone, SmileTwoTone, SafetyCertificateOutlined, ShoppingOutlined } from '@ant-design/icons';
import '../styles/cardEmpleo/CardEmpleo.css';

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
  avatarSize?: number;
  avatarShape?: 'circle' | 'square';
  styleType?: 'default' | 'type1' | 'type2' | 'type4';
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
  avatarShape = 'circle',
  styleType = 'default'
}) => {
  return (
    <div className="card-container">
      <Card
        bordered={false}
        className={`card-empleo ${styleType}`}
      >
        <div className="header">
          <div className="header-left">
            <Avatar size={avatarSize} icon={<UserOutlined />} shape={avatarShape} />
            <div className="header-text">
              <h3>{companyName}</h3>
              <h4>{jobTitle}</h4>
            </div>
          </div>
          <div className="header-right">
            {styleType === 'type4' ? 'Ya no estoy interesado(a)' : <SafetyCertificateOutlined className="safety-icon" />}
          </div>
        </div>
        <Row className="job-details">
          <Col><EnvironmentTwoTone /> {location}</Col>
          <Col><EuroTwoTone /> {salary}</Col>
          <Col><ClockCircleTwoTone /> {schedule}</Col>
        </Row>
        <Row className="job-stats">
          <Col><Button icon={<HeartTwoTone />} className="custom-button">{ratings}</Button></Col>
          <Col><Button icon={<AlertTwoTone />} className="custom-button">{activeOffers}</Button></Col>
          <Col><Button icon={<SmileTwoTone />} className="custom-button">{followers}</Button></Col>
        </Row>
        {styleType === 'type4' && (
          <div className="inscription-status">
            <div className="icon"><ShoppingOutlined /></div>
            <span>Inscrito</span>
            <span>Ahora mismo</span>
            <div className="custom-steps">
              <div className="step finished"></div>
              <div className="step"></div>
              <div className="step"></div>
              <div className="step"></div>
            </div>
          </div>
        )}
        <p className="description">{description}</p>
        {styleType !== 'type4' && <p className="posted-time">{postedTime}</p>}
      </Card>
    </div>
  );
};

export default CardEmpleo;
