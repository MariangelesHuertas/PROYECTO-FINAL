import React from 'react';
import { Row, Col } from 'antd';
import CardEmpleo from '../../components/cards/CardEmployment';

const CardEmpleoExample: React.FC = () => {
  const exampleProps = {
    companyName: "Supermercados Carrefour",
    jobTitle: "Reponedor de supermercado",
    location: "Campo de Criptana",
    salary: "18.000€",
    schedule: "Parcial",
    ratings: "20 valoraciones",
    activeOffers: "90 ofertas activas",
    followers: "450 Seguidores",
    description: "Importante cadena de alimentación busca incorporar un/a dependiente/a reponedor/a en Fuerteventura...",
    postedTime: "Subida hace 23h"
  };

  const examplePropsType4 = {
    ...exampleProps,
    inscriptionStatus: "Inscrito Ahora mismo",
    notInterestedText: "Ya no estoy interesado(a)"
  };

  return (
    <div style={{ padding: '40px' }}>
      <Row gutter={[16, 16]}>
        {/* Columna Izquierda: Diseño Default */}
        <Col xs={24} md={12}>
          <CardEmpleo
            applied={false} currentStep={0} {...exampleProps}
            styleType="default" 
          />
        </Col>

        {/* Columna Derecha: Nuevo Diseño */}
        <Col xs={24} md={12}>
          <CardEmpleo applied={false} currentStep={0} {...examplePropsType4} styleType="type4" />
        </Col>

        <Col xs={24} md={12}>
          <CardEmpleo applied={false} currentStep={0} {...exampleProps} styleType="default" />
        </Col>

        {/* Columna Derecha: Nuevo Diseño */}
        <Col xs={24} md={12}>
          <CardEmpleo applied={false} currentStep={0} {...examplePropsType4} styleType="type4" />
        </Col>

        <Col xs={24} md={12}>
          <CardEmpleo applied={false} currentStep={0} {...exampleProps} styleType="default" />
        </Col>

        {/* Columna Derecha: Nuevo Diseño */}
        <Col xs={24} md={12}>
          <CardEmpleo applied={false} currentStep={0} {...examplePropsType4} styleType="type4" />
        </Col>
      </Row>
    </div>
  );
};

export default CardEmpleoExample;
