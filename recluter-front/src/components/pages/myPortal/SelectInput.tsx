import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface SelectBoxProps extends SelectProps<any> {
  placeholder?: string;
  customClassName?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  placeholder,
  style,
  customClassName,
  ...props
}) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    // Aquí puedes añadir tu llamada a la API para buscar sectores
    setData([]); // Este array se rellenará cuando conectes tu API
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <style>
        {`
          .custom-select-box .ant-select-selector {
            border: 1px solid #d9d9d9;
            background-color: #b13030; /* Forzamos el color de fondo */
            border-radius: 12px !important; /* Forzamos el borde redondeado */
            padding: 0 11px;
            transition: all 0.3s ease;
          }

          .custom-select-box .ant-select-selector:hover {
           
            color: black
            background-color: black; /* Fondo al pasar el mouse */
          }

          .custom-select-box .ant-select-selector:focus {
            border-color: #91c3fd;
            background-color: #b13030; /* Fondo en estado de foco */
          }
        `}
      </style>

      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={{
          ...style,
          borderRadius: '12px', // Borde redondeado para asegurar que se aplique correctamente
          backgroundColor: '#f0f0f0', // Fondo gris claro visible
        }}
        className={`
          custom-select-box
          w-full
          border 
          border-gray2 
          placeholder:text-green32 
          focus:placeholder:text-grays 
          hover:placeholder:text-black 
          hover:bg-gray3 
          hover:border-2 
          hover:border-gray2
          hover:text-black 
          focus:border-4 
          focus:border-[#91c3fd] 
          focus:text-green32 

          border-gray-400 /* Cambiamos el color del borde a gris estándar */
          placeholder:text-gray-500
          focus:placeholder:text-gray-700
          rounded-[12px] /* Aseguramos que el radio del borde sea consistente */
          hover:border-gray-400 /* Borde gris más grueso cuando pasas el cursor */
          hover:bg-gray-200  /* Fondo gris claro cuando pasas el cursor */
          focus:bg-white 
          transition-all 
          duration-200 
          text-black
          font-bold
          text-body-md
          h-[36px]
          ${customClassName} /* Añadimos cualquier clase CSS adicional pasada como prop */
        `}
        
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={(data || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
        {...props}
      />
    </>
  );
};

export default SelectBox;
