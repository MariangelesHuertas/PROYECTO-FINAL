import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Grid } from 'antd';
import IconOfertas from '../../../assets/icons/ofertas.svg';
import IconSeguidores from '../../../assets/icons/seguidores.svg';
import IconTrabajadores from '../../../assets/icons/trabajadores.svg';
import IconAdm from '../../../assets/icons/adm.svg';
import CompanyHeader from '../../../components/pages/company/CompanyHeader';
import CompanyInfo from '../../../components/pages/company/CompanyInfo';
import CompanyTabs from '../../../components/pages/company/CompanyTabs';
import CompanyRatings from '../../../components/pages/company/CompanyRatings';
import Header from '../../../components/pages/principalNav/PrincipalNav';
import CompanySidebar from '../../../components/pages/company/CompanySidebar';
import { RootState, AppDispatch } from '../../../redux/store/store';
import { getCompanyDetailReducer } from '../../../redux/actions/pages/company/CompanyDetail';
import CarouselReviews from '../../../components/carousels/CarouselReviews';
import '../../../styles/pages/company/companyDetail/CompanyDetail.css';
import { GetCompanyRatingsReducer } from '../../../redux/actions/pages/company/rating/GetRatingCompany';

const { useBreakpoint } = Grid;

interface Review {
  name: string;
  jobTitle: string;
  rating: number;
  pros: string;
  cons: string;
  review: string;
  avatarUrl: string;
  timeAgo: string;
}

interface CompanyData {
  title: string;
  description: string;
  location: string;
  avatarUrl: string;
  reviews: number;
  activeOffers: number;
  followers: number;
  workers: number;
  website: string;
  industry: string;
  companyDescription: string;
  reviewCards: Review[];
}

const CompanyDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { empresa_id } = useParams<{ empresa_id: string }>();

  const [mockData, setMockData] = useState<CompanyData | null>(null);

  // Datos estáticos para fallback
  const staticData: { [key: string]: CompanyData } = {
    '1': {
      title: "Supermercados Carrefour",
      description: "Retail • Alimentación y bebidas",
      location: "Madrid, Spain",
      avatarUrl: "https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png",
      reviews: 120,
      activeOffers: 90,
      followers: 450,
      workers: 500,
      website: "carrefour.com",
      industry: "Retail • Alimentación y bebidas",
      companyDescription: "Carrefour es una multinacional francesa, uno de los mayores grupos de distribución a nivel mundial...",
      reviewCards: [
        {
          name: 'Elena R.',
          jobTitle: 'Vendedor textil',
          rating: 4,
          pros: 'Teletrabajo. Gestión del horario.',
          cons: 'No enriquecerte de un gran equipo de trabajo',
          review: '100% recomendable...',
          avatarUrl: "https://popgroup.global/wp-content/uploads/2017/11/avatar.png",
          timeAgo: 'Hace 3 semanas',
        },
        {
          name: "María López",
          jobTitle: 'Vendedor textil',
          rating: 4,
          pros: 'Teletrabajo. Gestión del horario.',
          cons: 'No enriquecerte de un gran equipo de trabajo',
          review: '100% recomendable...',
          avatarUrl: "https://popgroup.global/wp-content/uploads/2017/11/avatar.png",
          timeAgo: 'Hace 3 semanas',
        },
      ]
    },
    '2': {
      title: "Mercadona",
      description: "Retail • Alimentación y bebidas",
      location: "Valencia, Spain",
      avatarUrl: "https://popgroup.global/wp-content/uploads/2017/11/mercadona-logo.png",
      reviews: 20,
      activeOffers: 90,
      followers: 450,
      workers: 500,
      website: "mercadona.es",
      industry: "Retail • Alimentación y bebidas",
      companyDescription: "Mercadona es una de las principales cadenas de supermercados en España...",
      reviewCards: [
        {
          name: "Juan Pérez",
          jobTitle: "Gerente",
          rating: 4,
          pros: "Buen ambiente laboral",
          cons: "Salarios bajos",
          review: "El ambiente de trabajo es excelente...",
          avatarUrl: "https://popgroup.global/wp-content/uploads/2017/11/avatar.png",
          timeAgo: "Hace 2 días"
        },
      ]
    }
  };

  const {
    rex_loading,
    rex_enterprise,
    rex_error
  } = useSelector(({ companyDetail }: any) => companyDetail);

  const {
    rex_companyRatings,
    rex_loading_companie
  } = useSelector(({ getRatingCompany }: any) => getRatingCompany);

  useEffect(() => {
    if (empresa_id) {
      dispatch(getCompanyDetailReducer(parseInt(empresa_id, 10)));
      setMockData(staticData[empresa_id]);
      dispatch(GetCompanyRatingsReducer(parseInt(empresa_id, 10)))
    }
  }, [empresa_id]);

  if (rex_loading) return <div>Loading...</div>;
  if (rex_error) return <div>Error: {rex_error}</div>;

  const companyTabsData = [
    { icon: IconOfertas, label: 'Ofertas activas', value: `${rex_enterprise?._count?.ofertas || 0}` },
    { icon: IconSeguidores, label: 'Seguidores', value: `${rex_enterprise?._count?.empresa_seguida || 0}` },
    { icon: IconTrabajadores, label: 'Trabajadores', value: `+${rex_enterprise?.tamanio || 0}` },
    { icon: IconAdm, label: '', value: rex_enterprise?.sectores?.sector },
  ];

  return (
    <>
      {
        rex_enterprise ? (
          <div className="overflow-x-hidden">
            <Header />
            <CompanyHeader />
            <div className="company-detail-container ml-6 mr-6">
              <Row gutter={[16, 16]} className='mb-8'>
                <Col xxl={20} xl={19} lg={18} md={16} sm={24} xs={24} className="px-6">
                  <CompanyInfo
                    id_empresa={empresa_id ? parseInt(empresa_id) : 0}
                    enterprise={rex_enterprise}
                    title={rex_enterprise?.empresa || mockData?.title || 'Sin nombre disponible'}
                    location={mockData?.location || 'Ubicación no disponible'}
                    industry={mockData?.description || 'Industria no disponible'}
                    workers={`+${mockData?.workers || 0} trabajadores`}
                  />

                  <div className="mb-8">
                    <CompanyTabs tabs={companyTabsData} />
                  </div>
                  <Row gutter={[16, 16]} className="mt-8">
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <div>
                        <h4 className="font-bold text-base mb-1 ml-2">Página web</h4>
                        <p className="text-base text-blue3 mb-1 ml-2">
                          <a href={`https://${mockData?.website}`} target="_blank" rel="noopener noreferrer">{mockData?.website || 'No disponible'}</a>
                        </p>
                        <h4 className="font-bold text-base mb-1 ml-2">Sector</h4>
                        <p className="text-base text-blue3 mb-1 ml-2">{mockData?.industry || 'No disponible'}</p>
                        <h4 className="font-bold text-base mb-1 ml-2">Sede</h4>
                        <p className="text-base text-blue3 mb-1 ml-2">{mockData?.location || 'No disponible'}</p>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                      <CompanyRatings
                        totalRatings={mockData?.reviews || 0}
                        rating={4.5}
                        labels={['Ambiente de trabajo', 'Salarios', 'Crecimiento']}
                        recommendPercentage={85}
                        recruiterScore={90}
                        empresaId={empresa_id ? parseInt(empresa_id, 10) : 0} 
                      />
                    </Col>
                  </Row>

                  <div className="border-t border-gray2 my-4"></div>

                  <h4 className="font-bold text-lg mb-4">Descripción de la empresa</h4>
                  <p className="text-base text-gray-500 mb-8">{rex_enterprise?.descripcion || 'Descripción no disponible'}</p>
                  <CarouselReviews
                    border={false}
                    data_reviews={rex_companyRatings?.valoraciones_empresas}
                    loading={rex_loading_companie}
                  />
                </Col>
                <Col xxl={4} xl={5} lg={6} md={8} sm={24} xs={24}>
                  <CompanySidebar />
                </Col>
              </Row>
            </div>
          </div>
        ) : null
      }
    </>

  );
};

export default CompanyDetail;
