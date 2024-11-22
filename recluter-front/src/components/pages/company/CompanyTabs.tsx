import React from 'react';
import { TeamOutlined, UserOutlined, ShopOutlined, TagsOutlined } from '@ant-design/icons';

interface TabItem {
  // icon: React.ReactNode;
  icon: string;
  label: string;
  value: string;
}

interface CompanyTabsProps {
  tabs: TabItem[];
}

const CompanyTabs: React.FC<CompanyTabsProps> = ({ tabs }) => {
  return (
    <div className="bg-gray3 p-2 rounded shadow flex justify-center"> {/* Centrando los elementos */}
      <div className="flex space-x-8"> {/* Ajuste de espacio entre elementos */}
        {tabs.map((tab, index) => (
          <div key={index} className="flex flex-col items-center"> {/* Sin margen horizontal */}
            <div className="text-xl text-gray mb-1">
              <img src={tab.icon} />
            </div> {/* Reducir tamaño del icono y agregar margen inferior */}
            <span className="text-gray text-xs leading-tight">{tab.value} {tab.label}</span> {/* Reducir tamaño del texto */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyTabs;
