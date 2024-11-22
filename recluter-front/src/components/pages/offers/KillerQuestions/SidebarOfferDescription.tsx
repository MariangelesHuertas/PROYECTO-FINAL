import React from 'react';
import { Layout } from 'antd';
import 'tailwindcss/tailwind.css';

const { Sider } = Layout;

interface OfferDescriptionProps {
  jobTitle: string;
  jobLocation: string;
  salaryRange: string;
  jobDetails: string[];
  skills: string[];
  keywords: string[];
  inDrawer?: boolean;
}

const OfferDescription: React.FC<OfferDescriptionProps> = ({
  jobTitle,
  jobLocation,
  salaryRange,
  jobDetails,
  skills,
  keywords,
  inDrawer = false,
}) => {
  return (
    <div className="flex min-h-screen">
      <Sider
        width={227}
        style={{ backgroundColor: '#fff'}}
        className={` ${
          inDrawer
            ? "p-[5px] border-none ml-[-10px] mt-[-15px]"
            :"p-[24px] rounded-lg shadow-lg border-2 border-sky-blue0"
          }`}
      >
        <h2 className="font-bold text-heading-md text-gray mb-[30px]">Descripción de la oferta</h2>
        <div className="mb-[20px]">
            <p className="font-bold text-caption text-gray">Puesto de trabajo</p>
            <p className="text-caption text-gray">{jobTitle}</p>
            <p className="text-caption text-gray">{jobLocation}</p>
            <p className="text-caption text-gray">{`Salario: ${salaryRange} (año)`}</p>
        </div>

        <div className="mb-[20px]">
          <h3 className="font-bold text-caption text-gray">Información sobre el puesto</h3>
          <ul className="text-caption text-gray">
            {jobDetails.map((detail, index) => (
              <h1 key={index}>{detail}</h1>
            ))}
          </ul>
        </div>

        <div className="mb-[20px]">
          <h3 className="font-bold text-caption text-gray">Aptitudes / Tecnología</h3>
          <ul className="text-caption text-gray">
            {skills.map((skill, index) => (
              <h1 key={index}>{skill}</h1>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-caption text-gray">Palabras clave</h3>
          <p className="text-caption text-gray">
            {keywords.join(", ")}
          </p>
        </div>
      </Sider>
    </div>
  );
};

export default OfferDescription;
