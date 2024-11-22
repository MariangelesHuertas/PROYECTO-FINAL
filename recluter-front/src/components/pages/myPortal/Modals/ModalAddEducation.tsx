import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import InputC from "../../../../components/pages/offers/KillerQuestions/ComponentsKillersQ/Input";
import ModalSaved from "../../myPortal/Modals/ModalSavedChanges";
import ModalDeleteWork from "./ModalDeleteWork";
import SwitchOptions from "../../../../components/pages/myPortal/SwitchOptions";
import SelectBox from "../SelectInput";
import { useDispatch } from "react-redux";
import { GetCentrosEducativosReducer } from "../../../../redux/actions/common/centroEducativo/CentroEducativo";
import { GetCarrerasReducer } from "../../../../redux/actions/common/carrera/Carrera";
import { AddEducationReducer } from "../../../../redux/actions/pages/myPortal/education/PostEducation";
import { GetUserEducationReducer } from "../../../../redux/actions/pages/myPortal/education/GetEducation";
import { AppDispatch } from "../../../../redux/store/store";

interface ModalAddEducationProps {
  visible: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

const validationSchema = Yup.object({
  centerName: Yup.string().required("El nombre del centro es requerido"),
  title: Yup.string().required("El título es requerido"),
  location: Yup.string().required("La ubicación es requerida"),
  specialty: Yup.string().required('La especialidad es requerida'),
  startDate: Yup.date().required("La fecha de inicio es requerida"),
  endDate: Yup.date().when("isCurrentlyStudying", {
    is: false,
    then: (schema) => schema.required("La fecha de fin es requerida"),
    otherwise: (schema) => schema.nullable(),
  }),
  isCurrentlyStudying: Yup.boolean(),
});

const ModalAddEducation: React.FC<ModalAddEducationProps> = ({
  visible, onClose, onDataUpdated
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [centrosEducativos, setCentrosEducativos] = useState<any[]>([]);
  const [carreras, setCarreras] = useState<any[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const [formKey, setFormKey] = useState(0);
  useEffect(() => {
    if (visible) {
      setFormKey(prevKey => prevKey + 1);
    }
  }, [visible]);

  const handleCentroEducativoSearch = async (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(GetCentrosEducativosReducer(value, 1, 5));
        setCentrosEducativos(
          response.payload.data.map((centro: any) => ({
            label: centro.centro_educativo,
            value: centro.id,
          }))
        );
      } catch (error) {
        console.error("Error al obtener centros educativos:", error);
      }
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  const handleCarreraSearch = async (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(GetCarrerasReducer(value, 1, 5));
        setCarreras(
          response.payload.data.map((carrera: any) => ({
            label: carrera.carrera,
            value: carrera.id,
          }))
        );
      } catch (error) {
        console.error("Error al obtener carreras:", error);
      }
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const currentDate = new Date().toISOString();
    const educationData = {
      tipo_educacion_id: 181, // Asume un valor por defecto, ajusta según sea necesario
      centro_educativo_id: values.centroEducativoId,
      carrera_id: values.carreraId,
      nombre_centro_educativo: values.centerName,
      carrera: values.title,
      ubicacion: values.location,
      especialidad: values.specialty,
      fecha_inicio: new Date(values.startDate).toISOString(),
      fecha_final: values.isCurrentlyStudying
        ? currentDate
        : values.endDate
          ? new Date(values.endDate).toISOString()
          : null,
    };

    try {
      const result = await dispatch(AddEducationReducer(educationData));
      if (result && !result.error) {
        setIsSecondModalVisible(true);
        await dispatch(GetUserEducationReducer(3));
        onDataUpdated();
      } else {
        console.error("Error al guardar la educación:", result.error);
      }
    } catch (error) {
      console.error("Error al guardar la educación:", error);
    }
    setSubmitting(false);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
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

        <div className="text-center mx-[86px] mb-[36px] mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Añadir Educación
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <Formik
          key={formKey}
          initialValues={{
            centerName: "",
            centroEducativoId: null,
            title: "",
            carreraId: null,
            location: "",
            startDate: null,
            endDate: null,
            isCurrentlyStudying: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, dirty, isValid }) => (
            <Form className="mx-[68px] mb-[32px] mt-[43px]">
              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Nombre del centro
                </label>
                <Field name="centerName">
                  {({ field }: any) => (
                    <SelectBox
                      {...field}
                      placeholder="Escribe para buscar centros educativos"
                      style={{
                        marginBottom: "23px",
                        borderRadius: "12px",
                        height: "36px",
                        marginTop: "10px",
                      }}
                      options={centrosEducativos}
                      onSearch={handleCentroEducativoSearch}
                      onChange={(value, option) => {
                        setFieldValue(
                          "centerName",
                          Array.isArray(option)
                            ? option[0]?.label
                            : option?.label || value
                        );
                        setFieldValue(
                          "centroEducativoId",
                          Array.isArray(option)
                            ? Number(option[0]?.value)
                            : Number(option?.value)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="centerName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Lugar del centro
                </label>
                <Field
                  name="location"
                  as={InputC}
                  placeholder=""
                  style={{
                    marginBottom: "20px",
                    borderRadius: "12px",
                    height: "36px",
                    marginTop: "10px",
                  }}
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Título
                </label>
                <Field name="title">
                  {({ field }: any) => (
                    <SelectBox
                      {...field}
                      placeholder="Escribe para buscar carreras"
                      style={{
                        marginBottom: "20px",
                        borderRadius: "12px",
                        marginTop: "10px",
                      }}
                      options={carreras}
                      onSearch={handleCarreraSearch}
                      onChange={(value, option) => {
                        setFieldValue(
                          "title",
                          Array.isArray(option)
                            ? option[0]?.label
                            : option?.label || value
                        );
                        setFieldValue(
                          "carreraId",
                          Array.isArray(option)
                            ? Number(option[0]?.value)
                            : Number(option?.value)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Especialidad
                </label>
                <Field
                  name="specialty"
                  as={InputC}
                  placeholder=""
                  style={{
                    marginBottom: "20px",
                    borderRadius: "12px",
                    height: "36px",
                    marginTop: "10px",
                  }}
                />
                <ErrorMessage
                  name="specialty"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <SwitchOptions
                  visible={true}
                  onClose={() => { }}
                  defaultWorking={values.isCurrentlyStudying}
                  onStartDateChange={(date) => setFieldValue("startDate", date)}
                  onEndDateChange={(date) => setFieldValue("endDate", date)}
                  onCurrentlyWorkingChange={(isStudying) => {
                    setFieldValue("isCurrentlyStudying", isStudying);
                    if (isStudying) {
                      setFieldValue("endDate", null);
                    }
                  }}
                  titleText={"¿Sigues estudiando?"}
                />
              </div>

              <div className="flex mx-[86px] justify-center mt-[40px]">
                <Button
                  className="text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
                  onClick={handleDelete}
                >
                  Eliminar
                </Button>
                <Button
                  htmlType="submit"
                  className={`text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center ${!dirty || !isValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  Guardar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <ModalSaved
        visible={isSecondModalVisible}
        onClose={() => setIsSecondModalVisible(false)}
      />
      <ModalDeleteWork
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        skillName={null}
      />
    </>
  );
};

export default ModalAddEducation;