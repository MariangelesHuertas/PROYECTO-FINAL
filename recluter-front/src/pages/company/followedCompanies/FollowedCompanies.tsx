import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/pages/principalNav/PrincipalNav';
import CompanySidebar from '../../../components/pages/company/CompanySidebar';
import CardEmpresa from '../../../components/cards/CardCompanyButtons';
import ArrowLeft from '../../../assets/img/offers/ArrowLeft.svg';
import { getFollowedCompaniesReducer } from '../../../redux/actions/pages/company/FollowedCompanies';
import { AppDispatch } from '../../../redux/store/store'; // Importa el tipo AppDispatch

const FollowedCompanies: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Obtener los nombres de las empresas desde el estado de Redux
  const { rex_companyNames: companyNames, rex_loading: loading, rex_error: error } = useSelector((state: any) => state.followedCompanies);

  // Llamar a la API al montar el componente
  useEffect(() => {
    dispatch(getFollowedCompaniesReducer());
  }, [dispatch]);

  const handleBackClick = () => {
    navigate(-1); // Regresa a la vista anterior
  };

  // Función para redirigir al detalle de la empresa
  const handleViewDetail = (id: number) => {
    navigate(`/companyDetail/${id}`);
  };

  return (
    <>
      <Header />
      <div className="followed-companies-container" style={{ padding: '0 10px', paddingLeft: '30px', margin: '0 auto' }}>
        <Row align="middle" style={{ margin: '16px 0' }}>
          <img
            src={ArrowLeft}
            alt="Arrow Left"
            style={{ marginRight: '8px', cursor: 'pointer' }}
            onClick={handleBackClick}
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Empresas que sigues</span>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xl={19} lg={19} md={24}>
            {loading && <div>Cargando empresas...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && companyNames.length === 0 && <div>No sigues ninguna empresa aún.</div>}
            {!loading && !error && companyNames.map((company: any, index: number) => (
              <CardEmpresa
                key={index}
                title={company.name} // Usa company.name en lugar de company.empresa
                description="Descripción de la empresa"
                location="Ubicación"
                link="https://empresa.com"
                avatarUrl="https://empresa.com/logo.png"
                reviews={10}
                activeOffers={5}
                followers={200}
                workers={100}
                categories={['Categoría 1', 'Categoría 2']}
                cardType={4}
                rating={5.0}
                onClick={() => handleViewDetail(company.id)} // Ahora company.id debe existir
              />
            ))}
          </Col>
          <Col xl={5} lg={5} md={24}>
            <CompanySidebar />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FollowedCompanies;
