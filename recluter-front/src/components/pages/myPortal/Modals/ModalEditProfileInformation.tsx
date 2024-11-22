import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import InputC from "../../../../components/pages/offers/KillerQuestions/ComponentsKillersQ/Input";
import ModalSaved from '../../myPortal/Modals/ModalSavedChanges';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { UpdateProfileReducer } from "../../../../redux/actions/pages/myPortal/profile/Profile";
import { ValidateTokenAuthReducer } from "../../../../redux/actions/auth/Auth";

interface ModalEditProfileProps {
  visible: boolean;
  onClose: () => void;
  context: "myPortal" | "OfferRegistration"; // Definir contextos diferentes
}

const ModalEditProfile: React.FC<ModalEditProfileProps> = ({
  visible, onClose, context
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_user } = useSelector(({ auth }: any) => auth);
  const { rex_loading, rex_error } = useSelector(({ profile }: any) => profile);

  const [formData, setFormData] = useState<Record<string, string>>({
    "nombre": rex_user?.personas?.nombre,
    "apellido_paterno": rex_user?.personas?.apellido_paterno,
    "apellido_materno": rex_user?.personas?.apellido_materno,
    "jornada": rex_user?.jornada,
    "modalidad": rex_user?.modalidad
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  // Configuración de campos basada en el contexto
  const fieldConfigs = context === "myPortal"
    ? [
      { name: 'nombre', label: 'Nombre', value: '' },
      { name: 'apellido_paterno', label: 'Primer apellido', value: '' },
      { name: 'apellido_materno', label: 'Segundo Apellido', value: '' },
      { name: 'jornada', label: 'Jornada Laboral', value: '' },
      { name: 'modalidad', label: 'Modalidad', value: '' },
    ]
    : [
      { name: 'fullName', label: 'Nombre Completo', value: '' },
      { name: 'email', label: 'Correo electrónico', value: '' },
      { name: 'cityState', label: 'Ciudad/Estado', value: '' },
      { name: 'phoneNumber', label: 'Número de teléfono', value: '' },
    ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  useEffect(() => {
    const allFieldsFilled = fieldConfigs.every(field => formData[field.name]?.length > 0);
    setIsSubmitDisabled(!allFieldsFilled);
  }, [formData, fieldConfigs]);

  const handleSaveChanges = async () => {
    if (!isSubmitDisabled) {
      const personas = {personas:formData.nombre}
      console.log(personas, "marycccc")
      await dispatch(UpdateProfileReducer(formData))
      if (!rex_error) {
        await dispatch(ValidateTokenAuthReducer());
      }

      onClose(); // Close the current modal
      setIsSecondModalVisible(true); // Show the second modal
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
        <div className="text-center mx-[86px] mb-[36px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar Información de perfil
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[86px] mb-[32px] mt-[40px]">
          {fieldConfigs.map((field) => (
            <div key={field.name}>
              <span className="text-body-md font-medium text-[#5F5F5F]">
                {field.label}
              </span>
              <InputC
                placeholder=""
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(e, field.name)}
                style={{
                  marginBottom: "23px",
                  borderRadius: "12px",
                  height: "36px",
                  marginTop: "10px",
                }}
              />
            </div>
          ))}

          <div className="flex justify-center mt-[40px]">
            <Button
              onClick={onClose}
              className="principal-nav-notify-buttonG w-[118px] h-[44px]"
              style={{ marginRight: "8px", borderRadius: "4px" }}
            >
              Cancelar
            </Button>
            <Button
              disabled={rex_loading}
              onClick={handleSaveChanges}
              className={
                `w-[181px] h-[44px] ml-[18px] rounded-[4px] 
                ${rex_loading
                  ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed'
                  : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'
                }
                `
              }
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </Modal>

      {/* Second Modal */}
      <ModalSaved
        visible={isSecondModalVisible}
        onClose={() => setIsSecondModalVisible(false)}
      />
    </>
  );
};

export default ModalEditProfile;
