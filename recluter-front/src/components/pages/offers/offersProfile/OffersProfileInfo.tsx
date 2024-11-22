import React, { useEffect } from 'react';
import { Avatar, Tag, Select, Button, Divider, Skeleton } from 'antd';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/offers/OffersProfileInfo.css';
import StyledCheckbox from '../../../checkbox/CheckboxProps';
import CustomLegend from './Legend';
import RatingBlue from '../../../rating/RatingBlue'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { GetPostulacionesByOfertaReducer } from '../../../../redux/actions/pages/offers/offersProfile/GetOffersProfile';
import dayjs from 'dayjs';

const { Option } = Select;
interface OffersProfileInfosProps {
  offerId: number;

}

const IMAGE_USER_DEFAULT = process.env.REACT_APP_IMAGE_USER_DEFAULT;
const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;

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

const Example = () => (
  <div style={{ position: 'absolute', top: '-90px', left: '-80px', width: '100%', height: '100%', zIndex: 2 }}>
    <ResponsiveContainer width="140%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: '#000', fontWeight: 'Bold' }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar name="Perfil del Candidato" dataKey="A" stroke="#006497" fill="transparent" />
        <Radar name="Perfil de la oferta" dataKey="B" stroke="#FDBCB4" fill="transparent" />
        <Legend content={<CustomLegend />} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

const PostulationSkeleton = () => (
  <div className="p-6 bg-gray-100 rounded-lg relative mb-8">
    <div className="flex flex-wrap -mx-3 relative">
      <div className="w-full md:w-3/4 px-3 relative">
        <div className="flex items-center mb-4">
          <Skeleton.Avatar active size={64} shape="square" />
          <div className="ml-4 flex-grow">
            <Skeleton.Input style={{ width: '60%' }} active size="small" />
            <Skeleton.Input style={{ width: '40%' }} active size="small" />
          </div>
        </div>
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
      <div className="w-full md:w-1/4 px-3 mt-2 md:mt-0 relative">
        <div style={{ height: '200px' }}></div>
      </div>
    </div>
  </div>
);


const OffersProfileInfos: React.FC<OffersProfileInfosProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postulaciones, loading, error } = useSelector((state: RootState) => state.getOffersProfile);

  useEffect(() => {
    dispatch(GetPostulacionesByOfertaReducer(offerId));
  }, [offerId]);

  const handleCandidateClick = (postulacionId: number, candidateId: number) => {
    if (offerId && postulacionId && candidateId) {
      navigate(`/offer/${offerId}/postulacion/${postulacionId}/candidate/${candidateId}`);
    } else {
      console.error("ID de la oferta, postulación o candidato no definidos");
    }
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = dayjs(startDate);
    const end = endDate ? dayjs(endDate) : dayjs();
    const months = end.diff(start, 'month');
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years} años, ${remainingMonths} meses`;
  };

  if (loading) {
    return (
      <div>
        <PostulationSkeleton />
        <PostulationSkeleton />
        <PostulationSkeleton />
      </div>
    );
  }

  if (error) return <div>Error al cargar las postulaciones: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg relative">
      {postulaciones.map((postulacion, index) => (
        <React.Fragment key={postulacion.usuarios.usuario}>
          <div className="flex flex-wrap -mx-3 relative">
            <div className="w-full md:w-3/4 px-3 relative">
              <div
                onClick={() => handleCandidateClick(postulacion.id, postulacion.usuarios.id)}
                style={{ position: 'relative', zIndex: 1 }}
                className=" mx-auto p-1 -ml-5 -mt-8 bg-gray-100 rounded-lg cursor-pointer"
              >

                <div className="flex items-center ml-[-8px] cursor-pointer">
                  <StyledCheckbox value={0} children={undefined} />
                  <Avatar
                    size={64}
                    src={
                      postulacion.usuarios.imagen
                        ? API_BASE_URL_EXACT+postulacion.usuarios.imagen
                        : IMAGE_USER_DEFAULT
                    } shape="square" className="!rounded-none bg-white"
                  />
                  <div className="ml-4">
                    <h2 className="text-[18px] font-medium text-[#1A1A1A] opacity-70">
                      {`${postulacion.usuarios.personas.nombre} ${postulacion.usuarios.personas.apellido_paterno} ${postulacion.usuarios.personas.apellido_materno}`}
                    </h2>
                    <p className="text-[16px] font-bold text-[#1A1A1A] opacity-70">{postulacion.usuarios.cargo}</p>
                    <p className="text-[12px] font-medium text-[#1A1A1A] opacity-70">{postulacion.usuarios.ubicacion}</p>
                  </div>
                  <p className="ml-auto text-[12px] font-medium -mt-10 text-[#1A1A1A] opacity-70">Cualitativos</p>
                </div>

                <div className="flex items-center mt-4">
                  <h3 className="font-bold text-[12px]">Valoraciones</h3>
                  <div className="flex items-center ml-4 space-x-2">
                    <RatingBlue totalStars={5} filledStars={postulacion.usuarios.promedioValoraciones} />
                    <Tag className="text-[12px] font-medium text-[#1A1A1A] opacity-70 border border-black rounded-full">
                      Ver valoraciones
                    </Tag>
                  </div>
                </div>

                <div className="mt-4 flex">
                  <h3 className="font-bold mr-4 text-[12px]">Experiencia</h3>
                  <div className="text-[14px] font-medium text-[#1A1A1A] opacity-70">
                    {postulacion.usuarios.experiencias_laborales_usuarios.map((exp, index) => (
                      <p key={index}>
                        {`${exp.cargo} | ${exp.nombre_empresa} | ${exp.nombre_sector} | ${dayjs(exp.fecha_inicio).format('MM/YYYY')} - ${exp.fecha_fin ? dayjs(exp.fecha_fin).format('MM/YYYY') : 'Actual'} (${calculateDuration(exp.fecha_inicio, exp.fecha_fin)})`}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex">
                  <h3 className="font-bold mr-[21px] text-[12px]">Educación</h3>
                  <div className="text-[14px] font-medium text-[#1A1A1A] opacity-70">
                    {postulacion.usuarios.educacion_usuarios.map((edu, index) => (
                      <p key={index}>
                        {`${edu.carrera} | ${edu.nombre_centro_educativo} | ${dayjs(edu.fecha_inicio).format('MM/YYYY')} - ${edu.fecha_final ? dayjs(edu.fecha_final).format('MM/YYYY') : 'Actual'} (${calculateDuration(edu.fecha_inicio, edu.fecha_final)})`}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="-mt-2 ml-[78px]">
                  <span className="font-bold text-[12px] text-[#1A1A1A] opacity-80">Búsqueda activa | Remoto admitido | Jornada completa</span>
                  <Button type="link" className="font-bold text-[12px]" style={{ color: '#00476D' }} href={postulacion.usuarios.cvs_usuarios.length > 0 ? postulacion.usuarios.cvs_usuarios[0].nombre : "#"}>
                    Ver CV en pdf
                  </Button>
                </div>

                <div className="flex mt-1 items-center">
                  <div className="flex-1">
                    <span className="font-bold text-[12px]">Aptitudes</span>
                    <span className="font-bold text-[12px] ml-5 mr-2">Killer questions 7/10</span>
                    <Select
                      defaultValue="Seleccionar Respuesta"
                      className="text-[12px] font-medium !text-[#00476D] border border-[#00476D] rounded mr-2 h-7"
                      onChange={(value) => console.log("Respuesta seleccionada:", value)}
                    >
                      <Option value="1">Respuesta 1</Option>
                      <Option value="2">Respuesta 2</Option>
                      <Option value="3">Respuesta 3</Option>
                    </Select>
                    <span className="font-bold text-[12px]">Aptitudes:</span>
                    {postulacion.usuarios.aptitudes_usuarios.map((apt: any, index: number) => (
                      <Tag key={index} className="ml-2 text-[12px] font-medium text-[#1A1A1A] opacity-70 border border-black rounded-full">
                        {apt.aptitudes.aptitud}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mt-2 md:mt-0 relative">
              <Example />
            </div>
          </div>
          {index < postulaciones.length - 1 && (
            <Divider className="bg-black my-8 mb-[45px]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OffersProfileInfos;