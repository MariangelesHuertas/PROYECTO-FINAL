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
import { GetSectorsReducer } from "../../../../redux/actions/common/sectors/Sectors";
import { GetEmpresasReducer } from "../../../../redux/actions/common/company/Company";
import { AddExperienceReducer } from "../../../../redux/actions/pages/myPortal/workExperience/PostWorkExperience";
import { GetUserExperiencesReducer } from "../../../../redux/actions/pages/myPortal/workExperience/GetWorkExperience";
import { AppDispatch } from "../../../../redux/store/store";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);

interface ModalAddWorkProps {
  visible: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

const validationSchema = Yup.object({
  companyName: Yup.string().required("El nombre de la empresa es requerido"),
  jobTitle: Yup.string().required("El puesto de trabajo es requerido"),
  sector: Yup.string().required("El sector es requerido"),
  workLocation: Yup.string().required("El lugar de trabajo es requerido"),
  startDate: Yup.date().required("La fecha de inicio es requerida"),
  endDate: Yup.date().when("isCurrentlyWorking", {
    is: false,
    then: (schema) => schema.required("La fecha de fin es requerida"),
    otherwise: (schema) => schema.nullable(),
  }),
  isCurrentlyWorking: Yup.boolean(),
});

const ModalAddWork: React.FC<ModalAddWorkProps> = ({ visible, onClose, onDataUpdated }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDeleteSkillModalVisible, setIsDeleteSkillModalVisible] = useState(false);
  const [sectores, setSectores] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [totalDuration, setTotalDuration] = useState<string>("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (visible) {
      setFormKey(prevKey => prevKey + 1);
    }
  }, [visible]);

  const calculateDuration = (startDate: string | null, endDate: string | null, isCurrentlyWorking: boolean) => {
    if (!startDate) return;

    const start = dayjs(startDate);
    const end = isCurrentlyWorking ? dayjs() : dayjs(endDate);

    if (start.isAfter(end)) {
      setTotalDuration("0 años, 0 meses");
      return;
    }

    const diffInYears = end.diff(start, "year");
    const diffInMonths = end.diff(start, "month") % 12;

    setTotalDuration(`${diffInYears} años, ${diffInMonths} meses`);
  };

  const handleSectorSearch = async (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(GetSectorsReducer(value, 1, 5));
        setSectores(
          response.payload.data.map((sector: any) => ({
            label: sector.sector,
            value: sector.id,
          }))
        );
      } catch (error) {
        console.error("Error al obtener sectores:", error);
      }
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  const handleCompanySearch = async (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(async () => {
      try {
        const response = await dispatch(GetEmpresasReducer(value, 1, 5));
        setCompanies(
          response.payload.data.map((company: any) => ({
            label: company.empresa,
            value: company.id,
          }))
        );
      } catch (error) {
        console.error("Error al obtener empresas:", error);
      }
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const currentDate = dayjs().toISOString();
    const experienceData = {
      empresa_id: values.companyId,
      sector_id: values.sectorId,
      cargo: values.jobTitle,
      descripcion: values.comment,
      nombre_empresa: values.companyName,
      nombre_sector: values.sector,
      lugar_trabajo: values.workLocation,
      fecha_inicio: new Date(values.startDate).toISOString(),
      fecha_fin: values.isCurrentlyWorking
        ? currentDate
        : values.endDate
        ? new Date(values.endDate).toISOString()
        : null,
    };

    try {
      const result = await dispatch(AddExperienceReducer(experienceData));
      if (result && !result.error) {
        setIsSecondModalVisible(true);
        await dispatch(GetUserExperiencesReducer(3)); 
        onDataUpdated();
      } else {
        console.error("Error al guardar la experiencia laboral:", result.error);
      }
    } catch (error) {
      console.error("Error al guardar ala experiencia laboral:", error);
    }
    setSubmitting(false);
  };

  const handleDeleteSkill = () => {
    setIsDeleteSkillModalVisible(true);
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
            Añadir Experiencia laboral
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <Formik
          key={formKey}
          initialValues={{
            companyName: "",
            companyId: null,
            jobTitle: "",
            sector: "",
            sectorId: null,
            workLocation: "",
            comment: "",
            startDate: null,
            endDate: null,
            isCurrentlyWorking: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, dirty, isValid }) => (
            <Form className="mx-[68px] mb-[32px] mt-[43px]">
              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Nombre de la empresa
                </label>
                <Field name="companyName">
                  {({ field }: any) => (
                    <SelectBox
                      {...field}
                      placeholder="Escribe para buscar empresas"
                      style={{
                        marginBottom: "23px",
                        borderRadius: "12px",
                        height: "36px",
                        marginTop: "10px",
                      }}
                      options={companies}
                      onSearch={handleCompanySearch}
                      onChange={(value, option) => {
                        setFieldValue(
                          "companyName",
                          Array.isArray(option)
                            ? option[0]?.label
                            : option?.label || value
                        );
                        setFieldValue(
                          "companyId",
                          Array.isArray(option)
                            ? Number(option[0]?.value)
                            : Number(option?.value)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Puesto de trabajo
                </label>
                <Field
                  name="jobTitle"
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
                  name="jobTitle"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Sector
                </label>
                <Field name="sector">
                  {({ field }: any) => (
                    <SelectBox
                      {...field}
                      placeholder="Escribe para buscar sectores"
                      style={{
                        marginBottom: "20px",
                        borderRadius: "12px",
                        marginTop: "10px",
                      }}
                      options={sectores}
                      onSearch={handleSectorSearch}
                      onChange={(value, option) => {
                        setFieldValue(
                          "sector",
                          Array.isArray(option)
                            ? option[0]?.label
                            : option?.label || value
                        );
                        setFieldValue(
                          "sectorId",
                          Array.isArray(option)
                            ? Number(option[0]?.value)
                            : Number(option?.value)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="sector"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label className="text-body-md font-normal text-[#5F5F5F]">
                  Lugar de trabajo
                </label>
                <Field
                  name="workLocation"
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
                  name="workLocation"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <SwitchOptions
                  visible={true}
                  onClose={() => {}}
                  defaultWorking={values.isCurrentlyWorking}
                  onStartDateChange={(date) => {
                    setFieldValue("startDate", date);
                    calculateDuration(date, values.isCurrentlyWorking ? dayjs().toISOString() : values.endDate, values.isCurrentlyWorking);
                  }}
                  onEndDateChange={(date) => {
                    setFieldValue("endDate", date);
                    calculateDuration(values.startDate, date, values.isCurrentlyWorking);
                  }}
                  onCurrentlyWorkingChange={(isWorking) => {
                    setFieldValue("isCurrentlyWorking", isWorking);
                    if (isWorking) {
                      setFieldValue("endDate", dayjs().toISOString());
                    }
                    calculateDuration(values.startDate, isWorking ? dayjs().toISOString() : values.endDate, isWorking);
                  }}
                />
              </div>

              <h2 className="mt-3 text-[#5F5F5F] text-body-md font-medium text-gray-800">
                Tiempo total: {totalDuration}
              </h2>

              <div className="mb-[32px] mt-[40px]">
                <label className="text-body-md font-normal">
                  Descripción del trabajo
                </label>
                <Field
                  name="comment"
                  as="textarea"
                  className="w-full border py-2 px-2 my-[8px] border-[#D9D9D9] placeholder:text-green32 focus:placeholder:text-grays hover:placeholder:text-black hover:bg-gray3 hover:border-2 hover:border-[#D9D9D9] hover:text-black focus:border-4 focus:border-[#91c3fd] !focus:border-[#91c3fd] focus:outline-none focus:text-[#757575] rounded-[8px] transition-all duration-200 text-[#757575] font-normal text-body-md"
                  style={{ height: 80 }}
                />
              </div>

              <div className="flex mx-[86px] justify-center mt-[40px]">
                <Button
                  className="text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
                  onClick={handleDeleteSkill}
                >
                  Eliminar
                </Button>
                <Button
                  htmlType="submit"
                  className={`text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center ${
                    !dirty || !isValid ? "opacity-50 cursor-not-allowed" : ""
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
        visible={isDeleteSkillModalVisible}
        onClose={() => setIsDeleteSkillModalVisible(false)}
        skillName={null}
      />
    </>
  );
};

export default ModalAddWork;