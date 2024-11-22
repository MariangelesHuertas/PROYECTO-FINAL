import React, { useEffect, useState } from "react";
import { Input, Row, Col, Select } from "antd";
import IconSearch from "../../assets/icons/search.svg";
import IconRecommendations from "../../assets/icons/recommendations.svg";
import IconAlerts from "../../assets/icons/alerts.svg";
import IconResults from "../../assets/icons/results.svg";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import Recommendations from "./recommendations/Recommendations";
import YourAlerts from "./yourAlerts/YourAlerts";
import SearchResult from "./searchResult/SearchResult";
import "../../styles/pages/employment/Employment.css";
import "../../styles/pages/employment/FiltersEmployment.css";
import Header from "../../components/pages/principalNav/PrincipalNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store"; // Ajusta la ruta según tu estructura
import { GetSectorsReducer } from "../../redux/actions/common/sectors/Sectors";
import DebounceSelect from "../../components/pages/offers/CreateOffers/Select";
import { SearchOffersEmplReducer } from "../../redux/actions/offers/SearchOffers";
import { GetPaisesReducer } from "../../redux/actions/pages/emplotment/searchCountry";
import { Button } from "antd/lib";
import SelectBasic from "../../components/pages/offers/CreateOffers/SelectBasic";

const EmpleoRecomendaciones: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const sectors = useSelector((state: RootState) => state.sectors.rex_sectors);
  const paises = useSelector((state: RootState) => state.paises.rex_paises);
  const loadin = useSelector((state: RootState) => state.sectors.rex_loading);
  const loading = useSelector((state: RootState) => state.paises.rex_loading);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clickedInput, setClickedInput] = useState<string | null>(null);
  const [selectedSectores, setSelectedSectores] = useState<string[]>([]);

  // New states for country/city
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableCities, setAvailableCities] = useState<any[]>([]);

  useEffect(() => {
    // Fetch countries when component mounts
    dispatch(GetPaisesReducer());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry && paises.length > 0) {
      const country = paises.find((c: any) => c.pais === selectedCountry);
      if (country) {
        setAvailableCities(country.ciudades);
      } else {
        setAvailableCities([]);
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, paises]);

  const handleSectorClose = (sector: string) => {
    setSelectedSectores((prev) => prev.filter((item) => item !== sector));
  };

  const loadMoreSectors = async () => {
    if (!hasMore || loadin) return;

    const result = await dispatch(GetSectorsReducer("", page, 10));
    if (result.payload && result.payload.meta) {
      setHasMore(page < result.payload.meta.totalPages);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleInputClick = (name: string) => {
    setClickedInput((prev) => (prev === name ? null : name));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(SearchOffersEmplReducer(searchTerm)); // Asegúrate de que el término de búsqueda esté bien definido
      navigate("/employment/search-result?cargo=" + searchTerm); // Redirige y pasa el término de búsqueda como parámetro en la URL
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar-merere">
        <Row gutter={5} align="middle" style={{ width: "100%" }}>
          <Col xl={24} md={24}>
            <div style={{ display: "flex" }}>
              <div>
                <Input
                  prefix={<img src={IconSearch} width={24} height={24} />}
                  placeholder="Buscar empleo de..."
                  className={`Input-Filter-Employment w-[418px] mr-[8px] ${clickedInput === "search" ? "clicked" : ""
                    }`}
                  onClick={() => handleInputClick("search")}
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del término de búsqueda
                />
              </div>
              <div>
                <p>gaaa</p>
              </div>
              <div>
                <DebounceSelect
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
                      Array.from(new Set([...prevSelected, ...selectedLabels]))
                    );
                  }}
                  style={{ width: "225px", height: "44px" }}
                />
              </div>

              <div
                className="ml-2"
              >
                <SelectBasic
                  placeholder="País"
                  style={{ width: "200px", height: '44px' }}
                  onChange={(value) => setSelectedCountry(value)}
                  loading={loading}
                  options={paises.map((country: any) => ({
                    value: country.pais,
                    label: country.pais
                  }))}
                />
              </div>
              <div className="ml-2 mr-2">
                <SelectBasic
                  placeholder="Ciudad"
                  style={{ width: "200px", height: '44px' }}
                  disabled={!selectedCountry}
                  options={availableCities.map((city: any) => ({
                    value: city.ciudad,
                    label: city.ciudad
                  }))}
                />
              </div>
              <div>
                <div
                  className={`Button-Filter-Employment h-[44px] ${clickedInput === "button" ? "clicked" : ""
                    }`}
                  onClick={handleSearch} // Ejecuta la búsqueda al hacer clic
                >
                  Buscar
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Tabs de navegación */}
      <div className="tabs-merere mt-4">
        <div className="tab-links-merere flex justify-center px-4">
          <button
            className={`tab-link-merere ${location.pathname === "/employment/recommendations"
              ? "active-merere"
              : ""
              }`}
            onClick={() => navigate("/employment/recommendations")}
          >
            <img src={IconRecommendations} className="icon-merere" />{" "}
            <span className="inline">Recomendaciones</span>
          </button>
          <button
            className={`tab-link-merere ${location.pathname === "/employment/your-alerts"
              ? "active-merere"
              : ""
              }`}
            onClick={() => navigate("/employment/your-alerts")}
          >
            <img src={IconAlerts} className="icon-merere" />{" "}
            <span className="inline">Tus alertas</span>
          </button>
          <button
            className={`tab-link-merere ${location.pathname === "/employment/search-result"
              ? "active-merere"
              : ""
              }`}
            onClick={() => navigate("/employment/search-result")}
          >
            <img src={IconResults} className="icon-merere" />{" "}
            <span className="inline">Resultado de tu búsqueda</span>
          </button>
        </div>

        {/* Contenido de las tabs */}
        <div className="tab-content-merere p-4">
          <Routes>
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="your-alerts" element={<YourAlerts />} />
            <Route path="search-result" element={<SearchResult />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default EmpleoRecomendaciones;
