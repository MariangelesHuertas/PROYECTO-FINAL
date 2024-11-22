import React from "react";
import { Radio as AntdRadio } from "antd";

type CustomRadioProps = {
  value?: string; // Define the type for the value
  children?: React.ReactNode; // Accept any React node as a child
};

const CustomRadio: React.FC<CustomRadioProps> = ({ value, children }) => {
  return (
    <>
      <AntdRadio value={value} className="radio-custom font-bold ml-[35px] text-body-md">
        {children}
      </AntdRadio>
      <style>{`
        .radio-custom .ant-radio-inner {
          width: 20px; /* Increased width of the radio button */
          height: 20px; /* Increased height of the radio button */
          border-color: #757575; /* Border color of the radio */
          background-color: white;
          position: relative; /* Ensure relative positioning for inner dot */
        }

        .radio-custom .ant-radio-inner::after {
          width: 28px; /* Increased size of the inner dot */
          height: 28px; /* Increased size of the inner dot */
          top: 2px; /* Center the inner dot vertically */
          left: 2px; /* Center the inner dot horizontally */
         
          border-radius: 50%; /* Make sure the inner dot is circular */
          background-color: #0A6796; /* Color of the inner dot when selected */
        }

        .radio-custom:hover .ant-radio-inner {
          box-shadow: 0 0 0 3px #91C3FD; /* Blue shadow when hovered */
          border-color: #91C3FD;
        }

        .radio-custom .ant-radio-checked .ant-radio-inner {
          border-color: #0A6796; /* Border color when active */
          background-color: white; /* Background color when active */
          border-width: 2px;
        }

        .radio-custom:hover .ant-radio-checked .ant-radio-inner {
          box-shadow: 0 0 0 1px #91C3FD; /* Blue shadow when active and hovered */
          border-color: #0A6796;
        }
      `}</style>
    </>
  );
};

export default CustomRadio;
