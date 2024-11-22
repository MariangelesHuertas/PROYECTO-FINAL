// steps.tsx
import React from 'react';

interface StepsProps {
  currentStep: 1 | 2 | 3 | 4;
}

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];

  return (
    <div className="flex space-x-1">
      {steps.map((step) => (
        <div
          key={step}
          className={`h-1 w-16 rounded-full ${step <= currentStep ? 'bg-blue3' : 'bg-gray2'}`}
        />
      ))}
    </div>
  );
};

export default Steps;
