import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Button, Skeleton } from "antd";
import "tailwindcss/tailwind.css";
import IconMas from '../../../assets/icons/plusP.svg';
import ModalEditPortfolio from "./Modals/ModalEditPortfolio";
import ModalAddPortfolio from "./Modals/ModalAddPortfolio";
import CardPortfolio from "../../cards/CardPortfolio";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { GetUserPortfolioReducer } from '../../../redux/actions/pages/myPortal/portfolio/GetPortfolio';

const { Title } = Typography;

const Portfolio: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_userPortfolio, rex_loading, rex_error } = useSelector((state: RootState) => state.getPortfolio);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddWorkModalVisible, setIsAddWorkModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    dispatch(GetUserPortfolioReducer());
  }, [displayLimit, dispatch]);

  const handleEditClick = (project: any) => {
    setSelectedProjectId(project.id);
    setIsEditModalVisible(true);
  };

  const handleAddClick = () => {
    setIsAddWorkModalVisible(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
  };

  const handleAddModalClose = () => {
    setIsAddWorkModalVisible(false);
  };

  const loadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + 3);
  };

  const showLess = () => {
    setDisplayLimit(3);
  };

  const handleViewPortfolioData = () => {
    console.log("Datos del portafolio del usuario:", rex_userPortfolio);
    console.log("Estado de carga:", rex_loading);
    console.log("Error (si existe):", rex_error);
  };


  return (
    <div className="pb-8">
      <h1 className="text-heading-md font-bold pb-3 flex items-center">
        Portafolio
        <img
          src={IconMas}
          alt="Añadir"
          onClick={handleAddClick}
          className="inline-block text-sky-blue0 pl-3 cursor-pointer w-[45px]"
        />
      </h1>

      {rex_error && <p>Error al cargar el portafolio: {rex_error}</p>}

      <Row gutter={[16, 16]}>
        {rex_userPortfolio.slice(0, displayLimit).map((project, index) => (
          <Col key={project.id || index} xs={24} sm={24} lg={8}>
            {!rex_loading || index < displayLimit - 3 ? (
              <CardPortfolio
              projectName={project.nombre || "Nombre del proyecto"}
              projectDescription={project.nombre_archivo || "Descripción no disponible"}
              projectDetails={project.descripcion || "Detalle del proyecto"}
              skills={project.soft_skills_portafolio || []}  // Pasamos las habilidades blandas
              archivos_portafolio={project.archivos_portafolio || []} // Pasamos los archivos
              website={project.url || "Sin enlace"}
              showCheckbox={false}
              showEditIcon={true}
              onEditClick={() => handleEditClick(project)}
            />            
            ) : (
              <div className="flex justify-center my-4">
                <Skeleton active paragraph={{ rows: 5 }} />
              </div>
            )}
          </Col>
        ))}
      </Row>

      {Array.isArray(rex_userPortfolio) && rex_userPortfolio.length > 3 && (
        <div className="text-center mt-4">
          {rex_userPortfolio.length > displayLimit ? (
            <Button onClick={loadMore} type="link" className="text-[#006497] text-[14px] font-semibold underline">
              Ver más
            </Button>
          ) : (
            <Button onClick={showLess} type="link" className="text-[#006497] text-[14px] font-semibold underline">
              Ver menos
            </Button>
          )}
        </div>
      )}

      <Button
        onClick={handleViewPortfolioData}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ver datos del portafolio
      </Button>

      <ModalEditPortfolio
  visible={isEditModalVisible}
  onClose={() => {
    setIsEditModalVisible(false);
    setSelectedProjectId(null);
  }}
  archivos_portafolio={selectedProjectId !== null ? rex_userPortfolio.find(project => project.id === selectedProjectId)?.archivos_portafolio || [] : []}
  skills={selectedProjectId !== null ? rex_userPortfolio.find(project => project.id === selectedProjectId)?.soft_skills_portafolio || [] : []}  // Pasamos las habilidades del proyecto seleccionado
  projectId={selectedProjectId}
/>


      <ModalAddPortfolio
        visible={isAddWorkModalVisible}
        onClose={handleAddModalClose}

      />
    </div>
  );
};

export default Portfolio;