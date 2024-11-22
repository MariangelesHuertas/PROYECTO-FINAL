import React, { useState } from 'react';
import { Input, Row, Col } from 'antd';
import IconSearch from '../../assets/icons/search.svg';
import IconLocation from '../../assets/icons/location.svg';
import IconApplications from '../../assets/icons/applications.svg';
import IconSaved from '../../assets/icons/saved.svg';
import IconYourAlerts from '../../assets/icons/alertsC.svg';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import Applications from '../myApplications/applications/Applications';
import Saved from '../myApplications/saved/Saved';
import YourAlert from '../myApplications/yourAlerts/YourAlerts';
import '../../styles/pages/myApplications/MyApplications.css';
import '../../styles/pages/employment/FiltersEmployment.css';
import Header from "../../components/pages/principalNav/PrincipalNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store"; // Ajusta la ruta según tu estructura
import { GetSectorsReducer } from "../../redux/actions/common/sectors/Sectors";
import Select from "../../components/pages/offers/CreateOffers/Select";


const MyApplications: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [clickedInput, setClickedInput] = useState<string | null>(null);
  const [selectedSectores, setSelectedSectores] = useState<string[]>([]);

  const handleSectorClose = (sector: string) => {
    setSelectedSectores((prev) => prev.filter((item) => item !== sector));
  };

  const handleInputClick = (name: string) => {
    setClickedInput(prev => (prev === name ? null : name));
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="search-bar-merere">
        <Row gutter={5} align="middle" style={{ width: '100%' }}>
          <Col xl={24} md={24}>
            <div style={{ display: 'flex' }}>
              <div>
                <Input
                  prefix={<img src={IconSearch} width={24} height={24} />}
                  placeholder="Buscar empleo de..."
                  className={`Input-Filter-Employment w-[418px] mr-[8px] ${
                    clickedInput === "search" ? "clicked" : ""
                  }`}
                  onClick={() => handleInputClick("search")}
                  
                />
              </div>
              <div>
                <p>gaaa2</p>
              </div>
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
                      Array.from(new Set([...prevSelected, ...selectedLabels]))
                    );
                  }}
                  style={{ width: "225px", height: "44px" }}
                />
              </div>
              <div>
                <Input
                  prefix={<img src={IconLocation} className='mr-[3px]' />}
                  placeholder="Ciudad, provincia..."
                  className={`Input-Filter-Employment ml-[8px] mr-[8px] w-[245px] ${
                    clickedInput === "location" ? "clicked" : ""
                  }`}
                  onClick={() => handleInputClick("location")}
                />
              </div>
              <div>
                <div
                  className={`Button-Filter-Employment h-[44px] ${
                    clickedInput === "button" ? "clicked" : ""
                  }`}
                  onClick={() => handleInputClick("button")}
                >
                  Buscar
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="tabs-merere">
        <div className="tab-links-merere">
          <button
            className={`tab-link-merere ${
              location.pathname === '/myApplications/applications' ? 'active-tab-merere' : ''
            }`}
            onClick={() => navigate('/myApplications/applications')}
          >
            <img src={IconApplications} className="icon-merere" /> Candidaturas
          </button>
          <button
            className={`tab-link-merere ${
              location.pathname === '/myApplications/saved' ? 'active-tab-merere' : ''
            }`}
            onClick={() => navigate('/myApplications/saved')}
          >
            <img src={IconSaved} className="icon-merere" /> Guardadas
          </button>
          <button
            className={`tab-link-merere ${
              location.pathname === '/myApplications/your-alerts' ? 'active-tab-merere' : ''
            }`}
            onClick={() => navigate('/myApplications/your-alerts')}
          >
            <img src={IconYourAlerts} className="icon-merere" /> Tus alertas
          </button>
        </div>
        <div className="tab-content-merere">
          <Routes>
            <Route path="applications" element={<Applications />} />
            <Route path="saved" element={<Saved />} />
            <Route path="your-alerts" element={<YourAlert />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
