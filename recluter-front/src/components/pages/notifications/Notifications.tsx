import React, { useState } from "react";
import Avatar from "../../../assets/icons/Avatar.svg";
import { Menu, Dropdown } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import IconDelete from '../../../assets/icons/IconDelete.svg';
import IconLike from '../../../assets/icons/IconUnLike.svg';
import IconTrash from '../../../assets/icons/IconTrash.svg';
import IconTrash3 from '../../../assets/icons/IconTrash3.svg';

const NotificationsA = () => {
  const [activeNotification, setActiveNotification] = useState<number | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const notifications = [
    { id: 1, text: "Mercadona publicó una nueva oferta que puede interesarte", time: "28 minutos" },
    { id: 2, text: "Mercadona publicó una nueva oferta que puede interesarte", time: "28 minutos" },
    { id: 3, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
    { id: 4, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
    { id: 5, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
    { id: 6, text: "Mercadona publicó una nueva oferta que puede interesarte", time: "28 minutos" },
    { id: 7, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
    { id: 8, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
    { id: 9, text: "Carrefour revisó tu candidatura", time: "28 minutos" },
  ];

  const menu = (
    <Menu>
    <Menu.Item 
      key="1" 
      icon={<img src={IconDelete} alt="Eliminar notificación" />}
      onClick={() => setSelectedMenuItem("1")}
      className={selectedMenuItem === "1" ? "border-2 border-[#0778B1]" : ""}
      style={{borderRadius: '10px'}}
    >
      <span className="font-medium text-body-sm">Eliminar notificación</span> 
    </Menu.Item>
    <Menu.Item 
      key="2" 
      icon={<img src={IconLike} alt="Mostrar menos así" />}
      onClick={() => setSelectedMenuItem("2")}
      className={selectedMenuItem === "2" ? "border-2 border-[#0778B1] rounded-[18x]" : ""}
      style={{borderRadius: '10px'}}
    >
      <span className="font-medium text-body-sm">Mostrar menos así</span>
    </Menu.Item>
    <Menu.Item 
      key="3" 
      icon={<img src={IconTrash} alt="Gestiona las notificaciones de esta empresa" />}
      onClick={() => setSelectedMenuItem("3")}
      className={selectedMenuItem === "3" ? "border-2 border-[#0778B1]" : ""}
      style={{borderRadius: '10px'}}
    >
      <span className="font-medium text-body-sm">Gestiona las notificaciones de esta empresa</span>
    </Menu.Item>
    <Menu.Item 
      key="4" 
      icon={<img src={IconTrash3} alt="Desactiva este tipo de notificaciones" />}
      onClick={() => setSelectedMenuItem("4")}
      className={selectedMenuItem === "4" ? "border-2 border-[#0778B1]" : ""}
      style={{borderRadius: '10px'}}
    >
      <span className="font-medium text-body-sm">Desactiva este tipo de notificaciones</span>
    </Menu.Item>
  </Menu>
  
  );

  return (
    <div className="space-y-2 w-[711px] mt-[21px] mb-[54px]">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => setActiveNotification(notification.id)}
          className={`notification-item flex items-center h-[44px] p-4 cursor-pointer ${
            activeNotification === notification.id ? "bg-[#81BFEC]" : "bg-white"
          }`}
        >
          <img
            src={Avatar}
            alt="Avatar"
            className="notification-avatar w-10 h-10 rounded-full ml-[24px] mr-[16px]"
          />
          <div className="flex-1">
            <span className="font-medium text-body-md">{notification.text}</span>
          </div>
          <div className="flex items-center space-x-[16px] mr-[17px]">
            <span className="text-[#5F5F5F] text-body-sm font-medium">{notification.time}</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <EllipsisOutlined className="text-heading-md cursor-pointer text-[#0778B1]" />
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsA;
