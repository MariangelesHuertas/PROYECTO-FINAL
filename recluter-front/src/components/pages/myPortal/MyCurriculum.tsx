import React, { useState, useEffect } from "react";
import { Typography, Button, message, Row, Col, Skeleton } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store/store';
import { GetUserCVReducer } from '../../../redux/actions/pages/myPortal/cv/GetCVUser';
import { UploadCVReducer } from '../../../redux/actions/pages/myPortal/cv/PostCVUser';
import "tailwindcss/tailwind.css";
import IconUpload from '../../../assets/icons/IconUpload.svg';
import IconEdit from '../../../assets/icons/EditP.svg';
import ModalCVSelect from './Modals/ModalCVSelect';
import ModalAddMultimedia from "./Modals/ModalAddMultimedia";
import CardCurriculum from '../../../components/cards/CardCurriculum';
import moment from 'moment';

const { Text } = Typography;

interface MyCurriculumProps {}

const MyCurriculum: React.FC<MyCurriculumProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rex_userCV, rex_loading, rex_error } = useSelector((state: RootState) => state.getCvUser);
  const { rex_uploading, rex_uploadSuccess, rex_uploadError } = useSelector((state: RootState) => state.postCvUser);

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddMultimediaModalVisible, setIsAddMultimediaModalVisible] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(4);
  const [selectedCVId, setSelectedCVId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(GetUserCVReducer());
  }, []);

  const handleSaveFile = async (file: File, name: string) => {
    try {
      const formData = new FormData();
      formData.append('nombre', name);
      formData.append('csvFile', file);

      if (selectedCVId) {
        // Aquí deberías llamar a una acción para actualizar el CV existente
        // Por ejemplo: await dispatch(UpdateCVReducer(selectedCVId, formData));
        message.success('CV actualizado con éxito');
      } else {
        await dispatch(UploadCVReducer(formData));
        message.success('CV subido con éxito');
      }

      setUploadedFileName(name);
      dispatch(GetUserCVReducer());
    } catch (error) {
      message.error(selectedCVId ? 'Error al actualizar el CV' : 'Error al cargar el CV');
    }
    setIsAddMultimediaModalVisible(false);
  };

  const handleEditClick = (cvId: string) => {
    setSelectedCVId(cvId);
    setIsAddMultimediaModalVisible(true);
  };

  const handleUploadClick = () => {
    setSelectedCVId(null);
    setIsAddMultimediaModalVisible(true);
  };

  const handleGeneralEditClick = () => {
    setIsModalVisible(true);
  };

  const loadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + 4);
    dispatch(GetUserCVReducer());
  };

  const showLess = () => {
    setDisplayLimit(4);
  };

  const handleViewData = () => {
    console.log("Datos del CV:", rex_userCV);
    console.log("Estado de carga:", rex_loading);
    console.log("Error (si existe):", rex_error);
  };

  const cvs = Array.isArray(rex_userCV) ? rex_userCV : rex_userCV ? [rex_userCV] : [];

  return (
    <div className="pb-8">
      <h1 className="text-heading-md font-bold pb-3 flex items-center">
        Mi Curriculum
        <label htmlFor="file-upload" className="pl-3 cursor-pointer">
          <img
            src={IconUpload}
            alt="Cargar"
            onClick={handleUploadClick}
            className="inline-block text-sky-blue0 w-[35px] pb-[4px]"
          />
        </label>
        <img
          src={IconEdit}
          alt="Editar"
          className="ml-3 cursor-pointer inline-block text-sky-blue0 w-[35px] pb-[4px]"
          onClick={handleGeneralEditClick}
        />
      </h1>

      <Row gutter={[16, 16]}>
        {cvs.slice(0, displayLimit).map((cv, index) => (
          <Col key={cv.id || index} xs={24} sm={12} md={8} lg={6}>
            {!rex_loading || index < displayLimit - 4 ? (
              <CardCurriculum
                fileName={cv.nombre || "No hay CV cargado"}
                jobTitle={cv.nombre_archivo}
                description={moment(cv.createdAt).format("DD/MM/YYYY H:mm")}
                onEdit={() => handleEditClick(cv.id)}
                showCustomRadio={false}
                showEditIcon={true}
              />
            ) : (
              <div className="flex justify-center my-4">
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            )}
          </Col>
        ))}
      </Row>

      {cvs.length > 4 && (
        <div className="text-center mt-4">
          {cvs.length > displayLimit ? (
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
        onClick={handleViewData} 
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ver datos
      </Button>

      <ModalCVSelect
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <ModalAddMultimedia
        visible={isAddMultimediaModalVisible}
        onClose={() => setIsAddMultimediaModalVisible(false)}
        onSave={handleSaveFile}
        cvId={selectedCVId}
      />
    </div>
  );
};

export default MyCurriculum;