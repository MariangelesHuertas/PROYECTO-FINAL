import React, { useState } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

interface Option {
  label: string;
  value: string;
  color?: string;
  size?: string;
  padding?: string;
  fontWeight?: string | number;
}

interface LegendGroupProps {
  options: Option[];
  defaultCheckedList?: string[];
  onChange?: (checkedValues: string[]) => void;
}

const LegendGroup: React.FC<LegendGroupProps> = ({ 
  options = [], 
  defaultCheckedList = [],
  onChange
}) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const handleChange = (list: string[]) => {
    setCheckedList(list);
    if (onChange) {
      onChange(list);
    }
  };

  return (
    <CheckboxGroup
      options={options.map(option => ({
        label: (
          <span
            style={{
              color: option.color,
              fontSize: option.size,
              padding: option.padding,
              fontWeight: option.fontWeight,
            }}
          >
            {option.label} Estrellas
          </span>
        ),
        value: option.value,
      }))}
      value={checkedList}
      onChange={handleChange}
    />
  );
};

export default LegendGroup;