import React from 'react';
import Avatar from '../../../avatar/Avatar';
import video from '../../../../assets/icons/video.svg';
import more_horizontal from '../../../../assets/icons/more_horizontal.svg';
import one_star from '../../../../assets/icons/one_star.svg';
import photo_icon from '../../../../assets/icons/photo_icon.svg';
import attach_file from '../../../../assets/icons/attach_file.svg';
import gif_icon from '../../../../assets/icons/gif_icon.svg';
import emoji_icon from '../../../../assets/icons/emoji_icon.svg';
import '../../../styles/pages/myPortal/chatView/Scrollbar.css';

interface Message {
  text: string;
  date: string;
}

interface ChatMessagesProps {
  userName: string;
  userAvatar: string;
  userStatus: 'online' | 'offline';
  messages: Message[];
  onSendMessage?: (message: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  userName,
  userAvatar,
  userStatus,
  messages,
  onSendMessage,
}: any) => {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full ml-12 mr-12 pb-10 overflow-y-auto custom-scrollbar">
      <div className="flex items-center pl-2 border-none -ml-5">
        <Avatar
          size="medium"
          initials={userName.charAt(0)}
          status={userStatus}
          type={6}
        />
        <div className="ml-1 flex-1">
          <div className="text-lg font-semibold">{userName}</div>
        </div>
        <div className="flex space-x-4 mr-6">
          <img src={more_horizontal} alt="More" className="cursor-pointer" />
          <img src={video} alt="Video" className="cursor-pointer" />
          <img src={one_star} alt="Star" className="cursor-pointer" />
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-4 border-none h-[400px] mb-4">
        {messages.map((message: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="text-sm text-center" style={{ color: '#1A1A1A', opacity: 0.7 }}>
              {message.date}
            </div>
            <div className="text-base text-left">{message.text}</div>
          </div>
        ))}
      </div>

      {/* Input para escribir mensaje */}
      <div className="relative p-4">
        <textarea
          className="w-full max-w-[70%] h-20 resize-none border border-[#D9D9D9] rounded-lg p-4 focus:outline-none focus:ring-0"
          placeholder="Escriba un mensaje..."
          style={{
            backgroundColor: '#FFFFFF',
            color: '#B3B3B3',
            borderRadius: '8px',
            paddingLeft: '16px',
            paddingTop: '10px',
            height: '79px',
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />
        <div className="absolute right-[30%] mt-1 text-[#B3B3B3] text-sm">
          Pulsa intro para enviar
        </div>
        <div className="flex space-x-2 mt-2">
          <img src={photo_icon} alt="Photo" className="cursor-pointer" />
          <img src={attach_file} alt="Attach" className="cursor-pointer" />
          <img src={gif_icon} alt="GIF" className="cursor-pointer" />
          <img src={emoji_icon} alt="Emoji" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
