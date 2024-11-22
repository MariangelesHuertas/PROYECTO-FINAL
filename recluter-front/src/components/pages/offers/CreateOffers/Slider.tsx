import React, { useState } from 'react';
import { Slider } from 'antd';

interface SliderProps {
  minLabel: string; // Etiqueta para el mínimo
  maxLabel: string; // Etiqueta para el máximo
  defaultValue?: number; // Valor por defecto
}

const App: React.FC<SliderProps> = ({ minLabel, maxLabel, defaultValue = 3 }) => {
  const [disabled] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full  mb-2 ">
        <span className="text-gray font-medium text-body-sm">{minLabel}</span>
        <span className="text-gray font-medium text-body-sm">{maxLabel}</span>
      </div>
      <div className='bg-[#F7F7F7] h-[44px]  content-center mb-[8px]'>
        <Slider
          disabled={disabled}
          defaultValue={defaultValue} 
          min={0}  // Mínimo ajustado a 0
          max={10} // Máximo ajustado a 10
          step={1} // Paso de 1 en 1
          trackStyle={{ backgroundColor: '#007AFF', height: 4 }} 
          railStyle={{ backgroundColor: '#E3E3E4', height: 4 }}
        />
      </div>
    </>
  );
};

export default App;
