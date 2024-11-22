import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import IconClosed from "../../../assets/icons/IconClosed.svg";
import GoogleIcon from "../../../assets/icons/IconG.svg";
import FacebookIcon from "../../../assets/icons/IconF.svg";
import InputC from "../../../components/pages/offers/KillerQuestions/ComponentsKillersQ/Input";
import ModalVal from '../modals/ModalVal';
import RatingV from '../../rating/RatingV';

// Ejemplo de imágenes de perfil
import DefaultCandidateImage from '../../../assets/img/MyPortal/ImageP.svg';
import DefaultCompanyImage from '../../../assets/img/company/logo_example.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { ValueCandidateReducer, ValueCompanyReducer } from "../../../redux/actions/enterprise/rating/ValueCompany";
import { GetCompanyRatingsReducer } from "../../../redux/actions/pages/company/rating/GetRatingCompany";
import { useParams } from "react-router-dom";

interface ValuationModalProps {
  visible: boolean;
  onClose: () => void;
  entityName: string; // Nombre del candidato o empresa
  entityType: 'candidate' | 'company'; // Tipo de entidad
  linkVal: string;
}

const ModalValorarPerfil: React.FC<ValuationModalProps> = ({
  visible,
  onClose,
  entityName,
  entityType,
  linkVal
}) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_validate_user
  } = useSelector(({ auth }: any) => auth);
  const {
    rex_loading
  } = useSelector(({ valueCompany }: any) => valueCompany);
  const token = localStorage.getItem('token');

  const { empresa_id } = useParams<{ empresa_id: string }>();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleRatingChange = (value: number) => setRating(value);
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  useEffect(() => {
    // const isValid = rating > 0 && comment.length > 0 && name.length > 0 && email.length > 0;
    const isValid = rating > 0 && comment.length > 0;
    setIsSubmitDisabled(!isValid);
  }, [rating, comment, name, email]);

  const handleSendValuation = async () => {
    if (!isSubmitDisabled) {
      onClose();
      setIsSecondModalVisible(true);
    }
  };

  // Determinar la imagen según el tipo de entidad
  const entityImage = entityType === 'candidate' ? DefaultCandidateImage : DefaultCompanyImage;

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
        style={{ borderRadius: "12px", border: "1px solid #E1E1E2", marginTop: '15px', marginBottom: '15px' }}
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

        <div className="text-center mx-[86px] mb-[36px] mt-[30px]">
          <h2 className="text-heading-md font-bold text-blue3">
            ¡Te damos la bienvenida a Merēre!
          </h2>
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Valora {entityType === 'candidate' ? `a ${entityName}` : `a ${entityName}`}
          </h3>

          {/* Imagen circular centrada */}
          <div className="flex justify-center my-[16px]">
            <img
              src={entityImage}
              alt={`${entityName}`}
              className="rounded-full w-[100px] h-[100px] object-cover"
            />
          </div>

          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación califica {entityType === 'candidate' ? `a ${entityName}` : `a ${entityName}`} del 1 al 5 donde 1 es no
            recomendable y 5 completamente recomendable.
          </p>
        </div>

        <div className="text-center mb-[18px] mx-[232px]">
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

        <div className="mx-[49px] mb-[30px] mt-[26px]">
          <span className="text-body-md font-normal">
            Escribe tu valoración *
          </span>
          <Input.TextArea
            rows={5}
            value={comment}
            onChange={handleCommentChange}
            className="w-full border my-[8px] border-[#D9D9D9] placeholder:text-green32 focus:placeholder:text-grays hover:placeholder:text-black hover:bg-gray3 hover:border-2 hover:border-[#D9D9D9] hover:text-black focus:border-4 focus:border-[#91c3fd] focus:text-[#757575] rounded-[8px] transition-all duration-200 text-[#757575] font-normal text-body-md"
            style={{ height: 80 }}
          />
          <span className="text-body-md font-normal text-[#757575]">
            Máximo 400 caracteres
          </span>

          {
            !rex_validate_user && !token ? (
              <>
                <div className="flex flex-col items-center mt-[31px] mb-6 mx-[117px]">
                  <span className="text-body-sm font-normal mb-[23px] text-[#757575]">
                    Regístrate en menos de 1 minuto
                  </span>
                  <Button
                    icon={
                      <img
                        src={GoogleIcon}
                        alt="Google"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                    }
                    className="principal-nav-notify-buttonG ml-[0px] w-full max-w-xs mb-[28px]"
                  >
                    Sign in with Google
                  </Button>

                  <Button
                    icon={
                      <img
                        src={FacebookIcon}
                        alt="Facebook"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                    }
                    className="principal-nav-notify-buttonG ml-[0px] w-full max-w-xs"
                  >
                    Sign in with Facebook
                  </Button>
                </div>

                <span className="text-body-sm font-medium text-[#5F5F5F]">
                  Nombre completo (Opcional)
                </span>
                <InputC
                  placeholder="Escribe tu nombre"
                  value={name}
                  onChange={handleNameChange}
                  style={{
                    marginBottom: "23px",
                    borderRadius: "12px",
                    height: "36px",
                    marginTop: "10px",
                  }}
                />

                <span className="text-body-sm font-medium text-[#5F5F5F]">
                  Email
                </span>
                <InputC
                  placeholder="Escribe tu email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    marginBottom: "20px",
                    borderRadius: "12px",
                    height: "36px",
                    marginTop: "10px",
                  }}
                />
              </>
            ) : null
          }

          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ marginRight: "8px", borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              disabled={rex_loading}
              onClick={handleSendValuation}
              className={
                `w-[181px] h-[44px] ml-[18px] rounded-[4px] ${rex_loading ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed' : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'}`}
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
        entityName={entityName}
        entityType={entityType}
        showModalRegister={
          !rex_validate_user && !token ? true : false
        }
        onSend={async () => {
          if(entityType == "company"){
            await dispatch(ValueCompanyReducer({
              link_valoracion: linkVal,
              observacion: comment,
              valoracion: rating
            }))
            if (empresa_id) dispatch(GetCompanyRatingsReducer(parseInt(empresa_id, 10)))
          } else {
            await dispatch(ValueCandidateReducer({
              link_valoracion: linkVal,
              observacion: comment,
              valoracion: rating
            }))
          }
          
        }}
      />
    </>
  );
};

export default ModalValorarPerfil;
