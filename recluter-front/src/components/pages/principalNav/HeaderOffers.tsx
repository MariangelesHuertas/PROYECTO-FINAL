import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import logo from '../../../assets/logo/logo.png';
import IconNotification from '../../../assets/icons/notification.svg';
import '../../styles/pages/principalNav/PrincipalNav.css';
import Notifications from '../../../pages/notifications/NotificationsRoute';
import ControlPanel from '../../../pages/controlPanel/ControlPanel';
import SearchCV from '../../../pages/searchCV/SearchCV';
import Offers from '../../../pages/offers/Offers';
import ValuationModal from '../../../components/pages/modals/ModalQR';  // Importa el modal


const HeaderOffers = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const isActive = (path: any) => location.pathname.startsWith(path);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="principal-nav2">
      <header className="principal-nav-header">
        <Row gutter={[16, 16]} justify="space-between" align="middle" className="principal-nav-header-row mb-4">
          <Col xs={24} sm={24} md={3} className="principal-nav-logo-col">
            <Link to="/home">
              <img src={logo} alt="Merere Logo" className="principal-nav-logo" />
            </Link>
          </Col>
          <Col xs={12} sm={14} md={12} className="principal-nav-links-col">
            <nav className="principal-nav-nav2">
              <Link to="/controlPanel" className={`principal-nav-link ${isActive('/controlPanel') ? 'active' : ''}`}>
                Panel de Control
              </Link>
              <Link to="/searchCV" className={`principal-nav-link ${isActive('/searchCV') ? 'active' : ''}`}>
                Buscar CV
              </Link>
              <Link to="/offers" className={`principal-nav-link ${isActive('/offers') ? 'active' : ''}`}>
                Ofertas
              </Link>
            </nav>
          </Col>
          <Col xs={12} sm={10} md={9} className="principal-nav-action-buttons-col">
            <Row justify="end" className="principal-nav-action-buttons">
              <Col>
                <Link to="/notifications/all">
                  <Button className="principal-nav-bell-button-1 !w-[44px] h-[44px]" icon={<img src={IconNotification} alt="Notification" />} />
                </Link>
              </Col>
              <Col>
                <Button
                  className="principal-nav-notify-button"
                  onClick={showModal}  // Abre el modal al hacer clic
                >
                  Permite que te valoren
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>

      <Routes>
        <Route path="/controlPanel" element={<ControlPanel />} />
        <Route path="/searchCV" element={<SearchCV />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/notifications/all" element={<Notifications />} />
      </Routes>

      {/* Modal para "Permite que te valoren" */}
      <ValuationModal
        visible={isModalVisible}  // Estado de visibilidad del modal
        onClose={closeModal}  // Función para cerrar el modal
        link='PENDIENTE'
      />
    </div>
  );
};

export default HeaderOffers;
