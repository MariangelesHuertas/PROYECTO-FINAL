import React, { useState } from "react";
import { Layout, Divider} from "antd";
import "tailwindcss/tailwind.css";
import RatingBlue from "../../../rating/RatingBlue";
import StyledCheckbox from "../../../checkbox/CheckboxProps";
import ToggleSwitch from "../../../toggleSwitch/ToggleSwitch";
import Select from "../../../../components/pages/searchCV/Select";
import Slider from "../../searchCV/Slider";
import IconDrop from "../../../../assets/icons/ArrowDrop.svg";
import IconDrop2 from "../../../../assets/icons/ArrowDrop2.svg";
import IconLine from '../../../../assets/icons/ArrowA.svg';
import IconLine2 from '../../../../assets/icons/ArrowLine.svg';
import Keywords from "../../employment/searchResult/ComponentsSidebar/KeyWord";
import CompanyC from '../../searchCV/ComponentsSidebar/CompanyC';
import Sector from "../../employment/searchResult/ComponentsSidebar/Sectors";
import Education from "../../searchCV/ComponentsSidebar/Education";

const { Sider } = Layout;
const { Option } = Select;

interface SidebarOffersProps {
  inDrawer?: boolean;
}

const ratings = [0, 1, 2, 3, 4, 5];
const provinces = ["Ciudad Real", "Toledo", "Madrid"];
const towns = ["Campo de Criptana", "Alcazar de San Juan", "Toledo", "Madrid"];
const companies = ["Eroski", "Carrefour", "Aldi", "El Corte Inglés"];

const availability = [
  "Tiempo completo",
  "Tiempo parcial",
  "Mañanas",
  "Tardes",
  "Noches",
];

const Sidebar: React.FC<SidebarOffersProps> = ({
  inDrawer = false}) => {
  const [openSections, setOpenSections] = useState<{
    valoraciones: boolean,
    palabrasClave: boolean,
    cualificativos: boolean,
    ubicacion: boolean,
    busquedasSugeridas: boolean,
    educacion: boolean,
    disponibilidad: boolean,
    experiencia: boolean,
  }>({
    valoraciones: false,
    palabrasClave: true,
    cualificativos: false,
    ubicacion: false,
    busquedasSugeridas: false,
    educacion: false,
    disponibilidad: false,
    experiencia: false,
  });

  const [selectedCompanies, setSelectedCompanies] = useState(companies);
  const [experienceYears, setExperienceYears] = useState(6); // Default experience value
  const [keywords, setKeywords] = useState<string[]>(["Office", "Inglés", "-Administrativo"]);
  const [excludeKeywords, setExcludeKeywords] = useState([
    "Aldi",
    "El Corte Inglés",
    "Administrativo",
  ]);
  const [company, setCompany] = useState<string[]>([
    "Eroski",
    "Carrefour",
    "-Aldi",
    "-El Corte Inglés",
  ]);
  const [selectedSkills, setSelectedSkills] = useState(["Colaborativo"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newExcludeKeyword, setNewExcludeKeyword] = useState("");
  const [newCompany, setNewCompany] = useState(""); // Nuevo estado para "Empresas"

  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(['Ciudad Real']);
  const [selectedTowns, setSelectedTowns] = useState<string[]>(['Campo de Criptana', 'Alcazar de San Juan']);

  const toggleSection = (section: any) => {
    setOpenSections((prevState: any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const handleKeywordsChange = (newKeywords: string[]) => {
    console.log("Nuevas Palabras clave:", newKeywords);
    setKeywords(newKeywords); // Actualiza las palabras clave
  };
  const handleCompaniesChange = (newCompanies: string[]) => {
    console.log("Empresas seleccionadas:", newCompanies);
    setSelectedCompanies(newCompanies);
  };

  // Function to add a skill
  const addSkill = (skill: any) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Function to remove a skill
  const removeSkill = (skillToRemove: any) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  // Function to add a province
  const addProvince = (province: string) => {
    if (province && !selectedProvinces.includes(province)) {
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };

  // Function to remove a province
  const removeProvince = (provinceToRemove: any) => {
    setSelectedProvinces(
      selectedProvinces.filter((province) => province !== provinceToRemove)
    );
  };

  // Function to add a town
  const addTown = (town: string) => {
    if (town && !selectedTowns.includes(town)) {
      setSelectedTowns([...selectedTowns, town]);
    }
  };

  // Function to remove a town
  const removeTown = (townToRemove: any) => {
    setSelectedTowns(selectedTowns.filter((town) => town !== townToRemove));
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
    <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
      <Sider
        width={234}
        style={{ backgroundColor: "white" }}
        className={` ${inDrawer ? 'p-[5px] border-none ml-[-15px] mt-[-15px]' :"rounded-lg shadow-md p-5 border border-sky-blue0 shadow-gray-400"}`} 
      >
        <h2 className="text-heading-md font-bold text-green42 mb-1">Filtros</h2>
        <h2 className="text-body-md font-bold text-green42">
          Refina tu búsqueda
        </h2>
        <h2 className="text-caption font-bold text-blue3 mb-6 cursor-pointer">
          Eliminar todos los filtros
        </h2>

        {/* Búsqueda de trabajo activa */}
        <div className="flex justify-between items-center mb-2">
          <div className=" w-[138px]">
            <h2 className="mt-2 mb-3 text-caption font-semibold text-gray-800">
              Búsqueda de trabajo activa
            </h2>
          </div>
          <div className="mt-[-5px]">
            <ToggleSwitch
              defaultChecked={false}
              size="small"
              customClass="switch-small-1"
            />
          </div>
        </div>

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
              {/* Primera opción con estrella vacía y 0 Estrellas */}
              <StyledCheckbox value={0}>
                <div className="flex items-center">
                  <RatingBlue
                    filledStars={0}
                    totalStars={1}
                    showRatingValue={true}
                    emptyStarSize={{ width: '20px', height: '20px', marginLeft: '-3px' }}
                  />
                  <span className="ml-2 text-sm text-black">Estrellas</span>
                </div>
              </StyledCheckbox>

              {/* Otras opciones con estrellas llenas */}
              {ratings.slice(1).map((value, index) => (
                <StyledCheckbox key={index + 1} value={value}>
                  <div className="flex items-center">
                    <RatingBlue
                      filledStars={value}
                      totalStars={value}
                      showRatingValue={false}
                      filledStarSize={{ width: '15px', height: '15px', marginTop: '2px', marginRight: '4px' }}
                    />
                    {/* El contador ha sido eliminado aquí */}
                  </div>
                </StyledCheckbox>
              ))}

              <Divider className="bg-black my-[8px]"></Divider>

              <StyledCheckbox className="mt-0" value={0}>
                <h3 className="font-medium text-[14px] text-green42">
                  Solo candidatos con más de 10 valoraciones
                </h3>
              </StyledCheckbox>
            </div>
          )}
        </div>

        {/* Palabras clave */}
        <div className="mb-[26px]">
          <Keywords 
            initialKeywords={keywords} 
            onKeywordsChange={handleKeywordsChange} 
            allowExclusion={true}  // Activa la funcionalidad de exclusión
          />

        </div>

        {/* Cualificativos */}
        <div className="mb-[26px]">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("cualificativos")}
          >
            <h3 className="font-bold text-heading-sm mb-2 text-green42">
              Cualificativos
            </h3>
            {openSections.cualificativos ? (
              <img src={IconLine} />
            ) : (
              <img src={IconLine2} />
            )}
          </div>
          {openSections.cualificativos && (
            <div>
              {/* Select for adding soft skills */}
              <Select
                placeholder="Selecciona soft skills"
                className="w-full"
                onChange={addSkill} // Use addSkill on selection
                value={null} // Reset select value after selection
              >
                {softSkills.map((skill, index) => (
                  <Option key={index} value={skill}>
                    {skill}
                  </Option>
                ))}
              </Select>

              {/* Display selected skills with remove option */}
              <div className="flex flex-col mt-[8px]">
                {" "}
                {/* Use flex-col for stacking skills */}
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    {" "}
                    {/* Flex row for skill and remove button */}
                    <span className="font-medium text-body-sm text-green22">
                      {skill}
                    </span>
                    <span
                      className="ml-2 cursor-pointer transition-colors font-medium text-body-sm text-green22"
                      onClick={() => removeSkill(skill)} // Remove skill on click
                    >
                      X
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ubicación */}
        <div className="mb-[26px]">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("ubicacion")}
          >
            <h3 className="font-bold text-heading-sm mb-[12px] text-green42">
              Ubicación
            </h3>
            {openSections.ubicacion ? (
              <img src={IconLine} />
            ) : (
              <img src={IconLine2} />
            )}
          </div>
          {openSections.ubicacion && (
            <div>
              {/* Provincias */}
              <div className="">
                <h4 className="font-medium text-body-md mb-[12px] text-gray">Provincia</h4>
                <Select
                  placeholder="Seleccionar provincia"
                  className="w-full"
                  onChange={addProvince}
                  value={null} // Reset select value after selection
                >
                  {provinces.map((province, index) => (
                    <Option key={index} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
                <div className="flex flex-col my-[12px]">
                  {" "}
                  {selectedProvinces.map((province, index) => (
                    <div key={index} className="flex items-center mb-2">
                      {" "}
                      <span className="font-medium text-caption text-green22">
                        {province}
                      </span>
                      <span
                        className="ml-1 cursor-pointer transition-colors font-medium text-caption text-[#00476D]" // ml-1 mantiene un pequeño espacio entre la letra y la X
                        onClick={() => removeProvince(province)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Poblaciones */}
              <div className="mb-[8px]">
                <h4 className="font-medium text-body-md mb-[12px] text-gray">Población</h4>
                <Select
                  placeholder="Seleccionar población"
                  className="w-full"
                  onChange={addTown}
                  value={null} // Reset select value after selection
                >
                  {towns.map((town, index) => (
                    <Option key={index} value={town}>
                      {town}
                    </Option>
                  ))}
                </Select>
                <div className="flex flex-col mt-[12px]">
                  {selectedTowns.map((town, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="font-medium text-caption text-green22">
                        {town}
                      </span>
                      <span
                        className="ml-1 cursor-pointer transition-colors font-medium text-caption text-[#00476D]"
                        onClick={() => removeTown(town)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <StyledCheckbox value={1}><h1 className='text-gray font-medium text-body-sm'>Solo remoto</h1></StyledCheckbox>
              </div>
            </div>
          )}
        </div>

        {/* Empresas */}
        <div className="mb-[26px]">
          <h3 className="font-bold text-heading-sm mb-[7px] text-green42">
            Empresas
          </h3>
          <div className="mb-[7px]">
            <span className="font-normal text-[13px] w-[186px] text-[#5E5E5E] ">
              Añade empresas interesantes para ti o excluye las que no te
              interesen.
            </span>
          </div>
          <CompanyC
            onCompaniesChange={handleCompaniesChange}/>

          <div className="mb-[7px]">
            <span className="font-normal text-[13px] w-[186px] text-[#5E5E5E] italic">
              Escribe "-" antes de la palabra para excluirla de la búsqueda
            </span>
          </div>
        </div>

        {/* Experiencia (años) */}
        <div className="mb-[30px]">
          <h3 className="font-bold text-heading-sm mb-2 text-green42">
            Experiencia (años)
          </h3>
          <Slider />
          <StyledCheckbox className="" value={0}>Rockies</StyledCheckbox>
        </div>

        {/* Educación */}
        <div className="mb-[26px] ">
          <Education
          sectionTitle="Educación" 
          />
        </div>

        {/* Disponibilidad */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("disponibilidad")}
          >
            <h3 className="font-bold text-heading-sm mb-2 text-green42">
              Disponibilidad
            </h3>
            {openSections.disponibilidad ? (
              <img src={IconDrop2} />
            ) : (
              <img src={IconDrop} />
            )}
          </div>
          {openSections.disponibilidad && (
            <div>
              {availability.map((option: any, index) => (
                <StyledCheckbox
                  className="mb-[8px]"
                  key={index}
                  value={option}
                >
                  {option}
                </StyledCheckbox>
              ))}
            </div>
          )}
        </div>

        {/* Áreas de Experiencia */}
        <div className="mb-4">
            <Sector sectionTitle="Experiencia en el sector" />
        </div>

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
