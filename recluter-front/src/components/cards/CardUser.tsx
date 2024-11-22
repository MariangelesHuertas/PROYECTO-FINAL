import React from 'react';
import { Avatar, Card, Button } from 'antd';
import '../styles/cardUser/CardUser.css'; // Importar el archivo CSS

interface CardUserProps {
    title: string;
    description: string;
    name: string;
    buttonText: string;
    avatarSize?: number;
    width?: string;
    height?: string;
}

const CardUser: React.FC<CardUserProps> = ({
    title,
    description,
    name,
    buttonText,
    avatarSize = 40,
    width = '300px',  // Default width if not provided
    height = '400px',  // Default height if not provided
}) => {
    return (
        <Card
            className="relative shadow-md rounded-lg p-4 flex flex-col justify-between card-user"
            style={{ width, height }}
        >
            <div className="flex items-center mb-3">
                <Avatar className="bg-gray-200" style={{ marginLeft: '-20px', marginTop: '-25px' }} size={avatarSize} />
                <div className="text-lg text-black ml-4" style={{ fontWeight: 'bold', marginTop: '-25px', fontSize: '16px' }}>
                    {name}
                </div>
            </div>
            <div className="flex-grow">
                <div className="font-bold mb-2 text-xl text-black" style={{ fontSize: '20px', marginLeft: '-20px' }}>{title}</div>
                <div className="text-base text-gray-700" style={{ fontSize: '16px', marginLeft: '-20px' }}>{description}</div>
            </div>
            <Button
                type="primary"
                className="absolute bottom-4 right-4 rounded-lg bg-blue3 text-white"
                style={{ width: avatarSize * 2, height: avatarSize * 0.9, borderRadius: '12px' }}
            >
                {buttonText}
            </Button>
        </Card>
    );
};

export default CardUser;
