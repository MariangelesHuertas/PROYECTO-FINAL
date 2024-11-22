import React, { useEffect, useState } from "react";
import { EyeFilled } from "@ant-design/icons";
import { Row, Col, Button, App, Divider, Segmented } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import Header from "../../../components/pages/principalNav/HeaderOffers";
import "../../../styles/pages/offers/estilos.css";
import InputC from "../../../components/pages/offers/CreateOffers/Input";
import Select from "../../../components/pages/offers/CreateOffers/Select";
import Sliders from "../../../components/pages/offers/CreateOffers/Slider";
import ModalPreview from "../../../components/pages/offers/CreateOffers/modals/ModalPreview";
import CustomButton from "../../../components/pages/offers/CreateOffers/Buttons";
import CustomTag from "../../../components/pages/offers/CreateOffers/CustomTag";
import "../../../components/styles/pages/principalNav/PrincipalNav.css";
import CheckboxC from "../../../components/checkbox/CheckboxProps";
import Ckeditor from "../../../components/pages/offers/CreateOffers/Ckeditor";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { CreateOfferReducer, ResetCreateOfferReducer } from "../../../redux/actions/offers/CreateOffers";
import { GetOfferDetailReducer } from "../../../redux/actions/pages/offers/offer/GetOffer";
import { GetKeywordsReducer } from "../../../redux/actions/common/keywords/Keywords";
import { GetSkillsReducer } from "../../../redux/actions/common/skills/Skills";
import { GetSectorsReducer } from "../../../redux/actions/common/sectors/Sectors";
import * as Yup from 'yup';
import SelectBasic from "../../../components/pages/offers/CreateOffers/SelectBasic";

interface offerCreate {
  sector_id: number | null;
  cargo: string;
  descripcion: string;
  tipo: string;
  ubi_provincia: string;
  ubi_poblacion: string;
  sal_min: number;
  sal_max: number;
  abanico_salarial: string;
  anios_experiencia: number;
  estudios_minimos: string | null;
  tipo_contrato: string;
  jornada_laboral: string;
  palabras_clave_ofertas: [];
  aptitudes_ofertas: [];
}

const validationSchema = Yup.object().shape({
  cargo: Yup.string()
    .required('El puesto es requerido'),
  ubi_provincia: Yup.string()
    .required('La provincia es requerida'),
  ubi_poblacion: Yup.string()
    .required('La población es requerida'),
  sal_min: Yup.number()
    .typeError('Debe ser un número')
    .required('El salario mínimo es requerido')
    .min(0, 'El salario mínimo debe ser mayor o igual a 0'),
  sal_max: Yup.number()
    .required('El salario maximo es requerido'),
  descripcion: Yup.string()
    .required('La descripción es requerida'),
  estudios_minimos: Yup.string()
    .required('Los estudios minimos son requeridos'),
  anios_experiencia: Yup.string()
    .required('Los años de experiencia son requeridos'),
  sector_id: Yup.number()
    .required('El sector es requerido'),
  tipo_contrato: Yup.string()
    .required('El tipo de contrato es requerido'),
  jornada_laboral: Yup.string()
    .required('La jornada laboral es requerida'),
  aptitudes_ofertas: Yup.array()
    .min(1, 'Debe tener al menos una aptitud')
    .required('Las aptitudes son requeridas'),
  palabras_clave_ofertas: Yup.array()
    .min(1, 'Debe tener al menos una palabra clave')
    .required('Las palabras clave son requeridas'),
});

const CreateOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { notification } = App.useApp();

  const {
    rex_loading,
    rex_request,
    rex_failed
  } = useSelector(({ createOffers }: any) => createOffers);

  const [aptitudes, setAptitudes] = useState<any[]>([]);
  const [selectedAptitudes, setSelectedAptitudes] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<any>([]);
  const [sectores, setSectores] = useState<any[]>([]);
  const [selectedSectores, setSelectedSectores] = useState<string[]>([]);
  const { rex_offer_detail } = useSelector((state: RootState) => state.getOfferID);
  const [offerDetails, setOfferDetails] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  

  const showModal = (values: any) => {
    setModalData(values);  // Almacena los datos del formulario en el estado modalData
    setIsModalVisible(true);  // Muestra el modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);  // Cierra el modal
  };

  const [initialValues, setInitialValues] = useState<offerCreate>({
    sector_id: null,
    cargo: "",
    tipo: "inserte tipo",
    anios_experiencia: 0,
    descripcion: "",
    ubi_poblacion: "",
    ubi_provincia: "",
    sal_max: 0,
    sal_min: 0,
    abanico_salarial: "Año",
    estudios_minimos: null,
    tipo_contrato: "",
    jornada_laboral: "",
    palabras_clave_ofertas: [],
    aptitudes_ofertas: []
  });


  const handleSectorClose = (sector: string) => {
    setSelectedSectores((prev) => prev.filter((item) => item !== sector));
  };

  const handleKeywordRemove = (keyword: number, setFieldValue: any) => {
    setSelectedKeywords((prev: any) => {
      const newRpta = prev.filter((item: any) => item.key !== keyword);
      setFieldValue("palabras_clave_ofertas", newRpta)
      return newRpta
    });
  };

  const handleSkillsRemove = (skill: number, setFieldValue: any) => {
    setSelectedAptitudes((prev: any) => {
      const newRpta = prev.filter((item: any) => item.key !== skill);
      setFieldValue("aptitudes_ofertas", newRpta)
      return newRpta
    });
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  type Align = "start" | "center" | "end";
  const [alignValue, setAlignValue] = React.useState<Align>("center");

  useEffect(() => {
    if (rex_request) {
      if (rex_request.respuesta) {
        dispatch(ResetCreateOfferReducer());
        notification.success({ message: rex_request.mensaje });
        navigate(`/offer/killerQuestions/${rex_request.data.id}`);
      }
    }
  }, [rex_request, notification, navigate]);

  useEffect(() => {
    if (rex_failed) {

    }
  }, [rex_failed]);

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(GetOfferDetailReducer(parseInt(id)));
    }
  }, [isEditMode, id]);

  useEffect(() => {
    if (isEditMode && rex_offer_detail) {
      setInitialValues({
        ...rex_offer_detail,
        sector_id: rex_offer_detail.sector_id,
        cargo: rex_offer_detail.cargo,
        descripcion: rex_offer_detail.descripcion,
        tipo: rex_offer_detail.tipo,
        ubi_provincia: rex_offer_detail.ubi_provincia,
        ubi_poblacion: rex_offer_detail.ubi_poblacion,
        sal_min: rex_offer_detail.sal_min,
        sal_max: rex_offer_detail.sal_max,
        abanico_salarial: rex_offer_detail.abanico_salarial,
        anios_experiencia: rex_offer_detail.anios_experiencia,
        estudios_minimos: rex_offer_detail.estudios_minimos,
        tipo_contrato: rex_offer_detail.tipo_contrato,
        jornada_laboral: rex_offer_detail.jornada_laboral,
      });
      console.log("Datos cargados:", rex_offer_detail);
    }
  }, [isEditMode, rex_offer_detail]);


  const handleClose = (text: string) => {
    // handleKeywordRemove(text);
  };

  return (
    <>
      <Header />
      <Formik
       initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        if (isEditMode) {
          console.log("Editando oferta:", values);
          // Lógica para editar la oferta
          // dispatch(EditOfferReducer({ ...values, id: parseInt(id) }));
        } else {
          const rpta: any = await dispatch(CreateOfferReducer({ ...values, borrador: true }));
          if (rpta.respuesta) {
            console.log("rpta.data.id: --");
            console.log(rpta.data.id);
            // Navegar a otra página si es necesario
            // navigate(`/offer/killerQuestions/${rpta.data.id}`)
          }
        }
        // resetForm();
        window.scrollTo(0, 0);
      }}
    >
        {({ handleChange, handleBlur, values, setFieldValue }) => (
          <Form>
            <div className="bg-white px-[24px] pt-[8px]">
              <h1 className="font-bold text-heading-md pt-[16px]">
                {isEditMode ? "Edición de oferta de empleo" : "Creación de nueva oferta de empleo"}
                <Divider className=" bg-grays"></Divider>
              </h1>

              <Row gutter={24} className="mb-[40px]">
                <Col span={9} className="mr-[0px]">
                  <div className="w-[478px]">
                    <h3 className="font-medium text-heading-x1 mb-[8px]">
                      Puesto de trabajo *
                    </h3>
                    <Field
                      name="cargo"
                      as={InputC}
                      placeholder="Escribe las primeras letras del cargo..."
                      customClassName="h-[44px]"
                      className="mb-1"
                    />
                    <ErrorMessage
                      name="cargo"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </Col>
                <Col span={8}>
                  {/* <div className="">
                    <h3 className="font-medium text-heading-x1 mb-[8px] ">
                      Elige entre estos posibles sinónimos
                    </h3>
                    <div className="flex space-x-2">
                      <CustomButton text="Cajero" />
                      <CustomButton text="Cajero de supermercado" />
                      <CustomButton text="Reponedor" />
                    </div>
                  </div> */}
                </Col>
              </Row>

              <Row gutter={24} className="mb-[40px]">
                <Col span={9} className="">
                  <div>
                    <h3 className="font-medium text-heading-x1 mb-[8px]">
                      Lugar del puesto de trabajo
                    </h3>
                    <Row gutter={24} className="">
                      <Col span={12}>
                        <Field
                          name="ubi_provincia"
                          as={InputC}
                          placeholder="Provincia... *"
                          customClassName="h-[44px]"
                          className="mb-1"
                          prefix={<EnvironmentOutlined />}
                        />
                        <ErrorMessage
                          name="ubi_provincia"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </Col>
                      <Col span={12}>
                        <Field
                          name="ubi_poblacion"
                          as={InputC}
                          placeholder="Población... *"
                          customClassName="h-[44px]"
                          className="mb-1"
                          prefix={<EnvironmentOutlined />}
                        />
                        <ErrorMessage
                          name="ubi_poblacion"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col span={6}>
                  <div className="flex items-center pt-[35px] ml-[11px]">
                    <CheckboxC value={0} children={undefined} />
                    <h1 className="font-medium text-body-sm text-gray">
                      En remoto
                    </h1>
                    <Button className="bg-blue3 text-white w-[102px] ml-[18px] principal-nav-notify-button2 rounded-[4px] ">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row gutter={24} className="mb-[10px]">
                <Col span={9}>
                  <div>
                    <h3 className="font-medium text-heading-x1 mb-[8px]">
                      Compromiso de transparecia salarial *
                    </h3>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Field
                          name="sal_min"
                          as={InputC}
                          placeholder="Salario mínimo *"
                          customClassName="h-[44px]"
                          className="mb-1"
                          type="number"
                        />
                        <ErrorMessage
                          name="sal_min"
                          component="div"
                          className="text-red-500 text-sm"
                        />

                      </Col>
                      <Col span={12}>
                        <Field
                          name="sal_max"
                          as={InputC}
                          placeholder="Salario máximo *"
                          customClassName="h-[44px]"
                          className="mb-1"
                          type="number"
                        />
                        <ErrorMessage
                          name="sal_max"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col span={9}>
                  <div className="pt-[42px]">
                    <Segmented
                      defaultValue="Año"
                      style={{ marginBottom: 30, fontWeight: "600" }}
                      onChange={(value) => {
                        setFieldValue("abanico_salarial", value);
                        setAlignValue(value as Align);
                      }}
                      options={["Año", "Mes", "Hora"]}
                    />
                    <span className="font-medium text-body-sm text-gray pl-[24px]">
                      Informa del abanico salarial *
                    </span>
                  </div>
                </Col>
              </Row>

              <Row gutter={24} className="mb-[30px]">
                <Col span={24} className="">
                  <h3 className="font-medium text-heading-x1 mb-[8px]">
                    Descripción del trabajo *
                  </h3>
                  <Ckeditor setFieldValue={setFieldValue} />
                  <div className="mt-12">
                    <ErrorMessage
                      name="descripcion"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </Col>
              </Row>

              <Row gutter={24} className="">
                <Col span={9}>
                  <div>
                    <h3 className="font-medium text-heading-x1 mb-[8px]">
                      Información sobre el puesto
                    </h3>
                    <Row gutter={24} className="">
                      <Col span={12}>
                        <h3 className="font-medium text-body-md text-green32 mb-2">
                          Años de experiencia
                        </h3>
                        <SelectBasic
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          onChange={(selectedOption: any) => {
                            setFieldValue("anios_experiencia", parseInt(selectedOption))
                          }}
                          value={{ value: 0, label: "0-1 años" }}
                          options={[
                            { value: 0, label: "0-1 años" },
                            { value: 3, label: "2-3 años" },
                            { value: 5, label: "4-5 años" },
                            { value: 6, label: "Más de 5 años" },
                          ]}
                        />
                        <div className="mt-2">
                          <ErrorMessage
                            name="anios_experiencia"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <h3 className="font-medium text-body-md text-green32 mb-2">
                          Estudios mínimos *
                        </h3>
                        <SelectBasic
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          // name="estudios_minimos"
                          // value={{ value: values.estudios_minimos, label: values.estudios_minimos }}
                          onChange={(selectedOption: any) => {
                            setFieldValue("estudios_minimos", selectedOption)
                          }}
                          options={[
                            { value: "bachillerato", label: "Bachillerato" },
                            { value: "diplomado", label: "Diplomado" },
                            { value: "grado", label: "Grado" },
                            { value: "master", label: "Máster" },
                          ]}
                        />
                        <div className="mt-2">
                          <ErrorMessage
                            name="estudios_minimos"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Row gutter={24} style={{ marginTop: '20px' }}>
                <Col span={9}>
                  <div>
                    <Row gutter={24} className="">
                      <Col span={12}>
                        <h3 className="font-medium text-body-md text-green32 mb-2">
                          Tipo de contrato *
                        </h3>
                        <SelectBasic
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          // value={{ value: values.tipo_contrato, label: values.tipo_contrato }}
                          onChange={(selectedOption: any) => {
                            setFieldValue("tipo_contrato", selectedOption)
                          }}
                          options={[
                            { value: "indefinido", label: "Indefinido" },
                            { value: "temporal", label: "Temporal" },
                            { value: "freelance", label: "Freelance" },
                          ]}
                        />

                        <div className="mt-2">
                          <ErrorMessage
                            name="tipo_contrato"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <h3 className="font-medium text-body-md text-green32 mb-2">
                          Jornada laboral *
                        </h3>
                        <SelectBasic
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          // value={{ value: values.jornada_laboral, label: values.jornada_laboral }}
                          onChange={(selectedOption: any) => {
                            setFieldValue("jornada_laboral", selectedOption)
                          }}
                          options={[
                            { value: "completa", label: "Completa" },
                            { value: "media", label: "Media Jornada" },
                            { value: "flexible", label: "Flexible" },
                          ]}
                        />

                        <div className="mt-2">
                          <ErrorMessage
                            name="jornada_laboral"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <div className="divider"></div>

                <Col span={12}>
                  <div>
                    <Row gutter={24}>
                      <Col span={9}>
                        <h3 className="font-medium text-body-md text-green32 mb-2">
                          Sector
                        </h3>
                        <Select
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          value={values.sector_id ? { value: values.sector_id.toString(), label: selectedSectores[0] || '' } : null}
                          onChange={(selectedOption: any) => {
                            setFieldValue('sector_id', parseInt(selectedOption.value));
                            setSelectedSectores([selectedOption.label]);
                          }}
                          fetchOptions={async (search) => {
                            const response = await dispatch(GetSectorsReducer(search, 1, 5));
                            return response.payload.data.map((sector: any) => ({
                              label: sector.sector,
                              value: sector.id.toString(),
                            }));
                          }}
                          style={{ width: "100%" }}
                        />
                        <ErrorMessage
                          name="sector_id"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </Col>

                      <Col span={15} className="pt-[40px] ">
                        <div className="flex flex-wrap">
                          {selectedSectores.map((sector) => (
                            <CustomTag
                              key={sector}
                              text={sector}
                              onClose={() => handleSectorClose(sector)}
                            />
                          ))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Divider className="bg-blue3 my-[40px]"></Divider>

              <Row>
                <Col>
                  <h3 className="font-bold text-heading-x1 mb-[5px]">
                    ¿Cómo sería tu candidato ideal?
                  </h3>
                </Col>
                <Col>
                  <h3 className="ml-2 text-heading-x1">
                    Esta información no saldra en la oferta
                  </h3>
                </Col>
              </Row>

              <Row gutter={24} className="my-4">
                <Col xxl={15} xl={15}>
                  <h3 className="font-medium text-heading-x1 mb-[8px]">
                    Aptitudes / Tecnología
                  </h3>
                  <Row gutter={24} className="mb-[20px]">
                    <Col span={15}>
                      <div className="w-[225px]">
                        <Select
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          fetchOptions={async (search) => {
                            const response = await dispatch(
                              GetSkillsReducer(search, 1, 5)
                            );
                            return response.payload.data.map(
                              (aptitud: any) => ({
                                label: aptitud.aptitud,
                                key: aptitud.id,
                                value: aptitud.id,
                                id: aptitud.id,
                                aptitud: aptitud.aptitud
                              })
                            );
                          }}
                          onChange={(values, newValue) => {
                            const selectedItems = Array.isArray(newValue)
                              ? newValue
                              : [newValue];

                            setSelectedAptitudes((prevSelected: any) => {
                              const rpta = Array.from(
                                new Set([...prevSelected, ...selectedItems])
                              );
                              setFieldValue("aptitudes_ofertas", rpta)
                              return rpta;
                            });
                          }}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="mt-2">
                        <ErrorMessage
                          name="aptitudes_ofertas"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="flex flex-wrap mt-2">
                        {selectedAptitudes.map((aptitud: any) => (
                          <CustomTag
                            key={aptitud.key}
                            text={aptitud.label}
                            onClose={() => handleSkillsRemove(aptitud.key, setFieldValue)}
                          />
                        ))}
                      </div>
                    </Col>
                  </Row>

                  <h3 className="font-medium text-heading-x1 mb-[8px]">
                    Palabras clave
                  </h3>
                  <Row gutter={24}>
                    <Col span={15}>
                      <div className="w-[225px]">
                        <Select
                          showSearch
                          placeholder="Seleccionar"
                          size="large"
                          fetchOptions={async (search) => {
                            const response = await dispatch(
                              GetKeywordsReducer(search, 1, 5)
                            );
                            return response.payload.data.map(
                              (keyword: any) => ({
                                label: keyword.palabra,
                                key: keyword.id,
                                value: keyword.id,
                                id: keyword.id,
                                palabra_clave: keyword.palabra
                              }));
                          }}
                          onChange={(values, newValue) => {

                            const selectedItems = Array.isArray(newValue)
                              ? newValue
                              : [newValue];

                            setSelectedKeywords((prevSelected: any) => {
                              const rpta = Array.from(
                                new Set([...prevSelected, ...selectedItems])
                              )
                              setFieldValue("palabras_clave_ofertas", rpta)
                              return rpta;
                            });
                          }}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="mt-2">
                        <ErrorMessage
                          name="palabras_clave_ofertas"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="flex flex-wrap mt-2">
                        {selectedKeywords.map((keyword: any) => (
                          <CustomTag
                            key={keyword.key}
                            text={keyword.label}
                            onClose={() => handleKeywordRemove(keyword.key, setFieldValue)}
                          />
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xxl={9} xl={9} className="mb-[144px]">
                  <h3 className="font-medium text-heading-x1 mb-2">
                    Soft skills
                  </h3>
                  <div className=" h-[362px]">
                    <Sliders
                      minLabel="Colaborativo"
                      maxLabel="Autónomo"
                      defaultValue={0}
                    />
                    <Sliders
                      minLabel="Innovador"
                      maxLabel="Metódico"
                      defaultValue={0}
                    />
                    <Sliders
                      minLabel="Detallista"
                      maxLabel="Visionario"
                      defaultValue={0}
                    />
                    <Sliders
                      minLabel="Resiliente"
                      maxLabel="Proactivo"
                      defaultValue={0}
                    />
                    <Sliders
                      minLabel="Adaptable"
                      maxLabel="Consistente"
                      defaultValue={0}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="justify-end mb-[24px]">
                <Col>
                  <Button className="bg-white text-[#5F5F5F] border border-white w-[310px] mr-[8px] principal-nav-notify-button0 ">
                    Cancelar creación de oferta de empleo
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => showModal(values)}> {/* Pasa los valores del formulario aquí */}
                    <EyeFilled /> Vista Previa
                  </Button>
                </Col>

                {/* ModalPreview es el componente que creaste */}
                <ModalPreview 
                  visible={isModalVisible} 
                  formValues={modalData} // Pasa los datos del formulario al modal
                  onClose={handleCloseModal}  // Función para cerrar el modal
                  loading={false} // Puedes agregar lógica para manejar el estado de carga
                />
                <Col>
                  <Button
                    className="bg-blue3 text-white w-[122px] principal-nav-notify-button2"
                    htmlType="submit"
                    loading={rex_loading}
                  >
                    Siguiente
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="bg-blue3 text-white w-[122px] principal-nav-notify-button2 pl-1 pr-1"
                    htmlType="submit"
                    loading={rex_loading}
                    iconPosition={"end"}
                  >
                    {isEditMode ? "Guardar Oferta" : "Crear Oferta"}
                  </Button>
                </Col>
              </Row>
              <br></br>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateOffer;
