import React from "react";
import { Layout, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import ToggleSwitchCom from "../../../toggleSwitch/ToggleSwitch";

const { Sider } = Layout;

interface SidebarOffersProps {
  inDrawer?: boolean;
}

const Setting: React.FC<SidebarOffersProps> = ({ inDrawer = false }) => {
  return (
    <div className="flex min-h-screen">
      <Sider
        width={234}
        style={{ backgroundColor: "#fff" }}
        className={` ${
          inDrawer
            ? "p-[5px] border-none ml-[-15px] mt-[-15px]"
            : "p-6 rounded-lg shadow-lg border-2 border-[#006794]"
        }`}
      >
        <h2 className="text-heading-sm font-bold mb-6">
          Ajustes de ofertas de empleo
        </h2>
        <div className="mb-10">
          <h3 className="font-bold text-heading-x1 text-green22 mb-2">
            Guardadas
          </h3>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold font-sans text-body-md block">
                Jefe de ventas
              </span>
              <span className="font-medium font-sans text-body-md block">
                Madrid
              </span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold font-sans text-body-md block">
                Reponedor turno mañana
              </span>
              <span className="font-medium font-sans text-body-md block">
                Ciudad Real
              </span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold font-sans text-body-md block">
                Responsable de almacén
              </span>
              <span className="font-medium font-sans text-body-md block">
                Ciudad Real
              </span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-heading-x1 text-green22 mb-2">
              Alertas de empleo
            </h3>
            <PlusOutlined className="text-sky-blue2 text-heading-x1 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-body-md block">
              Reponedor en Campo de Criptana
            </span>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-body-md block">
              Diseñador UX en Toda España
            </span>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-heading-x1 text-green22 mb-2">
              Alertas por palabras clave
            </h3>
            <PlusOutlined className="text-sky-blue2 text-heading-x1 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="border border-gray-400 rounded-[12px] px-2 py-1">
              <span className="font-bold text-caption block">
                Microsoft Office
              </span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="border border-gray-400 rounded-[12px] px-2 py-1">
              <span className="font-bold text-caption block">Informática</span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="border border-gray-400 rounded-[12px] px-2 py-1">
              <span className="font-bold text-caption block">
                Campo de Criptana
              </span>
            </div>
            <ToggleSwitchCom
              defaultChecked={true}
              size="small"
              customClass="switch-small-1"
            />
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default Setting;
