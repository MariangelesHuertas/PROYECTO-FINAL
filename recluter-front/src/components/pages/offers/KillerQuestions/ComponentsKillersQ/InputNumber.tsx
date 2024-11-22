import React from "react";
import { Input } from "antd";
import IconR from "../../../../../assets/icons/IconR.svg";
import IconL from "../../../../../assets/icons/IconL.svg";

const InputNumber = ({ value, onChange }: any) => {
  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleDecrease = () => {
    onChange(value - 1);
  };

  return (
    <div className="relative flex items-center">
      <Input
        value={value}
        className="custom-input-number2 w-[67px] h-[44px] text-center text-body-md text-green32"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <img alt="Decrease" className="absolute left-2 cursor-pointer ml-[-5px] w-[24px]" src={IconL} onClick={handleDecrease}/>
      <img  src={IconR} alt="Increase"
         className="absolute right-2 cursor-pointer mr-[-4px] w-[24px]"
         onClick={handleIncrease}/>
      
      <style>{`
        .custom-input-number2 {
          border-radius: 4px; /* Ajustar el borde del input */
          border: 1px solid white; /* Color del borde */
          --active-bg: #ffffff;
          --active-border-color: #006497;
          --active-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
          --addon-bg: rgba(0, 0, 0, 0.02);
          --hover-bg: #ffffff;
          --hover-border-color: #006497;
          --input-font-size: 14px;
          --padding-block: 4px;
          --padding-inline: 11px;
        }

        .custom-input-number2:hover {
          border: 2px solid #F4F4F5; 
          background-color: #F4F4F5;
        }

        .custom-input-number2:focus-within {
          border-color: var(--active-border-color);
          box-shadow: var(--active-shadow);
        }

        .custom-input-number2 input {
          font-size: var(--input-font-size);
          padding-block: var(--padding-block);
          padding-inline: var(--padding-inline);
        }

        .custom-input-number2 img {
          width: 16px; /* Asegúrate de que el tamaño sea adecuado */
          height: 16px;
          display: inline;
        }
      `}</style>
    </div>
  );
};

export default InputNumber;
