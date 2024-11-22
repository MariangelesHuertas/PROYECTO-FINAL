import React from 'react';
import { Select } from 'antd';
import IconAlert from '../../../../assets/icons/alerts.svg';
import '../../../styles/alertFilter/AlertFilter.css';
import IconGPS from '../../../../assets/icons/IconGPS.svg';
import Filter from '../../../../assets/icons/Filter.svg';
import Valor from '../../../../assets/icons/Valoraciones.svg';

const { Option } = Select;

interface AlertFilterProps {
  newOffersCount: number;
  onFilterClick: () => void;
  onQuickApplyClick: () => void;
  onRatingsClick: (value: string) => void;
  onProvinceClick: (value: string) => void;
  onCreateAlertClick: () => void;
  newOffersText?: string;
  createAlertText?: string;
  filterButtonText?: string;
  quickApplyButtonText?: string;
  ratingsDefaultText?: string;
  provinceDefaultText?: string;
  ratingsOptions?: { value: string, label: string }[];
  provinceOptions?: { value: string, label: string }[];
}

const AlertFilter: React.FC<AlertFilterProps> = ({
  newOffersCount,
  onFilterClick,
  onQuickApplyClick,
  onRatingsClick,
  onProvinceClick,
  onCreateAlertClick,
  newOffersText = "Nuevas ofertas de que se adaptan a ti",
  createAlertText = "Crear nueva alerta",
  filterButtonText = "Todos los filtros",
  quickApplyButtonText = "Solicitudes rápidas",
  ratingsDefaultText = "Valoraciones",
  provinceDefaultText = "Provincia",
  ratingsOptions = [{ value: "ratings", label: "Valoraciones" }],
  provinceOptions = [{ value: "province", label: "Provincia" }]
}) => {
  return (
    <div className="alert-filter-container mb-4 text-center relative">
      <div className="alert-filter-header flex justify-between items-center mb-4">
        
        <span>
          <span className="text-[#006497] text-heading-sm font-bold">{newOffersCount}</span>
          <span className="text-black text-heading-sm font-bold"> {newOffersText}</span>
        </span>

        <button
          className="alert-create-button text-[#006497] font-semibold flex items-center absolute top-0 right-0 -mt-8 mr-0 text-base sm:text-md md:text-md"
          onClick={onCreateAlertClick}
        >
          <img src={IconAlert} className="mr-2 mt-1 W-[24px]" />
          {createAlertText}
        </button>
      </div>
      <div className="alert-filter-buttons flex justify-start space-x-4">
        <button className="alert-filter-button bg-[#FCFCFC] py-2 px-4 rounded border border-gray-300 flex items-center h-[44px] text-[16px] font-bold text-[#52525B]" onClick={onFilterClick}>
          <img src={Filter} width={24} height={24}  className="mr-2"/>
          {filterButtonText}
        </button>
        <button className="alert-filter-button bg-[#FCFCFC] py-2 px-4 rounded border border-gray-300 flex items-center h-[44px] text-[16px] font-bold text-[#52525B]" onClick={onQuickApplyClick}>
          {quickApplyButtonText}
        </button>
        <div className="alert-filter-select ant-select-selection-item relative inline-block bg-[#FCFCFC] py-2 px-4 rounded border border-gray-300 flex items-center h-[44px] text-[16px] font-bold text-[#52525B]">
        <img src={Valor} width={24} height={24}  className="mr-2"/>
          <Select
            className="bg-transparent appearance-none focus:outline-none custom-select-title-tabs"
            onChange={onRatingsClick}
            defaultValue={ratingsDefaultText}
            bordered={false}
          >
            {ratingsOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </div>
        <div className="alert-filter-select relative inline-block bg-[#FCFCFC] py-2 px-4 rounded border border-gray-300 flex items-center h-[44px] text-[16px] !font-bold text-[#52525B]">
        <img src={IconGPS} width={24} height={24}  className="mr-2"/>
          <Select
            className="bg-transparent appearance-none focus:outline-none custom-select-title-tabs"
            onChange={onProvinceClick}
            defaultValue={provinceDefaultText}
            bordered={false}
          >
            {provinceOptions.map(option => (
              <Option key={option.value} value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AlertFilter;
