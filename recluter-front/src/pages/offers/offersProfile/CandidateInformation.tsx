import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Carousel, Button, Menu, Dropdown, Modal } from 'antd';
import Header from "../../../components/pages/principalNav/HeaderOffers";
import CandidateInfo from "../../../components/pages/offers/offersProfile/CandidateInfo";
import LaboralExp from "../../../components/pages/offers/offersProfile/LaboralExp";
import Portfolio from "../../../components/pages/offers/offersProfile/Portfolio";
import RatingBlue from "../../../components/rating/RatingBlue";
import Avatar1 from "../../../assets/img/offers/Avatar.png";
import icon from "../../../assets/img/offers/ArrowLeft.svg";
import ModalConfirm from '../../../components/pages/offers/offersProfile/ModalConfirm';
import CandidateBaner from '../../../components/pages/offers/offersProfile/CandidateBaner'
import CarouselReviews from '../../../components/carousels/CarouselReviews';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserRatingsReducer } from '../../../redux/actions/pages/searchCV/GetRatings';
import { getCvGeneralByIdReducer } from '../../../redux/actions/pages/searchCV/GetSearchCV_ID';
import { GetSoftSkillsByIdReducer } from '../../../redux/actions/pages/offers/candidate/softSkills/GetSoftSkillsID';
import { GetUserCVByIdReducer } from '../../../redux/actions/pages/searchCV/cv/GetCVSearch';
import { GetUserPortfolioByIdReducer } from '../../../redux/actions/pages/searchCV/portfolio/GetPortfolioUser';
import { fetchApplicationPhasesReducer } from "../../../redux/actions/common/fase/GetApplicationPhases";
import { updateFasePostulacion } from '../../../redux/actions/common/fase/PatchApplicationPhases';

interface CandidateData {
  id: number;
  imageUrl: string;
  puesto: string;
  habilidades: string[];
  descripcion: string;
  radarData: { subject: string; A: number; B: number }[];
  education: {
    title: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    totalDuration: string;
    description: string;
    ratings: string;
    tags: string[];
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  portfolio: {
    title: string;
    projects: {
      title: string;
      description: string;
      skills: string[];
      website?: string;
      mediaLinks: string[];
    }[];
  };
  reviews: {
    name: string;
    jobTitle: string;
    rating: number;
    pros: string;
    cons: string;
    review: string;
    avatarUrl: string;
    timeAgo: string;
  }[];
}

const CandidateInformation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { id, postulacionId, candidateId } = useParams<{ id: string; postulacionId: string; candidateId: string }>();
  const [isProfileUnlocked, setIsProfileUnlocked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFaseId, setSelectedFaseId] = useState<number | null>(null);

  const { rex_phases, rex_loadingp: phasesLoading } = useSelector((state: RootState) => state.getApplicationPhases);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = useSelector((state: RootState) => state.patchApplicationPhases);

  const {
    rex_userRatings,
    rex_loading,
    rex_meta_userRatings
  } = useSelector(({ getRatings }: any) => getRatings);

  const { rex_userCVById, rex_loading: cvLoading, rex_error: cvError } = useSelector((state: RootState) => state.getCvSearch);
  const { rex_userPortfolioById, rex_loading: cv_loading , rex_error } = useSelector((state: RootState) => state.getPortfolioUser);

  const handleUnlockProfile = () => {
    setIsProfileUnlocked(true);
  };

  const candidateData: { [key: number]: CandidateData } = {
    1: {
      id: 1,
      imageUrl: Avatar1,
      puesto: "Reponedor",
      habilidades: ["Office", "Informática", "Dependiente con experiencia"],
      descripcion:
        "Soy un entusiasta del mundo digital con una pasión por transformar datos en decisiones estratégicas. Con más de 5 años de experiencia en análisis de datos y machine learning...",
      radarData: [
        { subject: "Comunicación", A: 120, B: 110 },
        { subject: "Trabajo en equipo", A: 98, B: 130 },
        { subject: "Liderazgo", A: 86, B: 130 },
        { subject: "Creatividad", A: 99, B: 100 },
        { subject: "Adaptabilidad", A: 85, B: 90 },
      ],
      education: [
        {
          title: "Bachillerato de arte",
          institution: "Instituto de Educación Secundaria",
          location: "Alcazar de San Juan",
          startDate: "Septiembre 2016",
          endDate: "Junio 2018",
          totalDuration: "2 años",
          description:
            "Estudios enfocados en historia del arte, dibujo y diseño.",
          ratings: "4.7/5",
          tags: ["Arte", "Historia", "Dibujo"],
        },
      ],
      languages: [
        {
          name: "Inglés",
          level: "B2",
        },
        {
          name: "Español",
          level: "Nativo",
        },
      ],
      portfolio: {
        title: "Portafolio",
        projects: [
          {
            title: "Branding | Congreso Internacional de Género",
            description:
              "Logotipo, imagen corporativa y voz y tono del proyecto",
            skills: ["Branding", "Género", "Logotipo", "Imagen corporativa"],
            website: "https://www.congresogeneroyeducacion.com",
            mediaLinks: [
              "https://www.congresogeneroyeducacion.com/images",
              "https://www.congresogeneroyeducacion.com/videos",
            ],
          },
          {
            title: "Título del proyecto",
            description: "Descripción del proyecto",
            skills: ["Habilidades", "Sitio web"],
            mediaLinks: [
              "https://www.example.com/images",
              "https://www.example.com/videos",
            ],
          },
        ],
      },
      reviews: [
        {
          name: "Elena R.",
          jobTitle: "Vendedor textil",
          rating: 3.4,
          pros: "Teletrabajo. Gestión del horario.",
          cons: "No enriquecerte de un gran equipo de trabajo.",
          review:
            "100% recomendable, E*** y Oscar unos crack. Pero el mayor punto a destacar la comunidad. Poder hablar con gente que está en una situación igual o parecida ayuda mucho a motivarse y seguir aprendiendo.",
          avatarUrl: "/path/to/avatar.jpg",
          timeAgo: "Hace 3 semanas",
        },
      ],
    },
  };

  const candidateInfo = candidateData[1];

  useEffect(() => {
    const isFromOffers = location.pathname.includes('/offer/');
    setIsProfileUnlocked(isFromOffers);

    if (id && postulacionId && candidateId) {
      const offerId = parseInt(id, 10);
      const postulacionIdNum = parseInt(postulacionId, 10);
      const userId = parseInt(candidateId, 10);
      console.log("Cargando datos para el candidato ID:", userId);
      dispatch(GetUserRatingsReducer(userId));
      dispatch(getCvGeneralByIdReducer(userId));
      dispatch(GetSoftSkillsByIdReducer(userId));
      dispatch(GetUserCVByIdReducer(userId));
      dispatch(GetUserPortfolioByIdReducer(userId));
      dispatch(fetchApplicationPhasesReducer());
    }
  }, [id, postulacionId, candidateId, location.pathname]);

  useEffect(() => {
    if (updateSuccess) {
      // Aquí puedes manejar el éxito de la actualización, por ejemplo, mostrando un mensaje
      console.log('Fase de postulación actualizada con éxito');
    }
  }, [updateSuccess]);


  const handleViewCVData = () => {
    console.log("ID del candidato:", candidateId);
    console.log("Datos del CV del usuario:", rex_userCVById);
    console.log("Estado de carga:", cvLoading);
    console.log("Error (si existe):", cvError);
  };

  const handleViewPortfolioData = () => {
    console.log("ID del usuario:", candidateId);
    console.log("Datos del portafolio del usuario:", rex_userPortfolioById);
    console.log("Estado de carga:", cv_loading);
    console.log("Error (si existe):", rex_error);
  };

  const handlePhaseChange = (phaseId: number) => {
    setSelectedFaseId(phaseId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const phaseMenu = (
    <Menu onClick={({ key }) => handlePhaseChange(Number(key))}>
      {rex_phases.map((phase) => (
        <Menu.Item key={phase.id}>{phase.fase}</Menu.Item>
      ))}
    </Menu>
  );

  const handleModalConfirm = () => {
    if (postulacionId && selectedFaseId) {
      dispatch(updateFasePostulacion(parseInt(postulacionId, 10), selectedFaseId));
    }
    setIsModalVisible(false);
  };

  return (
    <div>
      <Header />

      <div className="mx-2 md:mx-6 lg:mx-6 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#006497] text-[16px] font-bold"
        >
          <img src={icon} alt="Arrow Left" className="mr-2" />
          Volver al listado
        </button>

        <div className="mt-4" style={{ height: "293px" }}>
          <div
            style={{
              backgroundColor: "#81BFEC",
              height: "100%",
              borderRadius: "6px",
            }}
          >
            <CandidateBaner />
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 -mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-[#1A1A1A] text-[20px] font-normal opacity-70 -mt-1">
              Acciones de perfil:
            </span>
            <a href="/" className="text-[#00476D] font-bold text-[16px]">
              Añadir a favoritos
            </a>
            <span>|</span>
            <Dropdown overlay={phaseMenu} trigger={['click']} disabled={phasesLoading}>
            <a className="text-[#00476D] font-bold text-[16px] cursor-pointer">
              Avanzar en la fase
            </a>
          </Dropdown>
            <span>|</span>
            <a href="/" className="text-[#00476D] font-bold text-[16px]">
              Guardar perfil
            </a>
            <span>|</span>
            <a href="/" className="text-[#DC2828] font-bold text-[16px]">
              Archivar candidato
            </a>
          </div>
          {!isProfileUnlocked && (
          <Button
            type="primary"
            className="bg-[#006497] font-semibold text-[14px]"
            onClick={handleUnlockProfile}
          >
            Desbloquear Perfil
          </Button>
        )}
        {isProfileUnlocked && (
          <Button
            type="primary"
            className="bg-[#006497] font-semibold text-[14px]"
          >
            Comenzar chat con el candidato
          </Button>
        )}
      </div>
      </div>

      <div
        style={{
          border: "1px solid #81BFEC",
          borderRadius: "6px",
          padding: "16px",
          marginTop: "16px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <CandidateInfo
          imageUrl={candidateInfo.imageUrl}
          nombre="" // Este valor se obtendrá internamente en CandidateInfo
          puesto={candidateInfo.puesto}
          ubicacion="" // Este valor se obtendrá internamente en CandidateInfo
          habilidades={candidateInfo.habilidades}
          descripcion={candidateInfo.descripcion}
          radarData={candidateInfo.radarData}
          isProfileUnlocked={isProfileUnlocked}
        />

        <div className="mt-6">
          <div style={{ display: "flex" }}>
            <h2 className="text-lg font-semibold">Valoraciones</h2>
            <div
              className="flex items-center mt-2"
              style={{
                marginTop: "-5px",
                marginLeft: "10px",
              }}
            >
              <RatingBlue
                filledStars={rex_userRatings?.valoracion}
                filledStarSize={{ width: '24px', height: '24px', marginRight: '2px', marginTop: '2px' }}
                emptyStarSize={{ width: '24px', height: '24px', marginLeft: '-2px' }}
              />
              <span className="ml-2 text-sm text-blue-600">{rex_meta_userRatings?.total} valoraciones</span>
            </div>
          </div>

          <div>
            <CarouselReviews
              border={false}
              data_reviews={rex_userRatings?.valoraciones_usuarios}
              loading={rex_loading}
            />
          </div>
        </div>

        <LaboralExp />

        <Portfolio
          title={candidateInfo.portfolio.title}
          projects={candidateInfo.portfolio.projects}
        />
        <Button 
        onClick={handleViewPortfolioData}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ver datos del portafolio
      </Button>
         <Button 
          onClick={handleViewCVData}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ver datos del CV
        </Button>
      </div>

      <ModalConfirm
        visible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        loading={updateLoading}
        error={updateError ? updateError : undefined}
      />
    </div>
  );
};

export default CandidateInformation;
