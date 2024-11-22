import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Skeleton, Menu, Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOffersReducer } from "../../../redux/actions/pages/company/Offers";
import { deleteOfferReducer } from "../../../redux/actions/pages/company/DeleteOffers";
import { finalizeOfferReducer } from "../../../redux/actions/pages/company/FinalizeOfferReducer";
import { draftOfferReducer } from "../../../redux/actions/pages/company/DraftOffer";
import { RootState, AppDispatch } from "../../../redux/store/store";
import CardOffers from "../../../components/pages/offers/CardOffers";
import { MoreOutlined } from "@ant-design/icons";

const OpenOffers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { rex_offers: offers, rex_loading: loading, rex_error: error } = useSelector((state: RootState) => state.offers);
  const empresaId = 2; // Esto podría venir de props o de Redux

  console.log('offers:',offers)
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(GetOffersReducer(1, 10));
  }, [dispatch,]);

  const showModal = (type: string, id: number) => {
    setSelectedOfferId(id);
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (selectedOfferId !== null) {
      switch (modalType) {
        case "edit":
          navigate(`/offer-edit/${selectedOfferId}`);
          break;
        case "create-related":
          console.log(`Crear oferta relacionada con ${selectedOfferId}`);
          break;
        case "delete":
          await dispatch(deleteOfferReducer(selectedOfferId));
          break;
        case "finalize":
          await dispatch(finalizeOfferReducer(selectedOfferId));
          break;
        case "draft":
          await dispatch(draftOfferReducer(selectedOfferId));
          break;
      }
      setIsModalVisible(false);
      dispatch(GetOffersReducer(1, 10)); // Recargar ofertas tras la acción
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = (key: string, offerId: number) => {
    showModal(key, offerId);
  };

  const menu = (offerId: number) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, offerId)}
      items={[
        { label: "Editar oferta", key: "edit" },
        { label: "Crear oferta relacionada", key: "create-related" },
        { label: "Eliminar oferta", key: "delete" },
        { label: "Finalizar oferta", key: "finalize" },
        { label: "Mover a borrador", key: "draft" },
      ]}
    />
  );
  const getModalTitle = () => {
    switch (modalType) {
      case "edit":
        return "Confirmar edición";
      case "create-related":
        return "Confirmar creación de oferta relacionada";
      case "delete":
        return "Confirmar eliminación";
      case "finalize":
        return "Confirmar finalización";
      case "draft":
        return "Confirmar mover a borrador";
      default:
        return "Confirmar acción";
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case "edit":
        return "¿Estás seguro de que deseas editar esta oferta?";
      case "create-related":
        return "¿Estás seguro de que deseas crear una oferta relacionada?";
      case "delete":
        return "¿Estás seguro de que deseas eliminar esta oferta?";
      case "finalize":
        return "¿Estás seguro de que deseas finalizar esta oferta?";
      case "draft":
        return "¿Estás seguro de que deseas mover esta oferta a borrador?";
      default:
        return "¿Estás seguro de que deseas realizar esta acción?";
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div className="pt-3">
            <h2 className="text-heading-md font-bold mb-4">Listado de ofertas abiertas</h2>
            {error && <p>Error al cargar las ofertas: {error}</p>}
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : offers?.length === 0 ? (
              <p>No hay ofertas disponibles.</p>
            ) : (
              offers.map((offer: any, index: number) => (
                <div className="pb-[8px]" key={index} style={{ position: "relative" }}>
                  <CardOffers
                    id={offer.id}
                    title={offer.cargo}
                    subtitle={offer.descripcion}
                    location={`${offer.ubi_provincia}, ${offer.ubi_poblacion}`}
                    activeDate={offer.createdAt}
                    inscritos={offer.inscritos || 0}
                    seleccionados={offer.seleccionados || 0}
                    descartados={offer.descartados || 0}
                    loading={loading}
                    onClick={() => navigate(`/offer/${offer.id}`)}
                    onDelete={() => showModal("delete", offer.id)}
                    onEdit={() => showModal("edit", offer.id)}
                    onFinalize={() => showModal("finalize", offer.id)}
                    onDraft={() => showModal("draft", offer.id)}
                  />
                  {/* Dropdown Menu */}
                  <div style={{ position: "absolute", right: 20, top: 20 }}>
                    <Dropdown overlay={menu(offer.id)} trigger={['click']}>
                      <Button
                        type="text"
                        style={{
                          padding: 0,
                          color: "#006497",
                          fontSize: "32px", // Aumentado de 20px a 32px
                          fontWeight: "bold",
                          lineHeight: "1",
                          height: "auto", // Permite que el botón se ajuste al tamaño del icono
                          border: "none", // Elimina el borde del botón si lo hay
                        }}
                        icon={<MoreOutlined style={{ fontSize: "28px", marginTop: "-10px" }} rotate={90} />}
                      />
                    </Dropdown>
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>

      {/* Modal for all actions */}
      <Modal
        title={getModalTitle()}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <p>{getModalContent()}</p>
      </Modal>
    </div>
  );
};

export default OpenOffers;