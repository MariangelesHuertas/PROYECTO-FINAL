import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Input, Skeleton, Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSavedOffersReducer } from "../../../redux/actions/pages/company/SavedOffers"; // Acción para obtener ofertas guardadas
import { deleteOfferReducer } from "../../../redux/actions/pages/company/DeleteOffers";
import { RootState, AppDispatch } from "../../../redux/store/store";
import CardOffers from "../../../components/pages/offers/CardOffers";

const SavedOffers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { rex_savedoffers: offers, rex_loading: loading, rex_error: error } = useSelector((state: RootState) => state.savedOffers); 
  const { rex_offers: searchResults, rex_loading: searchLoading } = useSelector((state: RootState) => state.searchOffers);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const empresaId = 1;
    dispatch(GetSavedOffersReducer(1, 10)); // Acción para obtener ofertas guardadas
  }, [dispatch]);

  const showDeleteModal = (id: number) => {
    setSelectedOfferId(id);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedOfferId !== null) {
      await dispatch(deleteOfferReducer(selectedOfferId));
      setIsDeleteModalVisible(false);
      dispatch(GetSavedOffersReducer(1, 10)); // Recargar ofertas guardadas tras eliminar
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleMenuClick = (key: string, offerId: number) => {
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
        { label: "Finalizar oferta", key: "finalize" }
      ]}
    />
  );

  const ofertasAMostrar = searchTerm.trim() !== "" ? searchResults : offers;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div className="pt-3">
            <h2 className="text-heading-md font-bold mb-4">
              {searchTerm.trim() ? "Resultados de búsqueda" : "Listado de ofertas guardadas"}
            </h2>
            {error && <p>Error al cargar las ofertas: {error}</p>}
            {loading || searchLoading ? (
              // Muestra Skeleton mientras se carga
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : ofertasAMostrar.length === 0 ? (
              <p>No hay ofertas guardadas disponibles.</p>
            ) : (
              ofertasAMostrar.map((offer: any, index: number) => (
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
                    loading={loading || searchLoading}
                    onClick={() => navigate(`/offers/${offer.id}`)}
                    onDelete={() => showDeleteModal(offer.id)}
                  />
                  {/* Dropdown Menu */}
                  <div style={{ position: "absolute", right: 20, top: 20 }}>
                    <Dropdown overlay={menu(offer.id)} trigger={['click']}>
                      <Button
                        type="text"
                        style={{ 
                          padding: 0, 
                          color: "#006497", 
                          fontSize: "20px", 
                          fontWeight: "bold", 
                          lineHeight: "1" 
                        }}
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

export default SavedOffers;
