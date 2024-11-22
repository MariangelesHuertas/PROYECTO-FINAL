// CustomRadio.tsx

import React from "react";
import { Radio as AntdRadio } from "antd";

// Define the types for the CustomRadio component props
type CustomRadioProps = {
  value: string; // Define the type for the value
  children: React.ReactNode; // Accept any React node as a child
};

const CustomRadio: React.FC<CustomRadioProps> = ({ value, children }) => {
  return (
    <>
      <AntdRadio value={value} className="radio-custom font-bold text-body-md">
        {children}
      </AntdRadio>
      <style>{`
        .radio-custom .ant-radio-inner {
          width: 20px; /* Increased width of the radio button */
          height: 20px; /* Increased height of the radio button */
          border-color: #E1E1E2; /* Border color of the radio */
          background-color: #F4F4F5;
          position: relative; /* Ensure relative positioning for inner dot */
        }

        .radio-custom .ant-radio-inner::after {
          width: 28px; /* Increased size of the inner dot */
          height: 28px; /* Increased size of the inner dot */
          top: 3px; /* Center the inner dot vertically */
          left: 3px; /* Center the inner dot horizontally */
         
          border-radius: 50%; /* Make sure the inner dot is circular */
          background-color: white; /* Color of the inner dot when selected */
        }

        .radio-custom:hover .ant-radio-inner {
          box-shadow: 0 0 0 3px #91C3FD; /* Blue shadow when hovered */
          border-color: #91C3FD;
        }

        .radio-custom .ant-radio-checked .ant-radio-inner {
          border-color: #0A6796; /* Border color when active */
          background-color: #0778b1; /* Background color when active */
        }

        .radio-custom:hover .ant-radio-checked .ant-radio-inner {
          box-shadow: 0 0 0 3px #91C3FD; /* Blue shadow when active and hovered */
          border-color: #91C3FD;
        }
      `}</style>
    </>
  );
};

export default CustomRadio;
