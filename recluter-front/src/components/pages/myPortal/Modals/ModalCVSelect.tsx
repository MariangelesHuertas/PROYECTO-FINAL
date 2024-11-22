import React, { useState, useEffect } from "react";
import { Modal, Button, Radio, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { UploadCVReducer } from "../../../../redux/actions/pages/myPortal/cv/PostCVUser";
import { GetUserCVReducer } from "../../../../redux/actions/pages/myPortal/cv/GetCVUser";
import { DeleteCVReducer } from "../../../../redux/actions/pages/myPortal/cv/DeleteCVUser";
import { ChangeDefaultCVReducer } from '../../../../redux/actions/pages/myPortal/cv/PatchCVUser';
import IconClosed from "../../../../assets/icons/IconClosed.svg";
import IconDelete from "../../../../assets/icons/IconDelete.svg";
import IconDownload from "../../../../assets/icons/IconDownload.svg";
import CustomRadio from "../ButtonRdio";
import ModalSaved from "./ModalSavedChanges";
import ModalDeleteCV from "./ModalDeleteCV";
import ModalAddMultimedia from "./ModalAddMultimedia";

interface CV {
  id: number;
  nombre_archivo: string;
  isDefault: boolean;
}

interface ModalCVSelectProps {
  visible: boolean;
  onClose: () => void;
}

const ModalCVSelect: React.FC<ModalCVSelectProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_userCV, rex_loading } = useSelector(
    (state: RootState) => state.getCvUser
  );
  const { rex_deleting, rex_deleteSuccess, rex_deleteError } = useSelector(
    (state: RootState) => state.deleteCvUser
  );
  const { rex_changing, rex_changeSuccess, rex_changeError } = useSelector((state: RootState) => state.patchCvUser);

  const [cvs, setCVs] = useState<CV[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [cvToDelete, setCVToDelete] = useState<CV | null>(null);
  const [isModalSavedVisible, setIsModalSavedVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isAddMultimediaModalVisible, setIsAddMultimediaModalVisible] =
    useState(false);

  useEffect(() => {
    if (rex_userCV) {
      const formattedCVs = rex_userCV.map((cv: any) => ({
        id: cv.id,
        nombre_archivo: cv.nombre_archivo,
        isDefault: cv.default,
      }));
      setCVs(formattedCVs);
    }
  }, [rex_userCV]);

  const handleDefaultChange = async (selectedCVId: string) => {
    const id = parseInt(selectedCVId, 10);
    try {
      await dispatch(ChangeDefaultCVReducer(id));
      message.success('CV predeterminado actualizado con éxito');
      dispatch(GetUserCVReducer()); // Recargar la lista de CVs
    } catch (error) {
      message.error('Error al cambiar el CV predeterminado');
    }
  };

  const handleDeleteCV = async () => {
    if (cvToDelete) {
      try {
        await dispatch(DeleteCVReducer(cvToDelete.id));
        message.success("CV eliminado con éxito");
        dispatch(GetUserCVReducer()); // Recargar la lista de CVs
        setIsModalDeleteVisible(false);
        setIsModalSavedVisible(true);
      } catch (error) {
        message.error("Error al eliminar el CV");
      }
    }
  };

  const handleAddCVClick = () => {
    setIsAddMultimediaModalVisible(true);
  };

  const handleSaveFile = async (file: File, name: string) => {
    try {
      const formData = new FormData();
      formData.append("nombre", name);
      formData.append("csvFile", file);

      await dispatch(UploadCVReducer(formData));
      setIsModalSavedVisible(true);
      dispatch(GetUserCVReducer());
    } catch (error) {
      console.error("Error al cargar el CV:", error);
    }
    setIsAddMultimediaModalVisible(false);
  };

  const handleModalSavedClose = () => {
    setIsModalSavedVisible(false);
    onClose();
  };

  const handleModalDeleteClose = () => {
    setIsModalDeleteVisible(false);
    setCVToDelete(null);
  };

  const handleDeleteClick = (cv: CV) => {
    setCVToDelete(cv);
    setIsModalDeleteVisible(true);
  };

  return (
    <>
      <Modal
        open={
          visible &&
          !isModalDeleteVisible &&
          !isModalSavedVisible &&
          !isAddMultimediaModalVisible
        }
        onCancel={onClose}
        footer={null}
        centered
        closable={false}
        width={768}
        bodyStyle={{ borderRadius: "16px" }}
        style={{ borderRadius: "16px" }}
      >
        <img
          src={IconClosed}
          alt="Cerrar"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />

        <div className="text-center mb-[50px]">
          <h3 className="text-heading-md font-bold mt-[21px]">Mi Curriculum</h3>
        </div>

        <div className="mx-[9px] mb-[60px]">
          <div className="items-center pb-[12px] border-b border-[#E1E1E2]">
            <span className="text-body-md mr-[107px] font-semibold">
              Por defecto
            </span>
            <span className="text-body-md font-semibold">
              Curriculum en Word/PDF
            </span>
          </div>
          <ul className="">
          <Radio.Group 
            value={cvs.find(cv => cv.isDefault)?.id.toString()} 
            onChange={e => handleDefaultChange(e.target.value)}
          >
            {cvs.map((cv) => (
              <li key={cv.id} className="flex justify-between items-center my-[18px]">
                <div className="flex items-center w-[650px] mr-[20px]">
                  <CustomRadio value={cv.id.toString()}>
                    <span className="text-body-md font-normal ml-[128px]">{cv.nombre_archivo}</span>
                  </CustomRadio>
                </div>
                  <div className="flex items-center">
                    <img
                      src={IconDownload}
                      alt="Descargar"
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                        marginRight: "16px",
                      }}
                      onClick={() =>
                        console.log(`Descargar ${cv.nombre_archivo}`)
                      }
                    />
                    <img
                      src={IconDelete}
                      alt="Eliminar"
                      onClick={() => handleDeleteClick(cv)}
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </li>
              ))}
            </Radio.Group>
          </ul>
          <div className="flex justify-center">
            <Button
              className="mt-[10px] text-blue3 font-semibold border border-white w-[232px] h-[36px] principal-nav-notify-buttonS flex items-center justify-center"
              icon={<PlusOutlined />}
              onClick={handleAddCVClick}
            >
              Añadir CV
            </Button>
          </div>
        </div>
      </Modal>

      <ModalSaved
        visible={isModalSavedVisible}
        onClose={handleModalSavedClose}
      />

      <ModalDeleteCV
        visible={isModalDeleteVisible}
        onClose={handleModalDeleteClose}
        onConfirm={handleDeleteCV}
        CvName={cvToDelete?.nombre_archivo || ""}
      />

      <ModalAddMultimedia
        visible={isAddMultimediaModalVisible}
        onClose={() => setIsAddMultimediaModalVisible(false)}
        onSave={handleSaveFile}
      />
    </>
  );
};

export default ModalCVSelect;