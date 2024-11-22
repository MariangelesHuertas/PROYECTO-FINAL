// SortingOptions.tsx
import React, { useState } from "react";

interface SortingOptionsProps {
  onSelect: (option: string) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("RECOMENDACIÓN IA");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const getOptionClass = (option: string) => 
    selectedOption === option ? "text-[#00476D]" : "text-green32";

  return (
    <div className="mb-4">
      <span className="font-bold text-green32 text-caption">Ordenado por:</span>
      <div className="">
        {["RECOMENDACIÓN IA", "VALORACIONES", "FECHA DE INSCRIPCIÓN"].map(
          (option, index) => (
            <React.Fragment key={option}>
              <span
                className={`font-bold cursor-pointer ${getOptionClass(option)} text-caption`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </span>
              {index < 2 && (
                <span className="font-bold text-black text-xs mx-[8px]">|</span>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default SortingOptions;
