import React, { useState } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../../assets/icons/IconClosed.svg";
import { useDispatch } from "../../../../../redux/store/hooks";
import { AppDispatch } from "../../../../../redux/store/store";
import { SignUpOfferReducer } from "../../../../../redux/actions/offers/SignUpOffer";
import { useNavigate } from "react-router-dom";

interface ModalRegistrationProps {
  visible: boolean;
  onClose: () => void;
  offer_id: number;
  cv_usuario_id: number | null;
  portafolio_usuario_id: number | null;
}

const ModalRegistration: React.FC<ModalRegistrationProps> = ({ 
  visible, 
  onClose,
  offer_id,
  cv_usuario_id,
  portafolio_usuario_id
 }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleAcceptClick = async () => {
    onClose();
    setIsSecondModalVisible(true);
    await dispatch(SignUpOfferReducer(offer_id, cv_usuario_id, portafolio_usuario_id))
    navigate('/myApplications/applications')
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        // centered
        closable={false}
        width={677}
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

        <div className="text-center mb-[36px] mt-[20px]">
          <h3 className="mt-[16px] text-heading-md font-bold">
            ¡Te has inscripto con éxito!
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
              onClick={handleAcceptClick}
              className="bg-blue3 text-white w-[110px] h-[44px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegistration;
