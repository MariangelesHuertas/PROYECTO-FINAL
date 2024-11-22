import { AppProps } from 'antd';
import React from 'react';
import { Card } from 'antd';
import LegendGroup from '../../components/legendGroup/LegendGroup';

const LegendGroupExample: React.FC<AppProps> = () => {
    const generateOptions = (count: number, baseLabel: string, color: string, size: string, padding:string, fontWeight: string | number) => {
        return Array.from({ length: count }, (_, index) => ({
            label: `${baseLabel}`,
            value: `${baseLabel}`,
            color,
            size,
            fontWeight,
            padding,
        }));
    };

    const options = [
        generateOptions(7, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(6, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(5, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(4, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(3, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(2, 'Label', '#5E5E5E', '14px', '500', '24px'),
        generateOptions(1, 'Label', '#5E5E5E', '14px', '500', '24px'),

        generateOptions(7, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(6, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(5, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(4, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(3, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(2, 'Label', '#5E5E5E', '16px', '500', '32px'),
        generateOptions(1, 'Label', '#5E5E5E', '16px', '500', '32px'),
    ];

    return (
        <Card title="Legend Group de checkbox" bordered={true}>
            {options.map((optionSet, index) => (
                <React.Fragment key={index}>
                    <LegendGroup options={optionSet} />
                    <br />
                </React.Fragment>
            ))}
        </Card>
    );
};

export default LegendGroupExample;
