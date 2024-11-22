import React from "react";
import { EditOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

interface GeneralSettingProps {
  email: string;
  passwordHint: string;
  jobApplicationChanges: boolean;
  interestingOffers: boolean;
  companyOffers: boolean;
  emailSummary: string;
  subscriptionType: string;
}

const handleEditClick = () => {
  console.log("Edit button clicked");
  // Aquí puedes añadir la lógica para abrir un modal o redirigir a la página de edición
};

const GeneralSetting: React.FC<GeneralSettingProps> = ({
  email,
  passwordHint,
  jobApplicationChanges,
  interestingOffers,
  companyOffers,
  emailSummary,
  subscriptionType,
}) => {
  
  return (
    <div>
      <div className="pb-10">
        <h1 className="text-heading-md font-bold">
          Ajustes generales
        </h1>
      </div>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Correo y contraseña
          <EditOutlined
          onClick={handleEditClick}
          className="text-sky-blue0 pl-3"
        />
        </h1>
        <h1 className="text-body-md font-medium text-green22">{email}</h1>
        <h1 className="text-body-md font-medium text-green22">{passwordHint}</h1>
      </div>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Notificaciones
          <EditOutlined
          onClick={handleEditClick}
          className="text-sky-blue0 pl-3"
        />
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">
          Cambios en mis candidaturas: {jobApplicationChanges ? "Activado" : "Desactivado"}
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">
          Ofertas que pueden parecerte interesantes: {interestingOffers ? "Activado" : "Desactivado"}
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">
          Nuevas ofertas de las empresas que sigues: {companyOffers ? "Activado" : "Desactivado"}
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">
          Resumen por email: {emailSummary}
        </h1>
      </div>

      <div className="pb-10">
        <h1 className="text-heading-x1 font-bold pb-3">
          Gestionar suscripción
          <EditOutlined
            onClick={handleEditClick}
            className="text-sky-blue0 pl-3"
          />
        </h1>
        <h1 className="text-body-md font-medium text-green22 text-justify">Tipo de suscripción: {subscriptionType}</h1>
      </div>
    </div>
  );
};

export default GeneralSetting;
