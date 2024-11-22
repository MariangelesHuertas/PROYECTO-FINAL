import React from 'react';
import AvatarLabel from '../../components/avatarLabel/AvatarLabel';

const AvatarLabelExample: React.FC = () => {
  const sizes = ['small', 'medium', 'extra-medium', 'large'] as const;
  const types = [1, 2, 3, 4];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {types.map((type) => (
            <div key={type} className="space-y-4">
              {sizes.map((size) => (
                <AvatarLabel 
                  key={`${type}-${size}-right`} 
                  size={size}  
                  title="Name" 
                  subtitle="Caption" 
                  type={type} 
                  textPosition="right"
                />
              ))}
              {sizes.map((size) => (
                <AvatarLabel 
                  key={`${type}-${size}-left`} 
                  size={size}  
                  title="Name" 
                  subtitle="Caption" 
                  type={type} 
                  textPosition="left"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarLabelExample;
