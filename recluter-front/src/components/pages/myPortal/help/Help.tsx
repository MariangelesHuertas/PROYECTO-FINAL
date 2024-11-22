import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/dropdownInput/DropdownInput";
import ButtonCom from "../../../../components/button/Button";
import ModalError from './Modals/ModalErrorView';
import ModalValuation from './Modals/ModalValuation';

const faqs = [
  "¿Cómo me inscribo en una oferta?",
  "¿Puedo contactar con un reclutador?",
  "¿Necesito pagar para usar los servicios de la plataforma como candidato?",
  "¿Puedo guardar ofertas de trabajo para inscribirme más tarde?",
  "¿Cómo funciona el sistema de alertas de empleo?",
  "¿Es posible recibir notificaciones de empleos que coincidan con mi perfil?",
  "¿Cómo puedo modificar mi CV una vez subido al portal?",
  "¿Cómo puedo desactivar mi cuenta temporalmente porque he encontrado trabajo?",
  "¿Cómo puedo destacar mi perfil entre los demás candidatos?",
  "¿Cómo funciona el sistema de alertas de empleo?",
  "¿Cómo puedo hacer seguimiento de mis aplicaciones a ofertas de empleo?",
  "¿Hay opciones para trabajo remoto o a distancia?",
];

const Help: React.FC = () => {
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  // Estados para controlar la visibilidad de los modales
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [isValuationModalVisible, setValuationModalVisible] = useState(false);

  // Función para abrir el ModalError
  const handleOpenErrorModal = () => {
    setErrorModalVisible(true);
  };

  // Función para cerrar el ModalError
  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  // Función para abrir el ModalValuation
  const handleOpenValuationModal = () => {
    setValuationModalVisible(true);
  };

  // Función para cerrar el ModalValuation
  const handleCloseValuationModal = () => {
    setValuationModalVisible(false);
  };

  const handleChatClick = () => {
    navigate('/myPortal/chat'); // Redirige a la vista ChatView
  };

  const valoranosButtons = [
    {
      type: 'link',
      label: 'Has visto algún error en la plataforma',
      border: '1px solid #006497',
      color: 'transparent',
      size: "middle",
      textColor: '#5E5E5E',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'left',
      onClick: handleOpenErrorModal
    },
    {
      type: 'link',
      label: '¿Cómo podemos hacerlo mejor?',
      border: '1px solid #006497',
      color: 'transparent',
      size: 'middle',
      textColor: '#5E5E5E',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'left',
      onClick: handleOpenValuationModal
    }, // Abre el ModalValuation
  ];

  const contactanosButtons = [
    { type: 'link', label: 'Chat', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#5E5E5E', fontSize: '16px', fontWeight: 'bold', onClick: handleChatClick }, // Agrega onClick
    { type: 'link', label: 'Correo electrónico', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#5E5E5E', fontSize: '16px', fontWeight: 'bold' },
    { type: 'link', label: 'Teléfono', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#5E5E5E', fontSize: '16px', fontWeight: 'bold' },
  ];

  return (
    <>
      <div className="mb-[32px]">
        <h1 className="text-heading-md font-bold">
          Ayuda
        </h1>
      </div>

      <div className="mb-[26px]">
        <h1 className="text-heading-x1 font-bold pb-3">
          FAQs
        </h1>
        {faqs.map((faq, index) => (
          <CustomButton
            key={index}
            content={faq}
            backgroundColor="#FCFCFC"
            color="#5E5E5E"
            fontSize='16px'
            fontWeight='bold'
            borderColor="#006497"
            borderWidth="1px"
            borderRadius="6px"
            iconColor="#006497"
            iconType="down"
          >
            <h1
              className="text-body-md font-medium text-green22 block p-2"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Aquí irá la respuesta a la pregunta "{faq}". Por favor, adapte el
              contenido a lo que mejor represente la información necesaria.
            </h1>
          </CustomButton>
        ))}
      </div>

      <div className="mb-[26px]">
        <h1 className="text-heading-x1 font-bold pb-3">
          Valóranos
        </h1>
        <ButtonCom
          buttons={valoranosButtons}
          vertical={true}
          gap="10px"
          className="help-custom-button" />
      </div>

      <div className="mb-[26px] mt-[15px]">
        <h1 className="text-heading-x1 font-bold pb-3">
          Contáctanos
        </h1>
        <ButtonCom
          buttons={contactanosButtons}
          vertical={true}
          gap="10px"
          className="help-custom-button"  // Aplica la clase personalizada
        />
      </div>

      {/* Renderizado de los Modales */}
      <ModalError
        visible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
        entityName=''
      />
      <ModalValuation
        visible={isValuationModalVisible}
        onClose={handleCloseValuationModal}
        entityName=''
      />
    </>
  );
};

export default Help;
