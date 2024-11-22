import React, { useState } from "react";
import Header from '../../../components/pages/principalNav/PrincipalNav';
import ChatSidebar from "../../../components/pages/myPortal/chatView/ChatSidebar";
import ChatHeader from "../../../components/pages/myPortal/chatView/ChatHeader";
import ChatMessages from "../../../components/pages/myPortal/chatView/ChatMessages";

interface User {
  name: string;
  status: 'online' | 'offline';
  avatar?: any;
  selected?: boolean;
}

interface Message {
  text: string;
  date: string;
}

const ChatView: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>({
    name: "David de Mercadona",
    status: "online",
    avatar: "https://via.placeholder.com/150"
  });

  const [messages, setMessages] = useState<Message[]>([
    { text: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum", date: "14 de Julio" },
    // Agrega más mensajes según sea necesario
  ]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Aquí puedes cargar los mensajes del usuario seleccionado
  };

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, date: new Date().toLocaleDateString() }]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header fijo en la parte superior */}
      <Header />

      {/* ChatHeader sobre el contenido */}
      {selectedUser && (
        <ChatHeader
        // title={selectedUser.name}
        // userAvatar={selectedUser.avatar}
        // userStatus={selectedUser.status}
        // onEditClick={() => console.log("Editar clic")}
        />
      )}

      {/* Contenido principal con el sidebar y la sección de mensajes */}
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          users={[
            { name: "David de Mercadona", status: "online" },
            { name: "Ana O.", status: "online" },
            { name: "Lucia de Eroski", status: "offline" },
            { name: "Antonio del corte ingles", status: "online" },
            { name: "Sofia de dia", status: "online" },
            { name: "Luciana de Mercadona", status: "offline" },
            { name: "Kevin P.", status: "online" },
            { name: "Rosa RRHH", status: "online" },
            { name: "Juan Pablo de Eroski", status: "offline" },
            // Agrega más usuarios según sea necesario
          ]}
          onUserClick={handleUserClick}
        />

        <div className="flex flex-col flex-1 border-none">
          <ChatMessages
            userName={selectedUser.name}
            userAvatar={selectedUser.avatar}
            userStatus={selectedUser.status}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
