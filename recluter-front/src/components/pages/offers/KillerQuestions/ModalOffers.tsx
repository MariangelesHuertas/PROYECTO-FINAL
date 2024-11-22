import React, { useState } from 'react';
import { Modal, Row, Col, Button, Divider } from 'antd';
import { Select as AntdSelect } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import "../../../../components/styles/pages/principalNav/PrincipalNav.css";

// Define el tipo de datos de la oferta
interface JobOffer {
  key: string;
  offerName: string;
  questions: string[];
}

// Define las propiedades que el modal acepta
interface QuestionModalProps {
  visible: boolean;
  onClose: () => void;
}

// Define el componente del modal
const QuestionModal: React.FC<QuestionModalProps> = ({ visible, onClose }) => {
  // Datos de ejemplo para las ofertas de trabajo
  const jobOffers: JobOffer[] = [
    {
      key: '1',
      offerName: 'Reponedor de supermercado',
      questions: ['¿Estás actualmente empleado y cuánto tiempo estas?', 'Pregunta 2', 'Pregunta 3'],
    },
    {
      key: '2',
      offerName: 'Mozo de almacén',
      questions: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3'],
    },
    {
      key: '3',
      offerName: 'Administrativo',
      questions: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3'],
    },
  ];

  // Estado para manejar el valor seleccionado de cada oferta
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string | undefined }>({});

  // Maneja el cambio de selección
  const handleChange = (offerKey: string, value: string | undefined) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [offerKey]: value,
    }));
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      centered={true} // Centrar el modal
      closable={false} // Remover el botón de cierre
      style={{
        border: '2px solid #0077FF',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '0px',
      }}
    >
      <div className='pt-[35px] px-[24px]'>
        <h2 className="text-heading-md font-bold">
          Cargar preguntas de otra oferta
        </h2>
        <p className="text-body-md">
          Elige la oferta y después carga una o varias preguntas del desplegable
        </p>
        <Divider className="bg-black" />
        <Row gutter={[0, 16]} align="middle" className='pb-[22px]'>
          <Col span={11}>
            <h1 className='font-bold text-caption'>Nombre de la oferta</h1>
          </Col>
          <Col span={13} className=''>
            <h1 className='font-bold text-caption'>Listado de killer questions</h1>
          </Col>
        </Row>
        {jobOffers.map((offer) => (
          <div key={offer.key} style={{ marginBottom: '16px' }}>
            <Row gutter={[0, 16]} align="middle">
              <Col span={11} className='p-0'>
                <strong className='text-body-md font-normal'>
                  {offer.offerName}
                </strong>
              </Col>
              <Col span={13} className='p-0'>
                <AntdSelect
                  placeholder="Elige entre las preguntas"
                  className="select-1 w-full h-[44px] border border-blue3 rounded-[12px] transition-all"
                  dropdownClassName="select-dropdown"
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ color: '#A1A1AA', fontSize: '16px' }}
                    />
                  }
                  value={selectedValues[offer.key]}
                  onChange={(value) => handleChange(offer.key, value)}
                  style={{
                    borderColor: '#006497',
                    fontSize: '16px',
                    borderRadius: '12px',
                  }}
                >
                  <AntdSelect.Option value={undefined}>Elige entre las preguntas</AntdSelect.Option>
                  {offer.questions.map((question, index) => (
                    <AntdSelect.Option key={index} value={question}>
                      {question}
                    </AntdSelect.Option>
                  ))}
                </AntdSelect>
              </Col>
            </Row>
          </div>
        ))}

        <div className="flex justify-end mt-[60px]">
          <Button onClick={onClose} className="mr-2 principal-nav-notify-button w-[68px] h-[36px]">
            Cerrar
          </Button>
          <Button className='bg-blue3 text-white w-[71px] h-[36px] principal-nav-notify-button2' onClick={onClose}>
            Cargar
          </Button>
        </div>
      </div>

      <style>
        {`
          .select-1 .ant-select-selection {
            border-radius: 12px; /* Más redondeado */
            border: 1px solid red; /* Color del borde */
          }
          .select-1 .ant-select-selection-placeholder {
            color: #006497 !important; /* Color del placeholder */
            font-size: 16px !important; /* Tamaño del texto del placeholder */
          }
          .select-1 .ant-select-selection-item {
            color: #5E5E5E; /* Color del texto seleccionado */
            font-size: 18px;
            font-weight: 500 !important;
          }
          /* Estilos para las opciones del desplegable */
          .select-dropdown .ant-select-item-option-content {
            color: black; /* Color del texto de las opciones */
            font-size: 15px;
            font-weight: 400 !important;
          }
          /* Estilo para la opción seleccionada en el menú desplegable */
          .select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
            background-color: white !important; /* Color de fondo para la opción seleccionada */
            border: 2px solid #006497;
             border-radius: 8px;
          }
          /* Estilo para la opción en hover en el menú desplegable */
          .select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
            background-color: #F4F4F5; /* Color de fondo al pasar el mouse sobre la opción */
          }
        `}
      </style>
    </Modal>
  );
};

export default QuestionModal;
