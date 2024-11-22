import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CheckboxC from "../../../../../components/checkbox/CheckboxProps"; // Asegúrate de que la ruta sea correcta

type CheckQuestionProps = {
  options: string[];
  onAddOption?: () => void; // Hacer que esta propiedad sea opcional
  showAddOption?: boolean;
};


const CheckQuestion: React.FC<CheckQuestionProps> = ({ options, onAddOption, showAddOption }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(options.length).fill(false));

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-3 mr-5">
            <CheckboxC
              value={0}
              className="mr-[-6px]"
              // checked={checkedItems[index]}
              // onChange={() => handleCheckboxChange(index)}
            />
            <span className="ml-1 font-bold text-body-md mr-[15px]">{option}</span>
          </div>
        ))}
      </div>
      {showAddOption && onAddOption && (
        <h1 className="mt-2 pl-[3px] text-gray cursor-pointer w-[240px]" onClick={onAddOption}>
          <PlusOutlined className="text-blue3 text-body-sm pr-[8px]" />
          Añadir nueva casilla
        </h1>
      )}
    </div>
  );
};


export default CheckQuestion;
