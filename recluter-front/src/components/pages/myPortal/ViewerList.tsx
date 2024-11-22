// components/ViewerList.tsx
import React from 'react';
import { Typography, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import "tailwindcss/tailwind.css";
import ButtonText from '../../../components/button/ButtonText'; 

const { Text } = Typography;

interface Viewer {
  name: string;
  timeAgo: string;
  logoUrl: string; // Added for logo URL
}

interface ViewerListProps {
  viewers: Viewer[];
}

const ViewerList: React.FC<ViewerListProps> = ({ viewers }) => (
  <div className="container mx-auto">
    {/* Title */}
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-heading-md font-bold pb-3 flex items-center">
        Quién me ha visto
      </h1>
    </div>

    {/* Viewer Count and View All Link in One Row */}
    <Row className="flex justify-between items-center mb-4">
      <Col>
        <Text className="text-heading-x1 font-bold text-blue3">
          {viewers.length}
        </Text>
        <Text className="text-heading-x1 font-bold ml-2">
          Nuevas visualizaciones
        </Text>
      </Col>
      <Col>
        <ButtonText
          buttons={[
            {
              type: 'link',
              label: "Ver todas",
              size: 'small',
              textColor: '#006497',
              color: 'white',
              fontWeight: 600,
              fontSize: "14px",
              onClick: () => console.log('Ver todas clicked'),
              // icon: <RightOutlined />
            }
          ]}
        />
      </Col>
    </Row>

    <Row gutter={16} className='pl-2'>
      {viewers.map((viewer, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={8} style={{ paddingLeft: '0px', paddingRight:'0px' }}>
          <div className="flex items-center p-[11px] border rounded-none hover:shadow-md transition-shadow duration-300 ease-in-out ">
            <img
              src={viewer.logoUrl}
              alt={viewer.name}
              className="w-12 h-12 mr-4 object-contain"
            />
            <div>
              <Text className="font-semibold block">{viewer.name}</Text>
              <Text className="text-sm text-gray-600">{viewer.timeAgo}</Text>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </div>
);

export default ViewerList;
