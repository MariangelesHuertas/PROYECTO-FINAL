import React, { useState, useEffect } from "react";
import { Row, Col, Card, Divider, Drawer, Button, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/store";
import { fetchApplicationPhasesReducer } from "../../../redux/actions/common/fase/GetApplicationPhases";
import Header from "../../../components/pages/principalNav/HeaderOffers";
import OffersProfileInfo from "../../../components/pages/offers/offersProfile/OffersProfileInfo";
import TableProfile from "../../../components/pages/offers/offersProfile/TableOffers";
import SidebarOffers from "../../../components/pages/offers/offersProfile/SidebarOffersProfile";
import Stream from "../../../assets/icons/view_stream.svg";
import List from "../../../assets/icons/view_list.svg";
import IconButton from "../../../components/pages/searchCV/IconButton";

const OffersProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedView, setSelectedView] = useState<string>("stream");
  const offerId = parseInt(id || "0", 10);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { rex_phases, rex_loadingp } = useSelector((state: RootState) => state.getApplicationPhases);

  useEffect(() => {
    dispatch(fetchApplicationPhasesReducer());
  }, []);

  const handleViewSelect = (view: string) => {
    setSelectedView(view);
  };

  const handlePhaseChange = (phase: string) => {
    console.log(`Changed phase to: ${phase}`);
    // Here you would typically dispatch an action to update the phase
  };

  const phaseMenu = (
    <Menu onClick={({ key }) => handlePhaseChange(key.toString())}>
      {rex_phases.map((phase) => (
        <Menu.Item key={phase.id}>{phase.fase}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Header />
      <div className="px-4 py-6">
        <Row gutter={16}>
          <Button
            type="primary"
            className="md:hidden mb-4"
            onClick={() => setDrawerVisible(true)}
            icon={<MenuOutlined />}
          />

          <div style={{ width: "234px", backgroundColor: "white", marginLeft: "15px", marginRight: "10px" }} className="hidden md:block p-0">
            <SidebarOffers />
          </div>

          <Drawer
            title={null}
            drawerStyle={{ padding: 0 }}
            width={268}
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            className="block md:hidden"
          >
            <SidebarOffers inDrawer />
          </Drawer>

          <Col xs={24} md={16} lg={19}>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2
                    onClick={() => navigate('/offers')}
                    className="font-bold text-[#006497] text-2xl inline cursor-pointer"
                  >
                    Oferta
                  </h2>
                  <span className="font-bold text-[#1A1A1A70] text-2xl mx-2">&gt;</span>
                  <span className="font-bold text-black text-2xl inline">Listado de inscritos en la oferta</span>
                </div>
              </div>
              <Divider className="my-4 bg-[#A1A1AA]" />
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-sm font-medium text-black">Título de la oferta</h3>
                  <p className="text-lg font-medium text-black">Responsable de turno en supermercado</p>
                </div>
                <Button
                  className="principal-nav-notify-button w-[150px] h-[36px] font-semibold text-body-sm rounded-[4px]"
                  onClick={() => navigate("")}
                >
                  Guardar búsqueda
                </Button>
              </div>
              <Row gutter={16} className="mb-[30px]">
                <Col xs={24} md={16} lg={24} className="">
                  <Row gutter={24} className="">
                    <Col xs={12}>
                      <span className="font-bold text-[#1A1A1A70] text-xs">Ordenado por:</span>
                      <div className="mt-2">
                        <span className="font-bold text-[#00476D] text-xs">RECOMENDACIÓN IA</span>
                        <span className="font-bold text-[#1A1A1A70] text-xs mx-2">|</span>
                        <span className="font-bold text-[#1A1A1A70] text-xs">KILLER QUESTIONS</span>
                        <span className="text-xs text-[#00476D] ml-1">&#9660;</span>
                        <span className="font-bold text-[#1A1A1A70] text-xs mx-2">|</span>
                        <span className="font-bold text-[#00476D] text-xs">FECHA DE INSCRIPCIÓN</span>
                      </div>
                    </Col>
                    <Col xs={12} className="flex justify-end items-center">
                      <IconButton
                        icon={Stream}
                        selected={selectedView === "stream"}
                        onClick={() => handleViewSelect("stream")}
                        altText="Icono de flujo"
                      />
                      <IconButton
                        icon={List}
                        selected={selectedView === "list"}
                        onClick={() => handleViewSelect("list")}
                        altText="Icono de lista"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#1A1A1A70] text-xs mr-2">ACCIONES DE PERFIL:</span>
                <div className="flex space-x-2">
                  <button className="text-[#00476D] font-bold text-xs hover:underline">Añadir a favoritos</button>
                  <span className="font-bold text-xs">|</span>
                  <Dropdown overlay={phaseMenu} trigger={['click']}>
                    <button className="text-[#00476D] font-bold text-xs hover:underline">
                      Avanzar en la fase
                    </button>
                  </Dropdown>
                  <span className="font-bold text-xs">|</span>
                  <button className="text-[#00476D] font-bold text-xs hover:underline">Guardar perfil</button>
                  <span className="font-bold text-xs">|</span>
                  <button className="text-red-500 font-bold text-xs hover:underline">Archivar candidato</button>
                </div>
                <button className="text-[#00476D] font-bold text-xs hover:underline ml-auto">
                  Ver candidatos seleccionados sobre gráfica
                </button>
              </div>
            </div>
            {selectedView === "stream" ? (
              <Card className="border-[#81BFEC] bg-[#FBFDFE] rounded-md p-4 mb-4">
                <OffersProfileInfo offerId={offerId} />
              </Card>
            ) : (
              <TableProfile offerId={offerId} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OffersProfile;