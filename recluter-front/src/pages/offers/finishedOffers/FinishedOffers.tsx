import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Skeleton, Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetClosedOffersReducer } from "../../../redux/actions/pages/company/ClosedOffers";
import { deleteOfferReducer } from "../../../redux/actions/pages/company/DeleteOffers";
import { draftOfferReducer } from "../../../redux/actions/pages/company/DraftOffer";
import { RootState, AppDispatch } from "../../../redux/store/store";
import CardOffers from "../../../components/pages/offers/CardOffers";

const ClosedOffers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { rex_closedoffers: offers, rex_loading: loading, rex_error: error } = useSelector(
    (state: RootState) => state.closedOffers
  );
  const empresaId = 1; 

  console.log('closedoffers:', offers)

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    dispatch(GetClosedOffersReducer(1, 10)); // Cargar las ofertas cerradas
  }, [dispatch, empresaId]);

  const showDeleteModal = (id: number) => {
    setSelectedOfferId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedOfferId !== null) {
      await dispatch(deleteOfferReducer(selectedOfferId));
      setIsDeleteModalVisible(false);
      dispatch(GetClosedOffersReducer(1, 10)); // Recargar ofertas tras eliminar
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleMenuClick = async (key: string, offerId: number) => {
    switch (key) {
      case "edit":
        console.log(`Editar oferta ${offerId}`);
        break;
      case "create-related":
        console.log(`Crear oferta relacionada con ${offerId}`);
        break;
      case "delete":
        showDeleteModal(offerId);
        break;
      case "finalize":
        console.log(`Finalizar oferta ${offerId}`);
        break;
      case "draft":
        await dispatch(draftOfferReducer(offerId)); // Mover a borrador
        dispatch(GetClosedOffersReducer(1, 10)); // Actualiza la lista de ofertas cerradas
        break;
      default:
        break;
    }
  };

  const menu = (offerId: number) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, offerId)}
      items={[
        { label: "Editar oferta", key: "edit" },
        { label: "Crear oferta relacionada", key: "create-related" },
        { label: "Eliminar oferta", key: "delete" },
        { label: "Finalizar oferta", key: "finalize" },
        { label: "Mover a borrador", key: "draft" }, // Opción de mover a borrador
      ]}
    />
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div className="pt-3">
            <h2 className="text-heading-md font-bold mb-4">Listado de ofertas cerradas</h2>
            {error && <p>Error al cargar las ofertas: {error}</p>}
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : offers?.length === 0 ? (
              <p>No hay ofertas cerradas disponibles.</p>
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
                    onClick={() => navigate(`/offers/${offer.id}`)}
                    onDelete={() => showDeleteModal(offer.id)}
                  />
                  {/* Dropdown Menu */}
                  <div style={{ position: "absolute", right: 20, top: 20 }}>
                    <Dropdown overlay={menu(offer.id)} trigger={["click"]}>
                      <Button
                        type="text"
                        style={{ padding: 0, color: "#006497", fontSize: "20px", fontWeight: "bold", lineHeight: "1" }}
                        icon={<MoreOutlined rotate={90} />}
                      />
                    </Dropdown>
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>

      {/* Delete Modal */}
      {isDeleteModalVisible && (
        <Modal
          title="Confirmar eliminación"
          visible={isDeleteModalVisible}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <p>¿Estás seguro de que deseas eliminar esta oferta?</p>
        </Modal>
      )}
    </div>
  );
};

export default ClosedOffers;
