import React from 'react';
import { Card, Typography } from 'antd';
import CheckboxC from "../../components/checkbox/CheckboxProps";
import IconEdit from "../../assets/icons/EditP.svg";
import IconPdf from '../../assets/icons/iconpdf.svg';
import IconWord from '../../assets/icons/iconword.svg';
import "tailwindcss/tailwind.css";

const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;
const { Title, Text } = Typography;

interface CardPortfolioProps {
  icon?: React.ReactNode;
  projectName: string;
  projectDescription: string;
  projectDetails: string;
  skills: any[];  // Soft skills como un array de objetos
  website: string;
  showCheckbox?: boolean;
  showEditIcon?: boolean;
  onEditClick?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  archivos_portafolio: any[]; // Archivos como un array de objetos
}

const CardPortfolio: React.FC<CardPortfolioProps> = ({
  icon = <CheckboxC />,
  projectName,
  projectDescription,
  projectDetails,
  skills = [],
  website,
  showCheckbox = true,
  showEditIcon = false,
  onEditClick,
  isSelected = false,
  onSelect,
  archivos_portafolio = []
}) => {

  const renderFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return <img src={IconPdf} alt="PDF" className="w-6 h-6 mr-2" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <img src={IconWord} alt="Word" className="w-6 h-6 mr-2" />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return (
        <img
          src={`${API_BASE_URL_EXACT}/${fileName}`}
          alt="Imagen"
          className="w-24 h-24 object-cover mr-2"
        />
      );
    } else {
      return <span className="mr-2">Archivo</span>; // O un ícono genérico
    }
  };

  return (
    <>
      <Card
        className="w-[338px] h-auto p-6 shadow-xl rounded-none transition-shadow hover:shadow-2xl relative"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex items-start mb-3 mt-3">
          {showCheckbox && (
            <div className="mr-2" onClick={onSelect}>
              <CheckboxC checked={isSelected} />
            </div>
          )}
          <div>
            <Title level={4} className="-mt-5 font-bold text-[16px]">
              {projectName}
            </Title>
            <Text className="block text-[#52525B] font-bold">
              {projectDescription}
            </Text>
            <Text className="block text-[14px] text-[#52525B] font-medium">
              {projectDetails}
            </Text>

            {/* Mostrar las habilidades */}
            <Text className="block text-[#52525B] font-bold mb-2">Mis Habilidades:</Text>
            <ul className="list-disc ml-6 mb-4">
              {skills.map((skill: any) => (
                <li key={skill.id} className="text-[#52525B] font-medium text-[14px]">
                  {skill.soft_skills.soft_skill}
                </li>
              ))}
            </ul>

            {/* Mostrar los archivos del portafolio */}
            <Text className="block text-[#52525B] font-bold mb-2">Mis Archivos:</Text>
            <div className="flex flex-wrap gap-2">
              {archivos_portafolio.map((archivo: any) => (
                <div key={archivo.id} className="flex items-center">
                <li> {renderFileIcon(archivo.nombre_archivo)}
                  <span className="text-[#52525B] font-medium">
                    {archivo.titulo}
                  </span>
                  </li> 
                </div>
              ))}
            </div>

            {/* Enlace al sitio web */}
            <a
              href={website}
              className="text-[#52525B] font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: 'absolute', bottom: '15px' }}
            >
              {website}
            </a>
          </div>

          {/* Ícono de editar */}
          {showEditIcon && (
            <img
              src={IconEdit}
              alt="Edit"
              className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
              onClick={onEditClick}
            />
          )}
        </div>
      </Card>

      <style>{`
        .ant-card:not(.ant-card-bordered) {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.3s ease-in-out;
        }
        .ant-card:hover:not(.ant-card-bordered) {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 14px 28px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default CardPortfolio;
