import React from 'react';
import { Checkbox } from 'antd';
import '../styles/checkboxProps/CheckboxProps.css';

interface StyledCheckboxProps {
  value?: number;
  children?: React.ReactNode;
  className?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
}

const StyledCheckbox: React.FC<StyledCheckboxProps> = ({ 
  value, 
  children, 
  className, 
  onChange, 
  checked 
}) => (
  <div className={className}>
    <Checkbox
      value={value}
      className="custom-checkbox"
      onChange={onChange}
      checked={checked}
    >
      {children}
    </Checkbox>
  </div>
);

export default StyledCheckbox;