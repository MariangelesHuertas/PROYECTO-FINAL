import React from 'react';
import { Input as AntdInput } from 'antd'; // Importamos el componente Input de Ant Design
import type { InputProps } from 'antd'; // Importamos el tipo de props que usa el componente Input

interface CustomInputProps extends InputProps {
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
}

const Input: React.FC<CustomInputProps> = ({ customClassName, ...props }) => {
  return (
    <AntdInput
      {...props}
      className={`
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
        rounded-[4px] 
        transition-all 
        duration-200 
        text-black
        font-medium
        text-body-md
        h-[44px]
        ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
      `}
    />
  );
};

export default Input;
