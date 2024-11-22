import React from 'react';

interface PortfolioProps {
  title: string;
  projects: {
    title: string;
    description: string;
    skills: string[];
    website?: string;
    mediaLinks?: string[];
  }[];
}

const Portfolio: React.FC<PortfolioProps> = ({ title, projects }) => {
  return (
    <div className="portfolio p-1">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex justify-between">
        {/* Columna izquierda */}
        <div className="w-1/2 pr-8">
          <h3 className="font-bold">Branding | Congreso Internacional de Género</h3>
          <p className="mt-2 text-sm">Logotipo, imagen corporativa y voz y tono del proyecto</p>
          <div className="text-gray-500 text-sm">Branding, género, logotipo, imagen corporativa</div>
          <a href="https://www.congresogeneroyeducacion.com" className="text-blue-500 text-sm">
            www.congresogeneroyeducacion.com
          </a>
        </div>
        {/* Columna derecha */}
        <div className="w-1/2 pl-8">
          <h3 className="font-bold">Título del proyecto</h3>
          <p className="mt-2 text-sm">Descripción</p>
          <div className="text-gray-500 text-sm">Habilidades</div>
          <a href="#" className="text-blue-500 text-sm">
            Sitio web
          </a>
          <div className="text-sm mt-2">
            <a href="#" className="text-blue-500">Imágenes</a> | <a href="#" className="text-blue-500">Videos</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
