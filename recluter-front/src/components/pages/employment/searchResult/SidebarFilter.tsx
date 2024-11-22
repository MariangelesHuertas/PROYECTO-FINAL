import React, { useState } from "react";
import { Layout } from "antd";
import "tailwindcss/tailwind.css";
import RatingBlue from "../../../rating/RatingBlue";
import StyledCheckbox from "../../../checkbox/CheckboxProps";
import Select from "../../../../components/pages/searchCV/Select";
import IconDrop from "../../../../assets/icons/ArrowDrop.svg";
import IconDrop2 from "../../../../assets/icons/ArrowDrop2.svg";
import Keywords from "./ComponentsSidebar/KeyWord";
import Sectors from "./ComponentsSidebar/Sectors";

const { Sider } = Layout;
const { Option } = Select;

const ratings = [0, 1, 2, 3, 4, 5];

const experience = [
  "Educación",
  "Eventos y Entretenimiento",
  "Limpieza",
  "Retail",
  "Salud y bienestar",
  "Servicios a domicilio",
  "Turismo",
];

const companySizes = [
  "1 persona",
  "De 2 a 10",
  "De 11 a 50",
  "De 51 a 100",
  "De 101 a 500",
  "Más de 500",
];
interface SidebarOffersProps {
  inDrawer?: boolean;
}

const Sidebar: React.FC<SidebarOffersProps> = ({ inDrawer = false }) => {
  const [openSections, setOpenSections] = useState({
    valoraciones: false,
    palabrasClave: true,
    cualificativos: false,
    ubicacion: false,
    experiencia: false,
    tamanoEmpresa: false,
    busquedasSugeridas: false,
  });

  const handleKeywordsChange = (newKeywords: string[]) => {
    console.log("Nuevas Palabras clave:", newKeywords);
   
  };

  const toggleSection = (section: string) => {
    setOpenSections((prevState: any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const softSkills = [
    "Comunicación efectiva",
    "Trabajo en equipo",
    "Liderazgo",
    "Pensamiento crítico",
    "Adaptabilidad",
    "Creatividad",
    "Empatía",
    "Resiliencia",
    "Colaborativo",
  ];

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg">
      <Sider
        width={"100%"}
        style={{ backgroundColor: "white" }}
        className={` ${
          inDrawer
            ? "p-[5px] border-none ml-[-15px] mt-[-15px]"
            :"rounded-lg shadow-md p-5 border border-sky-blue0 shadow-gray-400"
          }`}
      >
        <h2 className="text-heading-md font-bold text-green42 mb-1">Filtros</h2>
        <h2 className="text-body-md font-bold text-green42">
          Refina tu búsqueda
        </h2>
        <h2 className="text-caption font-bold text-blue3 mb-6 cursor-pointer">
          Eliminar todos los filtros
        </h2>

        {/* Valoraciones */}
        <div className="mb-[26px]">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("valoraciones")}
          >
            <h3 className="font-bold text-heading-sm mb-2 text-green42">
              Valoraciones
            </h3>
            {openSections.valoraciones ? (
              <img src={IconDrop2} />
            ) : (
              <img src={IconDrop} />
            )}
          </div>
          {openSections.valoraciones && (
            <div className="flex flex-col mb-[26px]">
              {/* Otras opciones con estrellas llenas */}
              {ratings.slice(1).map((value, index) => (
                <StyledCheckbox key={index + 1} value={value}>
                  <div className="flex items-center">
                    <RatingBlue
                      filledStars={value}
                      totalStars={value}
                      showRatingValue={false}
                      filledStarSize={{ width: '15px', height: '15px', marginTop: '2px', marginRight: '8px' }}
                    />
                    {/* El contador ha sido eliminado aquí */}
                  </div>
                </StyledCheckbox>
              ))}

              {/* Primera opción con estrella vacía y 0 Estrellas */}
              <StyledCheckbox value={0}>
                <div className="flex items-center">
                  <RatingBlue
                    filledStars={0}
                    totalStars={1}
                    showRatingValue={false}
                    emptyStarSize={{ width: '24px', height: '24px', marginLeft: '-3px' }}
                  />
                  <span className="ml-1 mt-1 text-sm text-black">0 Estrellas</span>
                </div>
              </StyledCheckbox>
            </div>
          )}
        </div>

        {/* Palabras clave */}
        <div className="mb-[26px]">
          
        {openSections.palabrasClave && (
            <Keywords
              onKeywordsChange={handleKeywordsChange}  // Maneja los cambios de palabras clave
            />
          )}

          <StyledCheckbox className="my-[36px]" value={0} >
            <span className="font-bold text-body-md text-gray">Solo reclutadores independientes</span>
          </StyledCheckbox>

        </div>

        {/* Sector */}
        <div className="mb-4">
          <Sectors sectionTitle="Sector" />
        </div>

        {/* Tamaño de la Empresa */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("tamanoEmpresa")} // Actualizado para el estado correcto
          >
            <h3 className="font-bold text-heading-sm mb-2 text-green42">
              Tamaño de la Empresa
            </h3>
            {openSections.tamanoEmpresa ? (
              <img src={IconDrop2} />
            ) : (
              <img src={IconDrop} />
            )}
          </div>
          {openSections.tamanoEmpresa && (
            <div>
              {companySizes.map((size, index) => (
                <StyledCheckbox 
                  className="mb-[8px]" 
                  key={index} 
                  // value={size}
                  value={0}
                >
                  <span className="font-bold text-body-md text-gray">{size}</span>
                </StyledCheckbox>
              ))}
            </div>
          )}
        </div>

        {/* Búsquedas sugeridas */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("busquedasSugeridas")}
          >
            <h3 className="font-bold text-heading-sm mb-2 text-green42">
              Búsquedas sugeridas
            </h3>
            {openSections.busquedasSugeridas ? (
              <img src={IconDrop2} />
            ) : (
              <img src={IconDrop} />
            )}
          </div>
          {openSections.busquedasSugeridas && (
            <div className="flex flex-col text-bluec">
              {[
                "Dedicadas a la logística",
                "Mejor valoradas de Ciudad Real",
                "Reclutadores independientes que operan en Ciudad Real",
                "Especializadas en retail",
              ].map((sector) => (
                <div key={sector} className="mb-2 font-bold text-body-md">
                  {sector}
                </div>
              ))}
            </div>
          )}
        </div>
      </Sider>
    </div>
  );
};

export default Sidebar;
