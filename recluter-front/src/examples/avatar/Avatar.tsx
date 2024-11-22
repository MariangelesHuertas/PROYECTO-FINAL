import React from 'react';
import Avatar from '../../components/avatar/Avatar';

const AvatarExample: React.FC = () => {
  const sizes = ['extra-small', 'small', 'medium', 'extra-medium', 'large', 'extra-large'] as const;
  const types = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex justify-center bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {types.map((type) => (
            <div key={type} className="flex flex-col items-center space-y-4">
              {sizes.map((size) => (
                <Avatar key={`${type}-${size}`} size={size} initials="DB" type={type} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarExample;
