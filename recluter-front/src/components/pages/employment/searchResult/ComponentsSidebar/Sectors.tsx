import React, { useEffect, useState } from "react";
import StyledCheckbox from "../../../../../components/checkbox/CheckboxProps";
import IconDrop from "../../../../../assets/icons/ArrowDrop.svg";
import IconDrop2 from "../../../../../assets/icons/ArrowDrop2.svg";
import ButtonText from "../../../../../components/button/ButtonText";
import { Spin } from "antd"; // Importamos el Spin de Ant Design
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { GetSectorsReducer } from "../../../../../redux/actions/common/sectors/Sectors";

interface SectorsProps {
  sectionTitle: string; // Prop para modificar el título
}

const Sectors: React.FC<SectorsProps> = ({ sectionTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openSection, setOpenSection] = useState(false);
  const [sectors, setSectors] = useState<string[]>([]); // Sectores cargados
  const [visibleSectors, setVisibleSectors] = useState<string[]>([]); // Sectores visibles
  const [limit, setLimit] = useState(5); // Límite inicial de sectores a mostrar
  const [totalSectors, setTotalSectors] = useState(0); // Total de sectores
  const [loading, setLoading] = useState(false);

  // Función para obtener los sectores desde la API
  const fetchSectors = async (newLimit: number) => {
    setLoading(true); 

    try {
      const response = await dispatch(GetSectorsReducer('', 1, newLimit)); 

      const data = response.payload.data.map((sectorObj: any) => sectorObj.sector);
      setSectors(data); 
      setVisibleSectors(data.slice(0, newLimit)); 
      setTotalSectors(response.payload.meta.total); 
    } catch (error) {
      console.error("Error fetching sectors:", error);
    }

    setLoading(false); 
  };

  useEffect(() => {
    fetchSectors(limit);
  }, []);

  const toggleSection = () => {
    setOpenSection(!openSection);
  };

  const handleLoadMore = () => {
    if (visibleSectors.length >= totalSectors) {
      setVisibleSectors(sectors.slice(0, 5));
      setLimit(5);
    } else {
      const newLimit = limit + 10;
      setLimit(newLimit);
      fetchSectors(newLimit);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleSection}>
        <h3 className="font-bold text-heading-sm mb-2 text-green42">
          {sectionTitle}
        </h3>
        {openSection ? <img src={IconDrop2} alt="Collapse icon" /> : <img src={IconDrop} alt="Expand icon" />}
      </div>

      {openSection && (
        <div>
          {visibleSectors.map((sector, index) => (
            <StyledCheckbox className="mb-[8px]" key={index} value={0}>
              <span className="font-bold text-body-md text-gray">{sector}</span>
            </StyledCheckbox>
          ))}

          {/* Mostrar spinner debajo de los sectores cargados */}
          {loading && (
            <div className="flex justify-center my-4">
              <Spin size="small" /> {/* Spinner de Ant Design */}
            </div>
          )}

          <div className="flex justify-center items-center" style={{ alignContent: "center", height: "100%" }}>
            <ButtonText
              buttons={[
                {
                  type: "link",
                  label: visibleSectors.length >= totalSectors ? "Ver menos" : "Ver más", 
                  size: "small",
                  textColor: "#006497",
                  color: "white",
                  fontWeight: 700, 
                  fontSize: "14px",
                  underline: true,
                  onClick: handleLoadMore, 
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sectors;
