import React, { useState } from 'react';
import { Modal, Row, Col, Button, Divider } from 'antd';
import Sliders from "../../../components/pages/offers/CreateOffers/Slider";
import "../../../components/styles/pages/principalNav/PrincipalNav.css";

// Define el componente del modal
// const QuestionModal: React.FC<QuestionModalProps> = ({ visible, onClose }) => {
const QuestionModal: React.FC<any> = ({ visible, onClose }) => {
  return (
    <div>
      <Modal
        title={null}
        open={visible}
        onCancel={onClose}
        width={584}
        footer={null}
        centered={true} 
        closable={false} 
        style={{
          border: '2px solid #0077FF',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: '0px',
        }}
      >
        <div className='pt-[35px] px-[24px]'>
          <h2 className="text-heading-md font-bold">
            Creación de perfil de soft skill
          </h2>
          <p className="text-body-md">
            Crea tu perfil ideal para esta oferta
          </p>
          <Divider className="bg-black" />

          <div className="w-[478px] h-[398px]">
            <Sliders
              minLabel="Colaborativo"
              maxLabel="Autónomo"
              defaultValue={4}
            />
            <Sliders
              minLabel="Innovador"
              maxLabel="Metódico"
              defaultValue={8}
            />
            <Sliders
              minLabel="Detallista"
              maxLabel="Visionario"
              defaultValue={2}
            />
            <Sliders
              minLabel="Resiliente"
              maxLabel="Proactivo"
              defaultValue={10}
            />
            <Sliders
              minLabel="Adaptable"
              maxLabel="Consistente"
              defaultValue={6}
            />
          </div>

          <div className="flex justify-between mt-[20px]">
          <Button className="text-blue3 ml-[-15px] border border-white w-[232px] h-[36px] principal-nav-notify-buttonS" onClick={onClose}>
              Resetear todos los parámetros
            </Button>
            <div>
              <Button onClick={onClose} className="mr-2 principal-nav-notify-button w-[68px] h-[36px] border rounded-[4px]">
                Cerrar
              </Button>
              <Button className='bg-blue3 text-white w-[93px] h-[36px] border rounded-[4px] principal-nav-notify-button2' onClick={onClose}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionModal;
