import React, { useState } from "react";
import { Layout, Input, Divider} from "antd";
import "tailwindcss/tailwind.css";
import RatingBlue from "../../rating/RatingBlue";
import ButtonCom from "../../button/Button";
import StyledCheckbox from "../../checkbox/CheckboxProps";
import ToggleSwitch from "../../toggleSwitch/ToggleSwitch";
import Select from "../../../components/pages/searchCV/Select";
import Slider from '../searchCV/Slider';
import IconDrop from "../../../assets/icons/ArrowDrop.svg";
import IconDrop2 from "../../../assets/icons/ArrowDrop2.svg";
import IconLine from '../../../assets/icons/ArrowA.svg';
import IconLine2 from '../../../assets/icons/ArrowLine.svg';
import Keywords from "../employment/searchResult/ComponentsSidebar/KeyWord";
import Company from './ComponentsSidebar/CompanyC';
import Sector from '../employment/searchResult/ComponentsSidebar/Sectors';
import Education from './ComponentsSidebar/Education'

const { Sider } = Layout;
const { Option } = Select;
interface SidebarSearchProps {
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

const Sidebar: React.FC<SidebarSearchProps> = ({inDrawer = false}) => {
  const [openSections, setOpenSections] = useState({
    valoraciones: false,
    educacion: false,
    disponibilidad: false,
    experiencia: false,
    palabrasClave: true,
    cualificativos: false,
    ubicacion: false,
    busquedasSugeridas: false,
  });

  const [selectedCompanies, setSelectedCompanies] = useState(companies);
  const [keywords, setKeywords] = useState(["Office", "Inglés"]);
  const [excludeKeywords, setExcludeKeywords] = useState(["Aldi", "El Corte Inglés", "Administrativo"]);
  const [company, setCompany] = useState(["Eroski", "Carrefour"]);
  const [selectedSkills, setSelectedSkills] = useState(["Colaborativo"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [newExcludeKeyword, setNewExcludeKeyword] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(['Ciudad Real']);
  const [selectedTowns, setSelectedTowns] = useState<string[]>(['Campo de Criptana', 'Alcazar de San Juan']);

  const handleKeywordsChange = (newKeywords: string[]) => {
    console.log("Nuevas Palabras clave:", newKeywords);
  };

  const handleCompaniesChange = (newCompanies: string[]) => {
    console.log("Empresas seleccionadas:", newCompanies);
    setSelectedCompanies(newCompanies);
  };

  const toggleSection = (section: any) => {
    setOpenSections((prevState: any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const addExcludeKeyword = () => {
    if (
      newExcludeKeyword.trim() !== "" &&
      !excludeKeywords.includes(newExcludeKeyword.trim())
    ) {
      setExcludeKeywords([...excludeKeywords, newExcludeKeyword.trim()]);
      setNewExcludeKeyword("");
    }
  };

  const removeExcludeKeyword = (keywordToRemove: string) => {
    setExcludeKeywords(
      excludeKeywords.filter((keyword) => keyword !== keywordToRemove)
    );
  };

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove: any) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const addProvince = (province: string) => {
    if (province && !selectedProvinces.includes(province)) {
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };

  const removeProvince = (provinceToRemove: any) => {
    setSelectedProvinces(
      selectedProvinces.filter((province) => province !== provinceToRemove)
    );
  };

  const addTown = (town: string) => {
    if (town && !selectedTowns.includes(town)) {
      setSelectedTowns([...selectedTowns, town]);
    }
  };

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
        className={` ${inDrawer ? 'p-[5px] border-none ml-[-15px] mt-[-15px]' : "rounded-lg shadow-md p-5 border border-sky-blue0 shadow-gray-400"}`} 
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
              {ratings.slice(1).map((value, index) => (
                <StyledCheckbox key={index + 1} value={value}>
                  <div className="flex items-center">
                    <RatingBlue
                      filledStars={value}
                      totalStars={value}
                      showRatingValue={false}
                      filledStarSize={{ width: '15px', height: '15px', marginTop: '2px', marginRight: '4px' }}
                    />
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
        {openSections.palabrasClave && (
            <Keywords
              onKeywordsChange={handleKeywordsChange}
            />
          )}

        </div>

        {/* Excluir parametros */}
        <div className="mb-[26px]">
          <h3 className="font-bold text-heading-sm mb-2 text-green42">
            Excluir parámetros
          </h3>
          <div className="flex">
            <Input
              placeholder="Escribe aquí..."
              value={newExcludeKeyword}
              onChange={(e) => setNewExcludeKeyword(e.target.value)}
              className="h-[36px] border-[#E1E1E2] font-bold text-caption flex-1"
            />
            <ButtonCom
              buttons={[
                {
                  type: "link",
                  label: "Añadir",
                  border: "1px solid #006497",
                  size: "small",
                  textColor: "#006497",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                  onClick: addExcludeKeyword,
                },
              ]}
            />
          </div>

          <div className="flex flex-col">
            {excludeKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-[8px]"
              >
                <span className="font-medium text-body-sm text-[#FF8A70]">
                  {keyword}
                </span>
                <span
                  className="ml-2 cursor-pointer transition-colors font-medium text-body-sm text-green22"
                  onClick={() => removeExcludeKeyword(keyword)}
                >
                  X
                </span>
              </div>
            ))}
          </div>
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
              <Select
                placeholder="Selecciona soft skills"
                className="w-full"
                onChange={addSkill}
                value={null}
              >
                {softSkills.map((skill, index) => (
                  <Option key={index} value={skill}>
                    {skill}
                  </Option>
                ))}
              </Select>

              <div className="flex flex-col mt-[8px]">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span className="font-medium text-body-sm text-green22">
                      {skill}
                    </span>
                    <span
                      className="ml-2 cursor-pointer transition-colors font-medium text-body-sm text-green22"
                      onClick={() => removeSkill(skill)}
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
                  value={null}
                >
                  {provinces.map((province, index) => (
                    <Option key={index} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
                <div className="flex flex-col my-[12px]">
                  {selectedProvinces.map((province, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="font-medium text-caption text-green22">
                        {province}
                      </span>
                      <span
                        className="ml-1 cursor-pointer transition-colors font-medium text-caption text-[#00476D]"
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
                  value={null}
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
              Añade empresas interesantes para ti
            </span>
            <span className="font-normal text-[13px] w-[186px] text-[#FDBCB4] ">
              {" "}
              o excluye las que no te interesen.
            </span>
          </div>
          <Company
            onCompaniesChange={handleCompaniesChange}/>
        </div>

        {/* Experiencia (años) */}
        <div className="mb-[52px]">
          <h3 className="font-bold text-heading-sm mb-2 text-green42">
            Experiencia (años)
          </h3>
          <Slider />
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
                <StyledCheckbox className="mb-[8px]" key={index} value={option}>
                  {option}
                </StyledCheckbox>
              ))}
            </div>
          )}
        </div>

        {/* Sector */}
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
