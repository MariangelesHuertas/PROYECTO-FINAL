import React from 'react';
import { Select } from 'antd';
import '../../../styles/alertFilter/AlertFilter.css';

const { Option } = Select;

interface FilterButtonsApplicationProps {
  categorias: { valor: string, etiqueta: string }[];
  alClicEnCategoria: (valor: string) => void;
}

const FilterButtonsApplication: React.FC<FilterButtonsApplicationProps> = ({
  categorias,
  alClicEnCategoria,
}) => {
  return (
    <div className="alert-filter-container mb-4 text-center">
      <h2 className="text-left font-bold text-[20px] mb-4 -mt-4">Candidaturas activas</h2>
      <div className="alert-filter-buttons">
        {categorias.map((categoria, indice) => (
          <button
            key={indice}
            className={`alert-filter-button mr-2 ${
              indice === 0 ? '!border-[#006497] text-[#006497]' : ''
            }`}
            onClick={() => alClicEnCategoria(categoria.valor)}
          >
            {categoria.etiqueta}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtonsApplication;
