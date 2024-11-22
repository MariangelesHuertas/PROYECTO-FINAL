import React from 'react';
import CustomButton from '../../components/dropdownInput/DropdownInput';

const AppExample: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto space-y-4"> {/* Tailwind class for vertical spacing */}
        <CustomButton
          content="Dropdown 1"
          backgroundColor="#FCFCFC"
          color="#5E5E5E"
          borderColor="#E1E1E2"
          borderWidth="1px"
          borderRadius="4px"
          iconColor="#A1A1AA"
          iconType="down"
        >
          <div>Custom dropdown content 1</div>
        </CustomButton>
        <CustomButton
          content="Dropdown 2"
          backgroundColor="#E1E1E2"
          color="#1A1A1A"
          borderColor="#E1E1E2"
          borderWidth="1px"
          borderRadius="12px"
          iconColor="#A1A1AA"
          iconType="down"
        >
          <div>Custom dropdown content 2</div>
        </CustomButton>
        <CustomButton
          content="Dropdown 3"
          backgroundColor="#FCFCFC"
          color="#1A1A1A"
          borderColor="#0778B1"
          borderWidth="2px"
          borderRadius="12px"
          iconColor="#A1A1AA"
          iconType="down"
        >
          <div>Custom dropdown content 3</div>
        </CustomButton>
        <CustomButton
          content="Dropdown 4"
          backgroundColor="#F4F4F5"
          color="#5E5E5E"
          borderColor="#0778B1"
          borderWidth="2px"
          borderRadius="12px"
          iconColor="#A1A1AA"
          iconType="up"
        >
          <div>Custom dropdown content 4</div>
        </CustomButton>
      </div>
    </div>
  );
};

export default AppExample;
