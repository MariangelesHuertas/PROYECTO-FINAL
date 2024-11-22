import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

interface CardAlertsProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  selected: boolean;  // Prop para saber si la card está seleccionada
  onClick: () => void;  // Prop para manejar el clic
}

const CardAlerts: React.FC<CardAlertsProps> = ({ title, subtitle, description, image, selected, onClick }) => (
  <div>
    <Card
      className={`bg-white rounded-caption ${selected ? 'shadow-2xl border-blue-500' : 'shadow-sm border-greene'} hover:shadow-lg transition-shadow`}
      onClick={onClick}  // Maneja el clic en la card
    >
      <div className="flex items-center mb-4">
        <Avatar size="large" icon={image ? <img src={image} alt="Avatar" /> : <UserOutlined />} className='w-8 h-8' />
        <div className="ml-4">
          <div className="font-medium text-heading-x1 text-black">{title}</div>
        </div>
      </div>
      <div className="text-heading-sm font-bold mb-2">
        {subtitle}
      </div>
      <div className="text-bla font-normal text-heading-x1">
        {description}
      </div>
    </Card>
  </div>
);

export default CardAlerts;
