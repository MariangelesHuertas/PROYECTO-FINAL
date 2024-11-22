import React from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import briefcase from '../../../assets/icons/BriefcaseFill.svg';
import search from '../../../assets/icons/search$.svg';
import person from '../../../assets/icons/person.svg';

const AvailablePacks: React.FC = () => {
  const navigate = useNavigate(); // Inicializa el hook

  // Función para manejar la navegación al hacer clic en el botón
  const handleBuyCreditsClick = () => {
    navigate('/memberships'); // Navega a la ruta de Memberships
  };

  return (
    <div className="pl-4 pt-4 border-2 border-sky-blue0 rounded-lg shadow-lg bg-[#FCFCFC] w-[227px] mt-5">
      <h2 className="text-[30px] font-bold text-blue3 mb-4">Packs disponibles</h2>
      
      <div className="mb-6">
        <h3 className="text-[14px] font-bold text-blue3 flex items-center">
          <img src={briefcase} alt="Publicación de ofertas" className="mr-2 w-5 h-5" />
          Publicación de ofertas
        </h3>
        <p className="ml-7 mb-2 mt-2 text-sm text-[#1A1A1A] opacity-80 font-semibold">Ofertas disponibles: <span className="text-[#34C759] font-bold">3</span></p>
        <p className="ml-7 mb-2 text-sm text-[#1A1A1A] opacity-80 font-semibold">Ofertas Activas: <span className="text-blue3 font-bold">2</span></p>
      </div>

      <div className="mb-6">
        <h3 className="text-[14px] font-bold text-blue3 flex items-center">
          <img src={search} alt="Buscador de talento" className="mr-2 w-5 h-5" />
          Buscador de talento
        </h3>
        <p className="ml-7 mb-2 mt-2 text-sm text-[#1A1A1A] opacity-80 font-semibold">Créditos disponibles: <span className="text-[#34C759] font-bold">8</span></p>
        <p className="ml-7 text-sm text-[#1A1A1A] opacity-80 font-semibold">Créditos usados: <span className="text-[#FF3B30] font-bold">2</span></p>
      </div>

      <div className="mb-6">
        <h3 className="text-[12px] font-bold text-blue3 flex items-center">
          <img src={person} alt="Talentos disponibles" className="mr-2 w-5 h-5" />
          Talentos disponibles: <span className="text-blue3 font-bold text-[13px]">100</span>
        </h3>
      </div>

      <button
        className="font-semibold border-[#006497] text-[14px] bg-[#1C82BC] text-white w-[143px] py-2 rounded mb-7 ml-5"
        onClick={handleBuyCreditsClick} // Añade la función de navegación al click del botón
      >
        Comprar créditos
      </button>
    </div>
  );
};

export default AvailablePacks;
