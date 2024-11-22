import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Drawer, Button, Upload, message } from "antd";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/pages/principalNav/PrincipalNav";
import SidebarProfile from "../../components/sidebarProfile/SidebarProfile";
import HelpExample from "../../pages/myPortal/help/Help";
import SettingExample from "../../pages/myPortal/generalSettings/GeneralSettings";
import ProfileExample from "../../pages/myPortal/profile/Profile";
import profilePicture from "../../assets/img/MyPortal/ImageP.svg";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UpdateImagenBannerReducer } from "../../redux/actions/pages/myPortal/imagenProfile/imagenProfile";
import { AppDispatch } from "../../redux/store/store";
import IconEdit from '../../assets/icons/edit2.svg';
import ModalEditBanner from "../../components/pages/myPortal/Modals/ModalEditBanner";
import ModalSaved from "../../components/pages/myPortal/Modals/ModalSavedChanges";

const BANNER_DEFAULT = process.env.REACT_APP_BANNER_DEFAULT;
const IMAGE_USER_DEFAULT = process.env.REACT_APP_IMAGE_USER_DEFAULT;
const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;

const MyPortal: React.FC = () => {
  const uploadBanner = useRef<HTMLInputElement | null>(null);
  const {
    rex_user
  } = useSelector(({ auth }: any) => auth);
  const dispatch: AppDispatch = useDispatch();
  const [showModalEditBanner, setShowModalEditBanner] = useState(false)
  const [successModalEditBanner, setSuccessModalEditBanner] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    rex_user?.imagen ? rex_user.imagen : profilePicture
  );

  const [headerImageSrc, setHeaderImageSrc] = useState<string>(
    rex_user && rex_user.imagen_banner ? API_BASE_URL_EXACT + rex_user.imagen_banner : BANNER_DEFAULT
  );

  const [isJobSearchActive, setIsJobSearchActive] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleJobSearchToggle = (checked: boolean) => {
    setIsJobSearchActive(checked);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleImageUpdate = (newImage: string) => {
    setProfileImage(newImage);
  };

  const handleHeaderImageChange = async (info: any) => {
    const { file } = info;

    if (!file || file.size === 0) {
      message.error("El archivo está vacío o no es válido.");
      return;
    }

    try {

      const response = await dispatch(UpdateImagenBannerReducer(file));
      if (response.success) {
        const newHeaderImageUrl = URL.createObjectURL(file);
        setHeaderImageSrc(newHeaderImageUrl);
        message.success("Imagen de banner actualizada con éxito");
        setShowModalEditBanner(false);
        setSuccessModalEditBanner(true);
      } else {

        message.error(response.message || "Error al subir la imagen del banner.");
      }
    } catch (error) {
      message.error("Hubo un error inesperado al subir la imagen.");
    }
  };

  const sidebarData = {
    profilePicture: rex_user && rex_user.imagen ? API_BASE_URL_EXACT + rex_user.imagen : IMAGE_USER_DEFAULT,
    headerImage: headerImageSrc,
    name: rex_user?.personas?.nombre + " " + rex_user?.personas?.apellido_paterno,
    jobTitle: "Vendedora",
    location: "Paterna, Valencia",
  };

  useEffect(() => {

  }, [sidebarData]);

  return (
    <>
      <Header />
      <div className="relative w-full px-7">
        <img
          src={sidebarData.headerImage}
          alt="Header"
          className="w-full h-64 object-cover rounded-lg"
        />
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleHeaderImageChange}
        >
          <input ref={uploadBanner} />
        </Upload>

        <Button
          // className="absolute top-14 right-4"
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '45px'
          }}
          onClick={() => setShowModalEditBanner(!showModalEditBanner)}
          shape="circle"
          icon={<img src={IconEdit} style={{ width: '20px' }} />}
        />
      </div>

      <div className="bg-white pl-7 pr-7">
        <Row>
          <Col xxl={3} xl={3}>
            <div className="hidden md:block" style={{ width: "234px" }}>
              <SidebarProfile
                profilePicture={sidebarData.profilePicture}
                name={sidebarData.name}
                jobTitle={sidebarData.jobTitle}
                location={sidebarData.location}
                isJobSearchActive={isJobSearchActive}
                onJobSearchToggle={handleJobSearchToggle}
                width={234}
                onImageChange={handleImageUpdate}
              />
            </div>

            <Drawer
              title={null}
              placement="left"
              onClose={toggleDrawer}
              visible={drawerVisible}
              width={300}
              className="md:hidden"
            >
              <SidebarProfile
                profilePicture={sidebarData.profilePicture}
                name={sidebarData.name}
                jobTitle={sidebarData.jobTitle}
                location={sidebarData.location}
                isJobSearchActive={isJobSearchActive}
                onJobSearchToggle={handleJobSearchToggle}
                width={234}
                onImageChange={handleImageUpdate}
              />
            </Drawer>
          </Col>
          <Col xxl={21} xl={21}>
            <div className="flex-1 pl-6 pr-1">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  <Button
                    className="md:hidden mb-4"
                    type="primary"
                    icon={<MenuOutlined />}
                    onClick={toggleDrawer}
                  />
                  <Routes>
                    <Route path="profile" element={<ProfileExample />} />
                    <Route path="help" element={<HelpExample />} />
                    <Route path="generalSettings" element={<SettingExample />} />
                  </Routes>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <ModalEditBanner
        visible={showModalEditBanner}
        onClose={() => setShowModalEditBanner(!showModalEditBanner)}
        onEdit={() => {
          if (uploadBanner.current) {
            uploadBanner.current.click();
          }
        }}
        previewImage={headerImageSrc}
      />

      <ModalSaved
        visible={successModalEditBanner}
        onClose={() => setSuccessModalEditBanner(!successModalEditBanner)}
      />
    </>
  );
};

export default MyPortal;
