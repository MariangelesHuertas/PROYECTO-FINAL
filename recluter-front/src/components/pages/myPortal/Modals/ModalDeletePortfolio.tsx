import React, { useState } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import ModalSaved from '../../myPortal/Modals/ModalSavedChanges';

interface ModalDeletePortfolioProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  projectTitle: string;
}

const ModalDeletePortfolio: React.FC<ModalDeletePortfolioProps> = ({ 
  visible, 
  onClose, 
  onConfirmDelete,
  projectTitle 
}) => {
  const [isModalSavedVisible, setIsModalSavedVisible] = useState(false);

  const handleConfirmDelete = () => {
    onConfirmDelete();
    setIsModalSavedVisible(true);
  };

  const handleModalSavedClose = () => {
    setIsModalSavedVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={visible && !isModalSavedVisible}
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
            top: "24px",
            right: "24px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mb-[25px] mt-[35px]">
          <h3 className="text-heading-md font-bold">
            ¿Estás seguro de eliminar de tu portafolio? "{projectTitle}"
          </h3>

          <div className="flex justify-center mt-[38px]">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ marginRight: "8px", borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-blue3 text-white w-[110px] h-[44px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>

      <ModalSaved 
        visible={isModalSavedVisible} 
        onClose={handleModalSavedClose} 
      />
    </>
  );
};

export default ModalDeletePortfolio;