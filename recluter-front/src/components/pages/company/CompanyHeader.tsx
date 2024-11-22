import React from 'react';
import BannerCompany from '../../../assets/img/company/banner_example.png';

const 
CompanyHeader: React.FC = () => {
  return (
    <div 
      className="h-[293px] bg-blue3 flex justify-end items-start px-4 mx-6 pb-4 mb-4"
      style={{
        backgroundImage: "url("+BannerCompany+")",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* <button className="bg-gray4 text-black px-4 py-2 rounded-full mr-2 shadow-md hover:bg-white">
        Alerta sobre esta empresa
      </button>
      <button className="bg-gray4 text-black px-4 py-2 rounded-full shadow-md hover:bg-white">
        Valorar empresa
      </button> */}
    </div>
  );
};

export default CompanyHeader;
