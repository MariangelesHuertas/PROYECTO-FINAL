import React, { useState } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../assets/icons/IconClosed.svg";
import ModalVal from '../modals/ModalConfirmation';

interface ValuationModalProps {
  visible: boolean;
  onClose: () => void;
  entityName: string; // Añadimos esta prop
  entityType: 'candidate' | 'company';
  showModalRegister: boolean
  onSend: () => void;
}

const ValuationModal: React.FC<ValuationModalProps> = ({
  visible, onClose, entityName, entityType,
  showModalRegister,
  onSend
}) => {
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleAcceptClick = () => {
    onSend();
    onClose();
    setIsSecondModalVisible(true);
  };

  const handleSecondModalClose = () => {
    setIsSecondModalVisible(false);
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        closable={false}
        width={677}
        bodyStyle={{ borderRadius: "12px" }}
        style={{ borderRadius: "12px", border: "1px solid #E1E1E2" }}
      >
        <img
          src={IconClosed}
          alt="Cerrar"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "34px",
            right: "34px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mb-[36px] mt-[20px]">
          <h3 className="mt-[16px] text-heading-md font-bold">
            Vas a valorar a {entityType === 'candidate' ? entityName : `${entityName}`}!
          </h3>

          <div className="flex justify-center mx-[114px] mt-[36px]">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ marginRight: "8px", borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAcceptClick} // Cambia a esta función
              className="bg-blue3 text-white w-[110px] h-[44px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>

      {
        showModalRegister ? (
          <ModalVal
            visible={isSecondModalVisible}
            onClose={handleSecondModalClose}
          />
        ) : null
      }
      {/* Segundo Modal */}

    </>
  );
};

export default ValuationModal;
