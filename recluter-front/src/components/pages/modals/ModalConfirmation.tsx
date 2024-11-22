import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Rate } from "antd";
import IconClosed from "../../../assets/icons/IconClosed.svg";

interface ValuationModalProps {
  visible: boolean;
  onClose: () => void;
}

const ValuationModal: React.FC<ValuationModalProps> = ({
  visible,
  onClose,
}) => {

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

      <div className="text-center mx-[114px] mb-[36px] mt-[55px]">
        <h3 className="text-heading-md font-bold">
          Por favor, confirma tu correo
        </h3>
        <p className="font-medium px-[25px] text-body-sm mt-[10px] mb-[48px]">
        Confirma tu correo para que tu valoración se aplique correctamente y tu también encuentres tu “trabajo ideal"
        </p>
        <h2 className="text-heading-md font-bold text-blue3">
        ¡Gracias por registrarte en Merēre!
        </h2>
      </div>
    </Modal>
  );
};

export default ValuationModal;
