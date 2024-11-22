import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import ModalSaved from '../../myPortal/Modals/ModalSavedChanges';
import { useDispatch, useSelector } from "react-redux";
import { UpdateSobreMiReducer } from "../../../../redux/actions/pages/myPortal/aboutMe/AboutMe"; // Asume que existe esta acción
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { ValidateTokenAuthReducer } from "../../../../redux/actions/auth/Auth";

interface ModalEditAboutMeProps {
  visible: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  sobreMi: Yup.string()
    .required("Este campo es requerido")
    .max(400, "Máximo 400 caracteres"),
});

const ModalEditAboutMe: React.FC<ModalEditAboutMeProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  
  // Obtener el valor de sobreMi desde el estado global (redux)
  const { rex_user } = useSelector(({ auth }: any) => auth);

  // Valores iniciales del formulario
  const initialValues = {
    sobreMi: rex_user?.sobreMi || "", // Asignar el valor actual de sobreMi
  };

  // Handle submit para guardar los cambios
  const handleSubmit = async (values: { sobreMi: string }, { setSubmitting }: any) => {
    try {
      const result = await dispatch(UpdateSobreMiReducer(values.sobreMi));
      if (result && !result.error) {
        setIsSecondModalVisible(true); // Mostrar modal de guardado exitoso
        onClose(); // Cerrar el modal actual
      } else {
        console.error("Error al actualizar el perfil:", result.error);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
    setSubmitting(false);
  };

  // Handler para cerrar el segundo modal y recargar la página
  const handleSecondModalClose = () => {
    setIsSecondModalVisible(false);
    dispatch(ValidateTokenAuthReducer());
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

        <div className="text-center mx-[86px] mb-[36px] mt-[72px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar Sobre mí
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        {/* Formik para manejar la edición del campo sobreMi */}
        <Formik
          initialValues={initialValues} // Cargar el valor inicial de redux
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Asegura que los valores de Formik se actualicen si cambia el valor en redux
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="mx-[86px] mb-[32px] mt-[40px]">
              <div>
                <label htmlFor="sobreMi" className="text-body-md text-[#757575] font-normal">
                  Sobre mí
                </label>
                <Field
                  name="sobreMi"
                  as="textarea"
                  className="w-full 
                    border 
                    py-2 
                    px-2 
                    my-[8px]
                  border-[#D9D9D9] 
                  placeholder:text-green32 
                  focus:placeholder:text-grays 
                  hover:placeholder:text-black 
                  hover:bg-gray3 hover:border-2 
                  hover:border-[#D9D9D9] 
                  hover:text-black 
                  focus:border-4 
                  focus:border-[#91c3fd] 
                  !focus:border-[#91c3fd] 
                  focus:outline-none
                  focus:text-[#757575] 
                  rounded-[8px] 
                  transition-all 
                  duration-200 
                  text-[#757575] 
                  font-normal 
                  text-body-md"
                  style={{ height: 80 }}
                />
                {/* ErrorMessage muestra mensajes de validación */}
                <ErrorMessage name="sobreMi" component="div" className="text-red-500" />
                <span className="text-body-md font-normal text-[#757575]">
                  Máximo 400 caracteres
                </span>
              </div>

              <div className="flex justify-center mt-[40px]">
                <Button
                  onClick={onClose}
                  className="principal-nav-notify-buttonG w-[118px] h-[44px]"
                  style={{ marginRight: "8px", borderRadius: "4px" }}
                >
                  Cancelar
                </Button>
                <Button
                  htmlType="submit"
                  disabled={!dirty || !isValid || isSubmitting}
                  className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${
                    !dirty || !isValid || isSubmitting
                      ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed'
                      : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'
                  }`}
                >
                  Guardar cambios
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* ModalSaved se muestra después de guardar los cambios */}
      <ModalSaved 
        visible={isSecondModalVisible} 
        onClose={handleSecondModalClose} // Recargar la página al cerrar
      />
    </>
  );
};

export default ModalEditAboutMe;
