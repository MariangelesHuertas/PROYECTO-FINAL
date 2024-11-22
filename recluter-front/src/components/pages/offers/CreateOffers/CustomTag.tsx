// CustomTag.tsx

import React from 'react';
import { Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface CustomTagProps {
  text: string;
  onClose?: () => void; // Función para manejar el cierre del tag
}

const CustomTag: React.FC<CustomTagProps> = ({ text, onClose }) => {
  return (
    <Tag
      closable
      onClose={onClose}
      closeIcon={
        <CloseOutlined
          style={{ fontSize: '16px', color: '#999', marginLeft: '9px' }}
        />
      } // Ícono de cerrar
      className="flex justify-between items-center px-3 py-1 mb-[15px] border border-gray2 rounded-[12px] shadow-sm bg-white"
    >
      <span className="text-black text-body-md font-semibold">{text}</span>
    </Tag>
  );
};

export default CustomTag;
