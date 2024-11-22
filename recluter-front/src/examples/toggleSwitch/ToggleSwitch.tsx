import React from 'react';
import ToggleSwitchCom from '../../components/toggleSwitch/ToggleSwitch';
import Card from 'antd/es/card/Card';
import 'tailwindcss/tailwind.css';

const App: React.FC = () => {
  return (
    <Card title="Toggle Switch" className="rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Fila 1 */}
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="small" customClass="switch-small-1" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="default" customClass="switch-default-1" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="large" customClass="switch-large-1" />
        </div>
        {/* Fila 2 */}
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="small" customClass="switch-small-2" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="default" customClass="switch-default-2" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={true} size="large" customClass="switch-large-2" />
        </div>
        {/* Fila 3 */}
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="small" customClass="switch-small-3" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="default" customClass="switch-default-3" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="large" customClass="switch-large-3" />
        </div>
        {/* Fila 4 */}
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="small" customClass="switch-small-4" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="default" customClass="switch-default-4" />
        </div>
        <div className="flex justify-center">
          <ToggleSwitchCom defaultChecked={false} size="large" customClass="switch-large-4" />
        </div>
      </div>
    </Card>
  );
};

export default App;
