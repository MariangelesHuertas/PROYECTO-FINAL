import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import IconClosed from "../../../../../assets/icons/IconClosed.svg";
import Upload from '../../../../../assets/icons/upload.svg';
import ModalVal from "./ModalThanksHelp";

interface ModalErrorProps {
  visible: boolean;
  onClose: () => void;
  entityName: string; // Nombre del candidato o empresa
}

const ModalError: React.FC<ModalErrorProps> = ({
  visible,
  onClose,
  entityName,
  
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  useEffect(() => {
    // Actualiza la lógica para habilitar o deshabilitar el botón
    setIsSubmitDisabled(comment.trim().length === 0);
  }, [comment]);

  const handleSendValuation = () => {
    if (!isSubmitDisabled) {
      onClose();
      setIsSecondModalVisible(true);
    }
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
        style={{
          borderRadius: "12px",
          border: "1px solid #E1E1E2",
          marginTop: "15px",
          marginBottom: "15px",
        }}
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

        <div className="text-center mx-[86px] mb-[36px] mt-[72px]">
          <h2 className="text-heading-md font-bold text-blue3">
            ¡Sentimos el error!
          </h2>
          <h3 className="mt-[16px] mx-[81px] text-heading-md font-bold">
            ¡Ayúdanos a resolverlo!
          </h3>
          <p className="font-medium mx-[39px] text-body-sm mt-[10px]">
            Por favor, cuéntanos el error para poder trabajar en ello.
          </p>
        </div>

        <div className="mx-[49px] mb-[30px] mt-[44px]">
          <div className="mb-[62px]">
            <span className="text-body-md font-normal">
              Cuéntanos el error *
            </span>
            <Input.TextArea
              rows={5}
              value={comment}
              onChange={handleCommentChange}
              className="w-full 
                border
                my-[8px]
                border-[#D9D9D9] 
                placeholder:text-green32 
                focus:placeholder:text-grays 
                hover:placeholder:text-black 
                hover:bg-gray3 
                hover:border-2 
                hover:border-[#D9D9D9]
                hover:text-black 
                focus:border-4 
                focus:border-[#91c3fd] 
                focus:text-[#757575]
                rounded-[8px] 
                transition-all 
                duration-200 
                text-[#757575]
                font-normal
                text-body-md"
              style={{ height: 80 }}
            />
            <span className="text-body-md font-normal text-[#757575]">
              Máximo 400 caracteres
            </span>
          </div>
          <div className="mb-[48px]">
            <img
              src={Upload}
              alt="Cargar"
              className="inline-block text-sky-blue0 cursor-pointer w-[24px] pb-[4px]"
            />
            <span className="text-body-sm font-medium ml-[10px]">
              Adjuntar imagen (opcional)
            </span>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ marginRight: "8px", borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              disabled={isSubmitDisabled}
              onClick={handleSendValuation}
              className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${
                isSubmitDisabled
                  ? "bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed"
                  : "bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"
              }`}
            >
              Enviar comentario
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal secundario */}
      <ModalVal
        visible={isSecondModalVisible}
        onClose={() => setIsSecondModalVisible(false)}
        entityName={entityName}
      />
    </>
  );
};

export default ModalError;
