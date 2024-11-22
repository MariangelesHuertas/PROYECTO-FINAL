// Button.tsx

import React, { useState } from 'react';
import { Button as AntButton } from 'antd'; // Importamos el botón de Ant Design
import classNames from 'classnames';

interface CustomButtonProps {
  text: string;           // Texto del botón
  activeColor?: string;   // Color cuando el botón está activo
  inactiveColor?: string; // Color cuando el botón está inactivo
  textColor?: string;     // Color del texto
  size?: 'small' | 'middle' | 'large'; // Tamaño del botón (usando tamaños de Ant Design)
  borderRadius?: string;  // Bordes redondeados del botón
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  activeColor = 'bg-[#91c3fd]',   // Color activo por defecto
  inactiveColor = 'bg-white',    // Color inactivo por defecto
  textColor = 'text-black',      // Color del texto
  size = 'middle',               // Tamaño por defecto
  borderRadius = 'rounded-full', // Bordes redondeados por defecto
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  // Usamos classNames para gestionar las clases dinámicamente
  const buttonClasses = classNames(
    'font-medium focus:outline-none transition-all duration-300', // Clase base con transición suave
    {
      [activeColor]: isActive,
      [inactiveColor]: !isActive,
      [textColor]: true,
      [borderRadius]: true,
    }
  );

  return (
    <AntButton
      onClick={handleClick}
      className={buttonClasses}
      size={size}
      style={{
        borderColor: isActive ? '#91c3fd' : '#E1E1E2',
        color: 'black',  // Aseguramos que el texto permanezca negro
        backgroundColor: isActive ? '#91c3fd' : '#FFFFFF', // Fondo al estar activo/inactivo
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#F4F4F5'; // Color plomo al pasar el mouse si no está activo
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#FFFFFF'; // Color blanco cuando el mouse sale si no está activo
        }
      }}
    >
      {text}
    </AntButton>
  );
};

export default CustomButton;
