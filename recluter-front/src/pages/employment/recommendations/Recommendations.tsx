import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import CardEmpleo from '../../../components/cards/CardEmployment';
import Information from '../../../components/pages/employment/recommendations/Information';
import AlertFilter from '../../../components/pages/employment/recommendations/AlertFilter';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FetchEmploymentsReducer, GetOfferReducer } from '../../../redux/actions/offers/GetOffers';
import { AppDispatch } from '../../../redux/store/store';
import { SaveOfferReducer } from '../../../redux/actions/offers/SaveOffer';

const CardEmpleoExample: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_data: rawCardsData,
    rex_loading,
    rex_error,
    rex_meta,

    rex_loading_offer,
    rex_data_offer
  } = useSelector(({ getOffers }: any) => getOffers);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [appliedCards, setAppliedCards] = useState<{ [key: number]: boolean }>({});
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(FetchEmploymentsReducer());
  }, []);

  // Formatear los datos obtenidos desde el estado de Redux
  // const formattedData = rawCardsData
  const formattedData = rawCardsData?.map((job: any) => ({

    exampleProps: {
      companyName: job.empresa_id ? job.empresas.empresa : 'Empresa desconocida',
      jobTitle: job.cargo || 'Título desconocido',
      location: job.ubi_poblacion || 'Ubicación no disponible',
      salary: job.sal_max ? `${job.sal_min} - ${job.sal_max}€` : 'Salario no disponible',
      schedule: job.jornada_laboral || 'Horario no especificado',
      ratings: job.empresas._count.valoraciones_empresas + ' valoraciones',
      activeOffers: job.empresas._count.ofertas + ' ofertas activas',
      followers: job.empresas._count.empresa_seguida + ' Seguidores',
      description: job.descripcion || 'Descripción no disponible',
      postedTime: job.updatedAt && !isNaN(new Date(job.updatedAt).getTime())
        ? `Subida hace ${Math.floor((Date.now() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60))}h`
        : 'Fecha no disponible',
      applied: false,
      createdAt: job.createdAt
    },
    informationProps: {
      id: job.id,
      title: job.cargo || 'Título desconocido',
      company: job.empresa_id ? job.empresas.empresa : 'Empresa desconocida',
      location: job.ubi_poblacion || 'Ubicación no disponible',
      employmentType: job.jornada_laboral || 'Tipo de jornada no disponible',
      salary: job.sal_max ? `${job.sal_min} - ${job.sal_max}€` : 'Salario no disponible',
      comments: 0, // Este es estático
      applicantsCount: job._count.postulaciones + ' Inscritos', // Este es estático
      introText: "Auxilium comparo odit. Vado vomica laboriosam similique cattus teres dolorum video nostrum derideo. Cresco solum coniuratio pectus ventito cohibeo spiculum animi debitis.",
      requirements: [
        {
          title: "Estudios mínimos",
          requirement: job.estudios_minimos,
        },
        {
          title: "Jornada laboral",
          requirement: job.jornada_laboral,
        },
        {
          title: "Tipo de contrato",
          requirement: job.tipo_contrato,
        },
        {
          title: "Años de experiencia",
          requirement: job.anios_experiencia == 0 ? "Sin experiencia" : job.anios_experiencia,
        }
      ],
      responsibilities: [
        job.descripcion || 'Descripción no disponible'
      ],
      extraText: [
        '' // Estático
      ],
      extraText2: [
        'Muchos más te están esperando, ¡descúbrelos!' // Estático
      ],
      postedTime: job.updatedAt && !isNaN(new Date(job.updatedAt).getTime())
        ? `Subida hace ${Math.floor((Date.now() - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60))}h`
        : 'Fecha no disponible',
      createdAt: job.createdAt
    },
    postulaciones_guardadas: job.postulaciones_guardadas,
    allProperties: job
  }));

  const fetchMoreData = () => {
    if (formattedData) {
      if (formattedData.length >= 6) {
        setHasMore(false);
        return;
      }
    }

    // Simular la carga de más datos
    setTimeout(() => {
      // Aquí puedes manejar el fetch de más datos si lo necesitas
    }, 1500);
  };

  const handleCardClick = (index: number) => {
    // setLoadingInfo(true);
    setSelectedCardIndex(index);
    dispatch(GetOfferReducer(rawCardsData[index].id))
    // setLoadingInfo(false);
  };

  const handleApply = (index: number | null) => {
    if (index !== null) {
      setAppliedCards((prev) => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  if (rex_loading) {
    return <Skeleton active />;
  }

  if (rex_error) {
    return <p>Error al cargar las ofertas: {rex_error}</p>;
  }

  return (
    <div style={{ padding: '10px' }}>
      {/* <button 
        onClick={() => {
          console.log(rex_meta);
        }}
      >
        c
      </button> */}
      <AlertFilter
        newOffersCount={rex_meta?.total ?? 0}
        onFilterClick={() => alert('Filtro aplicado')}
        onQuickApplyClick={() => alert('Solicitud rápida aplicada')}
        onRatingsClick={(value: string) => alert(`Valoraciones: ${value} aplicadas`)}
        onProvinceClick={(value: string) => alert(`Provincia: ${value} seleccionada`)}
        onCreateAlertClick={() => alert('Nueva alerta creada')}
        newOffersText="Nuevas ofertas que se adaptan a ti"
        createAlertText="Crear nueva alerta"
        filterButtonText="Todos los filtros"
        quickApplyButtonText="Solicitudes rápidas"
        ratingsDefaultText="Valoraciones"
        provinceDefaultText="Provincia"
        ratingsOptions={[
          { value: '5-stars', label: '5 Estrellas' },
          { value: '4-stars', label: '4 Estrellas' },
          { value: '3-stars', label: '3 Estrellas' },
        ]}
        provinceOptions={[
          { value: 'madrid', label: 'Madrid' },
          { value: 'barcelona', label: 'Barcelona' },
          { value: 'valencia', label: 'Valencia' },
        ]}
      />

      <Row gutter={[16, 16]} style={{ margin: 0 }}>
        <Col xs={24} md={10} style={{ padding: 0, height: '100%' }}>
          <InfiniteScroll
            style={{ width: '100%', paddingTop: '2px', paddingLeft: '2px', paddingRight: '8px', boxSizing: 'border-box' }}
            dataLength={formattedData ? formattedData.length : 0}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div style={{ marginBottom: '16px' }}>
                <Skeleton
                  active
                  avatar={{ shape: 'square', size: 'large' }}
                  paragraph={{ rows: 3 }}
                />
              </div>
            }
            endMessage={<p>No hay más ofertas para mostrar</p>}
          >
            {formattedData?.map((card: any, index: number) => (
              <div
                key={index}
                className={
                  `card-container 
                  ${hoveredCardIndex === index
                    ? 'hovered'
                    : ''
                  } 
                  ${selectedCardIndex === index
                    ? 'selected'
                    : ''
                  }`
                }
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                style={{
                  marginBottom: '16px',
                  transition: 'box-shadow 0.3s ease-in-out',
                  boxShadow: selectedCardIndex === index
                    ? '0 2px 5px rgba(0, 0, 0, 0.3)'
                    : hoveredCardIndex === index
                      ? '0 2px 5px rgba(0, 0, 0, 0.3)'
                      : '0 2px 2px rgba(0, 0, 0, 0.05)',
                  borderRadius: '6px'
                }}
              >
                {/* <button onClick={() => {
                  console.log("card: ----")
                  console.log(card)
                  console.log(rawCardsData)
                  console.log(formattedData)
                  console.log("card: ----")
                }}>click</button> */}
                <CardEmpleo
                  currentStep={0} {...card.exampleProps}
                  // applied={!!appliedCards[index]}
                  applied={card.allProperties.inscritoOfertaByUser}
                  styleType={card?.allProperties.ofertaGuardadaByUser ? "type3" : "default"}
                  saveOffer={false}
                />
              </div>
            ))}
          </InfiniteScroll>
        </Col>
        <Col xs={24} md={14} style={{ paddingLeft: '8px' }}>
          {/* <button
          onClick={() => {
            console.log("selectedCardIndex: -------");
            console.log(selectedCardIndex);
            
            console.log(formattedData);
            
          }}
        >
          click
        </button> */}
          {selectedCardIndex !== null && formattedData ? (
            <Information
              saved={rex_data_offer?.guardada}
              applied={formattedData[selectedCardIndex].allProperties.inscritoOfertaByUser}
              onApply={function (): void {
                // throw new Error('FALTA FUNCION.');
                // alert("Inscribiendo...")
              }}
              onSave={async () => {
                await dispatch(SaveOfferReducer(rawCardsData[selectedCardIndex].id))
                await dispatch(FetchEmploymentsReducer(false));
              }}
              loading={rex_loading_offer}
              {...formattedData[selectedCardIndex].informationProps}
              sector={formattedData[selectedCardIndex].allProperties.sectores.sector}
              aptitudes={formattedData[selectedCardIndex].allProperties.aptitudes_oferta}
            />
          ) : (
            <div style={{ padding: '12px 16px', border: '1px solid #e8e8e8', borderRadius: '6px' }}>
              <p>Selecciona una oferta para ver más detalles</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CardEmpleoExample;