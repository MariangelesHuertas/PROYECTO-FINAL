import React from 'react';
import { Collapse, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import Header from "../../../components/pages/principalNav/HeaderOffers"; 
import Check from "../../../assets/icons/check.svg"; 
import ArrowLeft from "../../../assets/icons/arrowLeft.svg"; 
import CustomButton from "../../../components/dropdownInput/DropdownInput";

const Memberships: React.FC = () => {
    const navigate = useNavigate(); // Hook para la navegación
  
    // Datos para las FAQs
    const faqs = [
      { question: 'Lorem Ipsum', answer: 'Al ser miembro, obtienes acceso a una variedad de beneficios exclusivos, como descuentos y contenido especial.' },
      { question: 'Lorem Ipsum', answer: 'Puedes cancelar tu membresía en cualquier momento desde tu cuenta en la sección de configuración.' },
      { question: 'Lorem Ipsum', answer: 'Sí, puedes cambiar el nivel de tu membresía desde tu cuenta en cualquier momento.' },
      { question: 'Lorem Ipsum', answer: 'Aquí irá la respuesta a la pregunta "¿Puedo guardar ofertas de trabajo para inscribirme más tarde?". Por favor, adapte el contenido a lo que mejor represente la información necesaria.' }
    ];
  
    // Renderiza las FAQs utilizando CustomButton
    const renderFaqs = () => (
      <div className="faq-section">
        {faqs.map((faq, index) => (
          <CustomButton
            key={index}
            content={faq.question}
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
            <p className="text-body-md font-medium text-black block p-2">
              {faq.answer}
            </p>
          </CustomButton>
        ))}
      </div>
    );

  return (
    <>
      <Header />

      <div className="p-8" style={{ paddingLeft: '270px', paddingRight: '270px' }}>
        <div className="flex items-center mb-4">
          <img
            src={ArrowLeft}
            alt="Regresar"
            className="cursor-pointer -ml-9 mr-2"
            onClick={() => navigate(-1)} 
          />
          <h2 className="text-xl font-bold">Membresías disponibles</h2>
        </div>

        {/* Línea divisora */}
        <div className="border-t border-[#A1A1AA] w-full -mt-3 mb-10 mx-auto" style={{ width: '100%' }}></div>

        {/* Soluciones completas */}
        <h3 className="text-[24px] font-bold text-[#006497] text-center mb-2">
          Soluciones completas: publicación de ofertas y desbloqueo de perfiles
        </h3>
        <p className="text-center mb-6">Lorem ipsum</p>

        <p className="text-center text-[#006497] text-[12px] font-bold mb-3">Más vendido</p>

        {/* Cards de la primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {['Pack 1', 'Pack 2', 'Pack 3'].map((pack) => (
            <div 
              key={pack} 
              className="w-[227px] h-[363px] bg-[#FCFCFC] border border-[#81BFEC] rounded-[6px] shadow-md p-6 text-left"
            >
              <div>
                <p className="text-[#006497] text-[24px] font-bold mb-2 text-center">{pack}</p>
                <p className="text-[#1A1A1A]/70 text-[12px] mb-2">Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>

                <p className="text-[24px] font-bold text-[#1A1A1A]/70 text-center mb-2">279€ <span className="text-[14px] font-normal">+ IVA</span></p>

                <p className="text-[#000000] font-bold text-[12px] mb-2">Características</p>
                <ul className="mb-4">
                  <li className="flex items-center mb-2">
                    <img src={Check} alt="check" className="mr-2" /> Lorem ipsum
                  </li>
                  <li className="flex items-center mb-2">
                    <img src={Check} alt="check" className="mr-2" /> Lorem ipsum
                  </li>
                  <li className="flex items-center mb-2">
                    <img src={Check} alt="check" className="mr-2" /> Lorem ipsum
                  </li>
                </ul>

                {/* Centrar el botón */}
                <div className="flex justify-center">
                  <Button type="primary" className="w-[120px] h-[36px]" style={{ backgroundColor: '#1C82BC', borderColor: '#006497', borderRadius: '4px' }}>
                    Comprar pack
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desbloqueo de perfiles */}
        <h3 className="text-[24px] font-bold text-[#006497] text-center mb-2">Desbloqueo de perfiles</h3>
        <p className="text-center mb-6">Lorem ipsum</p>
        <p className="text-center text-[#006497] text-[12px] font-bold mb-3">Más vendido</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array(3).fill(0).map((_, index) => (
            <div 
              key={index} 
              className="w-[227px] h-[272px] bg-[#FCFCFC] border border-[#81BFEC] rounded-[6px] shadow-md flex flex-col justify-center items-center p-4 text-center"
            >
              <div>
                <p className="text-center text-[#006497] font-bold text-[24px] mx-2 mb-2">10 desbloqueos de perfiles</p>
                <p className="text-[#1A1A1A]/70 text-[12px] mb-2 mx-2">Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                <p className="text-[24px] font-bold text-[#1A1A1A]/70 text-center mb-2">279€ <span className="text-[14px] font-normal">+ IVA</span></p>
              </div>
              <div className="flex justify-center">
                  <Button type="primary" className="w-[120px] h-[36px] mt-8 mb-4" style={{ backgroundColor: '#1C82BC', borderColor: '#006497', borderRadius: '4px' }}>
                    Comprar pack
                  </Button>
                </div>
            </div>
          ))}
        </div>

        {/* Publicación de ofertas */}
        <h3 className="text-[24px] font-bold text-[#006497] text-center mb-2">Publicación de ofertas</h3>
        <p className="text-center mb-6">Lorem ipsum</p>
        <p className="text-center text-[#006497] text-[12px] font-bold mb-3">Más vendido</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array(3).fill(0).map((_, index) => (
            <div 
              key={index} 
              className="w-[227px] h-[272px] bg-[#FCFCFC] border border-[#81BFEC] rounded-[6px] shadow-md flex flex-col justify-center items-center p-4 text-center"
            >
              <div className="text-center">
                <p className="text-[#006497] font-bold text-[24px] mx-2 -mt-8 mb-2">10 publicaciones de ofertas</p>
                <p className="text-[#1A1A1A]/70 text-[12px] mb-2 mx-2">Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
                <p className="text-[24px] font-bold text-[#1A1A1A]/70 mb-1">279€ <span className="text-[14px] font-normal">+ IVA</span></p>
              </div>
              <div className="flex justify-center">
                  <Button type="primary" className="w-[120px] h-[36px] mt-8 -mb-6" style={{ backgroundColor: '#1C82BC', borderColor: '#006497', borderRadius: '4px' }}>
                    Comprar pack
                  </Button>
                </div>
            </div>
          ))}
        </div>

         {/* FAQ Section */}
         <h3 className="text-[18px] font-bold text-black text-left mt-10 mb-10">FAQs</h3>
        {renderFaqs()}
      </div>
    </>
  );
};

export default Memberships;
