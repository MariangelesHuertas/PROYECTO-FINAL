import React, { useState, useEffect } from "react";
import { Row, Col, Button, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import CardEmpleo from "../../../components/cards/CardEmployment";
import Information from "../../../components/pages/employment/recommendations/Information";
import FilterComponent from "../../../components/pages/employment/searchResult/SidebarFilter";
import AlertFilter from "../../../components/pages/employment/searchResult/InitialInfo";
import { AppDispatch, RootState } from '../../../redux/store/store';
import { SearchOffersEmplReducer } from "../../../redux/actions/offers/SearchOffers";
import { SaveOfferReducer } from "../../../redux/actions/offers/SaveOffer";
import { GetOfferSaveReducer } from "../../../redux/actions/offers/GetOfferSave"; // Importa la acción thunk correcta

const SearchResult: React.FC = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [appliedCards, setAppliedCards] = useState<{ [key: number]: boolean }>({});
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [savedOffers, setSavedOffers] = useState<{ [key: number]: boolean }>({});

  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { rex_offersEmpl: offers, rex_loading: loading } = useSelector(
    (state: RootState) => state.searchOffersEmpl
  );
  const { rex_data: savedOffersData } = useSelector(
    (state: RootState) => state.getOfferSave
  );

  const searchTerm: string | null = new URLSearchParams(window.location.search).get("cargo");

  useEffect(() => {
    if (searchTerm) {
      //dispatch(SearchOffersEmplReducer(searchTerm, 1, 10));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (savedOffersData) {
      const offersMap = savedOffersData.reduce((acc: { [key: number]: boolean }, offer: any) => {
        acc[offer.id] = true;
        return acc;
      }, {});
      setSavedOffers(offersMap);
    }
  }, [savedOffersData]);

  const handleCardClick = (index: number) => {
    setLoadingInfo(true);
    setSelectedCardIndex(index);

    setTimeout(() => {
      setLoadingInfo(false);
    }, 2000);
  };

  const handleApply = (index: number | null) => {
    if (index !== null) {
      setAppliedCards((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  const handleSave = (offerId: number) => {
    dispatch(SaveOfferReducer(offerId)).then(() => {
      setSavedOffers((prev) => ({
        ...prev,
        [offerId]: !prev[offerId],
      }));
    });
  };

  const handleCreateAlertClick = () => {
    alert("Nueva alerta creada");
  };

  const defaultProps = {
    companyName: "Supermercados Carrefour",
    jobTitle: "Reponedor de supermercado",
    location: "Campo de Criptana",
    salary: "18.000€",
    schedule: "Parcial",
    ratings: "20 valoraciones",
    activeOffers: "90 ofertas activas",
    followers: "450 Seguidores",
    description:
      "Importante cadena de alimentación busca incorporar un/a dependiente/a reponedor/a en Fuerteventura.<br>Requisitos: Experiencia en la caja y reposicion, Manejo transpaleta manual...",
    postedTime: "Subida hace 23h",
    applied: false,
    employmentType: "Tiempo completo",
    comments: 0,
    contractType: "Indefinido",
    currentStep: 1,
  };

  const defaultInformationProps = {
    applicantsCount: "10",
    introText: "Esta es una gran oportunidad para tu carrera",
    requirements: ["Requisito 1", "Requisito 2"],
    responsibilities: ["Responsabilidad 1", "Responsabilidad 2"],
    benefits: ["Beneficio 1", "Beneficio 2"],
    extraText: ["Texto adicional predeterminado"],
    extraText2: ["Texto adicional 2 predeterminado"],
  };

  const mergeProps = (offer: any, index: number) => {
    return {
      ...defaultProps,
      companyName: `Empresa ${offer.empresa_id}`,
      jobTitle: offer.cargo,
      location: `${offer.ubi_provincia}, ${offer.ubi_poblacion}`,
      salary: `${offer.sal_min}€ - ${offer.sal_max}€`,
      schedule: offer.jornada_laboral,
      description: offer.descripcion,
      applied: !!appliedCards[index],
      comments: Number(offer.comments),
      ...defaultInformationProps,
      // Nuevas propiedades para `Information`
      company: `Empresa ${offer.empresa_id}`,
      title: offer.cargo,
      id: offer.id,
      createdAt: offer.createdAt
    };
  };

  return (
    <div className="bg-white">
      <div className="pl-0">
        <AlertFilter
          newOffersCount={offers.length}
          onCreateAlertClick={handleCreateAlertClick}
          newOffersText="Nuevas ofertas que se adaptan a ti"
          createAlertText="Crear nueva alerta"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <Button
          type="primary"
          className="md:hidden mb-3"
          onClick={() => setDrawerVisible(true)}
          icon={<MenuOutlined />}
        />

        <div style={{ width: "234px", backgroundColor: "white" }} className="hidden md:block p-0">
          <FilterComponent />
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
          <FilterComponent inDrawer/>
        </Drawer>

        <div className="flex-1 px-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              {loading ? (
                <div>Cargando ofertas...</div>
              ) : !offers || !Array.isArray(offers) || offers.length === 0 ? (
                <div>No hay resultados para tu búsqueda.</div>
              ) : (
                offers.map((offer: any, index: number) => (
                  <div
                    key={offer.id}
                    onClick={() => handleCardClick(index)}
                    className={`cursor-pointer mb-5 p-4 rounded-lg transition-shadow duration-300 ${
                      selectedCardIndex === index ? "shadow-lg" : "hover:shadow-md"
                    }`}
                  >
                    {selectedCardIndex === index ? (
                      <Information
                        {...mergeProps(offer, index)}
                        onApply={() => handleApply(index)}
                        onSave={() => handleSave(offer.id)}
                        loading={loadingInfo}
                        partialLoading={true}
                        saved={!!savedOffers[offer.id]}
                        sector=""
                        aptitudes={[]}
                      />
                    ) : (
                      <CardEmpleo
                        {...mergeProps(offer, index)}
                        loading={loadingInfo}
                        saveOffer={false}
                      />
                    )}
                  </div>
                ))
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
