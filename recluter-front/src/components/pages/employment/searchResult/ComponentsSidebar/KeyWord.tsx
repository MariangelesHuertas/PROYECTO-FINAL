import React, { useState } from "react";
import ButtonCom from "../../../../button/Button";
import DebounceSelect from "../SelectKeyWords"; // Importamos tu componente personalizado
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { GetKeywordsReducer } from "../../../../../redux/actions/common/keywords/Keywords"; 

interface KeywordsProps {
  initialKeywords?: string[];
  onKeywordsChange?: (keywords: string[]) => void;
  allowExclusion?: boolean; // Prop para controlar la exclusión de palabras clave
}

const Keywords: React.FC<KeywordsProps> = ({
  initialKeywords = [],
  onKeywordsChange,
  allowExclusion = false, // Valor por defecto: exclusión desactivada
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [newKeyword, setNewKeyword] = useState("");

  // Función para obtener las opciones de palabras clave desde la API
  const fetchKeywordOptions = async (search: string) => {
    const response = await dispatch(GetKeywordsReducer(search, 1, 5)); // Cambiar tamaño de página si es necesario
    return response.payload.data.map((keyword: any) => ({
      label: keyword.palabra,
      value: keyword.palabra,
    }));
  };

  // Función para agregar una palabra clave nueva
  const addKeyword = () => {
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword.trim())) {
      const updatedKeywords = [...keywords, newKeyword.trim()];
      setKeywords(updatedKeywords);
      setNewKeyword("");

      if (onKeywordsChange) {
        onKeywordsChange(updatedKeywords); // Notifica los cambios al componente padre
      }
    }
  };

  // Función para eliminar una palabra clave
  const removeKeyword = (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);

    if (onKeywordsChange) {
      onKeywordsChange(updatedKeywords); // Notifica los cambios al componente padre
    }
  };

  return (
    <div>
      <h3 className="font-bold text-heading-sm mb-2 text-green42">Palabras clave</h3>
      
      {/* Usamos DebounceSelect para buscar palabras clave desde la API */}
      <div className="flex">
        <DebounceSelect
          showSearch
          placeholder="Escribe aquí..."
          fetchOptions={fetchKeywordOptions} // Función para buscar palabras clave
          onChange={(value: any) => setNewKeyword(value?.value || "")} // Selecciona la palabra clave
          customClassName="custom-input-class" // Añade una clase personalizada si lo deseas
          style={{ width: "109px", height:'36px', marginBottom: "10px" }}
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
              onClick: addKeyword,
            },
          ]}
        />
      </div>

      {/* Muestra las palabras clave seleccionadas */}
      <div className="flex flex-col mt-4">
        {keywords.map((keyword, index) => {
          const isExcluded = allowExclusion && keyword.startsWith("-"); // Solo permite exclusión si allowExclusion es true
          const displayName = isExcluded ? keyword.slice(1) : keyword; // Muestra la palabra sin el "-"

          return (
            <div
              key={index}
              className="flex justify-between items-center mb-[8px]"
            >
              <span
                className={`font-medium text-body-sm ${isExcluded ? "text-[#FF6B6B]" : "text-green22"}`}
              >
                {displayName}
              </span>
              <span
                className="ml-2 cursor-pointer transition-colors font-medium text-body-sm text-green22"
                onClick={() => removeKeyword(keyword)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>

      {allowExclusion && ( // Solo muestra la instrucción de exclusión si la funcionalidad está habilitada
        <div className="mb-[7px]">
          <span className="font-normal text-[13px] w-[186px] text-[#5E5E5E] italic">
            Escribe "-" antes de la palabra para excluirla de la búsqueda
          </span>
        </div>
      )}
    </div>
  );
};

export default Keywords;
