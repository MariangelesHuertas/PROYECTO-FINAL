import React from 'react';

interface StepsProps {
  currentStep: 1 | 2;
}

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  const steps = [
    { step: 1, label: "Contacto, curriculum y portfolio" },
    { step: 2, label: "Killer questions" }
  ];

  return (
    <div>
      <div className="flex space-x-2">
        {steps.map(({ step }) => (
          <div
            key={step}
            className={`h-[4px] w-[369px] rounded-full ${step === currentStep ? 'bg-blue3' : 'bg-gray2'}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-[8px]">
        {steps.map(({ step, label }) => (
          <p
            key={step}
            className={`text-caption font-medium text-[#697386] ${step === 2 ? 'mr-[279px]' : ''}`}
          >
            {label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Steps;
