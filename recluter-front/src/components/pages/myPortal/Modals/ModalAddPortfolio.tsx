import React, { useState, useEffect } from "react";
import { Modal, Button, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { UploadPortfolioReducer } from '../../../../redux/actions/pages/myPortal/portfolio/PostPortfolio';  // Cambiado el import
import { GetUserPortfolioReducer } from '../../../../redux/actions/pages/myPortal/portfolio/GetPortfolio';
import { GetSoftSkillsReducer } from "../../../../redux/actions/common/softSkills/SoftSkills";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import InputC from "../../../../components/pages/offers/KillerQuestions/ComponentsKillersQ/Input";
import ModalAddMultimedia from "./ModalAddMultimedia";
import ModalSaved from "../../myPortal/Modals/ModalSavedChanges";
import SelectBox from "../SelectBox";
import CustomTag from "../../offers/CreateOffers/CustomTag";
import IconPdf from '../../../../assets/icons/iconpdf.svg';
import IconWord from '../../../../assets/icons/iconword.svg';

interface ModalAddPortfolioProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAddPortfolio: React.FC<ModalAddPortfolioProps> = ({
  visible,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isAddMultimediaModalVisible, setIsAddMultimediaModalVisible] = useState(false);
  const [multimediaFiles, setMultimediaFiles] = useState<File[]>([]);
  const [multimediaFileNames, setMultimediaFileNames] = useState<string[]>([]);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(undefined);
  const { rex_softSkills } = useSelector((state: RootState) => state.softSkills);
  const [selectedSkills, setSelectedSkills] = useState<{ id: string; name: string }[]>([]);


  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setMultimediaFiles([]);
    setMultimediaFileNames([]); // Resetea los títulos
    setSelectedSkills([]);
    setIsSubmitDisabled(true);
  };

 useEffect(() => {
    const isValid = title.length > 0 && description.length > 0 && multimediaFiles.length > 0;
    setIsSubmitDisabled(!isValid);
  }, [title, description, multimediaFiles]);

  useEffect(() => {
    if (visible) {
      resetForm();
    }
  }, [visible]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  const handleAddMultimedia = () => {
    if (multimediaFiles.length >= 3) {
      message.warning('Solo se pueden subir un máximo de 3 archivos.');
      return;
    }
    setIsAddMultimediaModalVisible(true);
  };

  const handleSkillRemove = (skillId: string) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((item) => item.id !== skillId));
  };
  

   // Guardar el archivo y título desde el modal de multimedia
   const handleMultimediaSave = (file: File, name: string) => {
    if (multimediaFiles.length < 3) {
      setMultimediaFiles((prevFiles) => [...prevFiles, file]);
      setMultimediaFileNames((prevNames) => [...prevNames, name]); // Guarda el título
    } else {
      message.warning('Solo se pueden subir un máximo de 3 archivos.');
    }
    setIsAddMultimediaModalVisible(false);
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

  const handleSkillSelect = (value: string) => {
    const skill = rex_softSkills.find(skill => skill.soft_skill === value);
    
    if (skill && !selectedSkills.some(item => item.id === skill.id.toString())) {
      setSelectedSkills((prevSkills) => [...prevSkills, { id: skill.id.toString(), name: skill.soft_skill }]);
    }
  };
  
  

  const handleSaveChanges = async () => {
    if (multimediaFiles.length > 0) {
      try {
        const formData = new FormData();
        
        // Campos principales
        formData.append('nombre', title);
        formData.append('titulo', title);
        formData.append('descripcion', description);
        formData.append('url', url);
  
        // Soft Skills
        selectedSkills.forEach((skill) => {
          formData.append('softSkillsIds[]', skill.id);  // Usa skill.id para agregar al formData
        });                  
  
        // Archivo principal del portafolio - TEMPORALMENTE ESTÁTICO
        const dummyFile = new File(["contenido_estático"], "dummyFile.txt", { type: "text/plain" });
        formData.append('portafolioFile', dummyFile); // Archivo ficticio
  
        // Archivos y títulos adicionales
        multimediaFiles.forEach((file, index) => {
          formData.append(`archivoFile${index + 1}`, file);
          formData.append(`titulo${index + 1}`, multimediaFileNames[index]); 
        });
  
        // Añadir console.log para ver los datos que estamos enviando
        formData.forEach((value, key) => {
          console.log(`Front -> ${key}:`, value);
        });
  
        // Enviar el portafolio al servidor
        const portfolioResponse = await dispatch(UploadPortfolioReducer(formData));
  
        // Refresca el portafolio del usuario
        await dispatch(GetUserPortfolioReducer());
        setIsSecondModalVisible(true);
      } catch (error) {
        console.error('Error al guardar el portfolio:', error);
        message.error('Error al guardar el portfolio: ' + (error instanceof Error ? error.message : 'Error desconocido'));
      }
    } else {
      message.error('Por favor, añade al menos un archivo multimedia');
    }
  };
  
  const handleModalSavedClose = () => {
    setIsSecondModalVisible(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={visible && !isAddMultimediaModalVisible && !isSecondModalVisible}
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
            Añadir proyecto
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
            placeholder=""
            value={title}
            onChange={handleTitleChange}
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
            value={description}
            onChange={handleDescriptionChange}
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

          <div className="flex flex-wrap mt-4">
          {selectedSkills.map((skill) => (
    <CustomTag
      key={skill.id}
      text={skill.name} // Muestra el nombre del skill
      onClose={() => handleSkillRemove(skill.id)} // Usa el ID para eliminar
    />
  ))}
          </div>

          <div className="flex items-center justify-between mb-[24px] mt-[15px]">
            <span className="text-body-md font-normal text-[#5F5F5F]">
              Archivos adjuntos ({multimediaFiles.length}/3)
            </span>
            <Button
              className="text-blue3 font-semibold border border-white w-[218px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
              onClick={handleAddMultimedia}
              disabled={multimediaFiles.length >= 3}
            >
              <PlusOutlined />
              Añadir Contenido multimedia
            </Button>
          </div>

          {multimediaFiles.length > 0 && (
  <div className="mt-[16px] mb-[24px]">
    <span className="text-body-md font-normal text-[#5F5F5F]">
      Archivos seleccionados:
    </span>
    <ul className="flex flex-wrap gap-4 mt-4">
      {multimediaFiles.map((file, index) => {
        // Determinar el tipo de archivo basado en su extensión o MIME type
        const fileType = file.type;
        let filePreview = null;

        // Si es imagen, mostramos vista previa
        if (fileType.startsWith("image/")) {
          filePreview = (
            <img
              src={URL.createObjectURL(file)}  // Vista previa de la imagen
              alt={multimediaFileNames[index]}
              className="w-[80px] h-[80px] object-cover rounded-lg"
            />
          );
        }
        // Si es PDF, mostramos ícono de PDF
        else if (fileType === "application/pdf") {
          filePreview = (
            <img
              src={IconPdf}  // Icono de PDF
              alt="Icono PDF"
              className="w-[40px] h-[40px]"
            />
          );
        }
        // Si es Word, mostramos ícono de Word
        else if (
          fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          fileType === "application/msword"
        ) {
          filePreview = (
            <img
              src={IconWord}  // Icono de Word
              alt="Icono Word"
              className="w-[40px] h-[40px]"
            />
          );
        }

        return (
          <li key={index} className="flex flex-col items-center">
            {filePreview} {/* Vista previa del archivo o icono */}
            <span className="mt-2 text-body-md font-normal text-[#5F5F5F]">
              {multimediaFileNames[index]} {/* Título del archivo */}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
)}


          <span className="text-body-md font-normal text-[#5F5F5F]">
            Enlace (Opcional)
          </span>
          <InputC
            placeholder=""
            value={url}
            onChange={handleUrlChange}
            style={{
              borderRadius: "12px",
              height: "36px",
              marginTop: "10px",
            }}
          />
        </div>

        <div className="flex mx-[86px] justify-center mt-[34px]">
          <Button
            onClick={onClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ marginRight: "8px", borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitDisabled}
            onClick={handleSaveChanges}
            className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] 
              ${isSubmitDisabled
                ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed'
                : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'
              }
            `}
          >
            Guardar
          </Button>
        </div>
      </Modal>

      <ModalAddMultimedia
        visible={isAddMultimediaModalVisible}
        onClose={() => setIsAddMultimediaModalVisible(false)}
        onSave={handleMultimediaSave}
      />

      <ModalSaved
        visible={isSecondModalVisible}
        onClose={handleModalSavedClose}
      />
    </>
  );
};

export default ModalAddPortfolio;
