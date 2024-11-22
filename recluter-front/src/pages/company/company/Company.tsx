import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Row, Col, Drawer, Skeleton, Card } from "antd";
import IconSearch from "../../../assets/icons/search.svg";
import alerts from "../../../assets/icons/alerts.svg";
import "../../../styles/pages/employment/Employment.css";
import "../../../styles/pages/employment/FiltersEmployment.css";
import SidebarFilterComponent from "../../../components/pages/employment/searchResult/SidebarFilter";
import "./Company.css";
import CardEmpresa from "../../../components/cards/CardCompany";
import Header from "../../../components/pages/principalNav/PrincipalNav";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetCompanyReducer } from "../../../redux/actions/pages/company/Company";
import { RootState, AppDispatch } from "../../../redux/store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetSectorsReducer } from "../../../redux/actions/common/sectors/Sectors";
import Select from "../../../components/pages/offers/CreateOffers/Select";
import { searchCompanyAction } from '../../../redux/actions/pages/company/SearchCompany';

const Company: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSectores, setSelectedSectores] = useState<string[]>([]);

  const handleSectorClose = (sector: string) => {
    setSelectedSectores((prev) => prev.filter((item) => item !== sector));
  };

  const {
    rex_companies,
    rex_error,
    rex_total,
    rex_limit
  } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    return () => {
      setPage(1);
      setHasMore(true);
    };
  }, []);

  useEffect(() => {
    if (rex_companies.length === 0 || page === 1) {
      setLoading(true);
      dispatch(GetCompanyReducer(1, rex_limit)).then(() => {
        setLoading(false);
      });
    }
  }, [rex_limit, page]);

  const handleCardClick = (id: string) => {
    navigate(`/companyDetail/${id}`);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const fetchMoreData = () => {
    if (loadingMoreData || !hasMore) {
      return;
    }

    setLoadingMoreData(true);

    const nextPage = page + 1;
    const totalPages = Math.ceil(rex_total / rex_limit);

    setTimeout(() => {
      dispatch(GetCompanyReducer(nextPage, rex_limit))
        .then(() => {
          setPage(nextPage);
          setLoadingMoreData(false);
          if (nextPage >= totalPages) {
            setHasMore(false);
          }
        })
        .catch(() => {
          setLoadingMoreData(false);
        });
    }, 1000);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setLoading(true);
      dispatch(searchCompanyAction(3, searchTerm, page))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="company-container ml-[24px] mr-[24px]">
        <div className="bg-pink-box"></div>

        <Drawer
          title="Filtrar"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible}
          width={268}
          className="md:hidden"
        >
          <SidebarFilterComponent inDrawer />
        </Drawer>

        <Row gutter={[16, 16]}>
          <Col xl={12} md={12}>
            <span className="text-2xl font-bold company-text text-center md:text-left mb-4 md:mb-0">
              Sigue a las empresas que más te
              <br /> interesen del sector
            </span>
          </Col>
          <Col xl={12} md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "right" }}>
                <Input
                  prefix={<img src={IconSearch} width={24} height={24} />}
                  placeholder="Buscar empresa..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  className="Input-Filter-Employment w-full mr-[8px] md:w-[417px] custom-input-company px-2 rounded"
                />
                <div>
                  <Select
                    showSearch
                    placeholder="Sector (Opcional)"
                    size="large"
                    fetchOptions={async (search) => {
                      const response = await dispatch(
                        GetSectorsReducer(search, 1, 5)
                      );
                      return response.payload.data.map((sector: any) => ({
                        label: sector.sector,
                        value: sector.id,
                      }));
                    }}
                    onChange={(newValue) => {
                      const selectedItems = Array.isArray(newValue)
                        ? newValue
                        : [newValue];
                      const selectedLabels = selectedItems.map(
                        (item: any) => item.label || item.value
                      );

                      setSelectedSectores((prevSelected) =>
                        Array.from(
                          new Set([...prevSelected, ...selectedLabels])
                        )
                      );
                    }}
                    style={{ width: "225px", height: "44px" }}
                  />
                </div>
                <Button
                  className="Button-Filter-Employment h-[44px] px-4 rounded w-[102px] md:w-auto mt-4 md:mt-0 ml-[8px]"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </div>
              {/* <Button
                className="Button-Alerts h-[36px] px-4 rounded w-[200px] mt-4 ml-[69%] text-[14px] font-semibold text-[#006497]"
                style={{
                  borderColor: "#006497",
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                icon={<img src={alerts} width={20} height={20} />}
                onClick={() => navigate("/followed-companies")}
              >
                Ver Empresas que sigo
              </Button> */}
            </div>
          </Col>
        </Row>

        <p className="text-gray-700 font-bold text-lg mb-8 text-center md:text-left mt-[55px]">
          Busca o filtra entre empresas reclutadoras por "valoraciones",
          "sector", "palabras clave"...
        </p>

        <Row gutter={[16, 16]}>
          <Col xxl={4} xl={5} md={6} className="hidden md:block">
            <div style={{ width: "100%", backgroundColor: "white" }}>
              <SidebarFilterComponent />
            </div>
          </Col>

          <Col xxl={20} xl={19} md={18} sm={24}>
            <Button
              className="md:hidden mb-4"
              type="primary"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
            />
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className="mb-4"
                  style={{ width: "100%", borderRadius: "4px" }}
                >
                  <Skeleton avatar paragraph={{ rows: 3 }} active />
                </Card>
              ))
            ) : (
              <InfiniteScroll
                dataLength={rex_companies.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Skeleton avatar paragraph={{ rows: 3 }} active />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Ya no hay más datos</b>
                  </p>
                }
                scrollThreshold={0.95}
              >
                {rex_companies
                  .filter((company, index, self) => self.findIndex(c => c.id === company.id) === index)
                  .map((company, index) => (
                    <React.Fragment key={company.id}>
                      <CardEmpresa
                        title={company.empresa}
                        description={company.descripcion}
                        location={company.sede_fiscal}
                        link={company.pagina_web}
                        avatarUrl="https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png"
                        reviews={company._count.valoraciones_empresas}
                        activeOffers={company._count.ofertas}
                        followers={company._count.empresa_seguida}
                        workers={0}
                        categories={["Categoría desde API"]}
                        onClick={() => handleCardClick(company.id)}
                        className="mb-4"
                        sector={company?.sectores?.sector}
                      />
                    </React.Fragment>
                  ))}
              </InfiniteScroll>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Company;
