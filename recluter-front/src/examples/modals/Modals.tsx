import React from 'react';
import Modals from '../../components/modals/Modals';

const ModalsExample: React.FC = () => {
  return (
    <div className="flex justify-left bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-screen-lg">
        <Modals
          modal1Title="Invita a alguien a que haga una valoración"
          modal1ButtonText="Invita a alguien a que haga una valoración"
          modal2Title="Crea una alerta nueva"
          modal2ButtonText="Crea una alerta nueva"
          modal3Title="Te han invitado a dar una valoración"
          modal3ButtonText="Te han invitado a dar una valoración"
        />
      </div>
    </div>
  );
};

export default ModalsExample;
