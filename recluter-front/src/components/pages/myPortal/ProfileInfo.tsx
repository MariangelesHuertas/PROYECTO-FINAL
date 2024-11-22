import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetUserEducationReducer } from "../../../redux/actions/pages/myPortal/education/GetEducation";
import { GetUserExperiencesReducer } from "../../../redux/actions/pages/myPortal/workExperience/GetWorkExperience";
import { GetSoftSkillsUReducer } from "../../../redux/actions/pages/myPortal/softSkills/GetSoftSkills";
import { GetAptitudReducer } from "../../../redux/actions/pages/myPortal/aptitudes/GetAptitud";
import { GetUserLanguagesReducer } from "../../../redux/actions/pages/myPortal/languages/GetLanguagesUser";
import { AppDispatch, RootState } from "../../../redux/store/store";
import "tailwindcss/tailwind.css";
import IconEdit from "../../../assets/icons/EditP.svg";
import IconMas from "../../../assets/icons/plusP.svg";
import ModalEditPerfil from "../myPortal/Modals/ModalEditProfileInformation";
import ModalEditAboutMe from "../myPortal/Modals/ModalEditAboutMe";
import ModalEditSkills from "./Modals/ModalEditSkills";
import ModalEditAptitudes from './Modals/ModalEditAptitudes';
import ModalEditWork from "./Modals/ModalEditWorkExperience";
import ModalEditEducation from "./Modals/ModalEditEducation";
import ModalEditLanguages from "./Modals/ModalEditLanguages";
import ModalAddWork from "./Modals/ModalAddWorkExperience";
import ModalAddEducation from "./Modals/ModalAddEducation";
import dayjs from "dayjs";
import ValuationModal from "../modals/ModalQR";

interface ProfileInfoProps {
  languages: { name: string; level: string }[];
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ languages }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalAptitudesVisible, setIsModalAptitudesVisible] = useState(false);

  const educationLoading = useSelector(
    (state: RootState) => state.getEducation.rex_loading
  );
  const experienceLoading = useSelector(
    (state: RootState) => state.getWorkExperience.rex_loading
  );
  const softSkillsLoading = useSelector(
    (state: RootState) => state.getSoftSkills.rex_loading
  );
  const softAptitudLoading = useSelector(
    (state: RootState) => state.getAptitud.rex_loading
  );
  const languagesLoading = useSelector(
    (state: RootState) => state.getLenguages.rex_loading
  );

  interface Education {
    id: number;
    tipo_educacion_id: number;
    centro_educativo_id: number;
    carrera_id: number;
    fecha_inicio: string;
    fecha_final: string;
    nombre_centro_educativo: string;
    carrera: string;
    ubicacion: string;
  }

  const { rex_user } = useSelector(({ auth }: any) => auth);
  const { rex_experiences } = useSelector(
    (state: RootState) => state.getWorkExperience
  );
  const { rex_education } = useSelector(
    (state: RootState) => state.getEducation
  );
  const { rex_softSkills } = useSelector(
    (state: RootState) => state.getSoftSkills
  );
  const { rex_aptitudes } = useSelector(
    (state: RootState) => state.getAptitud
  );

  const { rex_userLanguages, rex_loading: loadingLanguages } = useSelector(
    (state: RootState) => state.getLenguages
  );

  const [isModalPerfilVisible, setIsModalPerfilVisible] = useState(false);
  const [isModalAboutMeVisible, setIsModalAboutMeVisible] = useState(false);
  const [isModalSkillsVisible, setIsModalSkillsVisible] = useState(false);
  const [isModalWorkVisible, setIsModalWorkVisible] = useState(false);
  const [isModalAddWorkVisible, setIsModalAddWorkVisible] = useState(false);
  const [isModalEducationVisible, setIsModalEducationVisible] = useState(false);
  const [isModalAddEducationVisible, setIsModalAddEducationVisible] =
    useState(false);
  const [isModalLanguagesVisible, setIsModalLanguagesVisible] = useState(false);
  const [isModalValuation, setIsModalValuation] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );

  const [experienceLimit, setExperienceLimit] = useState(3);
  const [educationLimit, setEducationLimit] = useState(3);

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = dayjs(startDate);
    const end = endDate ? dayjs(endDate) : dayjs();

    if (start.isAfter(end)) {
      return "0 años, 0 m.";
    }

    const diffInYears = end.diff(start, "year");
    const diffInMonths = end.diff(start, "month") % 12;

    return `${diffInYears} año${
      diffInYears !== 1 ? "s" : ""
    }, ${diffInMonths} m${diffInMonths !== 1 ? "." : "."}`;
  };

  useEffect(() => {
    dispatch(GetUserExperiencesReducer(3));
    dispatch(GetUserEducationReducer(3));
    dispatch(GetSoftSkillsUReducer());
    dispatch(GetAptitudReducer());
    dispatch(GetUserLanguagesReducer());
  }, []);

  const handleEditWork = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalWorkVisible(true);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${date.getFullYear()}`;
  };

  const loadMoreEducation = async () => {
    setEducationLimit((prevLimit) => prevLimit + 3);
    await dispatch(GetUserEducationReducer(educationLimit + 3));
  };

  const loadMoreExperience = async () => {
    setExperienceLimit((prevLimit) => prevLimit + 3);
    await dispatch(GetUserExperiencesReducer(experienceLimit + 3));
  };

  const handleShowLessExperience = () => {
    setExperienceLimit(3);
    dispatch(GetUserExperiencesReducer(3));
  };

  const handleDataUpdatedEducation = () => {
    setIsModalAddEducationVisible(false);
  };

  const handleDataUpdated = () => {
    dispatch(GetUserEducationReducer(3));
    handleModalClose();
  };

  const handleShowLessEducation = () => {
    setEducationLimit(3);
    dispatch(GetUserEducationReducer(3));
  };

  const handleEditPerfilClick = () => {
    setIsModalPerfilVisible(true);
  };
  
  const handleEditAptitudesClick = () => {
    setIsModalAptitudesVisible(true);
  };

  const handleEditAboutMeClick = () => {
    setIsModalAboutMeVisible(true);
  };

  const handleEditSkillsClick = () => {
    setIsModalSkillsVisible(true);
  };

  const handleEditWorkClick = (job: any) => {
    setSelectedExperience(job);
    setIsModalWorkVisible(true);
  };

  const handleAddWorkClick = () => {
    setIsModalAddWorkVisible(true);
  };

  const handleAddEducationClick = () => {
    setIsModalAddEducationVisible(true);
  };

  const handleEditEducationClick = (edu: Education) => {
    console.log("Educación seleccionada para editar:", edu);
    setSelectedEducation(edu);
    setIsModalEducationVisible(true);
  };

  const handleEditLanguagesClick = () => {
    setIsModalLanguagesVisible(true);
  };

  const handleModalClose = () => {
    setIsModalAptitudesVisible(false);
    setIsModalPerfilVisible(false);
    setIsModalAboutMeVisible(false);
    setIsModalSkillsVisible(false);
    setIsModalWorkVisible(false);
    setIsModalEducationVisible(false);
    setIsModalLanguagesVisible(false);
    setIsModalAddWorkVisible(false);
    setIsModalAddEducationVisible(false);
  };

  return (
    <div>
      <div className="pb-10">
        <h1 className="text-heading-md font-bold">Perfil</h1>
      </div>
      <Row>
        <Col xxl={18} xl={18}>
          <div className="pb-10">
            <h1 className="text-heading-x1 font-bold pb-3">
              Información de perfil
              <img
                src={IconEdit}
                alt="Editar"
                onClick={handleEditPerfilClick}
                className="inline-block text-sky-blue0 pl-3 cursor-pointer"
              />
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Nombre:</span>{" "}
              {rex_user?.personas?.nombre}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Primer apellido:</span>{" "}
              {rex_user?.personas?.apellido_paterno}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Segundo apellido:</span>{" "}
              {rex_user?.personas?.apellido_materno}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Jornada Laboral:</span>{" "}
              {rex_user?.jornada}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Modalidad:</span>{" "}
              {rex_user?.modalidad}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Pais:</span>{" "}
              {rex_user?.cargo}
            </h1>
            <h1 className="text-body-md font-medium text-green22">
              <span className="font-bold">Cargo:</span>{" "}
              {rex_user?.pais_id}
            </h1>
          </div>
        </Col>
        <Col
          xxl={6}
          xl={6}
          style={{ textAlignLast: "right" }}
          onClick={() => console.log(rex_user)}
        >
          <div className="pb-10">
            <h1 className="text-heading-x1 font-bold pb-3">
              Editar URL de valoración
              <img
                src={IconEdit}
                alt="Editar"
                onClick={() => {
                  setIsModalValuation(true);
                }}
                className="inline-block text-sky-blue0 pl-3 cursor-pointer"
              />
            </h1>
          </div>
        </Col>
      </Row>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Sobre mí
          <img
            src={IconEdit}
            alt="Editar"
            onClick={handleEditAboutMeClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">
          {rex_user?.sobreMi}
        </h1>
      </div>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Softskills
          <img
            src={IconEdit}
            alt="Editar"
            onClick={handleEditSkillsClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>
        {softSkillsLoading ? (
          <Skeleton active />
        ) : rex_softSkills && rex_softSkills.length > 0 ? (
          <h1 className="text-body-md">
            {rex_softSkills
              .map((skill) => skill.soft_skills.soft_skill)
              .join(", ")}
          </h1>
        ) : (
          <h1 className="text-body-md font-medium text-green22">
            No se han agregado Softskills aún.
          </h1>
        )}
      </div>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Aptitudes
          <img
            src={IconEdit}
            alt="Editar"
            onClick={handleEditAptitudesClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>
        {softAptitudLoading ? (
          <Skeleton active />
        ) : rex_aptitudes && rex_aptitudes.length > 0 ? (
          <h1 className="text-body-md">
            {rex_aptitudes.map(aptitud => aptitud.aptitudes.aptitud).join(", ")}
          </h1>
        ) : (
          <h1 className="text-body-md font-medium text-green22">
            No se han agregado Aptitudes aún.
          </h1>
        )}
      </div>


      {/* Experiencia Laboral */}
      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Experiencia laboral
          <img
            src={IconMas}
            alt="Añadir"
            onClick={handleAddWorkClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>

        <Row gutter={[16, 16]}>
          {rex_experiences.slice(0, experienceLimit).map((job, index) => (
            <Col key={index} xs={24} sm={24} lg={8}>
              {!experienceLoading || index < experienceLimit - 3 ? (
                <>
                  <h1 
                    className="text-body-md font-bold pb-1 flex items-center"
                    onClick={() => {
                      console.log(job);
                    }}
                  >
                    {job.cargo}
                    <img
                      src={IconEdit}
                      alt="Editar"
                      onClick={() => handleEditWorkClick(job)}
                      className="inline-block text-sky-blue0 pl-3 cursor-pointer"
                    />
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {job.nombre_empresa} | {job.nombre_sector} {/*'Retail'*/}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/*{job.location}*/}
                    {job.lugar_trabajo}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {formatDate(job.fecha_inicio)} | {formatDate(job.fecha_fin)}{" "}
                    | {calculateDuration(job.fecha_inicio, job.fecha_fin)}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {job.descripcion}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/* {job.ratings} {'Valoraciones'} */}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/* {job.tags} {'Etiquetas'} */}
                  </h1>
                </>
              ) : (
                <div className="flex justify-center my-4">
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
              )}
            </Col>
          ))}
        </Row>

        <div className="text-center">
          {rex_experiences.length > 3 &&
            (rex_experiences.length > experienceLimit ? (
              <button
                onClick={loadMoreExperience}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver más
              </button>
            ) : (
              <button
                onClick={handleShowLessExperience}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver menos
              </button>
            ))}
        </div>
      </div>

      {/* Educación */}
      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Educación
          <img
            src={IconMas}
            alt="Añadir"
            onClick={handleAddEducationClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>

        <Row gutter={[16, 16]}>
          {rex_education.slice(0, educationLimit).map((edu: any, index) => (
            <Col key={index} xs={24} sm={24} lg={8}>
              {!educationLoading || index < educationLimit - 3 ? (
                <>
                  <h1 
                    className="text-body-md font-bold pb-1"
                    onClick={() => {
                      console.log(edu);
                    }}
                  >
                    {edu.carrera}
                    <img
                      src={IconEdit}
                      alt="Editar"
                      onClick={() => handleEditEducationClick(edu)}
                      className="inline-block mt-[-10px] text-sky-blue0 pl-3 cursor-pointer"
                    />
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {edu.nombre_centro_educativo} | {/*{edu.others}*/}{" "}
                    {edu.especialidad}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {edu.ubicacion} {/*{"Campo de Criptana"}*/}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {formatDate(edu.fecha_inicio)} |{" "}
                    {formatDate(edu.fecha_final)} |{" "}
                    {calculateDuration(edu.fecha_inicio, edu.fecha_final)}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/* {edu.description} {"Descripción del puesto"} */}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/* {edu.rating} {"Valoraciones"} */}
                  </h1>
                  <h1 className="text-body-md font-medium text-green22 pb-1">
                    {/* {edu.tag} {"Etiquetas"} */}
                  </h1>
                </>
              ) : (
                <div className="flex justify-center my-4">
                  <Skeleton active />
                </div>
              )}
            </Col>
          ))}
        </Row>

        <div className="text-center">
          {rex_education.length > 3 &&
            (rex_education.length > educationLimit ? (
              <button
                onClick={loadMoreEducation}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver más
              </button>
            ) : (
              <button
                onClick={handleShowLessEducation}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver menos
              </button>
            ))}
        </div>
      </div>

      {/* Idiomas */}
      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Idiomas
          <img
            src={IconEdit}
            alt="Editar"
            onClick={handleEditLanguagesClick}
            className="inline-block text-sky-blue0 pl-3 cursor-pointer"
          />
        </h1>
        <Row gutter={[16, 5]}>
          {loadingLanguages ? (
            <Col span={24}>
              <Skeleton active />
            </Col>
          ) : Array.isArray(rex_userLanguages) &&
            rex_userLanguages.length > 0 ? (
            rex_userLanguages.map((lang, index) => (
              <Col key={index} span={16}>
                <h1 className="text-body-md font-medium text-green22 pr-1 inline-block">
                  {lang.niveles_idiomas.idiomas.idioma}
                </h1>
                <span className="text-body-md font-bold text-green22">
                  {lang.niveles_idiomas.nivel}
                </span>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <h1 className="text-body-md font-medium text-green22">
                No se han agregado idiomas aún.
              </h1>
            </Col>
          )}
        </Row>
      </div>

      <ModalEditPerfil
        visible={isModalPerfilVisible}
        onClose={handleModalClose}
        context="myPortal"
      />

      <ModalEditAboutMe
        visible={isModalAboutMeVisible}
        onClose={handleModalClose}
      />

      <ModalEditSkills
        visible={isModalSkillsVisible}
        onClose={handleModalClose}
       
      />

<ModalEditAptitudes
        visible={isModalAptitudesVisible}
        onClose={handleModalClose}
        aptitudes={
          rex_aptitudes
            ? rex_aptitudes.map((aptitud) => ({
                id: aptitud.aptitudes.id,
                aptitud: aptitud.aptitudes.aptitud
              }))
            : []
        }
      />


      <ModalEditWork
        visible={isModalWorkVisible}
        onClose={() => {
          setIsModalWorkVisible(false);
          setSelectedExperience(null);
        }}
        experienceData={selectedExperience}
        onDataUpdated={() => {
          dispatch(GetUserExperiencesReducer(3));
          setIsModalWorkVisible(false);
          setSelectedExperience(null);
        }}
      />

      <ModalAddWork
        visible={isModalAddWorkVisible}
        onClose={handleModalClose}
        onDataUpdated={handleDataUpdated}
      />

      <ModalEditEducation
        visible={isModalEducationVisible}
        onClose={() => {
          setIsModalEducationVisible(false);
          setSelectedEducation(null);
        }}
        educationData={selectedEducation}
        onDataUpdated={() => {
          dispatch(GetUserEducationReducer(3));
          setIsModalEducationVisible(false);
          setSelectedEducation(null);
        }}
      />

      <ModalAddEducation
        visible={isModalAddEducationVisible}
        onClose={handleModalClose}
        onDataUpdated={handleDataUpdatedEducation}
      />

      <ModalEditLanguages
        visible={isModalLanguagesVisible}
        onClose={handleModalClose}
        languages={
          rex_userLanguages
            ? rex_userLanguages.map((lang) => ({
                id: lang.id,
                idioma_id: lang.niveles_idiomas.idioma_id,
                nivel_idioma_id: lang.niveles_idiomas.id,
                name: lang.niveles_idiomas.idiomas.idioma,
                level: lang.niveles_idiomas.nivel,
              }))
            : []
        }
      />

      <ValuationModal
        visible={isModalValuation}
        onClose={() => setIsModalValuation(!isModalValuation)}
        editLink={true}
        link={rex_user?.link_valoracion}
      />
    </div>
  );
};
export default ProfileInfo;
