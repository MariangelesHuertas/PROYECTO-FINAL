import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Button, Row, Col } from 'antd'; // Importa Row y Col de Ant Design
import logo from '../../../assets/logo/logo.png';
import IconNotification from '../../../assets/icons/notification.svg';
import '../../styles/pages/principalNav/PrincipalNav.css';
import Employment from '../../../pages/employment/Employment';
import Company from '../../../pages/company/company/Company';
import MyApplications from '../../../pages/myApplications/MyApplications';
import Portal from '../../../pages/myPortal/MyPortal'; 
import Home from '../../../pages/home/Home';
import ValuationModal from '../../../components/pages/modals/ModalQR';
import Notifications from '../../../pages/notifications/NotificationsRoute';
import { useSelector } from 'react-redux';

const PrincipalNav = () => {
  const location = useLocation();

  const { rex_user } = useSelector(({ auth }: any) => auth);

  const isActive = (path: any) => location.pathname.startsWith(path);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => { 
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="principal-nav">
      <header className="principal-nav-header">
        <Row gutter={[16, 16]} justify="space-between" align="middle" className="principal-nav-header-row mb-4">
          <Col xs={24} sm={24} md={3} className="principal-nav-logo-col">
            <Link to="/home">
              <img src={logo} alt="Merere Logo" className="principal-nav-logo" />
            </Link>
          </Col>
          <Col xs={24} sm={14} md={13} className="principal-nav-links-col">
            <nav className="principal-nav-nav">
              <Link
                to="/employment/recommendations"
                className={`principal-nav-link ${isActive('/employment') ? 'active' : ''}`}
              >
                Empleo
              </Link>
              <Link
                to="/company"
                className={`principal-nav-link ${isActive('/company') ? 'active' : ''}`}
              >
                Empresas
              </Link>
              <Link
                to="/myApplications/applications"
                className={`principal-nav-link ${isActive('/myApplications') ? 'active' : ''}`}
              >
                Mis Candidaturas
              </Link>
              <Link
                to="/myPortal/profile"
                className={`principal-nav-link ${isActive('/myPortal') ? 'active' : ''}`}
              >
                Mi Portal
              </Link>
            </nav>
          </Col>
          <Col xs={24} sm={10} md={7} className="principal-nav-action-buttons-col">
            <Row justify="end" className="principal-nav-action-buttons">
              <Col>
                <Link to="/notifications/all">
                  <Button className="principal-nav-bell-button-1 !w-[44px] h-[44px]" icon={<img src={IconNotification} alt="Notification" />} />
                </Link>
              </Col>
              <Col>
                <Button
                  className="principal-nav-notify-button"
                  onClick={showModal}
                >
                  Permite que te valoren
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/employment" element={<Employment />} />
        <Route path="/company" element={<Company />} />
        <Route path="/myApplications" element={<MyApplications />} />
        <Route path="/myPortal" element={<Portal />} />
        <Route path="/notifications/all" element={<Notifications />} />
      </Routes>


      <ValuationModal
        visible={isModalVisible}
        onClose={closeModal}
        link={rex_user?.link_valoracion}
      />
    </div>
  );
};

export default PrincipalNav;
