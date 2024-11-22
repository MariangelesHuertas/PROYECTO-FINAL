import React, { useState } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../../assets/icons/IconClosed.svg";

interface ModalExitProps {
  visible: boolean;
  onClose: () => void;
}

const ModalExit: React.FC<ModalExitProps> = ({ visible, onClose}) => {
const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

const handleAcceptClick = () => {
onClose();
setIsSecondModalVisible(true);
};

return (
    <>
    <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        // centered
        closable={false}
        width={860}
        bodyStyle={{ borderRadius: "12px" }}
        // style={{ borderRadius: "12px", border: "1px solid #E1E1E2" }}
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

        <div className="text-center mx-[136px] my-[35px]">
          <h3 className="text-heading-md font-bold mb-[11px]">
          ¿Estás seguro de que quieres salir?
          </h3>
          <p className="font-medium text-body-sm">No se registrará tu inscripción</p>

          <div className="flex justify-center mx-[114px] mt-[38px]">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAcceptClick}
              className="bg-blue3 text-white w-[110px] h-[44px] ml-[90px] principal-nav-notify-button2 rounded-[4px]"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalExit;
