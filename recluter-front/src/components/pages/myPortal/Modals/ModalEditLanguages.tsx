import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import IconDelete from '../../../../assets/icons/IconDelete.svg';
import { PlusOutlined } from "@ant-design/icons";
import ModalAddLanguages from "./ModalAddLanguages";
import ModalDeleteLanguages from "./ModalDeleteLanguages";
import ModalConfirm from "./ModalConfirm";
import { useDispatch } from "react-redux";
import { UpdateUserLanguagesReducer } from "../../../../redux/actions/pages/myPortal/languages/PostLanguagesUser";
import { GetUserLanguagesReducer } from "../../../../redux/actions/pages/myPortal/languages/GetLanguagesUser";
import { AppDispatch } from "../../../../redux/store/store";
import { Language } from "../../../../constants/pages/myPortal/languages/PostLanguagesUser";
import ModalSaved from "./ModalSavedChanges";

interface ModalEditLanguagesProps {
  visible: boolean;
  onClose: () => void;
  languages: Language[];
}

const ModalEditLanguages: React.FC<ModalEditLanguagesProps> = ({ visible, onClose, languages: initialLanguages }) => {
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [isAddLanguageModalVisible, setIsAddLanguageModalVisible] = useState(false);
  const [isDeleteLanguageModalVisible, setIsDeleteLanguageModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState<Language | null>(null);
  const [isModalSavedVisible, setIsModalSavedVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLanguages(initialLanguages);
  }, [initialLanguages]);

  const handleAddLanguage = (newLanguage: Language) => {
    // Asignar un ID temporal único para nuevos idiomas
    const tempId = Date.now();
    setLanguages(prevLanguages => [...prevLanguages, { ...newLanguage, id: tempId }]);
    setIsAddLanguageModalVisible(false);
  };

  const handleDeleteLanguage = () => {
    if (languageToDelete) {
      setLanguages(prevLanguages => prevLanguages.filter(lang => lang.id !== languageToDelete.id));
      setIsDeleteLanguageModalVisible(false);
      setIsConfirmModalVisible(true);
    }
  };

  const handleSaveChanges = async () => {
    const languagesData = {
      nivel_idioma_id: languages.map(lang => lang.nivel_idioma_id)
    };

    try {
      const result = await dispatch(UpdateUserLanguagesReducer(languagesData));
      if (!result.error) {
        await dispatch(GetUserLanguagesReducer());
        onClose();
        setIsModalSavedVisible(true);
      } else {
        console.error("Error saving languages:", result.error);
      }
    } catch (error) {
      console.error("Error saving languages:", error);
    }
  };

  const handleModalSavedClose = () => {
    setIsModalSavedVisible(false);
    onClose(); // Cierra el modal principal después de cerrar ModalSaved
  };

  return (
    <>
      <Modal
        open={visible && !isAddLanguageModalVisible && !isDeleteLanguageModalVisible && !isConfirmModalVisible}
        onCancel={onClose}
        footer={null}
        centered
        closable={false}
        width={677}
        bodyStyle={{ borderRadius: "12px" }}
        style={{ borderRadius: "12px", border: "1px solid #E1E1E2", marginTop: '15px', marginBottom: '15px' }}
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

        <div className="text-center mx-[86px] mb-[px] mt-[23px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar Idiomas
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[47px] mb-[36px]">
          <span className="text-body-md font-semibold">Idiomas</span>
          <ul className="my-[26px]">
            {languages.map((language) => (
              <li key={language.id} className="flex justify-between items-center my-[26px]">
                <span className="text-body-md font-normal">{language.name} - {language.level}</span>
                <img
                  src={IconDelete}
                  alt="Eliminar"
                  onClick={() => {
                    setLanguageToDelete(language);
                    setIsDeleteLanguageModalVisible(true);
                  }}
                  style={{
                    cursor: "pointer",
                    width: "24px",
                    height: "24px",
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Button className="text-blue3 font-semibold border border-white w-[232px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center" onClick={() => setIsAddLanguageModalVisible(true)}>
              <PlusOutlined />
              Añadir idioma
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-[40px] mb-[35px]">
          <Button
            onClick={onClose}
            className="principal-nav-notify-buttonG w-[118px] h-[44px]"
            style={{ marginRight: "8px", borderRadius: "4px" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="w-[181px] h-[44px] ml-[18px] rounded-[4px] bg-blue3 principal-nav-notify-button2 text-white cursor-pointer"
          >
            Guardar cambios
          </Button>
        </div>
      </Modal>

      <ModalAddLanguages
        visible={isAddLanguageModalVisible}
        onClose={() => setIsAddLanguageModalVisible(false)}
        onAdd={handleAddLanguage}
      />

      <ModalDeleteLanguages
        visible={isDeleteLanguageModalVisible}
        onClose={() => setIsDeleteLanguageModalVisible(false)}
        language={languageToDelete?.name || null}
        level={languageToDelete?.level || null}
        onConfirmDelete={handleDeleteLanguage}
      />

      <ModalConfirm
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        message={languageToDelete ? `${languageToDelete.name} - ${languageToDelete.level}` : ""}
      />

      <ModalSaved
        visible={isModalSavedVisible}
        onClose={handleModalSavedClose}
      />
    </>
  );
};

export default ModalEditLanguages;