import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Drawer, Button, Input, Row, Col } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import Header from "../../components/pages/principalNav/HeaderOffers";
import SidebarOffers from "../../components/pages/offers/SidebarOffers";
import IconSearch from "../../assets/icons/search.svg";
import "../../styles/pages/employment/Employment.css";
import "../../styles/pages/employment/FiltersEmployment.css";
import OpenOffers from "./openOffers/OpenOffers";
import SavedOffers from "./savedOffers/SavedOffers";
import FinishedOffers from "./finishedOffers/FinishedOffers";
import { GetOffersReducer } from "../../redux/actions/pages/company/Offers";
import { searchOffersAction } from "../../redux/actions/pages/company/SearchOffers";
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import "../../components/styles/pages/principalNav/PrincipalNav.css";

const Offers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(GetOffersReducer(1, 10));
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/offers/${id}`);
  };

  const handleTabChange = (key: string) => {
    switch (key) {
      case "open":
        navigate("/offers/open-offers");
        break;
      case "saved":
        navigate("/offers/saved-offers");
        break;
      case "finished":
        navigate("/offers/finished-offers");
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      dispatch(searchOffersAction(1, searchTerm, 1, 10));
    } else {
      dispatch(GetOffersReducer(1, 10));  // Vuelve a cargar todas las ofertas
      // Implementar la búsqueda de ofertas con el término ingresado
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white px-[24px] py-[48px] relative">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar y Drawer */}
          <Button
            type="primary"
            className="md:hidden mb-3"
            onClick={() => setDrawerVisible(true)}
            icon={<MenuOutlined />}
          />
          <div style={{ width: "234px", backgroundColor: "white" }} className="hidden md:block p-0">
            <SidebarOffers />
          </div>
          <Drawer
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            drawerStyle={{ padding: 0 }}
            width={260}
            className="block md:hidden"
          >
            <SidebarOffers inDrawer />
          </Drawer>

          {/* Contenido Principal */}
          <div className="flex-1 pl-0 md:pl-[24px]">
            <Row gutter={[16, 16]}>
              <Col xl={12} md={12}>
                <Input
                  prefix={<img src={IconSearch} width={24} height={24} />}
                  placeholder="Buscar oferta por cargo"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="Input-Filter-Employment w-full md:w-[296px] custom-input-company px-2 rounded"
                />
                <Button
                  className="bg-blue3 text-white w-[102px] ml-[18px] principal-nav-notify-button2 rounded-[4px]"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </Col>
              <Col xl={12} md={12} className="flex justify-end">
                <Button
                  className="principal-nav-notify-button md:w-[327px]"
                  onClick={() => navigate("/offer/createOffer")}
                >
                  <PlusOutlined /> Crear una nueva oferta de empleo
                </Button>
              </Col>
            </Row>

            {/* Tabs */}
            <div className="tabs-merere mt-4">
              <div className="tab-links-merere flex justify-center px-4">
                <button
                  className={`tab-link-merere ${location.pathname === "/offers/open-offers"
                      ? "active-merere"
                      : ""
                    }`}
                  onClick={() => navigate("/offers/open-offers")}
                >
                  <span className="inline">Ofertas Abiertas</span>
                </button>
                <button
                  className={`tab-link-merere ${location.pathname === "/offers/saved-offers" ? "active-merere" : ""}`}
                  onClick={() => navigate("/offers/saved-offers")}
                >
                  Guardadas
                </button>
                <button
                  className={`tab-link-merere ${location.pathname === "/offers/finished-offers" ? "active-merere" : ""}`}
                  onClick={() => navigate("/offers/finished-offers")}
                >
                  Finalizadas
                </button>
              </div>

              {/* Contenido de las tabs */}
              <div className="tab-content-merere p-4">
                <Routes>
                  <Route path="open-offers" element={<OpenOffers />} />
                  <Route path="saved-offers" element={<SavedOffers />} />
                  <Route path="finished-offers" element={<FinishedOffers />} />
                  <Route path="/" element={<Navigate to="open-offers" />} /> {/* Redirección a OpenOffers */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
