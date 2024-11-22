import React from 'react';
import { Button } from 'antd';
import './estilos.css';  // Asegúrate de que no haya reglas en estilos.css que afecten la alineación

interface ButtonComProps {
  buttons: {
    // type: 'primary' | 'link' | 'dashed';
    type: string;
    danger?: boolean;
    ghost?: boolean;
    // size?: 'large' | 'middle' | 'small';
    size?: string;
    color?: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    href?: string;
    border?: string;
    textColor?: string;
    borderWidth?: string;
    fontWeight?: 'normal' | 'bold' | string;
    fontSize?: string;
    textAlign?: string; // Añadido soporte para textAlign personalizado
  }[];
  vertical?: boolean;
  gap?: string | number;
  className?: string;
}

const ButtonCom: React.FC<ButtonComProps> = ({
  buttons,
  vertical = false,
  gap,
  className
}) => (
  <div className={`button-container ${vertical ? 'flex-col' : 'flex-row'} ${className}`} style={{ gap }}>
    {buttons.map((button, index) => {
      const buttonProps: any = {
        type: button.type,
        danger: button.danger,
        ghost: button.ghost,
        onClick: button.onClick,
        style: {
          backgroundColor: button.color || 'transparent',  // Asegúrate de que el color de fondo esté como deseas
          border: button.border || '1px solid #81BFEC',
          borderWidth: button.borderWidth || '1px',
          borderRadius: '4px',
          // padding: '23px',
          height: '36px',
          width: '100%',  // Asegura que el botón ocupe todo el ancho disponible
          fontSize: button.fontSize || (button.size === 'large' ? '1.2rem' : button.size === 'middle' ? '1rem' : '0.8rem'),
          color: button.textColor || '#000',  // Default text color
          fontWeight: button.fontWeight || 'normal',
          textAlign: button.textAlign || 'left',
          justifyContent: button.textAlign || 'left',
        },
      };

      if (button.type === 'link' && button.href) {
        buttonProps.href = button.href;
      }

      return (
        <Button className={`principal-nav-notify-button ${className}`} key={index} {...buttonProps}>
          {button.label}
        </Button>
      );
    })}
  </div>
);

export default ButtonCom;
