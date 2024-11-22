
import { PlusOutlined, DownSquareOutlined, BorderOutlined } from '@ant-design/icons'; // Importa los íconos necesarios
import { AppProps } from 'antd';
import React from 'react';
import Card from 'antd/es/card/Card';
import ButtonIconCom from '../../components/button/ButtonIcon';
import { icons } from 'antd/es/image/PreviewGroup';


const Button: React.FC<AppProps> = () => {
  //, href: 'https://www.example.com'
  // onclick
  const buttons1 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'small', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'small', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'small', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#FDBCB4', size: 'small', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', textColor: '#00476D', size: 'small' },
  ];
  const buttons2 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#1C82BC', size: 'small', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'small', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'small', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#C7847B', size: 'small', textColor: '#FFFFFF' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', textColor: '#FFFFFF', size: 'small' },
  ];
  const buttons3 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#81BFEC', size: 'small', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'small', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'small', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#EFCFCA', size: 'small', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'small' },
  ];
  const buttons4 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'small', border: '4px solid #81BFEC', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'small', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'small', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: '#FDBCB4', size: 'small', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'small' },
  ];

  const buttons5 = [
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'small', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'small', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'small', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'small', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'small', textColor: '#1A1A1A2E' },
  ];
  //MEDIANOS
  const buttons6 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'middle', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#FDBCB4', size: 'middle', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', textColor: '#00476D', size: 'middle' },
  ];
  const buttons7 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#1C82BC', size: 'middle', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'middle', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#C7847B', size: 'middle', textColor: '#FFFFFF' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', textColor: '#FFFFFF', size: 'middle' },
  ];
  const buttons8 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#81BFEC', size: 'middle', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#EFCFCA', size: 'middle', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'middle' },
  ];
  const buttons9 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'middle', border: '4px solid #81BFEC', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'middle', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: '#FDBCB4', size: 'middle', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'middle' },
  ];
  const buttons10 = [
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'middle', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'middle', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'middle', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'middle', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'middle', textColor: '#1A1A1A2E' },
  ];
  // GRANDES
  const buttons11 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'large', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#FDBCB4', size: 'large', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', textColor: '#00476D', size: 'large' },
  ];
  const buttons12 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#1C82BC', size: 'large', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'large', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#C7847B', size: 'large', textColor: '#FFFFFF' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', textColor: '#FFFFFF', size: 'large' },
  ];
  const buttons13 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#81BFEC', size: 'large', border: '1px solid #1890ff', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #E1E1E2', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, color: '#EFCFCA', size: 'large', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'large' },
  ];
  const buttons14 = [
    { type: 'primary', icon: <BorderOutlined />, color: '#006497', size: 'large', border: '4px solid #81BFEC', rounded: true },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: 'transparent', size: 'large', textColor: '#006497' },
    { type: 'link', icon: <BorderOutlined />, border: '4px solid #81BFEC', color: '#FDBCB4', size: 'large', textColor: '#00476D' },
    { type: 'primary', icon: <BorderOutlined />, danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'large' },
  ];
  const buttons15 = [
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'large', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'large', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'large', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'large', textColor: '#1A1A1A2E' },
    { type: 'link', icon: <BorderOutlined />, color: '#F4F4F5', size: 'large', textColor: '#1A1A1A2E' },
  ];
  return (
    <>
      <Card title="Botones Small" bordered={true}>
        <ButtonIconCom buttons={buttons1} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons2} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons3} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons4} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons5} vertical={false} gap="10px" />

      </Card>
      <br />
      <Card title="Botones Small" bordered={true}>
        <ButtonIconCom buttons={buttons6} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons7} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons8} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons9} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons10} vertical={false} gap="10px" />
      </Card>
      <br />
      <Card title="Botones Small" bordered={true}>
        <ButtonIconCom buttons={buttons11} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons12} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons13} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons14} vertical={false} gap="10px" />
        <br />
        <ButtonIconCom buttons={buttons15} vertical={false} gap="10px" />
      </Card>
    </>
  );
};

export default Button;

