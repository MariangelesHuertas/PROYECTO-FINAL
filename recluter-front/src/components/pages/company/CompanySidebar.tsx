import React from 'react';
import { Layout, Button } from 'antd';
import RatingBlue from '../../rating/RatingBlue'; // Asegúrate de ajustar la ruta
import 'tailwindcss/tailwind.css';

const { Sider } = Layout;

const CompanySidebar: React.FC = () => {
  return (
    <Sider 
      width={"100%"} 
      className="bg-white p-6 rounded-lg shadow-md border border-blue4"
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 255, 0.2)'}}
    >
      <div className="mb-[24px]">
        <h3 className="font-bold text-heading-x1 mb-3 text-gray">Empresas mejor valoradas del sector</h3>
        <ul className="mb-3">
          {[
            { name: 'Supercor', stars: 3 },
            { name: 'Condis', stars: 4 },
            { name: 'Eroski', stars: 5 },
            { name: 'Caprabo', stars: 1 },
            { name: 'Alcampo', stars: 3 },
          ].map((company) => (
            <li key={company.name} className="flex justify-between items-center mb-2">
              <span className='text-body-md font-medium text-gray'>{company.name}</span>
              <span className="flex justify-start">
                <RatingBlue 
                  filledStars={company.stars} 
                  totalStars={company.stars} 
                  filledStarSize={{ width: '15px', height: '15px', marginTop: '2px', marginRight: '4px' }} 
                  showRatingValue={false} // No mostrar el contador numérico
                />
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Button type="link" className="text-blue3 underline font-semibold text-body-sm">
            Ver todas
          </Button>
        </div>
      </div>

      <div className="mb-[24px]">
        <h3 className="font-bold text-heading-x1 mb-3 text-gray">Últimas ofertas de Supermercados Carrefour</h3>
        <ul className="mb-3">
          {[
            { title: 'Jefe de ventas', location: 'Madrid', time: '12 horas' },
            { title: 'Reponedor turno mañana', location: 'Ciudad Real', time: '9 días' },
            { title: 'Responsable de almacén', location: 'Ciudad Real', time: '2 días' },
          ].map((offer) => (
            <li key={offer.title} className="mb-4">
              <div className="w-[155px]">
                <span className="font-bold text-body-md">{offer.title}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-text-body-md font-medium">{offer.location}</p>
                <p className="text-body-md font-normal">{offer.time}</p>
              </div>
              <div className="border-t border-gray2 mt-2"></div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Button type="link" className="text-blue3 underline font-semibold text-body-sm">
            Ver todas
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-heading-x1 mb-3 text-gray">Empresas similares que te pueden interesar</h3>
        <ul className="mb-3">
          {[
            { name: 'Alcampo', offers: 16 },
            { name: 'Condis', offers: 9 },
            { name: 'Eroski', offers: 6 },
            { name: 'Supercor', offers: 5 },
            { name: 'Caprabo', offers: 3 },
          ].map((company) => (
            <li key={company.name} className="mb-1">
              <div className="flex justify-between items-center">
                <span className='font-medium text-body-md'>{company.name}</span>
                <Button type="link" className="p-0 text-blue3 font-medium text-caption">
                  {company.offers} ofertas
                </Button>
              </div>
              <div className="border-t border-gray2 -mt-1"></div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Button type="link" className="text-blue3 underline font-semibold text-body-sm">
            Ver todas
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default CompanySidebar;
