import { AppProps } from 'antd';
import React from 'react';
import ButtonTextCom from '../../components/button/ButtonText';
import Card from 'antd/es/card/Card';

const ButtonText: React.FC<AppProps> = () => {
  const buttons1 = [
    { type: 'link', label: 'Button',size:'small', textColor: '#006497', color: 'white' },
    { type: 'link', label: 'Button',size:'small', textColor: '#00715A', color: 'white' },
    { type: 'link', label: 'Button',size:'small', textColor: '#006497', color: 'white', underline: true },
    { type: 'link', label: 'Button',size:'small', textColor: '#00715A', color: 'white', underline: true },

  ];
  const buttons2 = [
    { type: 'link', label: 'Button', size:'small', textColor: '#1C82BC', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#00513F', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#1C82BC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'small', textColor: '#00513F', color: 'white', underline: true },

  ];
  const buttons3 = [
    { type: 'link', label: 'Button', size:'small', textColor: '#81BFEC', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#009275', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#81BFEC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'small', textColor: '#009275', color: 'white', underline: true },

  ];
  const buttons4 = [
    { type: 'link', label: 'Button', size:'small', textColor: '#006497', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'small', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'small', textColor: '#006497', color: 'white', border: '4px solid #81BFEC', underline: true },
    { type: 'link', label: 'Button', size:'small', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC', underline: true },

  ];
  const buttons5 = [
    { type: 'link', label: 'Button', size:'small', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'small', textColor: '#1A1A1A2E', color: 'white' },

  ];
  //MEDIANOS
  const buttons6 = [
    { type: 'link', label: 'Button',size:'middle', textColor: '#006497', color: 'white' },
    { type: 'link', label: 'Button',size:'middle', textColor: '#00715A', color: 'white' },
    { type: 'link', label: 'Button',size:'middle', textColor: '#006497', color: 'white', underline: true },
    { type: 'link', label: 'Button',size:'middle', textColor: '#00715A', color: 'white', underline: true },

  ];
  const buttons7 = [
    { type: 'link', label: 'Button', size:'middle', textColor: '#1C82BC', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#00513F', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#1C82BC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'middle', textColor: '#00513F', color: 'white', underline: true },

  ];
  const buttons8 = [
    { type: 'link', label: 'Button', size:'middle', textColor: '#81BFEC', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#009275', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#81BFEC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'middle', textColor: '#009275', color: 'white', underline: true },

  ];
  const buttons9 = [
    { type: 'link', label: 'Button', size:'middle', textColor: '#006497', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#006497', color: 'white', border: '4px solid #81BFEC', underline: true },
    { type: 'link', label: 'Button', size:'middle', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC', underline: true },

  ];
  const buttons10 = [
    { type: 'link', label: 'Button', size:'middle', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'middle', textColor: '#1A1A1A2E', color: 'white' },

  ];
  //GRANDES
  const buttons11 = [
    { type: 'link', label: 'Button',size:'large', textColor: '#006497', color: 'white' },
    { type: 'link', label: 'Button',size:'large', textColor: '#00715A', color: 'white' },
    { type: 'link', label: 'Button',size:'large', textColor: '#006497', color: 'white', underline: true },
    { type: 'link', label: 'Button',size:'large', textColor: '#00715A', color: 'white', underline: true },

  ];
  const buttons12 = [
    { type: 'link', label: 'Button', size:'large', textColor: '#1C82BC', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#00513F', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#1C82BC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'large', textColor: '#00513F', color: 'white', underline: true },

  ];
  const buttons13 = [
    { type: 'link', label: 'Button', size:'large', textColor: '#81BFEC', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#009275', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#81BFEC', color: 'white', underline: true },
    { type: 'link', label: 'Button', size:'large', textColor: '#009275', color: 'white', underline: true },

  ];
  const buttons14 = [
    { type: 'link', label: 'Button', size:'large', textColor: '#006497', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'large', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC' },
    { type: 'link', label: 'Button', size:'large', textColor: '#006497', color: 'white', border: '4px solid #81BFEC', underline: true },
    { type: 'link', label: 'Button', size:'large', textColor: '#00715A', color: 'white', border: '4px solid #81BFEC', underline: true },

  ];
  const buttons15 = [
    { type: 'link', label: 'Button', size:'large', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#1A1A1A2E', color: 'white' },
    { type: 'link', label: 'Button', size:'large', textColor: '#1A1A1A2E', color: 'white' },

  ];
  

  return (
    <>
      <Card title="Botones Small" bordered={true} >
        <ButtonTextCom buttons={buttons1} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons2} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons3} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons4} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons5} vertical={true} gap={20} />
      </Card>
      <Card title="Botones middle" bordered={true} >
        <ButtonTextCom buttons={buttons6} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons7} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons8} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons9} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons10} vertical={true} gap={20} />
      </Card>
      <Card title="Botones lange" bordered={true} >
        <ButtonTextCom buttons={buttons11} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons12} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons13} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons14} vertical={true} gap={20} />
        <br />
        <ButtonTextCom buttons={buttons15} vertical={true} gap={20} />
      </Card>
    </>
  );
};

export default ButtonText;

