import React from 'react';
import { Switch } from 'antd';
import 'tailwindcss/tailwind.css';
import '../styles/toggleSwitch/ToggleSwitch.css'; // Importa el archivo CSS para los estilos

interface SwitchComProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'small' | 'default' | 'large'; // Añadido el tamaño 'large'
  customClass?: string; // Propiedad para clase personalizada
}

const ToggleSwitchCom: React.FC<SwitchComProps> = ({
  defaultChecked = false,
  onChange,
  size = 'default',
  customClass = '',
}) => {
  let switchClass = '';
  switch (size) {
    case 'small':
      switchClass = 'switch-small';
      break;
    case 'default':
      switchClass = 'switch-default';
      break;
    case 'large':
      switchClass = 'switch-large';
      break;
    default:
      break;
  }

  return (
    <Switch
      defaultChecked={defaultChecked}
      onChange={onChange}
      className={`custom-switch ${switchClass} ${customClass}`}
    />
  );
};

export default ToggleSwitchCom;
