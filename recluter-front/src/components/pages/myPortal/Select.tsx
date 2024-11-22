import React from 'react';
import { Select as AntdSelect } from 'antd'; // Importamos el componente Select de Ant Design
import type { SelectProps } from 'antd'; // Importamos el tipo de props que usa el componente Select
import IconDrop2 from "../../../assets/icons/IconN.svg";

interface CustomSelectProps extends SelectProps {
  customClassName?: string; // Prop para clases CSS personalizadas adicionales
}

const CustomSelect: React.FC<CustomSelectProps> & { Option: typeof AntdSelect.Option } = ({
  customClassName,
  ...props
}) => {
  return (
    <>
      <AntdSelect
        {...props}
        className={`
          w-full 
          h-[44px]
          border
          border-[#E1E1E2]
          placeholder:text-green22 
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
          text-[#5E5E5E]
          font-medium 
          text-heading-x1
          ${customClassName} // Añadimos cualquier clase CSS adicional pasada como prop
        `}
        dropdownClassName="select-dropdown"
        suffixIcon={<img src={IconDrop2} alt="Icon Line" className='w-[34px]' />} // Probar con solo una imagen para verificar
      />
      <style>
        {`
          .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
            color: #5E5E5E;
          }
        `}
      </style>
    </>
  );
};

CustomSelect.Option = AntdSelect.Option; // Definimos Option como parte de CustomSelect

export default CustomSelect;
