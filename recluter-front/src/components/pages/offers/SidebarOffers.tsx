import React, { useEffect } from "react";
import { Button, Layout } from "antd";
import ButtonText from "../../button/ButtonText";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { GetOffersReducer, GetOffersReducerTable } from "../../../redux/actions/pages/company/Offers";
import { GetClosedOffersReducer } from "../../../redux/actions/pages/company/ClosedOffers";
import { GetSavedOffersReducer } from "../../../redux/actions/pages/company/SavedOffers";
import '../../../styles/components/sidebar/SidebarOffers.css'

const { Sider } = Layout;

interface SidebarOffersProps {
  inDrawer?: boolean;
  title?: string;
}

const SidebarOffers: React.FC<SidebarOffersProps> = ({
  inDrawer = false,
  title = "Tus ofertas de empleo",
}) => {

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const { rex_offers_table: rex_offers_table, rex_loading: loading, rex_error: error } = useSelector(({ offers }: any) => offers);

  const { rex_closedoffers: closedoffers } = useSelector(
    (state: RootState) => state.closedOffers
  );
  const { rex_savedoffers: savedoffers } = useSelector(
    (state: RootState) => state.savedOffers
  );

  useEffect(() => {
    dispatch(GetOffersReducerTable(1, 5));
    dispatch(GetClosedOffersReducer(1, 5));
    dispatch(GetSavedOffersReducer(1, 5))
  }, []);

  const limitedOffers = rex_offers_table.slice(0, 5);

  const limitedClosedOffers = closedoffers.slice(0, 5);

  const limitedSavedOffers = savedoffers.slice(0, 5);

  const buttonsOpenOffers = limitedOffers.map((offer: any) => ({
    type: "link",
    label: offer.cargo,
    size: "small",
    textColor: "#006497",
    color: "white",
    onClick: () => navigate(`/offer/${offer.id}`)
  }));

  const buttonsClosedOffers = limitedClosedOffers.map((closedoffer: any) => ({
    type: "link",
    label: closedoffer.cargo,
    size: "small",
    textColor: "#006497",
    color: "white",
    onClick: () => navigate(`/offer/${closedoffer.id}`)
  }));

  const buttonsSavedOffers = limitedSavedOffers.map((closedoffer: any) => ({
    type: "link",
    label: closedoffer.cargo,
    size: "small",
    textColor: "#006497",
    color: "white",
    onClick: () => navigate(`/offer/${closedoffer.id}`)
  }));

  const buttonsManageOffers = [
    {
      type: "link",
      label: "¿Pricing?",
      size: "small",
      textColor: "#006497",
      color: "white",
    },
    {
      type: "link",
      label: "¿Archivadas?",
      size: "small",
      textColor: "#006497",
      color: "white",
    },
    {
      type: "link",
      label: "¿Compartidas?",
      size: "small",
      textColor: "#006497",
      color: "white",
    },
  ];

  return (

    <div className="flex min-h-screen">
      <Sider
        width={227}
        style={{ backgroundColor: "#fff" }}
        // style={{ backgroundColor: "#FCFCFC" }}
        className={` ${inDrawer
          ? "p-[5px] border-none ml-[-15px] mt-[-15px]"
          : "p-[24px] rounded-lg shadow-lg border-2 border-sky-blue0"
          }`}
      >
        <h2 className="text-heading-md text-green42 font-bold mb-[26px]">
          {title}
        </h2>

        <div className="mb-6">
          <ButtonText
            buttons={[
              {
                type: "link",
                label: "Crear una nueva oferta de empleo",
                size: "small",
                textColor: "#006497",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                minHeight: "40px",
                onClick: () => {
                  navigate("/offer/createOffer")
                }
              },
            ]}
            vertical
            gap={4}
          />
        </div>

        <div className="mb-[24px]">
          <h3 className="font-bold text-green42 text-caption">
            Ofertas abiertas
          </h3>
          <ButtonText
            buttons={buttonsOpenOffers} vertical
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>

        <div className="mb-[24px]">
          <h3 className="font-bold text-green42 text-caption">
            Ofertas finalizadas
          </h3>
          <ButtonText
            buttons={buttonsClosedOffers} vertical
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>

        <div className="mb-[24px]">
          <h3 className="font-bold text-green42 text-caption">
            Ofertas guardadas
          </h3>
          <ButtonText
            buttons={buttonsSavedOffers} vertical
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>

        <div className="mb-[24px]">
          <h3 className="font-bold text-green42 text-caption">
            Gestionar tus ofertas
          </h3>
          <ButtonText
            buttons={buttonsManageOffers} vertical
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>

        <button
          className="principal-nav-notify-button  !h-[36px] !w-[100px] bg-white text-blue3 ml-4 py-2 px-4 rounded-md border-1 border-blue3 text-body-sm font-semibold transition duration-300"
          onClick={() => {
            localStorage.clear();
            navigate('/homeCompany');
          }}
        >
          Log out
        </button>

      </Sider>
    </div>
  );
};

export default SidebarOffers;
