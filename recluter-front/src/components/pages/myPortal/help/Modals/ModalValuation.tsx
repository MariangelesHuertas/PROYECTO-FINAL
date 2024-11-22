import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import IconClosed from "../../../../../assets/icons/IconClosed.svg";
import RatingV from '../../../../rating/RatingV';
import ModalVal from "./ModalThank";

interface ValuationModalProps {
  visible: boolean;
  onClose: () => void;
  entityName: string; // Nombre del candidato o empresa
}

const ValuationModal: React.FC<ValuationModalProps> = ({
  visible,
  onClose,
  entityName,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [suggestion, setSuggestion] = useState(""); // Nuevo estado para la sugerencia
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleRatingChange = (value: number) => setRating(value);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);
  const handleSuggestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setSuggestion(e.target.value); 

  useEffect(() => {
    const isValid =
      rating > 0 && comment.length > 0 && suggestion.length > 0;
    setIsSubmitDisabled(!isValid);
  }, [rating, comment, suggestion]);

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
            ¡Valora a Merere!
          </h2>
          <h3 className="mt-[16px] mx-[81px] text-heading-md font-bold">
            ¡Ayúdanos a hacerlo mejor!
          </h3>
          <p className="font-medium mx-[39px] text-body-sm mt-[10px]">
            Por favor, a continuación calificanos del 1 al 5 donde 1 es no
            recomendable y 5 completamente recomendable.
          </p>
        </div>

        <div className="text-center mx-[232px]">
          <RatingV
            filledStars={rating}
            onChange={handleRatingChange}
            filledStarClass="filled-star-class"
            emptyStarClass="empty-star-class"
            filledStarStyle={{ color: '#FFD700' }}
            emptyStarStyle={{ color: '#E1E1E1' }}
            showRatingValue={false}
          />
        </div>

        <div className="mx-[49px] mb-[30px] mt-[44px]">
          <div className="mb-[62px]">
            <span className="text-body-md font-normal">
              Escribe tu valoración *
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

          <div className="mb-[64px]">
            <span className="text-body-md font-normal">
              ¿Tienes alguna idea para poder ser mejores?
            </span>
            <Input.TextArea
              rows={5}
              value={suggestion}
              onChange={handleSuggestionChange}
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
              Enviar valoración
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal secundario */}
      <ModalVal
        visible={isSecondModalVisible}
        onClose={() => setIsSecondModalVisible(false)}
        entityName={entityName} // Pasamos el nombre del candidato o la compañía al ModalVal
      />
    </>
  );
};

export default ValuationModal;
