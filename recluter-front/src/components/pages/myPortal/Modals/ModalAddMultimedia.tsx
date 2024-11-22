import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Input } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';

interface ModalAddMultimediaProps {
  visible: boolean;
  onClose: () => void;
  onSave: (file: File, name: string) => void;
  cvId?: string | null;
}

const ModalAddMultimedia: React.FC<ModalAddMultimediaProps> = ({
  visible,
  onClose,
  onSave,
  cvId,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileInputValue, setFileInputValue] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Obtener los datos del CV del estado de Redux
  const { rex_userCV } = useSelector((state: RootState) => state.getCvUser);

  const resetModalState = () => {
    setUploadedFile(null);
    setFileName("");
    setFileInputValue("");
    setIsSubmitDisabled(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (visible) {
      if (cvId) {
        // Buscar el CV correspondiente en rex_userCV
        const cv = Array.isArray(rex_userCV) 
          ? rex_userCV.find(cv => cv.id === cvId)
          : rex_userCV && rex_userCV.id === cvId ? rex_userCV : null;

        if (cv) {
          setFileName(cv.nombre || "");
          setFileInputValue(cv.nombre_archivo || "");
        }
      } else {
        resetModalState();
      }
    }
  }, [visible, cvId, rex_userCV]);

  useEffect(() => {
    setIsSubmitDisabled(!uploadedFile || fileName.trim() === "");
  }, [uploadedFile, fileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setFileInputValue(file.name);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleSaveChanges = () => {
    if (uploadedFile && fileName.trim() !== "") {
      onSave(uploadedFile, fileName.trim());
      setIsSecondModalVisible(true);
    }
  };

  const handleModalSavedClose = () => {
    setIsSecondModalVisible(false);
    resetModalState();
    onClose();
  };

  const handleModalClose = () => {
    resetModalState();
    onClose();
  };

  const isEditMode = !!cvId;

  return (
    <>
      <Modal
        open={visible}
        onCancel={handleModalClose}
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
          onClick={handleModalClose}
          style={{
            position: "absolute",
            top: "34px",
            right: "34px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mx-[86px] mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            {isEditMode ? 'Editar contenido multimedia' : 'Añadir contenido multimedia'}
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[68px] mt-[43px]">
          <span className="text-body-md font-normal text-[#5F5F5F]">
            Nombre del archivo
          </span>
          <Input
            value={fileName}
            onChange={handleNameChange}
            placeholder="Ingrese el nombre del archivo"
            style={{ marginTop: "10px", marginBottom: "23px" }}
          />

          <span className="text-body-md font-normal text-[#5F5F5F]">
            {isEditMode ? 'Actualizar archivo' : 'Añade fotos, presentaciones o documentos'}
          </span>
          <div style={{ position: 'relative', marginTop: "10px", marginBottom: "23px" }}>
            <Input
              value={fileInputValue}
              placeholder="Seleccionar archivo"
              readOnly
              style={{ paddingRight: '90px' }}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.ppt,.pptx,.doc,.docx"
              style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>

        <div className="flex mx-[86px] mb-[67px] justify-center mt-[71px]">
          <Button
            onClick={handleModalClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ marginRight: "8px", borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitDisabled}
            onClick={handleSaveChanges}
            className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${isSubmitDisabled ? "bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed" : "bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"}`}
          >
            {isEditMode ? 'Actualizar cambios' : 'Guardar cambios'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddMultimedia;