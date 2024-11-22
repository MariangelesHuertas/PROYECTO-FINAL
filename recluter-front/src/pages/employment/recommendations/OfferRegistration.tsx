import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Header from "../../../components/pages/principalNav/PrincipalNav";
import IconEdit from "../../../assets/icons/EditP.svg";
import IconLeft from '../../../assets/icons/arrowLeft.svg';
import CheckboxC from "../../../components/checkbox/CheckboxProps";
import Steps from "../../../components/pages/employment/recommendations/Steps";
import KillerQuestions from "../../../components/pages/employment/recommendations/killerQuestions/KillerQuestions";
import ModalRegistration from '../../../components/pages/employment/recommendations/modals/ModalSuccessfulRegistration';
import ModalExit from '../../../components/pages/employment/recommendations/modals/ModalExit';
import ModalCVSelect from '../../../components/pages/myPortal/Modals/ModalCVSelect';
import ModalEditProject from "../../../components/pages/employment/recommendations/modals/ModalEditProject";
import ModalEditPerfil from '../../../components/pages/myPortal/Modals/ModalEditProfileInformation';
import { GetOfferReducer } from "../../../redux/actions/offers/GetOffers";
import { GetUserCVReducer } from "../../../redux/actions/pages/myPortal/cv/GetCVUser";
import { GetUserPortfolioReducer } from '../../../redux/actions/pages/myPortal/portfolio/GetPortfolio';
import DiferenciaFecha from "../../../utils/CalculateDifferentDate";
import CardCurriculum from "../../../components/cards/CardCurriculum";
import CardPortfolio from "../../../components/cards/CardPortfolio";
import Carousel from "../../../components/carousels/Carousel";
import CarouselCurriculms from "../../../components/carousels/CarouselCurriculms";
import { GetKillersQuestionsReducer } from "../../../redux/actions/offers/GetKillerQuestions";


const OfferRegistration: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_loading_offer,
    rex_data_offer
  } = useSelector(({ getOffers }: any) => getOffers);
  const {
    rex_user
  } = useSelector(({ auth }: any) => auth);

  const { rex_userPortfolio, rex_loading: portfolioLoading, rex_error: portfolioError } = useSelector((state: RootState) => state.getPortfolio);

  const { offer_id } = useParams<{ offer_id: string }>(); // Obtenemos el parámetro id desde la URL
  const { rex_userCV, rex_loading, rex_error } = useSelector((state: RootState) => state.getCvUser);
  const [hasKillerQuestions, setHasKillerQuestions] = useState<boolean>(true);
  const [showKillerQuestions, setShowKillerQuestions] = useState<boolean>(false);
  const [isRegistrationModalVisible, setRegistrationModalVisible] = useState<boolean>(false);
  const [isExitModalVisible, setExitModalVisible] = useState<boolean>(false);
  const [isCVSelectModalVisible, setCVSelectModalVisible] = useState<boolean>(false);
  const [isEditProjectModalVisible, setEditProjectModalVisible] = useState<boolean>(false); // Nuevo estado para ModalEditProject
  const [isEditPerfilModalVisible, setEditPerfilModalVisible] = useState<boolean>(false); // Nuevo estado para ModalEditPerfil

  const [selectedCVId, setSelectedCVId] = useState<number | null>(null);
  const [selectedPortfolioIds, setSelectedPortfolioIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    if (offer_id) {
      dispatch(GetOfferReducer(parseInt(offer_id)));
    }
    dispatch(GetUserCVReducer());
    dispatch(GetUserPortfolioReducer());
    if (offer_id) {
      dispatch(GetKillersQuestionsReducer(parseInt(offer_id?.toString())))
    }

    if (offer_id === "2") {
      // setHasKillerQuestions(true);
    } else {
      // setHasKillerQuestions(false);
    }
  }, [offer_id]);

  useEffect(() => {
    dispatch(GetUserPortfolioReducer());
  }, []);

  const handleCVSelect = (id: number) => {
    setSelectedCVId(id);
  };

  const handlePortfolioSelect = (id: number) => {
    setSelectedPortfolioIds(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const handleContinueClick = () => {
    setShowKillerQuestions(true);
  };

  const handleRegistrationClick = () => {
    setRegistrationModalVisible(true);
  };

  const handleExitClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setExitModalVisible(true);
  };

  const handleCVSelectClick = () => {
    setCVSelectModalVisible(true); // Mostrar el modal al hacer clic en el icono de edición para CV
  };

  const handleCVSelectClose = () => {
    setCVSelectModalVisible(false); // Cerrar el modal de selección de CV
  };

  const handleEditProjectClick = () => {
    setEditProjectModalVisible(true); // Mostrar el modal al hacer clic en el icono de edición para Portafolio
  };

  const handleEditProjectClose = () => {
    setEditProjectModalVisible(false); // Cerrar el modal de edición de proyecto
  };

  const handleEditPerfilClick = () => {
    setEditPerfilModalVisible(true); // Mostrar el modal al hacer clic en el icono de edición para Perfil
  };

  const handleEditPerfilClose = () => {
    setEditPerfilModalVisible(false); // Cerrar el modal de edición de perfil
  };

  const handleViewData = () => {
    console.log("Datos del CV:", rex_userCV);
    console.log("Estado de carga:", rex_loading);
    console.log("Error (si existe):", rex_error);
  };
  const handleViewPortfolioData = () => {
    console.log("Datos del portafolio del usuario:", rex_userPortfolio);
    console.log("Estado de carga del portafolio:", portfolioLoading);
    console.log("Error del portafolio (si existe):", portfolioError);
  };


  return (
    rex_data_offer
      ? <>
        <Header />

        <div className={`flex items-center ${hasKillerQuestions ? 'mt-[16px]' : 'mt-[26px]'} mb-[29px] ml-[55px]`}>
          <img src={IconLeft} alt="Empleo" className="mr-2 cursor-pointer" onClick={() => navigate(-1)} />
        </div>

        <div
          className={`pb-[30px] ${hasKillerQuestions ? 'mt-[-60px]' : 'mt-[26px]'} mx-auto`}
          style={{ maxWidth: "733px" }}
        >

          {hasKillerQuestions && (
            <div className="mb-[38px]">
              <h2 className="font-bold text-heading-sm mb-[12px]">Mi inscripción</h2>
              <Steps currentStep={showKillerQuestions ? 2 : 1} />
            </div>
          )}

          {showKillerQuestions ? (
            <div className="w-[981px] ml-[-125px]">
              <KillerQuestions />
            </div>
          ) : (
            <>
              <div className="border border-blue4 rounded-[6px] px-[24px] py-[16px]">
                <div className="flex items-center mb-[6px]">
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    shape="circle"
                    className="mr-[8px]"
                  />
                  <div>
                    <h3 className="text-body-md font-bold">{rex_data_offer.cargo}</h3>
                    <p className="text-body-sm font-medium">{rex_data_offer.empresas.empresa}</p>
                    <p className="text-body-sm font-medium">{rex_data_offer.ubi_provincia}</p>
                  </div>
                </div>
                <span className="flex justify-end text-caption font-medium">
                  {/* Subida hace 23h */}
                  <DiferenciaFecha fecha={rex_data_offer.createdAt} />
                </span>
              </div>

              <div className="flex justify-between items-center my-[16px]">
                <h2 className="font-bold text-heading-sm">Revisa tu inscripción</h2>
                {!hasKillerQuestions && (
                  <a
                    href="/myPortal/generalSettings"
                    className="text-blue3 mr-[15px] text-body-sm font-semibold relative"
                    onClick={handleExitClick}
                  >
                    Salir
                    <span className="absolute left-0 right-0 bottom-[-2px] h-[1px] bg-blue3"></span>
                  </a>
                )}
              </div>

              <div className="border border-blue4 rounded-[6px] px-[24px] py-[16px] my-[16px]">
                <div className="items-center mb-[6px]">
                  <div className="flex justify-between">
                    <p className="text-body-md font-bold">Curriculum</p>
                    <img
                      className="cursor-pointer"
                      src={IconEdit}
                      alt="Edit"
                      onClick={handleCVSelectClick}
                    />
                  </div>
                  <Divider className="my-[10px]" />

                  <div
                    style={{ marginLeft: '-40px', marginTop: '-32px' }}
                  >
                    <CarouselCurriculms
                      title=""
                      border={false}
                      data_curriculumns={rex_userCV}
                      loading={rex_loading}
                      onSelect={handleCVSelect}
                      selectedCVId={selectedCVId}
                    />
                  </div>

                  {/* Contenedor que utiliza grid con overflow hidden */}
                  {/* <div className="relative ">
                    <Button
                      onClick={handleViewData}
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ver datos DEL curriculum
                    </Button>
                  </div> */}
                </div>
              </div>

              <div className="border border-blue4 rounded-[6px] px-[24px] py-[16px] my-[16px]">
                <div className="items-center mb-[6px]">
                  <div className="flex justify-between">
                    <p className="text-body-md font-bold">Portfolio</p>
                    <img
                      className="cursor-pointer"
                      src={IconEdit}
                      alt="Edit"
                      onClick={handleEditProjectClick}
                    /> {/* Añade onClick aquí para editar proyecto */}
                  </div>
                  <Divider className="my-[10px]" />

                  {/* Aquí es donde integramos el componente CardPortfolio */}
                  {portfolioLoading ? (
                    <p>Cargando portafolio...</p>
                  ) : portfolioError ? (
                    <p>Error al cargar el portafolio: {portfolioError}</p>
                  ) : (
                    <Row gutter={[16, 16]}>
                      {
                        rex_userPortfolio.map((project, index) => (
                          <Col xxl={12} xl={12}>
                            <CardPortfolio
                              key={project.id || index}
                              projectName={project.nombre || "Nombre del proyecto"}
                              projectDescription={project.nombre_archivo || "Descripción no disponible"}
                              projectDetails={project.descripcion || "Detalle del proyecto"}
                              skills={project.soft_skills_portafolio || []}  // Pasamos las habilidades blandas
                              archivos_portafolio={project.archivos_portafolio || []}
                              website={project.url || ""}
                              showCheckbox={true}
                              showEditIcon={false}
                              isSelected={selectedPortfolioIds.includes(project.id)}
                              onSelect={() => handlePortfolioSelect(project.id)}
                             
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  )}
                </div>
                {/* <Button
                  onClick={handleViewPortfolioData}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver datos del portafolio
                </Button> */}
              </div>

              <div className="mx-[11px] mb-[51px]">
                <div className="flex justify-between">
                  <p className="text-body-md font-normal text-[#5F5F5F]">
                    Recibir alertas de empleos de reponedor de supermercado en Paterna, Valencia
                  </p>
                  <CheckboxC className="mr-[-6px]" />
                </div>
                <div className="flex">
                  <p className="text-body-md font-normal mr-[9px] text-[#B3B3B3]">
                    Al crear una alerta de empleo, aceptás nuestros
                  </p>
                  <a
                    href=""
                    className="text-blue3 mr-[15px] text-body-sm font-semibold relative"
                  >
                    Términos del servicio
                    <span className="absolute left-0 right-0 bottom-[2px] h-[1px] bg-blue3"></span>
                  </a>
                </div>
                <p className="text-body-md font-normal text-[#B3B3B3] mr-[53px]">
                  Podés cambiar tu decisión en cualquier momento dándote de baja o como se indica en nuestros Terminos del servicio.
                </p>
              </div>
              <div className="flex mx-[11px]">
                <p className="text-body-md font-normal mr-[9px] text-[#B3B3B3]">
                  Al hacer clic en Postularse: 1) aceptás nuestros{" "}
                  <a
                    href=""
                    className="text-blue3 ml-[9px]  text-body-sm font-semibold relative"
                  >
                    Términos del servicio y políticas de privacidad
                    <span className="absolute left-0 right-0 bottom-[2px] h-[1px] bg-blue3 mr-[12px]"></span>
                  </a>
                  2) das tu consentimiento para que tu postulación se envíe a la empresa ; 3) reconocés que cuando te postulas a empleos fuera de tu país, puede implicar que envíes tus datos personales a países con niveles más bajos de protección de datos; y 4) que podemos ocultar tu información de contacto hasta que esta empresa decida continuar con tu postulación.
                </p>
              </div>
            </>
          )}

          <div style={{ textAlign: "center" }} className="my-[38px]">
            <Button
              className="bg-blue3 text-white w-[186px] ml-[0px] principal-nav-notify-button2 rounded-[4px]"
              onClick={
                showKillerQuestions
                  ? handleRegistrationClick
                  : hasKillerQuestions
                    ? handleContinueClick
                    : handleRegistrationClick}
            >
              {
                hasKillerQuestions && showKillerQuestions
                  ? "Enviar inscripción"
                  : hasKillerQuestions
                    ? "Continuar inscripción"
                    : "Enviar inscripción"
              }
            </Button>
          </div>

          <div className="flex mx-[130px]">
            <p className="text-body-md font-normal mr-[15px] text-[#B3B3B3]">
              ¿Tienes problemas con esta inscripción?
            </p>
            <a
              href=""
              className="text-blue3 mr-[15px] text-body-sm font-semibold relative"
              onClick={handleExitClick}
            >
              Cuentános más
              <span className="absolute left-0 right-0 bottom-[2px] h-[1px] bg-blue3"></span>
            </a>
          </div>
        </div>

        {/* Modales */}
        <ModalRegistration
          offer_id={offer_id ? parseFloat(offer_id) : 0}
          cv_usuario_id={selectedCVId}
          portafolio_usuario_id={selectedPortfolioIds[0]}  // Asumimos que solo se permite seleccionar un portafolio
          visible={isRegistrationModalVisible}
          onClose={() => setRegistrationModalVisible(false)}
        />
        <ModalExit
          visible={isExitModalVisible}
          onClose={() => setExitModalVisible(false)}
        />
        <ModalCVSelect
          visible={isCVSelectModalVisible}
          onClose={handleCVSelectClose}
        />
        <ModalEditProject
          visible={isEditProjectModalVisible}
          onClose={handleEditProjectClose}
        />
        <ModalEditPerfil
          visible={isEditPerfilModalVisible}
          onClose={() => setEditPerfilModalVisible(false)}
          context="OfferRegistration"

        />
      </>
      : null
  );
};

export default OfferRegistration;
