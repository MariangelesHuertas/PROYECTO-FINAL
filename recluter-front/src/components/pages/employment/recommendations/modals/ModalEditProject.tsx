import React, { useState } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import IconClosed from "../../../../../assets/icons/IconClosed.svg";
import IconEdit from "../../../../../assets/icons/edit2.svg";
import ModalEditPortfolio from "../../../../../components/pages/myPortal/Modals/ModalEditPortfolio"; // Cambia esto a la ruta correcta


interface ModalEditProjectProps {
  visible: boolean;
  onClose: () => void;
}

const ModalEditProject: React.FC<ModalEditProjectProps> = ({
  visible,
  onClose,
}) => {
  const [projects] = useState([
    {
      title: "Branding",
      description: "Congreso Internacional de Género",
      details: "Logotipo, imagen corporativa y voz y tono del proyecto Branding, género, logotipo, imagen corporativa",
      link: "www.congresogeneroyeducacion.com",
    },
  ]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null); // Estado para almacenar el proyecto actual
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleEditProject = (project: any) => {
    setCurrentProject(project);
    setIsEditModalVisible(true); // Mostrar el modal de edición
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false); // Cerrar el modal de edición
  };

  const handleEditClick = (project: any) => {
    setSelectedProjectId(project.id);
    setIsEditModalVisible(true);
  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
        closable={false}
        width={677}
        bodyStyle={{ borderRadius: "12px" }}
        style={{
          borderRadius: "12px",
          border: "1px solid #E1E1E2",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <img
          src={IconClosed}
          alt="Cerrar"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "34px",
            right: "34px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mx-[139px]  mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar proyectos
          </h3>
          <p className="font-medium text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[68px] mb-[38px] mt-[18px]">
          <div className="flex justify-center">
            <Button
              className="text-blue3 ml-0 font-semibold border border-white w-[296px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
            >
              <PlusOutlined />
              Añadir Proyecto
            </Button>
          </div>
        </div>

        <div className="mx-[139px] mb-[71px]">
          {projects.map((project, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="max-w-[343px]">
                <h4 className="text-body-md font-bold">{project.title}</h4>
                <p className="text-body-md font-bold">{project.description}</p>
                <p className="text-body-md font-medium text-[#5F5F5F]">
                  {project.details}
                </p>
                <p className="text-body-md font-medium text-[#5F5F5F]">
                  {project.link}
                </p>
              </div>
              <img 
                src={IconEdit}
                alt="Editar"
                style={{
                  cursor: "pointer",
                  width: "24px",
                  height: "24px",
                  marginTop: "0px",
                }}
                onClick={() => handleEditProject(project)} // Llamar a la función de edición con el proyecto actual
              />
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal para Editar el Proyecto */}
      {currentProject && (
         <ModalEditPortfolio
         visible={isEditModalVisible}
         onClose={() => {
           setIsEditModalVisible(false);
           setSelectedProjectId(null);
         }}
         skills={[]}
         archivos_portafolio={[]}
         projectId={selectedProjectId}
       />
      )}
    </>
  );
};

export default ModalEditProject;
