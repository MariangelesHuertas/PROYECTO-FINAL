import React from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";

interface ModalConfirmProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  error?: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ visible, onClose, onConfirm, loading, error }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={670}
      bodyStyle={{ borderRadius: "12px" }}
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

      <div className="text-center mx-[100px] my-[35px]">
        <h3 className="text-heading-md font-bold mb-[11px]">
          Confirmar cambio de fase
        </h3>
        <p className="font-medium text-body-sm">¿Estás seguro que quieres continuar con el cambio de fase?</p>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <div className="flex justify-center mx-[114px] mt-[38px]">
          <Button
            onClick={onClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue3 text-white w-[110px] h-[44px] ml-[90px] principal-nav-notify-button2 rounded-[4px]"
            loading={loading}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;