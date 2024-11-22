import React from 'react';
import { Row, Col } from 'antd';
import CardEmpresa from '../../components/cards/CardEmpresa';

const CardEmpresaExample: React.FC = () => {

  return (
    <div >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CardEmpresa />
        </Col>
      </Row>
    </div>
  );
};

export default CardEmpresaExample;
