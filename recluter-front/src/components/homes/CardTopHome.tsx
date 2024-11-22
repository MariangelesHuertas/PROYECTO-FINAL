import React from 'react';
import { Row, Col, Button } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ImgLogo from '../../assets/logo/logo.png';
import IconEnterprise from '../../assets/icons/enterprise.svg';
import '../../components/styles/pages/principalNav/PrincipalNav.css';

const CardTopHome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCompanyView = location.pathname === '/homeCompany';

  const handleSwitchToCompanyView = () => {
    navigate('/homeCompany');
  };

  const handleSwitchToHomeView = () => {
    navigate('/');
  };

  return (
    <div className="principal-nav2">
      <header className="principal-nav-header">
        <Row justify="space-between" align="middle" className="principal-nav-header-row mb-[1px]">
          <Col xs={24} sm={24} md={3} className="principal-nav-logo-col">
            <Link to="/home">
              <img src={ImgLogo} alt="Merere Logo" className="" />
            </Link>
          </Col>
          <Col xs={24} sm={14} md={12} className="principal-nav-links-col">
            <nav className="principal-nav-nav2">
              {isCompanyView ? (
                <span
                  onClick={() => navigate('/controlPanel')}
                  className="principal-nav-link"
                >
                  Buscar talento
                </span>
              ) : (
                <>
                  <span
                    onClick={() => navigate('/employment/recommendations')}
                    className="principal-nav-link ml-[125px]"
                  >
                    Empleo
                  </span>
                  <span
                    onClick={() => navigate('/company')}
                    className="principal-nav-link"
                  >
                    Empresas
                  </span>
                </>
              )}
            </nav>
          </Col>
          <Col xs={24} sm={10} md={9} className="principal-nav-action-buttons-col">
            <Row justify="end" className="principal-nav-action-buttons">
              <Col>
                {isCompanyView ? (
                  <>
                    <Button
                      className="principal-nav-button"
                      style={{ background: '#006497', color: 'white', marginRight: '10px', height: '44px', width: '165px', fontSize: '14px', fontFamily: 'Inter', fontWeight: 600 }}
                      onClick={() => navigate('/company')}
                    >
                      ÁREA DE EMPRESA
                    </Button>
                    <Button
                      className="principal-nav-button"
                      style={{ color: '#006497', border: '1px solid #006497', height: '44px', width: '190px', fontSize: '14px', fontFamily: 'Inter', fontWeight: 600 }}
                      onClick={handleSwitchToHomeView}
                    >
                      En búsqueda de empleo
                    </Button>
                  </>
                ) : (
                  <Button
                    className="principal-nav-button "
                    style={{ background: '#006497', color: 'white',  height: '44px', width: '165px', fontSize: '14px', fontFamily: 'Inter', fontWeight: 600  }}
                    onClick={handleSwitchToCompanyView}
                  >
                    <img src={IconEnterprise} alt="Soy una empresa" style={{ width: '18px', marginRight: '0px' }} />
                    Soy una empresa
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </div>
  );
};

export default CardTopHome;