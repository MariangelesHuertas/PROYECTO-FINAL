import React, { useState } from 'react';
import Avatar from '../../../avatar/Avatar';
import '../../../styles/pages/myPortal/chatView/Scrollbar.css'; // Importa el archivo de estilos

interface ChatUser {
  name: string;
  status: 'online' | 'offline';
  selected?: boolean;
}

interface ChatSidebarProps {
  users: ChatUser[];
  onUserClick?: (user: ChatUser) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ users, onUserClick }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (user: ChatUser) => {
    setSelectedUser(user.name);
    onUserClick?.(user);
  };

  const getUserType = (status: 'online' | 'offline'): number => {
    return status === 'online' ? 6 : 7;
  };

  return (
    <div className="w-56 h-full ml-8 overflow-y-auto bg-white border-none custom-scrollbar">
      {users.map((user, index) => (
        <div
          key={index}
          onClick={() => handleUserClick(user)}
          className={`flex items-center p-2 cursor-pointer h-[48px] ${
            selectedUser === user.name ? '!bg-[#81BFEC]' : 'hover:bg-gray-100'
          }`}
        >
          <Avatar
            size="medium"
            initials={user.name.charAt(0)}
            status={user.status}
            type={getUserType(user.status)}
          />
          <div className="ml-1">
            <div className="text-[16px] font-medium">{user.name}</div>
          </div>
        </div>
      ))}
      {users.length > 10 && <div className="overflow-y-scroll"></div>}
    </div>
  );
};

export default ChatSidebar;
