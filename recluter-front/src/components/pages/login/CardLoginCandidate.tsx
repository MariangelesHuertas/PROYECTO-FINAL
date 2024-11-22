import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import IconCandidate from '../../../assets/icons/IconCandidate.svg';
import IconArrow from '../../../assets/icons/IconArrow.svg';

const CardCandidate: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registerCandidate"); // Redirige a la vista del candidato
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <Card
        className={`shadow-md rounded-[12px] py-[1px] px-[20px] h-[127px] 
          bg-white hover:bg-blue3
          transition-colors duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={IconCandidate} alt="Candidate Icon" className="mr-4 w-[26px]" />
            <div className="max-w-[360px]">
              <h1 className={`font-semibold text-heading-sm text-black`}>
                Soy Candidato
              </h1>
              <p className={`text-body-sm font-medium text-gray-500 hover:text-gray-200`}>
                Por fin una plataforma que permite que tus referencias te ayuden a encontrar empleo.
              </p>
            </div>
          </div>
          <img src={IconArrow} alt="Arrow Icon" className={`w-[26px] text-gray-500 hover:text-white`} />
        </div>
      </Card>
    </div>
  );
};

export default CardCandidate;
