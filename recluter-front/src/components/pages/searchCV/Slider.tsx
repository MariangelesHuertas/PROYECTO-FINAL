import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => (
  <Slider
    range={{ draggableTrack: true }}
    defaultValue={[1, 6]}  // Coloca los puntos en 1 y 6
    min={0}
    max={10}
    marks={{
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      10: '+10',
    }}
  />
);

export default App;
