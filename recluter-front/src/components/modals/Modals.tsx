import React, { useState } from 'react';
import { Button, Modal, Input, Select, Divider } from 'antd';
import { ThunderboltTwoTone, LockFilled } from '@ant-design/icons';

const { Option } = Select;

interface ModalProps {
  modal1Title: string;
  modal1ButtonText: string;
  modal2Title: string;
  modal2ButtonText: string;
  modal3Title: string;
  modal3ButtonText: string;
}

const Modals: React.FC<ModalProps> = ({
  modal1Title,
  modal1ButtonText,
  modal2Title,
  modal2ButtonText,
  modal3Title,
  modal3ButtonText,
}) => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const showModal1 = () => setIsModalOpen1(true);
  const handleOk1 = () => setIsModalOpen1(false);
  const handleCancel1 = () => setIsModalOpen1(false);

  const showModal2 = () => setIsModalOpen2(true);
  const handleOk2 = () => setIsModalOpen2(false);
  const handleCancel2 = () => setIsModalOpen2(false);

  const showModal3 = () => setIsModalOpen3(true);
  const handleOk3 = () => setIsModalOpen3(false);
  const handleCancel3 = () => setIsModalOpen3(false);

  return (
    <div className="flex flex-col space-y-4">
      <Button
        type="primary"
        onClick={showModal1}
        className="text-left px-4 py-2 w-auto"
      >
        {modal1ButtonText}
      </Button>
      <Button
        type="primary"
        onClick={showModal2}
        className="text-left px-4 py-2 w-auto"
      >
        {modal2ButtonText}
      </Button>
      <Button
        type="primary"
        onClick={showModal3}
        className="text-left px-4 py-2 w-auto"
      >
        {modal3ButtonText}
      </Button>

      <Modal
        title={null}
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
        footer={null}
        width={588}
        bodyStyle={{ padding: '10px' }}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-left mb-8">{modal1Title}</h2>
          <h3 className="text-lg font-medium text-gray-700 mb-5">Nueva Valoración</h3>
          <div className="mb-4">
            <Input />
          </div>
          <Button
            type="primary"
            onClick={handleOk1}
            className="w-full text-lg font-medium mt-8 py-5 rounded-xl bg-blue-600 border-blue-600"
          >
            Cerrar
          </Button>
        </div>
      </Modal>

      <Modal
        title={null}
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={null}
        width={588}
        bodyStyle={{ padding: '10px' }}
      >
        <div className="p-4">
          <div className="flex items-center mb-8">
            <ThunderboltTwoTone className="text-2xl mr-2" />
            <h2 className="text-2xl font-bold m-0">{modal2Title}</h2>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-5">Nombre de la alerta</h3>
          <Input placeholder="Escribir nombre" className="mb-6 p-3 rounded-lg text-base" />
          <h3 className="text-base font-medium text-gray-700 mb-5">Temporalidad del resumen por email</h3>
          <Select defaultValue="Cada 3 días" className="w-full mb-4 rounded-lg">
            <Option value="1">Cada día</Option>
            <Option value="3">Cada 3 días</Option>
            <Option value="7">Cada semana</Option>
          </Select>
          <Button
            type="primary"
            onClick={handleOk2}
            className="w-full text-lg font-medium mt-7 py-5 rounded-xl bg-blue-600 border-blue-600"
          >
            Crear alerta
          </Button>
        </div>
      </Modal>

      <Modal
        title={null}
        open={isModalOpen3}
        onOk={handleOk3}
        onCancel={handleCancel3}
        footer={null}
        width={328}
        bodyStyle={{ padding: 'auto' }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-left">{modal3Title}</h2>
          <h3 className="text-base font-medium text-gray-700 mb-6 mt-3 text-left">
            Regístrate en menos de 1 minuto
          </h3>
          <div className="mb-4">
            <Button className="w-full bg-white mb-6 rounded-xl">Sign in with Google</Button>
            <Button className="w-full bg-white mb-4 rounded-xl">Sign in with Facebook</Button>
          </div>
          <Divider plain className="text-gray-500 text-sm">O</Divider>
          <h3 className="text-base font-medium text-gray-700 mb-3">Email</h3>
          <div className="mb-5">
            <Input className="rounded-xl" placeholder="Escribe tu email" />
          </div>
          <h3 className="text-base font-medium text-gray-700 mb-3">Nombre Completo</h3>
          <div className="mb-5">
            <Input className="rounded-xl" placeholder="Escribe tu nombre completo" />
          </div>
          <h3 className="text-base font-medium text-gray-700 mb-3">Contraseña</h3>
          <div className="mb-2">
            <Input.Password className="rounded-xl" placeholder="Escribe tu contraseña" />
          </div>
          <div className="flex items-center text-gray-700">
            <LockFilled className="mr-2" />
            <span className="text-base">Mínimo 8 caracteres y 1 símbolo</span>
          </div>
          <Button
            type="primary"
            onClick={handleOk3}
            className="w-full text-lg font-medium mt-6 py-5 rounded-xl bg-blue-600 border-blue-600"
          >
            Cerrar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Modals;
