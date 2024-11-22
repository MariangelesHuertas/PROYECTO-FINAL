import React, { useEffect, useState } from "react";
import StyledCheckbox from "../../../../components/checkbox/CheckboxProps";
import IconDrop from "../../../../assets/icons/ArrowDrop.svg";
import IconDrop2 from "../../../../assets/icons/ArrowDrop2.svg";
import ButtonText from "../../../../components/button/ButtonText";
import { Spin } from "antd"; // Importamos el Spin de Ant Design
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { GetTiposEducacionReducer } from "../../../../redux/actions/common/education/Education";
import { useSelector } from "react-redux";

interface EducationProps {
  sectionTitle: string; // Nueva prop para modificar el título
}

const Education: React.FC<EducationProps> = ({ sectionTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openSection, setOpenSection] = useState(false); // Estado para manejar la visibilidad de la sección
  const [limit, setLimit] = useState(5); // Límite inicial de tipos de educación a mostrar
  const [visibleTiposEducacion, setVisibleTiposEducacion] = useState<any[]>([]); // Tipos de educación visibles
  const [totalTiposEducacion, setTotalTiposEducacion] = useState(0); // Total de tipos de educación
  const [loading, setLoading] = useState(false); // Estado de carga

  // Obtener los tipos de educación del estado de Redux
  const { tiposEducacion } = useSelector((state: RootState) => state.education); // Accede correctamente al reducer

  // Función para obtener los tipos de educación desde la API
  const fetchTiposEducacion = async (newLimit: number) => {
    setLoading(true); // Indica que se está cargando

    try {
      const response = await dispatch(GetTiposEducacionReducer(1, newLimit)); // Llamada al reducer para obtener los datos

      const data = response.payload.data.map((educacionObj: any) => educacionObj); // Extraer el objeto completo
      const educationListWithDefault = [{ tipo_educacion: "Ninguna" }, ...data]; // Añadimos el valor "Ninguna" como objeto por defecto
      
      setVisibleTiposEducacion(educationListWithDefault.slice(0, newLimit)); // Muestra solo hasta el límite
      setTotalTiposEducacion(educationListWithDefault.length); // Actualiza el total de tipos de educación
    } catch (error) {
      console.error("Error fetching tipos de educación:", error);
    }

    setLoading(false); // Indica que la carga ha terminado
  };

  useEffect(() => {
    fetchTiposEducacion(limit); // Cargar los tipos de educación al inicio con el límite actual
  }, [limit]); // Ejecutar el efecto cuando el límite cambie

  const toggleSection = () => {
    setOpenSection(!openSection); // Abrir o cerrar la sección
  };

  const handleLoadMore = () => {
    if (visibleTiposEducacion.length >= totalTiposEducacion) {
      setVisibleTiposEducacion(tiposEducacion.slice(0, 5)); // Mostrar solo los primeros 5 cuando se haga "Ver menos"
      setLimit(5);
    } else {
      const newLimit = limit + 10; // Incrementa el límite de elementos a mostrar
      setLimit(newLimit);
      fetchTiposEducacion(newLimit); // Llamar a la función para cargar más datos
    }
  };

  return (
    <div>
      {/* Título dinámico */}
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleSection}>
        <h3 className="font-bold text-heading-sm mb-2 text-green42">
          {sectionTitle}
        </h3>
        {openSection ? (
          <img src={IconDrop2} alt="Collapse icon" />
        ) : (
          <img src={IconDrop} alt="Expand icon" />
        )}
      </div>

      {/* Lista de tipos de educación */}
      {openSection && (
        <div>
          {visibleTiposEducacion.map((tipoEducacion, index) => (
            <StyledCheckbox className="mb-[8px]" key={index} value={0}>
              <span className="font-bold text-body-md text-gray">
                {tipoEducacion.tipo_educacion} {/* Accedemos al campo correcto */}
              </span>
            </StyledCheckbox>
          ))}

          {/* Mostrar spinner debajo de los datos cargados */}
          {loading && (
            <div className="flex justify-center my-4">
              <Spin size="small" /> {/* Spinner pequeño de Ant Design */}
            </div>
          )}

          {/* Mostrar el botón "Ver más/menos" solo si hay más de 5 datos */}
          {totalTiposEducacion > 5 && !loading && (
            <div className="flex justify-center items-center" style={{ alignContent: "center", height: "100%" }}>
              <ButtonText
                buttons={[
                  {
                    type: "link",
                    label: visibleTiposEducacion.length >= totalTiposEducacion ? "Ver menos" : "Ver más",
                    size: "small",
                    textColor: "#006497",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "14px",
                    underline: true,
                    onClick: handleLoadMore, // Cambiar entre "Ver más" o "Ver menos"
                  },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
