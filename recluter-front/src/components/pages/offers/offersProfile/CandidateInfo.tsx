import React, { useState, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useParams } from 'react-router-dom';
import ValuationModal from '../../../../components/pages/modals/ModalValoraPerfil';
import CustomLegend from './Legend';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { getCvGeneralByIdReducer } from '../../../../redux/actions/pages/searchCV/GetSearchCV_ID';
import { GetSoftSkillsByIdReducer } from '../../../../redux/actions/pages/offers/candidate/softSkills/GetSoftSkillsID';

const IMAGE_USER_DEFAULT = process.env.REACT_APP_IMAGE_USER_DEFAULT;
interface Skill {
  subject: string;
  A: number;
  B: number;
}

interface CandidateInfoProps {
  imageUrl: string;
  nombre: string;
  puesto: string;
  ubicacion: string;
  habilidades: string[];
  descripcion: string;
  radarData: Skill[];
  isProfileUnlocked: boolean;
}

const CandidateInfo: React.FC<CandidateInfoProps> = ({
  imageUrl,
  puesto,
  habilidades,
  descripcion,
  radarData,
  isProfileUnlocked,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { candidateId } = useParams<{ candidateId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { cvGeneralById, loading, error } = useSelector((state: RootState) => state.getSearchIDCV);
  const { softSkills, loading: softSkillsLoading, error: softSkillsError } = useSelector((state: RootState) => state.getSoftSkillsID);

  // useEffect(() => {
  //   if (candidateId) {
  //     dispatch(getCvGeneralByIdReducer(parseInt(candidateId, 10)));
  //     dispatch(GetSoftSkillsByIdReducer(parseInt(candidateId, 10)));
  //   }
  // }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  // Asegúrate de que cvGeneralById exista
  if (!cvGeneralById || !cvGeneralById.data) {
    return <div>No se encontró el candidato</div>;
  }

  // Accede directamente a los datos del candidato, ya que ahora no es un array
  const candidato = cvGeneralById.data;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const data = [
    { subject: 'Colaborativo', A: 7, B: 6, fullMark: 10 },
    { subject: 'Innovador', A: 6, B: 5, fullMark: 10 },
    { subject: 'Detallista', A: 5, B: 6, fullMark: 10 },
    { subject: 'Proactivo', A: 4, B: 4, fullMark: 10 },
    { subject: 'Adaptable', A: 6, B: 5, fullMark: 10 },
    { subject: 'Energético', A: 3, B: 4, fullMark: 10 },
    { subject: 'Empático', A: 2, B: 3, fullMark: 10 },
    { subject: 'Creativo', A: 7, B: 8, fullMark: 10 },
    { subject: 'Analítico', A: 5, B: 6, fullMark: 10 },
  ];

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <div className="flex flex-col items-start">
          <h2 className="text-[22px] font-bold mb-5">Perfil</h2>
          <div
            className={`relative ${isProfileUnlocked ? '' : 'border border-[#006497] rounded-md p-6'}`}
          >
            {!isProfileUnlocked && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                  Desbloquear perfil
                </button>
              </div>
            )}

            <div className="flex items-center mb-4">
              <img
                src={candidato.imagen ? candidato.imagen : IMAGE_USER_DEFAULT}
                alt="Perfil"
                className="w-40 h-40 mr-4"
              />
              <div>
                {/* Nombre completo del candidato */}
                <h2 className="text-lg font-regular">
                  {`${candidato.personas.nombre} ${candidato.personas.apellido_paterno} ${candidato.personas.apellido_materno}`}
                </h2>
                {/* Cargo y ubicación */}
                <p className="text-base text-gray-500 font-bold">{candidato.cargo}</p>
                <p className="text-base text-gray-500">{candidato.ubicacion}</p>
                <button
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
                  onClick={showModal}
                >
                  Valorar candidato
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Habilidades</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {softSkills && softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#FCFCFC] border border-[#E1E1E2] rounded-full px-3 py-1 text-[16px] font-semibold text-black"
                >
                  {skill.soft_skills.soft_skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-4">Sobre mí</h3>
            <p className="text-gray-700 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', whiteSpace: 'normal', textOverflow: 'ellipsis' }}>
              {candidato.sobreMi}
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-start relative">
        <h3 className="font-bold text-lg absolute top-0 right-0">Soft skills</h3>
        <div className="mt-8">
          <div style={{ position: 'absolute', top: '20px', left: 0, width: '100%', height: '100%', zIndex: 2 }}>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 12, fill: '#000', fontWeight: 'bold' }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="Perfil del Candidato" dataKey="A" stroke="#006497" fill="transparent" />
                <Radar name="Perfil de la oferta" dataKey="B" stroke="#FDBCB4" fill="transparent" />
                <Legend content={<CustomLegend />} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ValuationModal
        visible={isModalVisible}
        onClose={closeModal}
        entityName={candidato.personas.nombre}
        entityType="candidate"
        linkVal='PENDIENTE'
      />
    </div>
  );
};

export default CandidateInfo;
