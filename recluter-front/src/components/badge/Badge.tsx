import React from 'react';
import { Row, Col,Card, Space, Badge } from 'antd';

interface CustomBadgeProps {
    text: string;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ text }) => {
  return (
    <Row gutter={[16, 16]} className="flex justify-center p-4">
        <Col xs={24} lg={15}>
            <Card className="rounded-lg shadow-md p-4">
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-1" count={text} />
                <style>
                  {`
                    .badge-custom-1 .ant-badge-count {
                      background-color: #ffffff;
                      color: #000000;
                      border: 1.5px solid #D4D4D5;
                      font-size: 16px;
                      font-weight: 600;
                      width: 68px;
                      height: 28px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 12px; /* Más redondeado */
                      line-height: 24px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-2" count={text} />
                <style>
                {`
                    .badge-custom-2 .ant-badge-count {
                    background-color: #FED6A9;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 16px;
                    font-weight: 600; 
                    width: 66px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 24px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-3" count={text} />
                <style>
                {`
                    .badge-custom-3 .ant-badge-count {
                    background-color: #85EFAC;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 16px;
                    font-weight: 600;
                    width:66px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 24px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-4" count={text} />
                <style>
                {`
                    .badge-custom-4 .ant-badge-count {
                    background-color: #FFA0A0;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 16px;
                    font-weight: 600;
                    width:66px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 24px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-5" count={text} />
                <style>
                  {`
                    .badge-custom-5 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-6" count={text} />
                <style>
                {`
                    .badge-custom-6 .ant-badge-count {
                    background-color: #FDBA72;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-7" count={text} />
                <style>
                {`
                    .badge-custom-7 .ant-badge-count {
                    background-color: #4ADE80;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-8" count={text} />
                <style>
                {`
                    .badge-custom-8 .ant-badge-count {
                    background-color: #FF6565;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-9" count={text} />
                <style>
                {`
                    .badge-custom-9 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 3px solid #91C3FD;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-10" count={text} />
                <style>
                {`
                    .badge-custom-10 .ant-badge-count {
                    background-color: #FED6A9 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 3px solid #FB923C;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-11" count={text} />
                <style>
                {`
                    .badge-custom-11 .ant-badge-count {
                    background-color: #85EFAC !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 3px solid #16A249;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-12" count={text} />
                <style>
                {`
                    .badge-custom-12 .ant-badge-count {
                    background-color: #FFA0A0!important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 3px solid #DC2828;
                    color: #000000 !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-13" count={text} />
                <style>
                {`
                    .badge-custom-13 .ant-badge-count {
                    background-color: #0778B1 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;

                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-14" count={text} />
                <style>
                {`
                    .badge-custom-14 .ant-badge-count {
                    background-color: #FB923C !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-15" count={text} />
                <style>
                {`
                    .badge-custom-15 .ant-badge-count {
                    background-color: #16A249 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-16" count={text} />
                <style>
                {`
                    .badge-custom-16 .ant-badge-count {
                    background-color: #DC2828 !important;
                    width: 66px !important;
                    height: 28px !important;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 16px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 24px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            </Card>
        </Col>
        <Col xs={24} lg={15}>
            <Card className="rounded-lg shadow-md p-4">
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-1-1" count={text} />
                <style>
                  {`
                    .badge-custom-1-1 .ant-badge-count {
                      background-color: #ffffff;
                      color: #000000;
                      border: 1.5px solid #D4D4D5;
                      font-size: 18px;
                      font-weight: 600;
                      width: 72px;
                      height: 40px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 12px; /* Más redondeado */
                      line-height: 36px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-2-2" count={text} />
                <style>
                {`
                    .badge-custom-2-2 .ant-badge-count {
                    background-color: #FED6A9;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 18px;
                    font-weight: 600; 
                    width: 72px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 36px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-3-3" count={text} />
                <style>
                {`
                    .badge-custom-3-3 .ant-badge-count {
                    background-color: #85EFAC;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 18px;
                    font-weight: 600;
                    width: 72px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 36px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-4-4" count={text} />
                <style>
                {`
                    .badge-custom-4-4 .ant-badge-count {
                    background-color: #FFA0A0;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 18px;
                    font-weight: 600;
                    width: 72px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 36px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-5-5" count={text} />
                <style>
                  {`
                    .badge-custom-5-5 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-6-6" count={text} />
                <style>
                {`
                    .badge-custom-6-6 .ant-badge-count {
                    background-color: #FDBA72;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-7-7" count={text} />
                <style>
                {`
                    .badge-custom-7-7 .ant-badge-count {
                    background-color: #4ADE80;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-8-8" count={text} />
                <style>
                {`
                    .badge-custom-8-8 .ant-badge-count {
                    background-color: #FF6565;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 35px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-9-9" count={text} />
                <style>
                {`
                    .badge-custom-9-9 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 72px;
                    height: 40px;
                    border: 3px solid #91C3FD;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 33px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-10-1" count={text} />
                <style>
                {`
                    .badge-custom-10-1 .ant-badge-count {
                    background-color: #FED6A9 !important;
                    width: 72px;
                    height: 40px;
                    border: 3px solid #FB923C;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 33px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-11-1" count={text} />
                <style>
                {`
                    .badge-custom-11-1 .ant-badge-count {
                    background-color: #85EFAC !important;
                    width: 72px;
                    height: 40px;
                    border: 3px solid #16A249;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 33px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-12-1" count={text} />
                <style>
                {`
                    .badge-custom-12-1 .ant-badge-count {
                    background-color: #FFA0A0!important;
                    width: 72px;
                    height: 40px;
                    border: 3px solid #DC2828;
                    color: #000000 !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 33px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-13-1" count={text} />
                <style>
                {`
                    .badge-custom-13-1 .ant-badge-count {
                    background-color: #0778B1 !important;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;

                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-14-1" count={text} />
                <style>
                {`
                    .badge-custom-14-1 .ant-badge-count {
                    background-color: #FB923C !important;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-15-1" count={text} />
                <style>
                {`
                    .badge-custom-15-1 .ant-badge-count {
                    background-color: #16A249 !important;
                    width: 72px;
                      height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-16-1" count={text} />
                <style>
                {`
                    .badge-custom-16-1 .ant-badge-count {
                    background-color: #DC2828 !important;
                    width: 72px;
                    height: 40px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 18px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 36px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            </Card>
        </Col>
        <Col xs={24} lg={15}>
            <Card className="rounded-lg shadow-md p-4">
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-1-1-1" count={text} />
                <style>
                  {`
                    .badge-custom-1-1-1 .ant-badge-count {
                      background-color: #ffffff;
                      color: #000000;
                      border: 1.5px solid #D4D4D5;
                      font-size: 21px;
                      font-weight: 600;
                      width: 85px;
                      height: 52px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 12px; /* Más redondeado */
                      line-height: 46px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-2-2-2" count={text} />
                <style>
                {`
                    .badge-custom-2-2-2 .ant-badge-count {
                    background-color: #FED6A9;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 21px;
                    font-weight: 600; 
                    width: 85px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 46px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-3-3-3" count={text} />
                <style>
                {`
                    .badge-custom-3-3-3 .ant-badge-count {
                    background-color: #85EFAC;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 21px;
                    font-weight: 600;
                    width: 85px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 46px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-4-4-4" count={text} />
                <style>
                {`
                    .badge-custom-4-4-4 .ant-badge-count {
                    background-color: #FFA0A0;
                    color: #000000;
                    border: 1.5px solid #D4D4D5;
                    font-size: 21px;
                    font-weight: 600;
                    width: 85px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px; /* Más redondeado */
                    line-height: 46px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-5-5-5" count={text} />
                <style>
                  {`
                    .badge-custom-5-5-5 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                  `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-6-6-6" count={text} />
                <style>
                {`
                    .badge-custom-6-6-6 .ant-badge-count {
                    background-color: #FDBA72;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-7-7-7" count={text} />
                <style>
                {`
                    .badge-custom-7-7-7 .ant-badge-count {
                    background-color: #4ADE80;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    
                    }
                `}
                </style>
            </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
            <Space direction="vertical">
                <Badge className="badge-custom-8-8-8" count={text} />
                <style>
                {`
                    .badge-custom-8-8-8 .ant-badge-count {
                    background-color: #FF6565;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                `}
                </style>
            </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-9-9-9" count={text} />
                <style>
                {`
                    .badge-custom-9-9-9 .ant-badge-count {
                    background-color: #ededf1 !important;
                    width: 85px;
                    height: 52px;
                    border: 3px solid #91C3FD;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 43px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-10-1-1" count={text} />
                <style>
                {`
                    .badge-custom-10-1-1 .ant-badge-count {
                    background-color: #FED6A9 !important;
                    width: 85px;
                    height: 52px;
                    border: 3px solid #FB923C;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 43px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-11-1-1" count={text} />
                <style>
                {`
                    .badge-custom-11-1-1 .ant-badge-count {
                    background-color: #85EFAC !important;
                    width: 85px;
                    height: 52px;
                    border: 3px solid #16A249;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 43px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-12-1-1" count={text} />
                <style>
                {`
                    .badge-custom-12-1-1 .ant-badge-count {
                    background-color: #FFA0A0!important;
                    width: 85px;
                    height: 52px;
                    border: 3px solid #DC2828;
                    color: #000000 !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 43px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            <Row gutter={[16, 16]} className="mb-4">
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-13-1-1" count={text} />
                <style>
                {`
                    .badge-custom-13-1-1 .ant-badge-count {
                    background-color: #0778B1 !important;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;

                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-14-1-1" count={text} />
                <style>
                {`
                    .badge-custom-14-1-1 .ant-badge-count {
                    background-color: #FB923C !important;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-15-1-1" count={text} />
                <style>
                {`
                    .badge-custom-15-1-1 .ant-badge-count {
                    background-color: #16A249 !important;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                `}
                </style>
                </Space>
            </Col>
            <Col xs={24} sm={12} md={6} className="flex justify-center">
                <Space direction="vertical">
                <Badge className="badge-custom-16-1-1" count={text} />
                <style>
                {`
                    .badge-custom-16-1-1 .ant-badge-count {
                    background-color: #DC2828 !important;
                    width: 85px;
                    height: 52px;
                    border: 1.5px solid #D4D4D5;
                    color: #FFFFFF !important;
                    font-size: 21px;
                    font-weight: 600 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, border-color 0.3s ease;
                    border-radius: 12px;
                    line-height: 46px;
                    }
                `}
                </style>
                </Space>
            </Col>
            </Row>
            </Card>
        </Col>
    </Row>
  );
};

export default CustomBadge;
