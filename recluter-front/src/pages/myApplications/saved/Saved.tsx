import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import CardEmpleo from '../../../components/cards/CardEmployment';
import InformationSaved from '../../../components/pages/myApplications/saved/InformationSaved';
import FilterButtons from '../../../components/pages/myApplications/saved/FilterButtons';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { GetOfferSaveReducer } from '../../../redux/actions/offers/GetOfferSave';

const SavedPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_data: rawCardsData,
    rex_loading,
    rex_error,
    rex_meta
  } = useSelector(({ getOfferSave }: any) => getOfferSave);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [appliedCards, setAppliedCards] = useState<{ [key: number]: boolean }>({});
  const [loadingCards, setLoadingCards] = useState<{ [key: number]: boolean }>({ 0: true, 1: true, 2: true });
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingCards({ 0: false, 1: false, 2: false });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(GetOfferSaveReducer());
  }, []);

  // Formatear los datos obtenidos desde el estado de Redux
  const formattedData = rawCardsData?.map((job: any) => ({
    exampleProps: {
      companyName: job.empresa_id ? `Empresa ID: ${job.empresa_id}` : 'Empresa desconocida',
      jobTitle: job.cargo || 'Título desconocido',
      location: job.ubi_poblacion || 'Ubicación no disponible',
      salary: job.sal_max ? `${job.sal_max}€` : 'Salario no disponible',
      schedule: job.jornada_laboral || 'Horario no especificado',
      ratings: '0 valoraciones', // Este es estático
      activeOffers: '0 ofertas activas', // Este es estático
      followers: '0 Seguidores', // Este es estático
      description: job.descripcion || 'Descripción no disponible',
      postedTime: job.updatedAt && !isNaN(new Date(job.updatedAt).getTime())
        ? `Subida hace ${Math.floor((Date.now() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60))}h`
        : 'Fecha no disponible',
      applied: false,
      createdAt: job.createdAt
    },
    informationProps: {
      title: job.cargo || 'Título desconocido',
      company: job.empresa_id ? `Empresa ID: ${job.empresa_id}` : 'Empresa desconocida',
      location: job.ubi_poblacion || 'Ubicación no disponible',
      employmentType: job.jornada_laboral || 'Tipo de jornada no disponible',
      salary: job.sal_max ? `${job.sal_max}€` : 'Salario no disponible',
      comments: 20, // Este es estático
      applicantsCount: 'Inscritos', // Este es estático
      introText: job.descripcion || 'Descripción no disponible',
      requirements: [
        'Incorporación inmediata', // Estático o podrías agregar más datos de la API si están disponibles
      ],
      responsibilities: [
        'Responsabilidades principales...', // Estático
      ],
      extraText: [
        'Texto extra...' // Estático
      ],
      extraText2: [
        'Más detalles aquí...' // Estático
      ],
      postedTime: job.updatedAt && !isNaN(new Date(job.updatedAt).getTime())
        ? `Subida hace ${Math.floor((Date.now() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60))}h`
        : 'Fecha no disponible',
    },
    postulaciones_guardadas: job.postulaciones_guardadas
  }));

  const handleCardClick = (index: number) => {
    setLoadingInfo(true);
    setSelectedCardIndex(index);

    setTimeout(() => {
      setLoadingInfo(false);
    }, 2000);
  };

  const handleApply = (index: number | null) => {
    if (index !== null) {
      setAppliedCards((prev) => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  const handleCategoriaClick = (valor: string) => {
    alert(`Categoría seleccionada: ${valor}`);
  };

  const categorias = [
    { valor: 'todas', etiqueta: 'Todas', conteo: rex_meta?.total },
    { valor: 'campo-de-criptana', etiqueta: 'Reponedor en Campo de Criptana', conteo: 0 },
    { valor: 'disenador-ux', etiqueta: 'Diseñador UX en Toda España', conteo: 0 },
    { valor: 'generico', etiqueta: 'Genérico', conteo: 0 },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <FilterButtons
        categorias={categorias}
        alClicEnCategoria={handleCategoriaClick}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          {formattedData?.map((card: any, index: number) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={`cursor-pointer mb-5 p-4 rounded-lg transition-shadow duration-300 ${selectedCardIndex === index ? "shadow-lg" : "hover:shadow-md"
                }`}
              style={{
                boxShadow: selectedCardIndex === index
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                  : '0 2px 6px rgba(0, 0, 0, 0.15)',
              }}
            >
              <CardEmpleo
                currentStep={0} {...card.exampleProps}
                applied={!!appliedCards[index]}
                loading={rex_loading}
                styleType={"type3"}
              />
            </div>
          ))}
        </Col>
        <Col xs={24} md={14}>
          {selectedCardIndex !== null && (
            <InformationSaved
              {...formattedData[selectedCardIndex].informationProps}
              applied={!!appliedCards[selectedCardIndex]}
              loading={loadingInfo}
              onApply={() => handleApply(selectedCardIndex)}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SavedPage;
