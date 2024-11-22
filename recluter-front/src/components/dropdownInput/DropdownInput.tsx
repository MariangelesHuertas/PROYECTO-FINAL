import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';

interface CustomButtonProps {
  content?: string;
  color?: string;
  backgroundColor?: string;
  size?: 'large' | 'middle' | 'small';
  borderColor?: string;
  borderWidth?: string;
  iconColor?: string;
  expandedIconColor?: string;
  borderRadius?: string;
  iconType?: 'up' | 'down';
  children?: React.ReactNode;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  content = 'Text',
  color = '#000',
  backgroundColor = '#FFF',
  size = 'middle',
  borderColor = '#000',
  borderWidth = '1px',
  iconColor = 'blue',
  expandedIconColor = 'blue',
  borderRadius = '4px',
  iconType = 'down',
  fontSize = '16px',
  fontWeight = 'bold',
  children,
}) => {
  const { token } = theme.useToken();

  // Define panel style for Collapse
  const panelStyle: React.CSSProperties = {
    marginBottom: 0,
    background: backgroundColor,
    borderRadius: borderRadius,
    padding: 0,
    overflow: 'hidden',
  };

  // Define Collapse items
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className="flex justify-between items-center w-full"
          style={{
            color,
            fontSize,
            fontWeight,
            height: '14px', // Adjust height as needed
            padding: '0 16px',
          }}
        >
          {content}
          {iconType === 'down' ? (
            <CaretDownOutlined
              style={{
                color: iconColor,
                fontSize: '16px', // Adjust font size of icon if necessary
              }}
            />
          ) : (
            <CaretUpOutlined
              style={{
                color: iconColor,
                fontSize: '16px', // Adjust font size of icon if necessary
              }}
            />
          )}
        </div>
      ),
      children: (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '10px 16px',
            borderTop: `${borderWidth} solid ${borderColor}`, // Ensures separation between header and content
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          }}
        >
          {children || 'Contenido desplegable aquí'}
        </div>
      ),
      style: panelStyle,
    },
  ];

  return (
    <div className="w-full"> {/* Use margin-bottom here for spacing between dropdowns */}
      <Collapse
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) => null} // Remove the default Ant Design icon
        items={items}
        style={{
          border: `${borderWidth} solid ${borderColor}`,
          borderRadius: borderRadius,
          marginBottom: '8px', // Add margin bottom for spacing between dropdowns
        }}
      />
    </div>
  );
};

export default CustomButton;
