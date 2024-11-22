import React from 'react';
import { Row, Col } from 'antd';
import CardCompanyButtons from '../../components/cards/CardCompanyButtons';

const CardCompanyExample: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CardCompanyButtons
            title="Supermercados Carrefour"
            description="Retail • Alimentación y bebidas"
            location="Madrid, Spain"
            link="https://carrefour.es"
            avatarUrl="https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png"
            reviews={20}
            activeOffers={90}
            followers={450}
            workers={500}
            categories={['Administrativo', 'Reponedor', 'Ventas']}
            onClick={() => {}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CardCompanyExample;
