import React from 'react';
import CardUser from '../../components/cards/CardUser';
import { Row, Col } from 'antd';

const CardUserExample: React.FC = () => {
  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CardUser
            title="Title"
            description="Placeholder for body text. Enter text into this container."
            name="Name"
            buttonText="Button"
            avatarSize={40}
            width="320px"
            height="240px"
          />
        </Col>
        <Col span={24}>
          <CardUser
            title="Title"
            description="Placeholder for body text. Enter text into this container."
            name="Name"
            buttonText="Button"
            avatarSize={40}
            width="360px"
            height="240px"
          />
        </Col>
        <Col span={24}>
          <CardUser
            title="Title"
            description="Placeholder for body text. Enter text into this container."
            name="Name"
            buttonText="Button"
            avatarSize={44}
            width="420px"
            height="280px"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CardUserExample;
