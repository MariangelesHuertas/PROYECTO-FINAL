import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Row, Col, Button, Card, Drawer, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Header from "../../components/pages/principalNav/HeaderOffers";
import SidebarSetting from "../../components/pages/offers/SidebarOffers";
import StatCard from "../../components/pages/controlPanel/ButtonsControlP";
import Agenda from "../../components/pages/controlPanel/Calendar";
import LatestRegistrants from "../../components/pages/controlPanel/LatestRegistrations";
import OpenOffers from "../../components/pages/controlPanel/OpenOffers";
import CandidateSummary from "../../components/pages/controlPanel/CandidateSummary";
import CandidatesRegistered from "../../components/pages/controlPanel/RegisteredCandidates";
import CompletedOffers from "./SummaryActivity/CompletedOffers";
import SavedSearches from "./SummaryActivity/SavedSearches";
import LatestSearches from "./SummaryActivity/LatestSearches";
import AvailablePacks from "../../components/pages/controlPanel/AvailablePacks";
import Memberships from "./memberships/Memberships";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { GetIncritosOffersAll, GetIncritosOffersHoy} from "../../redux/actions/pages/company/InscritosOffers";

const { Sider, Content } = Layout;

const Offers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const inscritosData = useSelector((state: RootState) => state.inscritosOffer.data);
  const inscritosDataAll = useSelector((state: RootState) => state.inscritosOffer.allData);

  useEffect(() => {
    dispatch(GetIncritosOffersHoy());
    dispatch(GetIncritosOffersAll()) 
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="bg-white px-[24px] py-[48px]">
        {/* <div>
          <Button onClick={() => { console.log('inscritosData:', inscritosData); }}>
            Mostrar estado actual
          </Button>
        </div>
        <Button
          onClick={() => {
            console.log('inscritosDataAll:', inscritosDataAll);
          }}>
        </Button> */}
        <div className="flex">
          <Sider
            width={234}
            breakpoint="md"
            collapsedWidth="0"
            style={{ backgroundColor: "white", zIndex: 1 }}
            className="hidden md:block p-0"
          >
            <SidebarSetting title="Panel de control" />
            <AvailablePacks />
          </Sider>

          <Content className="flex-1 pl-[24px]">
            <Button
              type="primary"
              className="lg:hidden mb-4"
              onClick={() => setDrawerVisible(true)}
              icon={<MenuOutlined />}
            />
            <Row gutter={[16, 16]} className="mb-8">
              <Col xl={6} xs={24} sm={12} md={6}>
                <StatCard
                  title={inscritosData?.nombre|| ''}
                  value={inscritosData?.totalInscritos || 0} // Cambiado aquí
                  description="inscritos hoy"
                />
              </Col>
              <Col xl={6} xs={24} sm={12} md={6}>
                <StatCard
                  title="Nuevos candidatos"
                  value={inscritosDataAll?.totalInscritos || 0}
                  description="últimas 24h"
                />
              </Col>
              <Col xl={6} xs={24} sm={12} md={6}>
                <StatCard
                  title="Reponedor de supermercado"
                  value={234} // Este se puede cambiar si es necesario
                  description="inscritos hoy"
                />
              </Col>
              <Col xl={6} xs={24} sm={12} md={6}>
                <StatCard
                  title="Pricing"
                  value={0}
                  description="CV por descubrir"
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Card className="border border-sky-blue0 rounded-[6px]">
                  <Row gutter={[16, 16]} className="pb-[26px]">
                    <Col xs={24} sm={12} md={12}>
                      <div className="border border-sky-200 rounded-md w-[462] p-[10px]">
                        <h3 className="font-bold text-heading-x1 pb-[22px]">Agenda</h3>
                        <Agenda />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <div className="w-[377] h-[195px] mb-[80px]">
                        <CandidateSummary />
                      </div>
                      <div className="w-[439] h-[285px]">
                        <CandidatesRegistered />
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={12}>
                      <div className="border border-sky-200 px-4 py-6 rounded-md w-[463] h-[306px]">
                        <OpenOffers />
                      </div>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <div className="border border-sky-200 px-4 py-6 rounded-md w-[463] h-[306px]">
                        <LatestRegistrants />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                      <h3 className="font-bold text-heading-x1 py-[26px]">
                        Resumen de tu actividad
                      </h3>
                      <div className="tabs-merere">
                        <div className="tab-links-merere flex justify-center px-4">
                          <button
                            className={`tab-link-merere ${location.pathname === "/controlPanel/latestSearches" ? "active-merere" : ""}`}
                            onClick={() => navigate("/controlPanel/latestSearches")}
                          >
                            <span className="inline">Últimas Búsquedas</span>
                          </button>
                          <button
                            className={`tab-link-merere ${location.pathname === "/controlPanel/savedSearches" ? "active-merere" : ""}`}
                            onClick={() => navigate("/controlPanel/savedSearches")}
                          >
                            <span className="inline">Búsquedas guardadas</span>
                          </button>
                          <button
                            className={`tab-link-merere ${location.pathname === "/controlPanel/completeOffers" ? "active-merere" : ""}`}
                            onClick={() => navigate("/controlPanel/completeOffers")}
                          >
                            <span className="inline">Ofertas finalizadas</span>
                          </button>
                        </div>

                        <div className="tab-content-merere p-4">
                          <Routes>
                            <Route path="/memberships" element={<Memberships />} />
                            <Route path="completeOffers" element={<CompletedOffers />} />
                            <Route path="savedSearches" element={<SavedSearches />} />
                            <Route path="latestSearches" element={<LatestSearches />} />
                            {/* Redirige a latestSearches por defecto */}
                            <Route path="/" element={<Navigate to="latestSearches" replace />} />
                          </Routes>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Content>
        </div>
      </div>

      <Drawer
        title={null}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        drawerStyle={{ padding: 0 }}
        width={260}
        className="block md:hidden custom-drawer"
      >
        <SidebarSetting inDrawer title="Panel de control" />
        <AvailablePacks />
      </Drawer>
    </>
  );
};

export default Offers;
