// src/examples/chartDonut/ChartDonutExample.tsx
import React from 'react';
import ChartDonut from '../../components/chartDonut/ChartDonut';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 200 },
];
const COLORS = ['#91D9FD', '#BEE9FE', '#386687', '#E0E4E7'];

const ChartDonutExample = () => {
  return (
    <div style={{ width: '100%', height: '10vh' }}>
      <ChartDonut 
        data={data} 
        // colors={COLORS} 
        styleType="default" 
      />
    </div>
  );
};

export default ChartDonutExample;
