import React, { useState } from "react";
import { Layout, Menu, Avatar, Divider, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import IconEdit from '../../assets/icons/EditP.svg';
import ToggleSwitchCom from "../../components/toggleSwitch/ToggleSwitch";
import '../styles/pages/principalNav/PrincipalNav.css';
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { UpdateImagenReducer } from "../../redux/actions/pages/myPortal/imagenProfile/imagenProfile";
import ModalEditAvatar from "../pages/myPortal/Modals/ModalEditAvatar/ModalEditAvatar";
import ModalSaved from "../pages/myPortal/Modals/ModalSavedChanges";

const { Sider } = Layout;
const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;

interface SidebarProfileProps {
  profilePicture: string;
  name: string;
  jobTitle: string;
  location: string;
  isJobSearchActive: boolean;
  onJobSearchToggle: (checked: boolean) => void;
  width: number;
  onImageChange: (newImage: string) => void;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({
  name,
  jobTitle,
  location,
  profilePicture,
  width,
  onImageChange,
}) => {
  const navigate = useNavigate();
  // Set initial state of selectedKey to "1" to highlight "Perfil" by default
  const [showModalEditAvatar, setShowModalEditAvatar] = useState(false);
  const [successModalEditAvatar, setSuccessModalEditAvatar] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const [image, setImage] = useState(profilePicture);
  const dispatch: AppDispatch = useDispatch();

  // Function to handle scroll
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMenuClick = (key: string, sectionId: string) => {
    setSelectedKey(key);
    handleScrollToSection(sectionId);
  };

  const [imagecargada, setImageCargada] = useState("");

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result as string;
        setImage(newImage); // Actualiza la imagen localmente
        onImageChange(newImage); // Envía la nueva imagen al componente padre
      };
      reader.readAsDataURL(file);

      try {
        const respuesta = await dispatch(UpdateImagenReducer(file));
        if (respuesta.success) {
          message.success("Imagen actualizada con éxito.");
          setShowModalEditAvatar(false)
          setSuccessModalEditAvatar(true)
        } else {
          message.error(respuesta.message);
        }
      } catch (error) {
        message.error("Hubo un error al subir la imagen.");
      }
    } else {
      console.log("erro");
      message.error("No se ha seleccionado ningún archivo.");
    }
  };

  return (
    <>
      {/* <button
      onClick={() => {
        console.log(IMAGE_USER_DEFAULT);
      }}
    >click</button> */}
      <style>
        {`
          .custom-menu .ant-menu-item {
            color: #5F5F5F;
            transition: background-color 0.3s;
          }
          .custom-menu .ant-menu-item-selected {
            color: #006497;
            background-color: white !important; /* White background for selected item */
          }
          .no-background-menu {
            background-color: #F4F4F5 !important;
          }
          .selected-background {
            background-color: white !important; /* White background for selected item */
          }
        `}
      </style>
      <Sider
        width={width}
        style={{
          backgroundColor: "#F4F4F5",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "234px",
          height: "645px",
          borderRadius: "6px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center m-5">
          <div className="relative inline-block">
            <Avatar
              src={image}
              size={64}
              icon={<UserOutlined />}
              className="block"
            />
            <img
              src={IconEdit}
              alt="Editar"
              className="absolute top-0 right-0 transform translate-x-[25px] translate-y-[42px] cursor-pointer"
              onClick={() => setShowModalEditAvatar(!showModalEditAvatar)}
            />
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="my-2.4 text-lg font-normal text-black">{name}</h2>
          <h3 className="my-1 text-base font-bold text-black">{jobTitle}</h3>
          <p className="my-1 text-base font-medium text-green12">{location}</p>

          <Divider className="border-t border-greene mt-3 mb-2" />
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="mt-2 mb-3 pl-4 w-40 text-body-sm font-bold text-gray-800">
              Búsqueda de trabajo activa
            </h2>
          </div>
          <div className="pr-5">
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
        </div>
        {/* Upper menu section */}
        <Menu
          mode="vertical"
          selectedKeys={
            ["1", "2", "3", "4"].includes(selectedKey) ? [selectedKey] : []
          }
          className={`custom-menu mb-4 font-medium  border border-gray2 text-body-md ${["1", "2", "3", "4"].includes(selectedKey)
            ? "selected-background"
            : ""
            }`}
          style={{
            backgroundColor:
              ["1", "2", "3", "4"].includes(selectedKey) ? "white" : "#F4F4F5",
          }}
        >
          <Menu.Item key="1" onClick={() => handleMenuClick("1", "profile-info-section")}>
            <Link to="/myPortal/profile">Perfil</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => handleMenuClick("2", "review-section")}>
            Valoraciones
          </Menu.Item>
          <Menu.Item key="3" onClick={() => handleMenuClick("3", "portfolio-section")}>
            Portafolio
          </Menu.Item>
          <Menu.Item key="4" onClick={() => handleMenuClick("4", "viewer-list-section")}>
            Quién me ha visto
          </Menu.Item>
        </Menu>
        {/* Lower menu section */}
        <Menu
          mode="vertical"
          selectedKeys={["5"].includes(selectedKey) ? [selectedKey] : []}
          className={`custom-menu no-background-menu font-medium text-body-md ${selectedKey === "5" ? "selected-background" : ""
            }`}
          style={{
            backgroundColor: selectedKey === "5" ? "white" : "#F4F4F5",
          }}
        >
          <Menu.Item key="5" onClick={() => handleMenuClick("5", "general-settings-section")}>
            <Link to="/myPortal/generalSettings">Ajustes generales</Link>
          </Menu.Item>
        </Menu>
        <Menu
          mode="vertical"
          selectedKeys={["6"].includes(selectedKey) ? [selectedKey] : []}
          className={`custom-menu no-background-menu mb-4 font-medium text-body-md ${selectedKey === "6" ? "selected-background" : ""
            }`}
          style={{
            backgroundColor: selectedKey === "6" ? "white" : "#F4F4F5",
          }}
        >
          <Menu.Item key="6" onClick={() => handleMenuClick("6", "help-section")}>
            <Link to="/myPortal/help">Ayuda</Link>
          </Menu.Item>
        </Menu>
        <div className="flex justify-start py-4">
          <button
            className="principal-nav-notify-button  !h-[36px] !w-[100px] bg-white text-blue3 ml-4 py-2 px-4 rounded-md border-1 border-blue3 text-body-sm font-semibold transition duration-300"
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Log out
          </button>
        </div>
      </Sider>
      <ModalEditAvatar
        visible={showModalEditAvatar}
        onClose={() => setShowModalEditAvatar(!showModalEditAvatar)}
        onEdit={() => document.getElementById("fileInput")?.click()}
        previewImage={image}
      />

      <ModalSaved
        visible={successModalEditAvatar}
        onClose={() => setSuccessModalEditAvatar(!successModalEditAvatar)}
      />
    </>
  );
};

export default SidebarProfile;
