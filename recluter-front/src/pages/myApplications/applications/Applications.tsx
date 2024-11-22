import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetApplicationsReducer } from '../../../redux/actions/applications/GetApplications';
import { RootState } from '../../../redux/store/store';
import CardEmpleo from '../../../components/cards/CardEmployment';
import InformationNotInterested from '../../../components/pages/myApplications/applications/InformationApplication';
import FilterButtons from '../../../components/pages/myApplications/applications/FilterButtonsApplications';

const CardEmpleoExample: React.FC = () => {
  const dispatch = useDispatch();
  const { rex_data: applications, rex_loading: loading } = useSelector((state: RootState) => state.applications);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [appliedCards, setAppliedCards] = useState<{ [key: number]: boolean }>({});
  const [loadingCards, setLoadingCards] = useState<{ [key: number]: boolean }>({});
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetApplicationsReducer() as any); // Llamada para obtener las postulaciones
  }, [dispatch]);

  useEffect(() => {
    if (!loading && applications.length) {
      const initialLoadingCards = applications.reduce((acc: any, _, index: number) => {
        acc[index] = false;
        return acc;
      }, {});
      setLoadingCards(initialLoadingCards);

      const initialAppliedCards = applications.reduce((acc: any, _, index: number) => {
        acc[index] = true; // Todas las tarjetas están aplicadas
        return acc;
      }, {});
      setAppliedCards(initialAppliedCards);
    }
  }, [applications, loading]);

  const handleCardClick = (index: number) => {
    setLoadingInfo(true);
    setSelectedCardIndex(index);
    setTimeout(() => {
      setLoadingInfo(false);
    }, 2000); // Simulación de 2 segundos de carga
  };

  const handleApply = (index: number | null) => {
    if (index !== null) {
      setAppliedCards((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  const handleCategoriaClick = (valor: string) => {
    alert(`Categoría seleccionada: ${valor}`);
  };

  const categorias = [
    { valor: 'todas-las-candidaturas', etiqueta: 'Todas las candidaturas' },
    { valor: 'Visto-por-la-empresa', etiqueta: 'Visto por la empresa' },
    { valor: 'cv-descargado', etiqueta: 'CV descargado' },
    { valor: 'avanzas-en-el-proceso', etiqueta: 'Avanzas en el proceso' },
    { valor: 'descartado', etiqueta: 'Descartado' },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <FilterButtons
        categorias={categorias}
        alClicEnCategoria={handleCategoriaClick}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          {loading ? (
            <div>Cargando datos...</div>
          ) : (
            applications.map((application, index) => (
              <div
                key={index}
                className={`cursor-pointer mb-5 p-4 rounded-lg transition-shadow duration-300 ${selectedCardIndex === index
                  ? "shadow-lg" // Sombra intensa si la card está seleccionada
                  : "hover:shadow-md" // Sombra leve cuando se hace hover sobre la card
                  }`}
                onClick={() => handleCardClick(index)}
              >
                <CardEmpleo
                  companyName={`Empresa ID: ${application.empresa_id}`}
                  jobTitle={application.ofertas?.cargo || `Oferta ID: ${application.oferta_id}`}
                  location={application.ofertas?.ubi_poblacion || 'Ubicación no disponible'}
                  salary={application.ofertas?.sal_min !== null ? `${application.ofertas.sal_min}€ - ${application.ofertas.sal_max}€` : 'Salario no disponible'}
                  applied={true}
                  loading={loadingCards[index]}
                  currentStep={application.oferta_id}
                  schedule="9:00 am - 5:00 pm"
                  ratings="0 valoraciones"
                  activeOffers="0 ofertas activas"
                  followers="0 seguidores"
                  description={application.ofertas?.descripcion || 'Descripción no disponible'}
                  postedTime="Subida hace 10 días"
                  createdAt={application?.ofertas?.createdAt}
                //postedTime={`Subida hace ${Math.floor(Math.random() * 30)} días`} // Estático
                />
              </div>
            ))
          )}
        </Col>
        <Col xs={24} md={14}>
          {selectedCardIndex !== null && (
            <InformationNotInterested
              title={` ${applications[selectedCardIndex]?.ofertas?.cargo || 'Cargo no disponible'}`}
              company={`Empresa ID: ${applications[selectedCardIndex]?.empresa_id || 'ID de empresa no disponible'}`}
              location={applications[selectedCardIndex]?.ofertas?.ubi_poblacion || 'Ubicación no disponible'}
              employmentType={applications[selectedCardIndex]?.ofertas?.tipo || 'Tipo de empleo no disponible'}
              salary={
                applications[selectedCardIndex]?.ofertas?.sal_min !== null
                  ? `${applications[selectedCardIndex].ofertas.sal_min}€ - ${applications[selectedCardIndex].ofertas.sal_max}€`
                  : 'Salario no disponible'
              }
              comments={0}
              applicantsCount="Inscritos no disponibles"
              introText="Introducción no disponible"
              requirements={["Requisito no disponible"]}
              responsibilities={["Responsabilidad no disponible"]}
              extraText={["Texto adicional no disponible"]}
              extraText2={["Texto adicional no disponible"]}
              postedTime="Subida hace x días"
              applied={!!appliedCards[selectedCardIndex]}
              loading={loadingInfo}
              onApply={() => handleApply(selectedCardIndex)}
              createdAt={applications[selectedCardIndex]['createdAt']}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CardEmpleoExample;
