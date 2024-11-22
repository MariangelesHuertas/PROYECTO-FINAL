import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserExperiencesByIdReducer } from '../../../../redux/actions/pages/offers/candidate/workExperience/GetWorkExperience';
import { GetUserEducationByIdReducer } from '../../../../redux/actions/pages/offers/candidate/education/GetEducation';
import { GetUserLanguagesByIdReducer } from '../../../../redux/actions/pages/offers/candidate/languages/GetLanguages';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const LaboralExp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_experiences, rex_loading: expLoading, rex_error: expError } = useSelector((state: RootState) => state.getWorkOffer);
  const { education, loading: eduLoading, error: eduError } = useSelector((state: RootState) => state.getEducationOffers);
  const { languages, loading: langLoading, error: langError } = useSelector((state: RootState) => state.getLanguagesOffers);
  
  const { candidateId } = useParams<{ candidateId: string }>();

  const [experienceLimit, setExperienceLimit] = useState(4);
  const [educationLimit, setEducationLimit] = useState(4);
  const [languageLimit, setLanguageLimit] = useState(4);

  useEffect(() => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      dispatch(GetUserExperiencesByIdReducer(userId, 4));
      dispatch(GetUserEducationByIdReducer(userId, 4));
      dispatch(GetUserLanguagesByIdReducer(userId, 4));
    }
  }, [candidateId, dispatch]);

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = dayjs(startDate);
    const end = endDate ? dayjs(endDate) : dayjs();
    const years = end.diff(start, 'year');
    const months = end.diff(start, 'month') % 12;
    return `${years} años, ${months} m.`;
  };

  const loadMoreExperience = async () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      const newLimit = experienceLimit + 4;
      setExperienceLimit(newLimit);
      await dispatch(GetUserExperiencesByIdReducer(userId, newLimit));
    }
  };

  const handleShowLessExperience = () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      setExperienceLimit(4);
      dispatch(GetUserExperiencesByIdReducer(userId, 4));
    }
  };

  const loadMoreEducation = async () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      const newLimit = educationLimit + 4;
      setEducationLimit(newLimit);
      await dispatch(GetUserEducationByIdReducer(userId, newLimit));
    }
  };

  const handleShowLessEducation = () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      setEducationLimit(4);
      dispatch(GetUserEducationByIdReducer(userId, 4));
    }
  };

  const loadMoreLanguages = async () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      const newLimit = languageLimit + 4;
      setLanguageLimit(newLimit);
      await dispatch(GetUserLanguagesByIdReducer(userId, newLimit));
    }
  };

  const handleShowLessLanguages = () => {
    if (candidateId) {
      const userId = parseInt(candidateId, 10);
      setLanguageLimit(4);
      dispatch(GetUserLanguagesByIdReducer(userId, 4));
    }
  };

  if (expError) return <div>Error al cargar las experiencias: {expError}</div>;
  if (eduError) return <div>Error al cargar la educación: {eduError}</div>;
  if (langError) return <div>Error al cargar los idiomas: {langError}</div>;

  return (
    <div className="container mt-6">
      <div className="grid grid-cols-1 gap-8"> 
        <div>
          <h3 className="text-xl font-bold mb-4">Experiencia laboral</h3>
          <div className="grid grid-cols-4 gap-4">
            {rex_experiences.slice(0, experienceLimit).map((job, index) => (
              <div key={index} className="col-span-1 mb-6">
                {!expLoading || index < experienceLimit - 4 ? (
                  <>
                    <h4 className="text-lg font-semibold">{job.cargo}</h4>
                    <p>{job.nombre_empresa} | {job.nombre_sector}</p>
                    <p>{dayjs(job.fecha_inicio).format('MM/YYYY')} | 
                      {job.fecha_fin ? dayjs(job.fecha_fin).format('MM/YYYY') : 'Actual'} | 
                      {calculateDuration(job.fecha_inicio, job.fecha_fin)}
                    </p>
                    <p>{job.descripcion}</p>
                  </>
                ) : (
                  <Skeleton active paragraph={{ rows: 4 }} />
                )}
              </div>
            ))}
          </div>
          {rex_experiences.length > experienceLimit ? (
            <div className="text-center mt-4">
              <button
                onClick={loadMoreExperience}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver más
              </button>
            </div>
          ) : experienceLimit > 4 ? (
            <div className="text-center mt-4">
              <button
                onClick={handleShowLessExperience}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver menos
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Educación</h3>
          <div className="grid grid-cols-4 gap-4">
            {education.slice(0, educationLimit).map((edu, index) => (
              <div key={index} className="col-span-1 mb-6">
                {!eduLoading || index < educationLimit - 4 ? (
                  <>
                    <h4 className="text-lg font-semibold">{edu.carrera}</h4>
                    <p>{edu.nombre_centro_educativo} | {edu.ubicacion}</p>
                    <p>{dayjs(edu.fecha_inicio).format('MM/YYYY')} | 
                      {edu.fecha_final ? dayjs(edu.fecha_final).format('MM/YYYY') : 'Actual'} | 
                      {calculateDuration(edu.fecha_inicio, edu.fecha_final)}
                    </p>
                    <p>Valoraciones:</p>
                    <p>Etiquetas:</p>
                  </>
                ) : (
                  <Skeleton active paragraph={{ rows: 4 }} />
                )}
              </div>
            ))}
          </div>
          {education.length > educationLimit ? (
            <div className="text-center mt-4">
              <button
                onClick={loadMoreEducation}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver más
              </button>
            </div>
          ) : educationLimit > 4 ? (
            <div className="text-center mt-4">
              <button
                onClick={handleShowLessEducation}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver menos
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Idiomas</h3>
          <div className="grid grid-cols-4 gap-4">
            {languages.slice(0, languageLimit).map((lang, index) => (
              <div key={lang.id} className="col-span-1 mb-6">
                {!langLoading || index < languageLimit - 4 ? (
                  <h4 className="text-lg font-semibold">
                    {lang.niveles_idiomas.idiomas.idioma}
                    <span className="font-bold ml-2">{lang.niveles_idiomas.nivel}</span>
                  </h4>
                ) : (
                  <Skeleton active paragraph={{ rows: 1 }} />
                )}
              </div>
            ))}
          </div>
          {languages.length > languageLimit ? (
            <div className="text-center mt-4">
              <button
                onClick={loadMoreLanguages}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver más
              </button>
            </div>
          ) : languageLimit > 4 ? (
            <div className="text-center mt-4">
              <button
                onClick={handleShowLessLanguages}
                className="text-[#006497] text-[14px] font-semibold underline"
              >
                Ver menos
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LaboralExp;