import React from 'react';
import { FilterOutlined, ThunderboltOutlined, StarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import IconAlert from '../../../../assets/icons/alerts.svg';
import '../../../styles/alertFilter/AlertFilter.css';

const { Option } = Select;

interface AlertFilterProps {
  newOffersCount: number;
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
  onCreateAlertClick,
  newOffersText = "Nuevas ofertas de que se adaptan a ti",
  createAlertText = "Crear nueva alerta",
}) => {
  return (
    <div className="alert-filter-container  text-center relative">
      <div className="alert-filter-header flex justify-between items-center mb-4">
        <span>
          <span className="text-[#006497] text-heading-sm font-bold">{newOffersCount}</span>
          <span className="text-black text-heading-sm font-bold"> {newOffersText}</span>
        </span>
        <button
          className="alert-create-button text-[#006497] flex items-center absolute mr-5 text-base font-semibold sm:text-md md:text-md"
          onClick={onCreateAlertClick}
        >
          <img src={IconAlert} className="mr-2 W-[24px]" />
          {createAlertText}
        </button>
      </div>
    </div>
  );
};

export default AlertFilter;
