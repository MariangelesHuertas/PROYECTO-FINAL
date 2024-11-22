import React from 'react';
import { Modal, Avatar, Row, Col, Divider, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IconLocation2 from '../../../../../assets/icons/location2.svg';
import IconTypemoney1 from '../../../../../assets/icons/typemoney1.svg';
import IconClock from '../../../../../assets/icons/clock.svg';
import IconComment from '../../../../../assets/icons/comment.svg';
import IconPersons from '../../../../../assets/icons/persons.svg';
import IconTag from '../../../../../assets/icons/tag.svg';
import 'tailwindcss/tailwind.css';
import '../../../../styles/pages/employment/recommendations/Information.css';

interface ModalPreviewProps {
  visible: boolean;
  onClose: () => void;
  formValues: any; // Para recibir los valores del formulario
  loading: boolean;
  partialLoading?: boolean;
}

const ModalPreview: React.FC<ModalPreviewProps> = ({
  visible,
  onClose,
  formValues, // Recibimos los valores del formulario
  loading,
  partialLoading = false,
}) => {
  // Validamos que formValues no sea null o undefined antes de usarlo
  const {
    title = 'Título de la oferta',
    company = 'Nombre de la empresa',
    location = 'Ubicación',
    employmentType = 'Tipo de empleo',
    salary = 'Salario',
    comments = 0,
    applicantsCount = 0,
    introText = 'Texto de introducción',
    requirements = [],
    responsibilities = [],
    extraText = [],
    extraText2 = 'Texto adicional 2',
    sector = 'Sector',
    aptitudes = [],
  } = formValues || {}; // Destructuramos con valores por defecto en caso de que formValues sea null

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null} // Elimina el footer para evitar botones adicionales
      centered
      width={800}
    >
      <Skeleton loading={loading && !partialLoading} avatar active>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <div className="flex items-center mb-4 lg:mb-0">
            <Avatar size={40} icon={<UserOutlined />} shape="circle" />
            <div className="ml-3">
              <h3 className="text-base m-0 font-bold">{title}</h3>
              <h4 className="text-sm font-medium m-0">{company}</h4>
            </div>
          </div>
        </div>
      </Skeleton>

      <Skeleton loading={loading && !partialLoading} active paragraph={{ rows: 2 }}>
        <Row className="mb-2">
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconLocation2} className="p-1" alt="location" /> {location}
          </Col>
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconTypemoney1} className="p-1" alt="salary" /> {salary}
          </Col>
          <Col className="flex items-center text-sm font-sans font-medium mr-5">
            <img src={IconClock} className="p-1" alt="employment type" /> {employmentType}
          </Col>
        </Row>
        <Row className="mb-4">
          <button className="rounded-full p-1 mr-2">
            <img src={IconComment} className="text-blue4" alt="comments" />
            {comments}
          </button>
          <button className="rounded-full p-1 mr-2">
            <img src={IconPersons} className="text-blue4" alt="applicants" />
            {applicantsCount}
          </button>
          <img src={IconTag} className="text-blue4 mr-2" alt="sector" />
          <button className="rounded-full p-2 mr-2">{sector}</button>
          {aptitudes.map((apt: any, index: number) => (
            <button key={index} className="rounded-full p-2 mr-2">{apt.aptitud || 'Aptitud'}</button>
          ))}
        </Row>
        <Divider className="border-gray-300" />
      </Skeleton>

      {/* Descripción */}
      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: 3 }}>
        <div className="mb-4">
          <p className="text-base font-sans font-medium" dangerouslySetInnerHTML={{ __html: introText }}></p>
        </div>
      </Skeleton>

      {/* Requisitos */}
      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: requirements.length || 1 }}>
        <div className="mb-4">
          <h2 className="text-base font-sans font-medium mb-4">Requisitos:</h2>
          <ul>
            {requirements.map((requirement: any, index: number) => (
              <li key={index} className="text-base font-sans font-medium mb-1">
                <b>{requirement.title || 'Requisito'}: </b>{requirement.requirement || 'Descripción del requisito'}
              </li>
            ))}
          </ul>
        </div>
      </Skeleton>

      {/* Responsabilidades */}
      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: responsibilities.length || 1 }}>
        <div className="mb-4">
          <h2 className="text-base font-bold font-sans">Responsabilidades:</h2>
          <ul>
            {responsibilities.map((responsibility: string, index: number) => (
              <li key={index} className="text-base font-sans font-medium pt-5" dangerouslySetInnerHTML={{ __html: responsibility }}></li>
            ))}
          </ul>
        </div>
      </Skeleton>

      {/* Información adicional */}
      <Skeleton loading={loading} active={partialLoading} paragraph={{ rows: extraText.length || 1 }}>
        <div className="mb-4">
          <ul>
            {extraText.map((extra: string, index: number) => (
              <li key={index} className="text-base font-sans font-medium">{extra}</li>
            ))}
            <p className="text-base font-sans font-bold pt-6">{extraText2}</p>
          </ul>
        </div>
      </Skeleton>
    </Modal>
  );
};

export default ModalPreview;
