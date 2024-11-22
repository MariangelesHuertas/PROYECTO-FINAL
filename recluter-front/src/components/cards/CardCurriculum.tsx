import React from 'react';
import { Card, Typography } from 'antd';
import "tailwindcss/tailwind.css";
import CustomRadio from '../../components/pages/myPortal/ButtonRdio';
import IconEdit from '../../assets/icons/EditP.svg';
import IconPdf from '../../assets/icons/iconpdf.svg';

const { Text } = Typography;

interface CardCurriculumProps {
  fileName: string;
  jobTitle: string;
  description: string;
  className?: string;
  onEdit?: () => void;
  showCustomRadio?: boolean;
  showEditIcon?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const CardCurriculum: React.FC<CardCurriculumProps> = ({
  fileName,
  jobTitle,
  description,
  className = '',
  onEdit,
  showCustomRadio = true,
  showEditIcon = false,
  isSelected = false,
  onSelect,
}) => {
  return (
    <Card
      className={`w-[250px] h-32 p-4 shadow-md rounded-none hover:shadow-lg transition-shadow flex relative ${className}`}
      bordered={false}
      bodyStyle={{ padding: 0, display: 'flex', alignItems: 'center' }}
    >
      {showEditIcon && (
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onEdit}>
          <img src={IconEdit} alt="Edit Icon" className="w-5 h-5" />
        </div>
      )}

      {showCustomRadio && (
        <div className="flex-shrink-0 -ml-4 mb-[68px]" onClick={onSelect}>
          <CustomRadio value={isSelected ? "Selected" : "Not Selected"}>
            {/* Puedes añadir contenido dentro del CustomRadio si es necesario */}
          </CustomRadio>
        </div>
      )}

      <div className="ml-[10px] mt-1">
        <span 
          className="text-body-md font-bold mb-4 text-[16px] max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap block"
          title={fileName}
        >
          {fileName}
        </span>
        <Text className="block text-[#52525B] font-medium text-[14px] mb-4">{jobTitle}</Text>
        <Text className="block text-[#52525B] font-medium text-[14px]">{description}</Text>
        <div
          style={{
            position: 'absolute',
            right: "10px",
            bottom: "10px"
          }}  
        >
          <img src={IconPdf} />
        </div>
      </div>
    </Card>
  );
};

export default CardCurriculum;