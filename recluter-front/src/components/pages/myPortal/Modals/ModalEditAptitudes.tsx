import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import IconDelete from '../../../../assets/icons/IconDelete.svg';
import { PlusOutlined } from "@ant-design/icons";
import ModalAddSkills from "./ModalAddSkills";
import ModalDeleteSkills from "./ModalDelete";
import ModalConfirm from "./ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { CreateAptitudUsuarioReducer } from "../../../../redux/actions/pages/myPortal/aptitudes/PostAptitud";
import { GetAptitudReducer } from "../../../../redux/actions/pages/myPortal/aptitudes/GetAptitud";
import { DeleteAptitudUsuarioReducer } from "../../../../redux/actions/pages/myPortal/aptitudes/DeleteAptitud";

interface ModalEditAptitudProps {
  visible: boolean;
  onClose: () => void;
  aptitudes: { id: number; aptitud: string }[];
}

interface AptitudData {
  id: number;
  aptitud: string;
}

const ModalEditAptitud: React.FC<ModalEditAptitudProps> = ({ visible, onClose, aptitudes: initialAptitudes = [] }) => {
  const [aptitudes, setAptitudes] = useState<AptitudData[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isAddAptitudModalVisible, setIsAddAptitudModalVisible] = useState(false);
  const [isDeleteAptitudModalVisible, setIsDeleteAptitudModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [aptitudToDelete, setAptitudToDelete] = useState<AptitudData | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { rex_skills } = useSelector((state: RootState) => state.skills);

  useEffect(() => {
    setAptitudes(initialAptitudes);
    setIsSubmitDisabled(initialAptitudes.length === 0);
  }, [initialAptitudes]);

  const openAddAptitudModal = () => {
    setIsAddAptitudModalVisible(true);
  };

  const handleAddAptitudModalClose = () => {
    setIsAddAptitudModalVisible(false);
  };

  const openDeleteAptitudModal = (aptitud: AptitudData) => {
    setAptitudToDelete(aptitud);
    setIsDeleteAptitudModalVisible(true);
  };

  const handleDeleteAptitudModalClose = () => {
    setIsDeleteAptitudModalVisible(false);
    setAptitudToDelete(null);
  };

  const handleDeleteAptitud = async () => {
    if (aptitudToDelete) {
      try {
        await dispatch(DeleteAptitudUsuarioReducer(aptitudToDelete.id));
        const updatedAptitudes = aptitudes.filter(aptitud => aptitud.id !== aptitudToDelete.id);
        setAptitudes(updatedAptitudes);
        setIsSubmitDisabled(updatedAptitudes.length === 0);
        setIsDeleteAptitudModalVisible(false);
        setIsConfirmModalVisible(true);
      } catch (error) {
        console.error("Error deleting aptitude:", error);
        message.error("Error al eliminar la aptitud");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!isSubmitDisabled) {
      let success = true;
      for (const aptitud of aptitudes) {
        try {
          console.log("Sending aptitud_id mary:", aptitud.id);
          const result = await dispatch(CreateAptitudUsuarioReducer({ aptitud_id: aptitud.id }));
          console.log("Result from API:", result);
        } catch (error) {
          console.error("Error saving aptitude:", error);
          success = false;
          break;
        }
      }
      
      if (success) {
        await dispatch(GetAptitudReducer());
        message.success("Aptitudes guardadas correctamente");
        onClose();
      } else {
        message.error("Error al guardar algunas aptitudes");
      }
    }
  };
 
  const handleAddAptitud = (newAptitudes: string[]) => {
    const newAptitudesData = newAptitudes
      .map(aptitud => {
        const matchedAptitud = rex_skills.find((a: any) => a.aptitud === aptitud);
        return matchedAptitud ? { id: matchedAptitud.id, aptitud: matchedAptitud.aptitud } : null;
      })
      .filter((aptitud): aptitud is AptitudData => aptitud !== null && !aptitudes.some(a => a.id === aptitud.id));

    setAptitudes(prevAptitudes => [...prevAptitudes, ...newAptitudesData]);
    setIsSubmitDisabled(false);
    handleAddAptitudModalClose();
  };

  return (
    <>
      <Modal
        open={visible && !isAddAptitudModalVisible && !isDeleteAptitudModalVisible && !isConfirmModalVisible}
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

        <div className="text-center mx-[86px] mb-[51px] mt-[21px]">
          <h3 className="mt-[16px] mx-[44px] text-heading-md font-bold">
            Editar Mis aptitudes
          </h3>
          <p className="font-medium px-[55px] text-body-sm mt-[10px]">
            Por favor, a continuación edita tu información
          </p>
        </div>

        <div className="mx-[47px] mb-[32px]">
          <span className="text-body-md font-semibold">Aptitudes</span>
          <ul className="my-[26px]">
            {aptitudes.map((aptitud, index) => (
              <li key={index} className="flex justify-between items-center my-[26px]">
                <span className="text-body-md font-normal">{aptitud.aptitud}</span>
                <img
                  src={IconDelete}
                  alt="Eliminar"
                  onClick={() => openDeleteAptitudModal(aptitud)}
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
            <Button className="text-blue3 font-semibold border border-white w-[232px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center" onClick={openAddAptitudModal}>
              <PlusOutlined />
              Añadir aptitud
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
            disabled={isSubmitDisabled}
            onClick={handleSaveChanges}
            className={`w-[181px] h-[44px] ml-[18px] rounded-[4px] ${isSubmitDisabled ? 'bg-[#F4F4F5] text-[#757575] font-semibold text-body-md cursor-not-allowed' : 'bg-blue3 principal-nav-notify-button2 text-white cursor-pointer'}`}
          >
            Guardar cambios
          </Button>
        </div>
      </Modal>

      <ModalAddSkills 
        visible={isAddAptitudModalVisible} 
        onClose={() => setIsAddAptitudModalVisible(false)}
        onAdd={handleAddAptitud}
        existingSkills={aptitudes.map(a => a.aptitud)}
        isAptitude={true}
      />

      <ModalDeleteSkills
        visible={isDeleteAptitudModalVisible}
        onClose={handleDeleteAptitudModalClose}
        skillName={aptitudToDelete?.aptitud || ""}
        onConfirmDelete={handleDeleteAptitud}
      />

      <ModalConfirm
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        message={aptitudToDelete?.aptitud || ""}
      />
    </>
  );
};

export default ModalEditAptitud;