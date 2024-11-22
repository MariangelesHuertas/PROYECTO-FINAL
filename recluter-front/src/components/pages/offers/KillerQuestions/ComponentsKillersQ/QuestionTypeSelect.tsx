import React from 'react';
import { Select as AntdSelect } from 'antd'; // Importamos el componente Select de Ant Design
import { CaretDownOutlined } from '@ant-design/icons'; // Importamos el ícono de despliegue
import type { SelectProps } from 'antd'; // Importamos el tipo de props que usa el componente Select

interface CustomSelectProps extends SelectProps {
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
}

const Select: React.FC<CustomSelectProps> = ({ customClassName, ...props }) => {
  return (
    <AntdSelect
      {...props}
      showSearch={false} // Deshabilitamos la funcionalidad de búsqueda
      suffixIcon={<CaretDownOutlined style={{ color: '#A1A1AA', fontSize: '16px' }} />} // Personalizamos el ícono
      className={`
        select-1
        w-full 
        h-[44px]
        border 
        border-blue3
        rounded-[12px]
        transition-all 
        ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
      `}
      dropdownClassName="select-dropdown"
    />
  );
};

const { Option } = AntdSelect;

interface QuestionTypeSelectProps {
  onChange: (value: string) => void;
  defaultValue: string; // Nueva prop para el valor por defecto
}

const QuestionTypeSelect: React.FC<QuestionTypeSelectProps> = ({ onChange, defaultValue }) => {
  return (
    <>
      <Select
        className="w-full mb-4"
        defaultValue={defaultValue} // Establecemos el valor por defecto
        onChange={onChange}
        value={defaultValue} // Utilizamos el valor por defecto para el valor actual
      >
        <Option value={1}>Margen numérico</Option>
        <Option value={2}>Escala lineal</Option>
        <Option value={3}>Elegir opción</Option>
        <Option value={4}>Respuesta personalizada</Option>
        <Option value={5}>Diferentes casillas</Option>
      </Select>
      <style>
        {`
          .select-1 .ant-select-selector {
            border-radius: 11px; /* Más redondeado */
          }
          .select-1 .ant-select-selection-item {
            color: #5E5E5E; /* Color del texto seleccionado */
            font-size: 18px;
            font-weight: 500 !important;
          }
          /* Estilos para las opciones del desplegable */
          .select-dropdown .ant-select-item-option-content {
            color: black; /* Color del texto de las opciones */
            font-size: 18px;
            font-weight: 500 !important;
          }
          /* Estilo para la opción seleccionada en el menú desplegable */
          .select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
            background-color: white !important; /* Color de fondo para la opción seleccionada */
            border: 2px solid #006497;
          }
          /* Estilo para la opción en hover en el menú desplegable */
          .select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
            background-color: #F4F4F5; /* Color de fondo al pasar el mouse sobre la opción */
          }
        `}
      </style>
    </>
  );
};

export default QuestionTypeSelect;
