import React from 'react';
import { Input as AntdInput } from 'antd'; // Importamos el componente Input de Ant Design
import type { InputProps } from 'antd'; // Importamos el tipo de props que usa el componente Input
import Property1 from '../../../assets/img/login/Property1.svg'; // Importamos la imagen para la contraseña visible
import Property2 from '../../../assets/img/login/Property2.svg'; // Importamos la imagen para la contraseña oculta

interface CustomInputProps extends InputProps {
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
  isPassword?: boolean; // Prop para determinar si es un campo de contraseña
}

const Input: React.FC<CustomInputProps> = ({ customClassName, isPassword, ...props }) => {
  return isPassword ? (
    <AntdInput.Password
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
        rounded-[12px] 
        transition-all 
        duration-200 
        text-black
        font-medium
        text-heading-x1
        ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
      `}
      iconRender={(visible) =>
        visible ? <img src={Property2} alt="Visible" /> : <img src={Property1} alt="Hidden" />
      }
    />
  ) : (
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
        rounded-[12px] 
        transition-all 
        duration-200 
        text-black
        font-medium
        text-heading-x1
        ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
      `}
    />
  );
};

export default Input;
