import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import InputC from "../../../../components/pages/offers/KillerQuestions/ComponentsKillersQ/Input";
import SelectBox from "../SelectBox";
import CustomTag from "../../offers/CreateOffers/CustomTag";
import ModalAddSkills from "./ModalAddSkills";
import ModalSaved from "../../myPortal/Modals/ModalSavedChanges";
import ModalDeletePortfolio from "./ModalDeletePortfolio";
import ModalAddMultimedia from "./ModalAddMultimedia";
import ModalAddPortfolio from "./ModalAddPortfolio";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { GetUserPortfolioReducer } from '../../../../redux/actions/pages/myPortal/portfolio/GetPortfolio';
import { GetSoftSkillsReducer } from "../../../../redux/actions/common/softSkills/SoftSkills";
import { DeletePortfolioReducer } from '../../../../redux/actions/pages/myPortal/portfolio/DeletePortfolio';
import IconPdf from '../../../../assets/icons/iconpdf.svg';
import IconWord from '../../../../assets/icons/iconword.svg';

interface ModalEditPortfolioProps {
  visible: boolean;
  onClose: () => void;
  skills: string[];
  archivos_portafolio: any[]; 
  projectId: number | null;
}

const ModalEditPortfolio: React.FC<ModalEditPortfolioProps> = ({
  visible,
  onClose,
  skills: initialSkills = [],
  archivos_portafolio,
  projectId
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_userPortfolio, rex_loading, rex_error } = useSelector((state: RootState) => state.getPortfolio);
  const { rex_softSkills } = useSelector((state: RootState) => state.softSkills);
  const { rex_deleting, rex_deleteError } = useSelector((state: RootState) => state.deletePortfolio);

  const [projectName, setProjectName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(undefined);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);


  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDeleteSkillModalVisible, setIsDeleteSkillModalVisible] = useState(false);
  const [isAddWorkModalVisible, setIsAddWorkModalVisible] = useState(false);
  const [isAddSkillModalVisible, setIsAddSkillModalVisible] = useState(false);
  const [isAddMultimediaModalVisible, setIsAddMultimediaModalVisible] = useState(false);
  const [isDeletePortfolioModalVisible, setIsDeletePortfolioModalVisible] = useState(false);

  
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value);
  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setProjectTitle(e.target.value);
  const handleProjectDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setProjectDescription(e.target.value);
  const handleProjectLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => setProjectLink(e.target.value);

  const handleAddSkills = (newSkills: string[]) => {
    setSelectedSkills(prevSkills => {
      const uniqueNewSkills = newSkills.filter(skill => !prevSkills.includes(skill));
      return [...prevSkills, ...uniqueNewSkills];
    });
    handleAddSkillModalClose();
  };

  const [attachedFiles, setAttachedFiles] = useState<Array<{ titulo: string; archivo: string | File }>>([]);

// Luego, modifiquemos la función handleSaveFile
const handleSaveFile = (file: File) => {
  const newFile = {
    titulo: file.name,
    archivo: file
  };
  setAttachedFiles([...attachedFiles, newFile]);
  setIsAddMultimediaModalVisible(false);
};

  const handleDeletePortfolio = async () => {
    if (projectId) {
      const result = await dispatch(DeletePortfolioReducer(projectId));
      if (result.success) {
        setIsDeletePortfolioModalVisible(false);
        onClose();
        dispatch(GetUserPortfolioReducer());
      } else {
        console.error("Failed to delete portfolio:", result.error);
      }
    }
  };

  useEffect(() => {
    setSkills(initialSkills || []);
  }, [initialSkills]);

  const handleDeleteClick = () => {
    setIsDeletePortfolioModalVisible(true);
  };

  useEffect(() => {
    if (projectId && rex_userPortfolio) {
      const selectedProject = rex_userPortfolio.find((project) => project.id === projectId);
      if (selectedProject) {
        setProjectName(selectedProject.nombre || "");
        setProjectDescription(selectedProject.descripcion || "");
        setProjectLink(selectedProject.url || "");
        setProjectTitle(selectedProject.titulo || "");
  
        // Cargar archivos adjuntos si existen
       console.log("Archivos del portafolio:", selectedProject.archivos_portafolio); // Verificar archivos
        setAttachedFiles(selectedProject.archivos_portafolio || []);

        if (selectedProject.habilidades) {
          setSelectedSkills(selectedProject.habilidades.map((skill: any) => skill.nombre));
        } else {
          setSelectedSkills([]); // Si no hay habilidades, asegurarse de que esté vacío
        }
      }
    }
  }, [projectId, rex_userPortfolio]);
  
  const renderFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
  
    if (extension === 'pdf') {
      return <img src={IconPdf} alt="PDF" className="w-[40px] h-[40px] mr-2" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <img src={IconWord} alt="Word" className="w-[40px] h-[40px] mr-2" />;
    } else {
      return (
        <img
          src={`${process.env.REACT_APP_API_BASE_URL_EXACT}/${fileName}`}
          alt="Imagen"
          className="w-24 h-24 object-cover mr-2"
        />
      );
    }
  };


  const handleSaveChanges = () => {
    setIsSecondModalVisible(true);
  };

  const handleAddWork = () => {
    setIsAddWorkModalVisible(true);
  };


  const handleAddSkillModalClose = () => {
    setIsAddSkillModalVisible(false);
  };

  const handleAddMultimedia = () => {
    setIsAddMultimediaModalVisible(true);
  };

  

  const handleSkillSelect = (value: string) => {
    if (!selectedSkills.includes(value)) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(prevSkills => prevSkills.filter(item => item !== skill));
  };

  const handleSearchSkills = (search: string) => {
    setSearchTerm(search);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = window.setTimeout(async () => {
      await dispatch(GetSoftSkillsReducer(search, 1, 5));
    }, 500);

    setTypingTimeout(timeoutId);
  };

  return (
    <>
      <Modal
        open={
          visible && !isAddSkillModalVisible && !isAddMultimediaModalVisible && !isDeletePortfolioModalVisible
        }
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

        <div className="text-center mx-[86px] mb-[46px] mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar proyecto
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[68px] mt-[43px]">
          <span className="text-body-md font-normal text-[#5F5F5F]">
            Título
          </span>
          <InputC
            placeholder="Nombre del proyecto"
            value={projectTitle}
            onChange={handleProjectTitleChange}
            style={{
              marginBottom: "23px",
              borderRadius: "12px",
              height: "36px",
              marginTop: "10px",
            }}
          />

          <span className="text-body-md text-[#757575] font-normal">
            Descripción del proyecto
          </span>
          <Input.TextArea
            rows={5}
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
            className="w-full 
                border
                my-[8px]
                border-[#D9D9D9] 
                placeholder:text-green32 
                focus:placeholder:text-grays 
                hover:placeholder:text-black 
                hover:bg-gray3 
                hover:border-2 
                hover:border-[#D9D9D9]
                hover:text-black 
                focus:border-4 
                focus:border-[#91c3fd] 
                focus:text-[#757575]
                rounded-[8px] 
                transition-all 
                duration-200 
                text-[#757575]
                font-normal
                text-body-md"
            style={{ height: 80 }}
          />

          <div className="flex items-center justify-between mt-[27px]">
            <span className="text-body-md font-normal text-[#5F5F5F]">
              Habilidades (Opcional)
            </span>
          </div>
          <SelectBox
            placeholder="Seleccionar habilidades"
            options={rex_softSkills.map((skill: { soft_skill: string }) => ({
              value: skill.soft_skill,
              label: skill.soft_skill,
            }))}
            onSearch={handleSearchSkills}
            onChange={(value) => handleSkillSelect(value)}
            className="Input-Filter-Employment w-full mt-[5px] rounded-[12px] custom-input-company px-1"
            
          />

        <div>
        {skills.length > 0 ? (
          <div className="flex flex-wrap mt-4">
            {skills.map((skill: any, index: number) => (
              <CustomTag
                key={index}
                text={skill.soft_skills?.soft_skill || "Nombre no disponible"}  // Pasamos el nombre de la habilidad
                onClose={() => handleSkillRemove(skill)}
              />
            ))}
          </div>
        ) : (
          <p>No se han añadido habilidades a este portafolio.</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-[24px] mt-[15px]">
            <span className="text-body-md font-normal text-[#5F5F5F]">
              Archivos adjuntos ({archivos_portafolio.length}/3)
            </span>
            <Button
              className="text-blue3 font-semibold border border-white w-[218px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
              onClick={() => setIsAddMultimediaModalVisible(true)}
              disabled={archivos_portafolio.length >= 3}
            >
              <PlusOutlined />
              Añadir Contenido multimedia
            </Button>
          </div>

          {archivos_portafolio.length > 0 && (
            <div className="mt-[16px] mb-[24px]">
              <span className="text-body-md font-normal text-[#5F5F5F]">
                Archivos seleccionados:
              </span>
              <ul className="flex flex-wrap gap-4 mt-4">
      {archivos_portafolio.map((file, index) => (
        <li key={index} className="flex flex-col items-center">
          {renderFileIcon(file.nombre_archivo)} {/* Utiliza el nombre del archivo */}
          <span className="mt-2 text-body-md font-normal text-[#5F5F5F]">
            {file.titulo} {/* Utiliza el título del archivo */}
          </span>
        </li>
      ))}
    </ul>
            </div>
          )}

        </div>

        <div className="mx-[68px] mt-[20px]">
          <span className="text-body-md font-normal text-[#5F5F5F]">
            Enlace (Opcional)
          </span>
          <InputC
            placeholder="Nombre del proyecto"
            value={projectLink}
            onChange={handleProjectLinkChange}
            style={{
              marginBottom: "23px",
              borderRadius: "12px",
              height: "36px",
              marginTop: "10px",
            }}
          />
        </div>
        <div className="flex mx-[86px] justify-center mt-[34px]">
        <Button
            className="text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
            onClick={handleDeleteClick}
          >
            Eliminar
          </Button>
          <Button
            className="text-blue3 font-semibold border border-white w-[70px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
            onClick={handleSaveChanges}
          >
            Guardar
          </Button>
        </div>

        <div className="mx-[68px] mb-[44px]  mt-[19px]">
          <div className="flex justify-center">
            <Button
              className="text-blue3 font-semibold border border-white w-[296px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
              onClick={handleAddWork}
            >
              <PlusOutlined />
              Añadir Proyecto
            </Button>
          </div>
        </div>
      </Modal>
      
      <ModalSaved
        visible={isSecondModalVisible}
        onClose={() => setIsSecondModalVisible(false)}
      />

      <ModalAddSkills
        visible={isAddSkillModalVisible}
        onClose={handleAddSkillModalClose}
        onAdd={handleAddSkills}
        existingSkills={skills}
      />

<ModalDeletePortfolio
        visible={isDeletePortfolioModalVisible}
        onClose={() => setIsDeletePortfolioModalVisible(false)}
        onConfirmDelete={handleDeletePortfolio}
        projectTitle={projectTitle}
      />

      <ModalAddPortfolio
        visible={isAddWorkModalVisible}
        onClose={() => setIsAddWorkModalVisible(false)}
        />

      <ModalAddMultimedia
        visible={isAddMultimediaModalVisible}
        onClose={() => setIsAddMultimediaModalVisible(false)}
        onSave={handleSaveFile}
      />
    </>
  );
};

export default ModalEditPortfolio;
