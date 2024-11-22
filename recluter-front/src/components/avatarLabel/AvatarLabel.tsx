import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import '../styles/avatarLabel/AvatarLabel.css';

interface AvatarLabelProps {
  size: 'small' | 'medium' | 'extra-medium' | 'large';
  title: string;
  subtitle: string;
  type?: number;
  textPosition?: 'left' | 'right';
}

const sizeMap = {
  'small': 32,
  'medium': 40,
  'extra-medium': 48,
  'large': 56,
};

const fontSizeMap = {
  'small': 'text-sm',
  'medium': 'text-base',
  'extra-medium': 'text-base',
  'large': 'text-lg',
};

const AvatarLabel: React.FC<AvatarLabelProps> = ({ size, title, subtitle, type = 1, textPosition = 'right' }) => {
  const avatarSize = sizeMap[size];
  const containerSize = avatarSize + 4; // Añadimos 4px para el box-shadow
  const fontSizeClass = fontSizeMap[size];

  return (
    <div className={`flex items-center avatar-label-wrapper text-${textPosition}`}>
      <div className={`avatar-wrapper type-${type}`} style={{ width: containerSize, height: containerSize }}>
        <AntAvatar
          size={avatarSize}
          style={{ fontSize: avatarSize / 3 }}
        >
        </AntAvatar>
        {[2, 3].includes(type) && <span className={`status-indicator type-${type}`} />}
      </div>
      <div className={`ml-4 ${fontSizeClass}`}>
        <div className="text-black font-medium">{title}</div>
        <div className="text-black opacity-36">{subtitle}</div>
      </div>
    </div>
  );
};

export default AvatarLabel;
