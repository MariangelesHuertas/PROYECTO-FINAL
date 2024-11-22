import React, { useState } from "react";
import ButtonCom from "../../../button/Button";
import DebounceSelect from "../../employment/searchResult/SelectKeyWords"; // Reutilizando tu componente DebounceSelect
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { GetEmpresasReducer } from "../../../../redux/actions/common/company/Company"; // Importa la acción de empresas

interface EmpresasProps {
  initialCompanies?: string[];
  onCompaniesChange?: (companies: string[]) => void;
}

const Empresas: React.FC<EmpresasProps> = ({
  initialCompanies = [],
  onCompaniesChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [companies, setCompanies] = useState<string[]>(initialCompanies); // Lista de empresas seleccionadas
  const [newCompany, setNewCompany] = useState(""); // Nueva empresa seleccionada

  // Función para obtener las opciones de empresas desde la API
  const fetchCompanyOptions = async (search: string) => {
    const response = await dispatch(GetEmpresasReducer(search, 1, 5)); // Cambia los parámetros si es necesario
    return response.payload.data.map((company: any) => ({
      label: company.empresa,
      value: company.empresa,
    }));
  };

  // Agregar la nueva empresa seleccionada
  const addCompany = () => {
    if (newCompany.trim() !== "" && !companies.includes(newCompany.trim())) {
      const updatedCompanies = [...companies, newCompany.trim()];
      setCompanies(updatedCompanies);
      setNewCompany("");

      if (onCompaniesChange) {
        onCompaniesChange(updatedCompanies); // Notifica los cambios al componente padre
      }
    }
  };

  // Eliminar una empresa seleccionada
  const removeCompany = (companyToRemove: string) => {
    const updatedCompanies = companies.filter(
      (company) => company !== companyToRemove
    );
    setCompanies(updatedCompanies);

    if (onCompaniesChange) {
      onCompaniesChange(updatedCompanies); // Notifica los cambios al componente padre
    }
  };

  return (
    <div>
      {/* Input de búsqueda de empresas */}
      <div className="flex mb-[7px]">
        <DebounceSelect
          showSearch
          placeholder="Escribe aquí..."
          fetchOptions={fetchCompanyOptions} // Función para buscar empresas
          onChange={(value: any) => setNewCompany(value?.value || "")} // Selecciona la empresa
          customClassName="custom-input-class" // Añade una clase personalizada si lo deseas
          style={{ width: "109px", height: '36px', marginBottom: "10px" }}
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
              onClick: addCompany, // Añadir empresa seleccionada
            },
          ]}
        />
      </div>

      {/* Lista de empresas seleccionadas */}
      <div className="flex flex-col">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-[8px]"
          >
            <span className="font-medium text-body-sm text-green22">
              {company}
            </span>
            <span
              className="ml-2 cursor-pointer transition-colors font-medium text-body-sm text-green22"
              onClick={() => removeCompany(company)} // Eliminar empresa seleccionada
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empresas;
