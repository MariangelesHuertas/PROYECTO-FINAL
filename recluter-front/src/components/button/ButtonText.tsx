import React from 'react';
import { Button, Space } from 'antd';
import '../../styles/components/sidebar/SidebarOffers.css'

interface ButtonTextProps {
  buttons?: {
    // type: 'primary' | 'link' | 'dashed';
    type: string;
    danger?: boolean;
    ghost?: boolean;
    // size?: 'large' | 'middle' | 'small';
    size?: string;
    color?: string;
    textColor?: string;
    border?: string;
    underline?: boolean;
    label?: string;
    fontWeight?: 'normal' | 'bold' | number;
    fontSize?: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    href?: string;
    minHeight?: string; // New prop for controlling button height
  }[];
  vertical?: boolean;
  gap?: number;
  className?: string;
}

const ButtonText: React.FC<ButtonTextProps> = ({ buttons = [], vertical = false, gap = 0, className = "" }) => {
  if (!buttons || buttons.length === 0) {
    return null; // Render nothing if there are no buttons
  }

  return (
    <Space
      direction={vertical ? 'vertical' : 'horizontal'}
      size={gap}
      align="start"
      className='Space-Btn-Offer-ButtonText'
    >
      {buttons.map((button, index) => {
        const buttonProps: any = {
          type: button.type,
          size: button.size,
          onClick: button.onClick,
          style: {
            backgroundColor: button.color,
            border: button.border || 'none',
            textDecoration: button.underline ? 'underline' : undefined,
            textUnderlineOffset: '4px',
            color: button.textColor,
            fontWeight: button.fontWeight || 'normal',
            fontSize:
              button.fontSize ||
              (button.size === 'large'
                ? '1.2rem'
                : button.size === 'middle'
                  ? '1rem'
                  : '0.8rem'),
            width: '100%',
            textAlign: 'left',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            lineHeight: '1.5',
            padding: '',
            minHeight: button.minHeight || 'auto', // Use the provided minHeight or default to 'auto'
          },
        };

        if (button.href) {
          buttonProps.href = button.href;
        }

        return (
          <Button
            key={index}
            {...buttonProps}
            className={"m-0 p-0 w-100 " + className}
            title={button.label}
          >
            {button.label}
          </Button>
        );
      })}
    </Space>
  );
};

export default ButtonText;
