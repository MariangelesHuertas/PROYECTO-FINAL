import React, { useState } from 'react';
import edit_message from '../../../../assets/icons/edit_message.svg';
import search from '../../../../assets/icons/search.svg';

const ChatHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="m-2 ml-12 mr-12">
      <div className="flex items-center border-none pb-2">
        <div className="text-2xl mt-3 font-bold">Mensajes</div>
        <div className="relative flex items-center ml-4">
          <input
            type="text"
            placeholder="Buscar mensajes"
            className="border border-[#0778B1] w-[337px] h-[44px] rounded-xl ml-6 pl-4 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-[#0778B1]"
          />
          <img src={search} alt="Buscar" className="absolute right-2 text-gray-400 w-5 h-5" />
        </div>
        <img
          src={edit_message}
          alt="Edit"
          className="flex justify-between cursor-pointer ml-[755px]"
        />
      </div>

      <div className="border-b-2 border-[#E1E1E2] mt-4" />

      <div className="flex mt-2 mb-6">
        <div
          className={`mr-4 pb-2 cursor-pointer ${
            activeTab === 'todos'
              ? 'border-b-2 border-[#006497] text-[#0778B1] font-bold'
              : 'text-gray-500 font-medium'
          }`}
          onClick={() => setActiveTab('todos')}
        >
          Todos mis mensajes
        </div>
        <div
          className={`pb-2 cursor-pointer ${
            activeTab === 'noLeidos'
              ? 'border-b-2 border-[#006497] text-[#0778B1] font-bold'
              : 'text-gray-500 font-medium'
          }`}
          onClick={() => setActiveTab('noLeidos')}
        >
          No leídos
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
