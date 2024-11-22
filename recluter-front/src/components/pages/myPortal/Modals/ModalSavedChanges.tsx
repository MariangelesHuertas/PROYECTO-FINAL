import React from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";

interface ModalSavedProps {
  visible: boolean;
  onClose: () => void; // Esta función recargará la página al cerrarse
}

const ModalSaved: React.FC<ModalSavedProps> = ({ visible, onClose }) => {
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
          top: "34px",
          right: "34px",
          cursor: "pointer",
          width: "24px",
          height: "24px",
        }}
      />

      <div className="text-center mb-[25px] mt-[35px]">
        <h3 className="text-heading-md font-bold">
          Cambios guardados con éxito
        </h3>

        <div className="flex justify-center mx-[114px] mt-[38px]">
          <Button
            onClick={onClose} // Cerrar modal y recargar página
            className="bg-blue3 text-white w-[110px] h-[44px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSaved;
