import React, { useState } from 'react'; 
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
import ValuationModal from '../../../components/pages/modals/ModalValoraPerfil';  // Importa el modal
import CustomLegend from '../offers/offersProfile/Legend';
import RatingBlue from '../../../components/rating/RatingBlue';

interface Skill {
  subject: string;
  A: number;
  B: number;
}

interface FinalistInfoProps {
  imageUrl: string;
  nombre: string;
  puesto: string;
  ubicacion: string;
  habilidades: string[];
  descripcion: string;
  radarData: Skill[];
  isProfileUnlocked: boolean;
}

const FinalistInfo: React.FC<FinalistInfoProps> = ({
  imageUrl,
  nombre,
  puesto,
  ubicacion,
  habilidades,
  descripcion,
  radarData,
  isProfileUnlocked,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-between items-start p-6">
      {/* Sección izquierda - Información del finalista */}
      <div className="w-1/2">
        {/* <h2 className="text-[22px] font-bold mb-2">Candidatos finalistas</h2> 
        <p className="text-gray-500 mb-4">Te presentamos a los finalistas de tu proceso de selección:</p>*/}

        <div className="flex items-center mb-4">
          <img
            src={imageUrl}
            alt="Perfil"
            className="w-20 h-20  mr-4"
          />
          <div>
            <h2 className="text-lg font-bold">{nombre}</h2>
            <p className="text-base text-gray-500 font-semibold">{puesto}</p>
            <p className="text-base text-gray-500">{ubicacion}</p>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-bold mb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {habilidades.map((habilidad, index) => (
              <span
                key={index}
                className="bg-gray-200 border border-gray-300 rounded-full px-3 py-1 text-[14px] font-semibold text-black"
              >
                {habilidad}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold mb-2">Sobre mí</h3>
          <p className="text-gray-700 text-sm">
            {descripcion}
          </p>
        </div>

        <div className="mt-20 -mb-5 flex items-center">
        <span className="mr-2 text-[18px] font-bold">Valoraciones</span>
          <RatingBlue
            filledStars={3.4} // Usa la calificación adecuada
            filledStarSize={{ width: '19px', height: '19px', marginRight: '2px', marginTop: '2px' }}
            emptyStarSize={{ width: '24px', height: '24px', marginLeft: '-2px' }}
          />
          <span className="ml-2 text-sm text-blue3">12 valoraciones</span>
        </div>
      </div>

      {/* Sección derecha - Gráfico de habilidades */}
      <div className="w-1/2">
        <h3 className="font-bold text-lg text-right">Soft skills</h3>

        <div className="mt-6 relative ml-16">
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart cx="50%" cy="40%" outerRadius="70%" data={radarData}>
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

      {/* Modal para "Valorar candidato" */}
      <ValuationModal
        visible={isModalVisible}
        onClose={closeModal}
        entityName={nombre}
        entityType="candidate"
        linkVal='PENDIENTE'
      />
    </div>
  );
};

export default FinalistInfo;
