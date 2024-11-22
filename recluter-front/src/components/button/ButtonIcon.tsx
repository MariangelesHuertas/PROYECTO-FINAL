// ButtonIconCom.tsx
import React from 'react';
import { Button, Flex } from 'antd';
import './estilos.css';

interface ButtonIconComProps {
  buttons: {
    // type: 'primary' | 'link' | 'dashed'; // Tipos de botones disponibles
    type: string; // Tipos de botones disponibles
    // size?: 'large' | 'middle' | 'small'; // Tamaño del botón
    size?: string; // Tamaño del botón
    shape?: 'default' | 'circle' | 'round'; // Forma del botón
    color?: string; // Color personalizado del botón
    icon: React.ReactNode; // Ícono del botón (obligatorio)
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void; // Manejador de clic
    href?: string; // URL de redirección para botones de tipo link
    iconColor?: string; // Color del ícono (opcional)
    border?: string; // Propiedad para definir el borde del botón
    borderWidth?: string; // Propiedad para definir el grosor del borde
    rounded?: boolean; // Propiedad para definir bordes redondeados
    underline?: boolean; // Propiedad para definir si el texto está subrayado
  }[];
  vertical?: boolean; // Propiedad para alinear verticalmente los botones
  gap?: string | number; // Espacio entre botones
}

const ButtonIconCom: React.FC<ButtonIconComProps> = ({ buttons, vertical = false, gap }) => (
  <Flex align="center" gap={gap} vertical={vertical}>
    {buttons.map((button, index) => {
      const buttonProps: any = {
        type: button.type,
        size: button.size,
        shape: button.shape,
        onClick: button.onClick,
        style: {
          backgroundColor: button.color,
          border: button.border || 'none', // Establece el borde o usa 'none' si no se proporciona
          borderWidth: button.borderWidth,
          borderRadius: button.rounded ? '4px' : undefined, // Define si el botón tiene bordes redondeados
          textDecoration: button.underline ? 'underline' : undefined, // Define si el texto del botón está subrayado
        
        },
      };

      if (button.type === 'link' && button.href) {
        buttonProps.href = button.href;
      }

      const iconStyle: React.CSSProperties = {
        color: button.iconColor || 'black', // Color del ícono (predeterminado negro)
      };

      return (
        <Button key={index} {...buttonProps}>
          {React.cloneElement(button.icon as React.ReactElement, { style: iconStyle })}
        </Button>
      );
    })}
  </Flex>
);

export default ButtonIconCom;
