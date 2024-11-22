import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Row, Col, Button, Input, Skeleton, Drawer, Card } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import Header from "../../components/pages/principalNav/HeaderOffers";
import IconSearch from "../../assets/icons/search.svg";
import IconGPS from "../../assets/icons/IconGPS.svg";
import SidebarSearch from "../../components/pages/searchCV/SidebarSearchCV";
import List from "../../assets/icons/view_list.svg";
import Stream from "../../assets/icons/view_stream.svg";
import SortingOptions from "../../components/pages/searchCV/SortingOptions";
import IconButton from "../../components/pages/searchCV/IconButton";
import TableSearchCV from "../../components/pages/searchCV/TableSearchCV";
import ListSearchCV from "../../components/pages/searchCV/ListSearchCV";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionModal from "../../components/pages/searchCV/ModalSearch";

const SearchCV: React.FC = () => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<string>("list");
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const offerId = parseInt(id || "0", 10);

  const fetchData = () => {
    const newData = [
      {
        id: "1",
        nombre: "C... D...",
        valoraciones: 3.4,
        numReviews: 12,
        aptitudes: {
          role: "Cajera",
          language: "Inglés",
          level: "C2",
        },
        softSkills: "Ver gráfica",
        ubicacion: "Paterna, Valencia",
        estudios: "Bachillerato de arte",
        experiencia: "De 1 - 3 años",
        rol: "Vendedora de tienda",
      },
      {
        id: "2",
        nombre: "C... D...",
        valoraciones: 3.4,
        numReviews: 12,
        aptitudes: {
          role: "Cajera",
          language: "Inglés",
          level: "C1",
        },
        softSkills: "Ver gráfica",
        ubicacion: "Paterna, Valencia",
        estudios: "Bachillerato de arte",
        experiencia: "ROKIE",
        rol: "Vendedora de tienda",
      },
      {
        id: "3",
        nombre: "C... D...",
        valoraciones: 3.4,
        numReviews: 12,
        aptitudes: {
          role: "Cajera",
          language: "Inglés",
          level: "C1",
        },
        softSkills: "Ver gráfica",
        ubicacion: "Paterna, Valencia",
        estudios: "Bachillerato de arte",
        experiencia: "De 1 - 3 años",
        rol: "Vendedora de tienda",
      },

      // Add more data as needed
    ];
    setData((prevData: any) => [...prevData, ...newData]);
    if (data.length >= 15) setHasMore(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewSelect = (view: string) => {
    setSelectedView(view);
  };

  const handleSortSelect = (option: string) => {
    console.log("Selected sorting option:", option);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCardClick = (id: number) => {
    navigate(`/searchCV/${id}`);
  };

  return (
    <>
      <Header />
      <div className="bg-white px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row">
          <Button
            type="primary"
            className="md:hidden mb-3"
            onClick={() => setDrawerVisible(true)}
            icon={<MenuOutlined />}
          />

          <div
            style={{ width: "234px", backgroundColor: "white" }}
            className="hidden md:block p-0"
          >
            <SidebarSearch />
          </div>
          <Drawer
            title={null}
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            drawerStyle={{ padding: 0 }}
            width={268}
            className="block md:hidden"
          >
            <SidebarSearch inDrawer />
          </Drawer>

          <div className="flex-1 pl-0 md:pl-6">
            <>
              <h2 className="text-heading-md font-bold mb-4">
                Resultado de la búsqueda de CV
              </h2>
              <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} md={19}>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-2">
                    <Input
                      prefix={<img src={IconSearch} width={24} height={24} />}
                      placeholder="Buscar oferta"
                      className="Input-Filter-Employment w-full md:w-[437px] custom-input-company px-2 rounded"
                    />
                    <Input
                      prefix={<img src={IconGPS} width={24} height={24} />}
                      placeholder="Valencia"
                      className="Input-Filter-Employment w-full md:w-[255px] custom-input-company px-2 rounded"
                    />
                    <Button className="bg-blue3 text-white w-[102px] ml-[18px] principal-nav-notify-button2 rounded-[4px]">
                      Buscar
                    </Button>
                  </div>
                </Col>
                <Col xs={24} md={5} className="flex justify-end">
                  <div className="principal-nav-action-buttons flex justify-center md:justify-end space-x-2 w-full md:w-auto">
                    <Button
                      className="principal-nav-notify-button w-[150px] font-semibold text-body-sm rounded-[4px]"
                      onClick={() => navigate("")}
                    >
                      Guardar búsqueda
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row className="mb-[50px]">
                <Col xl={24} md={24} className="flex justify-start">
                  <div className="principal-nav-action-buttons flex">
                    <Button
                      className="principal-nav-notify-button font-semibold text-body-sm md:w-[326px] h-[36px] ml-0 rounded-[4px] "
                      onClick={showModal}
                    >
                      <PlusOutlined />
                      Crear perfil de soft skill para la búsqueda
                    </Button>
                    <QuestionModal
                      visible={isModalVisible}
                      onClose={closeModal}
                    />
                  </div>
                </Col>
              </Row>

              <Row gutter={16} className="mb-[30px]">
                <Col xs={24} md={16} lg={19} className="mb-[32px]">
                  <div className="pt-3">
                    <div className="flex items-center">
                      <span className="font-bold text-green32 text-caption mr-[4px]">
                        ACCIONES DE PERFIL:
                      </span>
                      <div className="flex space-x-[8px]">
                        <button className="text-[#00476D] font-bold text-caption hover:underline">
                          Añadir a favoritos
                        </button>
                        <span className="font-bold text-xs">|</span>
                        <button className="text-[#00476D] font-bold text-caption hover:underline">
                          Guardar perfil
                        </button>
                        <span className="font-bold text-xs">|</span>
                        <button className="text-[#DC2828] font-bold text-caption hover:underline">
                          Archivar candidato
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} md={16} lg={24} className="">
                  <Row gutter={24}>
                    <Col xs={12}>
                      <SortingOptions onSelect={handleSortSelect} />
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
              <Row gutter={16}>
                <Col xs={24} md={24} className="mb-[32px]">
                  <InfiniteScroll
                    dataLength={data.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={
                      <div style={{ marginBottom: "16px" }}>
                        {[...Array(2)].map((_, index) => (
                          <Skeleton
                            key={index}
                            active
                            title={false}
                            paragraph={{
                              rows: 2,
                              width: "100%",
                            }}
                          />
                        ))}
                      </div>
                    }
                  >
                    {selectedView === "list" ? (
                      <TableSearchCV />
                    ) : (
                      <Card className="border-[#81BFEC] bg-[#FBFDFE] rounded-md p-4">
                        <ListSearchCV />
                      </Card>
                    )}
                  </InfiniteScroll>

                </Col>
              </Row>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCV;
