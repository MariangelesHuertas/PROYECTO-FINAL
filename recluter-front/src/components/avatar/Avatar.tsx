import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import '../styles/avatar/Avatar.css';

interface AvatarProps {
  size: 'extra-small' | 'small' | 'medium' | 'extra-medium' | 'large' | 'extra-large';
  initials: string;
  status?: 'online' | 'offline' | 'busy';
  type?: number;
}

const sizeMap = {
  'extra-small': 24,
  'small': 32,
  'medium': 40,
  'extra-medium': 44,
  'large': 64,
  'extra-large': 80,
};

const Avatar: React.FC<AvatarProps> = ({ size, initials, status, type = 1 }) => {
  const avatarSize = sizeMap[size];

  const showStatusIndicator = [2, 3, 6, 7].includes(type);

  return (
    <div className={`avatar-wrapper type-${type}`} style={{ width: avatarSize, height: avatarSize }}>
      <AntAvatar
        size={avatarSize}
        style={{ fontSize: avatarSize / 3 }}
      >
        {type >= 5 ? initials : ''}
      </AntAvatar>
      {showStatusIndicator && <span className={`status-indicator type-${type}`} />}
    </div>
  );
};

export default Avatar;
