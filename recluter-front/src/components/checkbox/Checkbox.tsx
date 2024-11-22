import React from 'react';
import { Row, Col, Card, Space, Checkbox } from 'antd';

const CheckboxComponent: React.FC = () => {

  return (
    <Row gutter={[16, 16]} className="flex justify-center">
      <Col xs={24} sm={12} md={8} lg={8} xl={6}>
        <Card className="w-full p-4">
          <Row gutter={[16, 16]} className="mb-4">
          <Col span={24} sm={12} lg={8}>
    <Space direction="vertical">
      <Checkbox className="checkbox-custom-1" defaultChecked>
      </Checkbox>
      <style>
      {`
        .checkbox-custom-1 .ant-checkbox-wrapper {
          position: relative;
          background-color: #ffffff;
        }

        .checkbox-custom-1 .ant-checkbox-wrapper:hover .ant-checkbox-inner {
          border-color: #60A5FA; /* Celeste */
          border-width: 3px;
        }

        .checkbox-custom-1 .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #0778B1; /* Azul oscuro */
          border-color: #0778B1; /* Azul oscuro */
          
        }

        .checkbox-custom-1 .ant-checkbox-checked .ant-checkbox-inner:hover {
          background-color: #3B82F6; /* Azul claro */
          border-color: #3B82F6; /* Azul claro */
          border-width: 3px;
        }

        .checkbox-custom-1 .ant-checkbox-checked .ant-checkbox-inner::after {
          font-size: 24px; /* Ajusta el tamaño del checkmark */
          line-height: 32px; /* Ajusta la altura para centrar verticalmente */
          color: #ffffff;
        }

        .checkbox-custom-1 .ant-checkbox-inner {
          background-color: #F4F4F5; /* Plomo claro */
          border: 1px solid #E1E1E2; /* Plomo oscuro */
          box-sizing: border-box;
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 8px;
          border-collapse: separate;
          transition: all 0.3s;
        }

        .checkbox-custom-1 .ant-checkbox .ant-checkbox-inner:after {
          box-sizing: border-box;
          position: absolute;
          top: 49%;
          inset-inline-start: 32%;
          display: table;
          width: 5.90px;
          height: 9.80px;
          border: 2.5px solid #fff;
          border-top: 0;
          border-left: 0;
          border-inline-start: 0;
          border-radius: 1px;
        }
      `}
    </style>
    </Space>
  </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-2" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-2 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-2 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                    }

                    .checkbox-custom-2 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-2 .ant-checkbox-inner {
                    
                    box-sizing: border-box;
                    background-color: #F4F4F5;
                    border: 1px solid ##E1E1E2;
                    display: block;
                    width: 24px;
                    height: 24px;
                    border-radius: 9px;
                    border-collapse: separate;
                    transition: all 0.3s;
                    }
                    .checkbox-custom-2 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 30%;
                    display: table;
                    width: 6.90px;
                    height: 11.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-3" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-3 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-3 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                    }

                    .checkbox-custom-3 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-3 .ant-checkbox-inner {
                    box-sizing: border-box;
                    display: block;
                    width: 32px;
                    height: 32px;
                    background-color: #F4F4F5;
                    border: 2px solid ##E1E1E2;
                    border-radius: 11px;
                    border-collapse: separate;
                    transition: all 0.3s;
                    }
                    .checkbox-custom-3 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 28%;
                    display: table;
                    width: 7.714286px;
                    height: 17.142857px;
                    border: 3.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 2px;
                }
                  `}
                </style>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-4" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-4 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-4 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3px solid #91C3FD;
                      
                    }

                    .checkbox-custom-4 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-4 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 20px;
                      height: 20px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 8px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-4 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 49%;
                    inset-inline-start: 32%;
                    display: table;
                    width: 4.90px;
                    height: 8.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-5" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-5 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-5 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3px solid #91C3FD;
                      
                    }

                    .checkbox-custom-5 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-5 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 27px;
                      height: 27px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 9px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-5 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 49%;
                    inset-inline-start: 32%;
                    display: table;
                    width: 5.90px;
                    height: 10.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-6" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-6 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-6 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3.5px solid #91C3FD;
                      
                    }

                    .checkbox-custom-6 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-6 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 32px;
                      height: 32px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 11px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-6 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 28%;
                    display: table;
                    width: 7.714286px;
                    height: 17.142857px;
                    border: 3.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 2px;
                }
                  `}
                </style>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-7" defaultChecked>
                </Checkbox>
                <style>
                  {`
                  .checkbox-custom-7 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-7 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 8px;
                    }

                    .checkbox-custom-7 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 10px; /* Ancho del guion */
                        height: 2px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-7 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 20px;
                        height: 20px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 8px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
                    }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-8" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-8 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-8 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 8px;
                    }

                    .checkbox-custom-8 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 15px; /* Ancho del guion */
                        height: 3px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-8 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 24px;
                        height: 24px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 9px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
                    }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-9" defaultChecked>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-9 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-9 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 11px;
                    }

                    .checkbox-custom-9 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 18px; /* Ancho del guion */
                        height: 3px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-9 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 32px;
                        height: 32px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 11px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
                    }
                  `}
                </style>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-10" defaultChecked={false} >
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-10 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-10 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                    }

                    .checkbox-custom-10 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px;
                      line-height: 32px;
                      color: #ffffff;
                    }

                    .checkbox-custom-10 .ant-checkbox-inner {
                    background-color: #F4F4F5;
                    border: 1px solid ##E1E1E2;
                    box-sizing: border-box;
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-radius: 8px;
                    border-collapse: separate;
                    transition: all 0.3s;
                    }
                    .checkbox-custom-10 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 49%;
                    inset-inline-start: 32%;
                    display: table;
                    width: 5.90px;
                    height: 9.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-11" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-11 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-11 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                    }

                    .checkbox-custom-11 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-11 .ant-checkbox-inner {
                    
                    box-sizing: border-box;
                    background-color: #F4F4F5;
                    border: 1px solid ##E1E1E2;
                    display: block;
                    width: 24px;
                    height: 24px;
                    border-radius: 9px;
                    border-collapse: separate;
                    transition: all 0.3s;
                    }
                    .checkbox-custom-11 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 30%;
                    display: table;
                    width: 6.90px;
                    height: 11.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-12" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-12 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-12 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                    }

                    .checkbox-custom-12 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-12 .ant-checkbox-inner {
                    box-sizing: border-box;
                    display: block;
                    width: 32px;
                    height: 32px;
                    background-color: #F4F4F5;
                    border: 2px solid ##E1E1E2;
                    border-radius: 11px;
                    border-collapse: separate;
                    transition: all 0.3s;
                    }
                    .checkbox-custom-12 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 28%;
                    display: table;
                    width: 7.714286px;
                    height: 17.142857px;
                    border: 3.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 2px;
                }
                  `}
                </style>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-13" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-13 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-13 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3px solid #91C3FD;
                      
                    }

                    .checkbox-custom-13 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-13 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 20px;
                      height: 20px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 8px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-13 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 49%;
                    inset-inline-start: 32%;
                    display: table;
                    width: 4.90px;
                    height: 8.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-14" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-14 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-14 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3px solid #91C3FD;
                      
                    }

                    .checkbox-custom-14 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-14 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 27px;
                      height: 27px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 9px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-14 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 49%;
                    inset-inline-start: 32%;
                    display: table;
                    width: 5.90px;
                    height: 10.80px;
                    border: 2.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 1px;
                }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-15" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-15 .ant-checkbox-wrapper {
                      background-color: #ffffff;
                    }

                    .checkbox-custom-15 .ant-checkbox-checked .ant-checkbox-inner {
                      background-color: #0778B1;
                      border-color: #0778B1;
                      border: 3.5px solid #91C3FD;
                      
                    }

                    .checkbox-custom-15 .ant-checkbox-checked .ant-checkbox-inner::after {
                      font-size: 24px; /* Ajusta el tamaño del checkmark */
                      line-height: 32px; /* Ajusta la altura para centrar verticalmente */
                      color: #ffffff;
                    }

                    .checkbox-custom-15 .ant-checkbox-inner {
                      box-sizing: border-box;
                      display: block;
                      width: 32px;
                      height: 32px;
                      background-color: #F4F4F5;
                     border: 3px solid #91C3FD;
                      border-radius: 11px;
                      border-collapse: separate;
                      transition: all 0.3s;
                    }
                    .checkbox-custom-15 .ant-checkbox .ant-checkbox-inner:after {
                    box-sizing: border-box;
                    position: absolute;
                    top: 46%;
                    inset-inline-start: 28%;
                    display: table;
                    width: 7.714286px;
                    height: 17.142857px;
                    border: 3.5px solid #fff;
                    border-top:0;
                    border-left:0;
                    border-inline-start: 0;
                    border-radius: 2px;
                }
                  `}
                </style>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mb-4">
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-16" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                  .checkbox-custom-16 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-16 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 8px;
                    }

                    .checkbox-custom-16 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 10px; /* Ancho del guion */
                        height: 2px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-16 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 20px;
                        height: 20px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 8px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
                    }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-17" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-17 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-17 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 8px;
                    }

                    .checkbox-custom-17 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 15px; /* Ancho del guion */
                        height: 3px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-17 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 24px;
                        height: 24px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 9px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
                    }
                  `}
                </style>
              </Space>
            </Col>
            <Col span={24} sm={12} lg={8}>
              <Space direction="vertical">
                <Checkbox className="checkbox-custom-18" defaultChecked={false} disabled>
                </Checkbox>
                <style>
                  {`
                    .checkbox-custom-18 .ant-checkbox-wrapper {
                        background-color: #ffffff;
                    }

                    .checkbox-custom-18 .ant-checkbox-checked .ant-checkbox-inner {
                        background-color: #0778B1;
                        border-color: #0778B1;
                        border-radius: 11px;
                    }

                    .checkbox-custom-18 .ant-checkbox-checked .ant-checkbox-inner::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 18px; /* Ancho del guion */
                        height: 3px; /* Grosor del guion */
                        background-color: #ffffff; /* Color del guion */
                        display: block;
                        border-radius: 5px;
                    }

                    .checkbox-custom-18 .ant-checkbox-inner {
                        box-sizing: border-box;
                        display: block;
                        width: 32px;
                        height: 32px;
                        background-color: #D3D3D3;
                        border: 1px solid #D3D3D3;
                        border-radius: 11px; /* Ajusta el radio del borde */
                        position: relative; /* Añadido para posición relativa */
                        transition: all 0.3s; /* Transición suave */
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

export default CheckboxComponent;