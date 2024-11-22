import React, { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import '../styles/chartDonut/ChartDonut.css';

interface ChartDonutProps {
  data: { name: string; value: number }[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  styleType?: 'default' | 'type1' | 'type2';
  text?: string;
  label?: string;
  sections?: number; // Añadido para definir el número de secciones
  showContainer?: boolean; // Nueva prop para mostrar/ocultar el contenedor y el título
}

const predefinedColors = ['#91D9FD', '#BEE9FE', '#386687', '#E0E4E7', '#C4C4C4']; // Añadido color gris

const ChartDonut: FC<ChartDonutProps> = ({
  data,
  width = 400,
  height = 400,
  innerRadius = 48,
  outerRadius = 60,
  paddingAngle = 0,
  styleType = 'default',
  text = 'Text',
  label = 'Label',
  sections = 2, // Valor predeterminado de 2 secciones
  showContainer = true, // Valor predeterminado true para mostrar contenedor y título
}) => {
  const sectionData = data.slice(0, sections); // Limita los datos al número de secciones especificado
  const chartWidth = width;
  const chartHeight = height;
  const cx = chartWidth / 2;
  const cy = chartHeight / 2;

  const ChartContent = (
    <div className="flex flex-col items-center relative">
      <PieChart width={chartWidth} height={chartHeight}>
        <Pie
          data={sectionData}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={0}
          endAngle={360}
          fill="#8884d8"
          paddingAngle={paddingAngle}
          dataKey="value"
        >
          {sectionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={predefinedColors[index % predefinedColors.length]} />
          ))}
        </Pie>
      </PieChart>
      <div
        className={`chart-text absolute transform -translate-x-1/2 text-center pointer-events-none w-full ${
          styleType === 'default' ? 'text-black' : styleType === 'type1' ? 'text-[#91D9FD]' : 'text-[#BEE9FE]'
        }`}
        style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}
      >
        <span className="font-semibold text-base">{text}</span> <br />
        <span className="text-[#9BA4AD] font-normal text-xs mt-2">{label}</span>
      </div>
    </div>
  );

  if (showContainer) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">ChartDonut</h2>
          <div className="flex justify-center items-center w-full">{ChartContent}</div>
        </div>
      </div>
    );
  }

  return ChartContent;
};

export default ChartDonut;
