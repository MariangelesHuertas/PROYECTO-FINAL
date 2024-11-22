import React, { useState } from "react";
import { Avatar, Button, Menu, Dropdown } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import IconEdit from '../../assets/icons/EditP.svg';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { UpdateImagenReducer } from "../../redux/actions/pages/myPortal/imagenProfile/imagenProfile";

interface HeaderProfileProps {
  profilePicture: string;
  onImageChange: (newImage: string) => void;
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({
  profilePicture,
  onImageChange,
}) => {
  const [image, setImage] = useState(profilePicture);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
      
      const respuesta = await dispatch(UpdateImagenReducer(file));
      console.log('respuesta', respuesta);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/myPortal/profile">Perfil</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/myPortal/generalSettings">Ajustes</Link>
      </Menu.Item>
      <Menu.Item key="3" danger onClick={() => {
        localStorage.clear();
        navigate('/');
      }}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-profile-container">
      <div className="header-profile-content">
        <Avatar
          src={profilePicture}
          size={40}
          icon={<UserOutlined />}
          className="header-profile-avatar"
        />
        <div className="header-profile-details">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="header-profile-name-button" onClick={e => e.preventDefault()}>
            <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <img
          src={IconEdit}
          alt="Editar"
          className="header-profile-edit-icon"
          onClick={() => document.getElementById("headerFileInput")?.click()}
        />
        <input
          id="headerFileInput"
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default HeaderProfile;
