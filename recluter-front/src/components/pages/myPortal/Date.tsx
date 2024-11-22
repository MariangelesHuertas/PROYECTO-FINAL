import React, { useState, useEffect } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface CustomDatePickerProps {
  useInput?: boolean;
  onChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
  value: Dayjs | null;
  placeholder?: string;
  isCurrentlyWorking?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  useInput = false,
  onChange,
  value,
  placeholder = 'Selecciona una fecha',
  isCurrentlyWorking = false,
}) => {
  const [selectedDateString, setSelectedDateString] = useState('');
  const [currentDate, setCurrentDate] = useState(dayjs().utc(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs().utc(false));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isCurrentlyWorking) {
      onChange(value, currentDate);
    }
  }, [isCurrentlyWorking, value, onChange, currentDate]);

  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    const startDate = date ? dayjs(date).utc(false) : null;
    onChange(startDate, isCurrentlyWorking ? currentDate : null);
    setSelectedDateString(date ? date.format('MM/YYYY') : '');
  };

  return (
    <div className="flex items-center space-x-[30px]">
      <DatePicker
        onChange={handleDateChange}
        value={value}
        style={{
          width: '230px',
          height: '44px',
          borderRadius: '4px',
          borderColor: '#91c3fd',
          fontSize: '19px',
          fontWeight: 500,
        }}
        format="MM/YYYY"
        placeholder={placeholder}
        className="custom-date-picker p-2"
      />
      {useInput && (
        <Input
          value={currentDate.format('MM/YYYY')}
          readOnly
          style={{
            width: '230px',
            height: '44px',
            borderRadius: '4px 4px 0 0',
            borderBottom: '3px solid #999999',
            backgroundColor: '#E6E0E9',
            color: '#000',
            padding: '8px',
          }}
          placeholder="Fecha actual"
        />
      )}

      <style>
        {`
          .custom-date-picker .ant-picker-input > input {
            height: 100%;
            color: #000;
          }

          .custom-date-picker .ant-picker {
            width: 191px;
            height: 44px;
            border-radius: 4px;
            border-color: #91c3fd;
            padding: 0 10px;
            transition: all 0.2s ease;
          }

          .custom-date-picker .ant-picker:hover {
            border-color: #91c3fd;
          }

          .custom-date-picker .ant-picker-focused {
            border-color: #91c3fd;
            box-shadow: 0 0 0 2px rgba(145, 195, 253, 0.3);
          }
        `}
      </style>
    </div>
  );
};

export default CustomDatePicker;