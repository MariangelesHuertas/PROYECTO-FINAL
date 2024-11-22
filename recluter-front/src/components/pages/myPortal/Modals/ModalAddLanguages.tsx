import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import Select from "../Select";
import { GetAllLanguagesReducer } from '../../../../redux/actions/pages/myPortal/languages/GetAllLanguages';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { Language } from "../../../../constants/pages/myPortal/languages/PostLanguagesUser";

interface ModalAddLanguagesProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (newLanguage: Language) => void;
}

const validationSchema = Yup.object({
  idioma_id: Yup.number().required("El idioma es requerido"),
  nivel_idioma_id: Yup.number().required("El nivel es requerido"),
});

const ModalAddLanguages: React.FC<ModalAddLanguagesProps> = ({ visible, onClose, onAdd }) => {
  const dispatch = useDispatch<AppDispatch>();
  const allLanguages = useSelector((state: RootState) => state.getAllLanguages.rex_languages);

  useEffect(() => {
    if (visible && !allLanguages) {
      dispatch(GetAllLanguagesReducer());
    }
  }, [visible, allLanguages, dispatch]);

  const handleSubmit = async (values: { idioma_id: number; nivel_idioma_id: number }, formikHelpers: FormikHelpers<{ idioma_id: number; nivel_idioma_id: number }>) => {
    const selectedLanguage = allLanguages?.find(lang => lang.id === values.idioma_id);
    const selectedLevel = selectedLanguage?.niveles.find(nivel => nivel.id === values.nivel_idioma_id);

    if (selectedLanguage && selectedLevel) {
      const newLanguage: Language = {
        idioma_id: values.idioma_id,
        nivel_idioma_id: values.nivel_idioma_id,
        name: selectedLanguage.idioma,
        level: selectedLevel.nivel
      };
      onAdd(newLanguage);
      formikHelpers.resetForm(); // Resetea el formulario después de añadir el idioma
    }
  };

  const handleClose = (resetForm: () => void) => {
    resetForm(); // Resetea el formulario al cerrar el modal
    onClose();
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={() => handleClose(() => {})}
        footer={null}
        centered
        closable={false}
        width={677}
        bodyStyle={{ borderRadius: "12px" }}
        style={{ borderRadius: "12px", border: "1px solid #E1E1E2", marginTop: "15px", marginBottom: "15px" }}
      >
        <Formik
          initialValues={{ idioma_id: 0, nivel_idioma_id: 0 }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, isValid, resetForm }) => (
            <Form className="mx-[86px] mb-[32px] mt-[24px]">
              <img
                src={IconClosed}
                alt="Cerrar"
                onClick={() => handleClose(resetForm)}
                style={{
                  position: "absolute",
                  top: "34px",
                  right: "34px",
                  cursor: "pointer",
                  width: "24px",
                  height: "24px",
                }}
              />

<div className="text-center mx-[76px] mb-[36px] mt-[20px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Añadir idioma
          </h3>
          <p className="font-medium px-[1px] text-body-sm mt-[10px]">
          Por favor, a continuación edita tu información
          </p>
        </div>

              <div className="flex flex-col space-y-4 mx-[123px]">
                <Field name="idioma_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      placeholder="Idioma"
                      className="w-full"
                      value={field.value || undefined}
                      onChange={(value) => {
                        setFieldValue("idioma_id", value);
                        setFieldValue("nivel_idioma_id", 0);
                      }}
                      options={allLanguages?.map(lang => ({ 
                        label: lang.idioma, 
                        value: lang.id 
                      })) || []}
                    />
                  )}
                </Field>
                <ErrorMessage name="idioma_id" component="div" className="text-red-500" />

                <Field name="nivel_idioma_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      placeholder="Nivel"
                      className="w-full"
                      value={field.value || undefined}
                      onChange={(value) => setFieldValue("nivel_idioma_id", value)}
                      options={allLanguages
                        ?.find(lang => lang.id === values.idioma_id)
                        ?.niveles.map(nivel => ({
                          label: nivel.nivel,
                          value: nivel.id
                        })) || []}
                      disabled={!values.idioma_id}
                    />
                  )}
                </Field>
                <ErrorMessage name="nivel_idioma_id" component="div" className="text-red-500" />
              </div>

              <div className="flex justify-center mt-[40px]">
                <Button
                  onClick={() => handleClose(resetForm)}
                  className="principal-nav-notify-buttonG w-[118px] h-[44px]"
                  style={{ marginRight: "8px", borderRadius: "4px" }}
                >
                  Cancelar
                </Button>
                <Button
                  htmlType="submit"
                  disabled={!isValid || isSubmitting || !allLanguages}
                  className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${!isValid || isSubmitting || !allLanguages ? "bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed" : "bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"}`}
                >
                 Guardar Cambios
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalAddLanguages;