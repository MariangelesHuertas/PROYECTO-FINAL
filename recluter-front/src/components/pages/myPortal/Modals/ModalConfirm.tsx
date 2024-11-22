import React from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";

interface ModalConfirmProps {
  visible: boolean;
  onClose: () => void;
  message: string | null;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ visible, onClose, message }) => {
  return (
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
          top: "24px",
          right: "24px",
          cursor: "pointer",
          width: "24px",
          height: "24px",
        }}
      />

      <div className="text-center my-[71px]">
        <h3 className="text-heading-md font-bold mx-[44px]">
        Has eliminado a de tus habilidades  {message}
        </h3>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
