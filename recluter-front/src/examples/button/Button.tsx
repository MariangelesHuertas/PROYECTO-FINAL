import React from 'react';
import { AppProps } from 'antd';
import ButtonCom from '../../components/button/Button';
import Card from 'antd/es/card/Card';


const Button: React.FC<AppProps> = () => {
    //, href: 'https://www.example.com'
    // onclick
    const buttons1 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'small', border: '1px solid #006497', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #D4D4D5', color: 'transparent', size: 'small', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'small', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#FDBCB4', size: 'small', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', textColor: '#00476D', size: 'small' },
    ];
    const buttons2 = [
        { type: 'primary', label: 'Button', color: '#1C82BC', size: 'small', border: '1px solid #006497', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'small', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '2px solid #006497', color: 'transparent', size: 'small', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#C7847B', size: 'small', textColor: '#FFFFFF' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', border: '1px solid #006497', textColor: '#FFFFFF', size: 'small' },
    ];
    const buttons3 = [
        { type: 'primary', label: 'Button', color: '#81BFEC', size: 'small', border: '1px solid #81BFEC', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: '#F4F4F5', size: 'small', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #81BFEC', color: 'transparent', size: 'small', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#EFCFCA', size: 'small', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'small' },
    ];
    const buttons4 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'small', border: '3px solid #81BFEC', rounded: true },
        { type: 'link', label: 'Button', border: '3px solid #81BFEC', color: 'transparent', size: 'small', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '3px solid #81BFEC', color: 'transparent', size: 'small', textColor: '#006497' },
        { type: 'link', label: 'Button', border: '3px solid #81BFEC', color: '#FDBCB4', size: 'small', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'small' },
    ];
    const buttons5 = [
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'small' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'small' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'small' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'small' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'small' , textColor:'#1A1A1A2E'},
    ];
    //MEDIANOS
    const buttons6 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'middle', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#FDBCB4', size: 'middle', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', textColor: '#00476D', size: 'middle' },
    ];
    const buttons7 = [
        { type: 'primary', label: 'Button', color: '#1C82BC', size: 'middle', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'middle', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#C7847B', size: 'middle', textColor: '#FFFFFF' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', textColor: '#FFFFFF', size: 'middle' },
    ];
    const buttons8 = [
        { type: 'primary', label: 'Button', color: '#81BFEC', size: 'middle', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'middle', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#EFCFCA', size: 'middle', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'middle' },
    ];
    const buttons9 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'middle', border: '4px solid #81BFEC', rounded: true },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: 'transparent', size: 'middle', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: 'transparent', size: 'middle', textColor: '#006497' },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: '#FDBCB4', size: 'middle', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'middle' },
    ];

    const buttons10 = [
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'middle' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'middle' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'middle' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'middle' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'middle' , textColor:'#1A1A1A2E'},
    ];

    // GRANDES
    const buttons11 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'large', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#FDBCB4', size: 'large', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', textColor: '#00476D', size: 'large' },
    ];
    const buttons12 = [
        { type: 'primary', label: 'Button', color: '#1C82BC', size: 'large', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: '#E1E1E2', size: 'large', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#C7847B', size: 'large', textColor: '#FFFFFF' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', textColor: '#FFFFFF', size: 'large' },
    ];
    const buttons13 = [
        { type: 'primary', label: 'Button', color: '#81BFEC', size: 'large', border: '1px solid #1890ff', rounded: true },
        { type: 'link', label: 'Button', border: '1px solid #E1E1E2', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '1px solid #006497', color: 'transparent', size: 'large', textColor: '#006497' },
        { type: 'link', label: 'Button', color: '#EFCFCA', size: 'large', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#1C82BC', border: '2px solid #00476D', textColor: '#FFFFFF', size: 'large' },
    ];
    const buttons14 = [
        { type: 'primary', label: 'Button', color: '#006497', size: 'large', border: '4px solid #81BFEC', rounded: true },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: 'transparent', size: 'large', textColor: '#1A1A1A' },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: 'transparent', size: 'large', textColor: '#006497' },
        { type: 'link', label: 'Button', border: '4px solid #81BFEC', color: '#FDBCB4', size: 'large', textColor: '#00476D' },
        { type: 'primary', label: ' Button', danger: true, color: '#81BFEC', border: '2px solid #00476D', textColor: '#00476D', size: 'large' },
    ];
    const buttons15 = [
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'large' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'large' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'large' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'large' , textColor:'#1A1A1A2E'},
        { type: 'link', label: 'Button', color: '#F4F4F5', size: 'large' , textColor:'#1A1A1A2E'},
    ];
    return (
        <>
            <Card title="Botones Small" bordered={true}>
                <ButtonCom buttons={buttons1} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons2} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons3} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons4} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons5} vertical={false} gap="10px" />
            </Card>
            <br />
            <Card title="Botones Small" bordered={true}>
                <ButtonCom buttons={buttons6} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons7} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons8} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons9} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons10} vertical={false} gap="10px" />
            </Card>
            <br />
            <Card title="Botones Small" bordered={true}>
                <ButtonCom buttons={buttons11} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons12} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons13} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons14} vertical={false} gap="10px" />
                <br />
                <ButtonCom buttons={buttons15} vertical={false} gap="10px" />
            </Card>
            </>
    );
};

export default Button;
