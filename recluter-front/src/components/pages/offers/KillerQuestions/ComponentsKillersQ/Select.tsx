import React from 'react';
import { Select as AntdSelect } from 'antd'; // Importamos el componente Select de Ant Design
import type { SelectProps } from 'antd'; // Importamos el tipo de props que usa el componente Select

interface CustomSelectProps extends SelectProps {
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
}

const Select: React.FC<CustomSelectProps> = ({ customClassName, ...props }) => {
  return (
    <AntdSelect
      {...props}
      className={`
        w-full 
        border
        border-blue3 
        placeholder:text-green32 
        focus:placeholder:text-grays 
        hover:placeholder:text-black 
        hover:border-2 
        hover:border-gray-600 
        hover:text-black 
        focus:border-4 
        focus:border-[#91c3fd] 
        focus:text-gray-500 
        rounded-[4px] 
        transition-all 
        duration-200 
        text-black 
        font-medium 
        text-body-md 
        ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
      `}
      dropdownClassName="select-dropdown"
    />
  );
};

export default Select;
