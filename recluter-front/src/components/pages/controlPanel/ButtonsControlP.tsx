import React from 'react';
import { Card, Typography, Tooltip } from 'antd';

const { Title, Text } = Typography;

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <Card
      bordered={true}
      className=' max-h-[94px] rounded-[12px] bg-[#FCFCFC]'
      bodyStyle={{ padding: '18px' }}
      hoverable
    >
      <Tooltip title={title}>
      <Title
        style={{
            color: '#006497',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '16px',
            fontWeight: '600'
        }}
        >
            {title}
        </Title>
      </Tooltip>
      <div className="flex items-center justify-left space-x-2">
        <h1 className='font-bold text-heading-md'>
          {value}
        </h1>
        <Tooltip title={description}>
          <Text
            style={{
              color: '#5E5E5E',
              fontSize: '18px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '500',
              
            }}
          >
            {description}
          </Text>
        </Tooltip>
      </div>
    </Card>
  );
};

export default StatCard;
