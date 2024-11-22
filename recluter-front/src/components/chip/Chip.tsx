import React from 'react';
import { Row, Col,Card, Space, Switch, Button } from 'antd';

const Chip: React.FC = () => {

  return (
    <Row gutter={[16, 16]} className="flex justify-center p-4">
        <Col xs={24} lg={15}>
            <Card className="rounded-lg shadow-md p-4">
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-1">
                    Label
                  </Button>
                  <style>
                    {`
                      .button-custom-1 {
                        background-color: #ffffff !important;
                        width: 70px !important;
                        height: 36px !important;
                        border: 1px solid #D9D9D9;
                        color: #000000 !important;
                        font-size: 17px;
                        font-weight: 600 !important;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background-color 0.3s ease, border-color 0.3s ease;
                        border-radius: 18px; /* Más redondeado */
                      }

                      .button-custom-1:hover, .button-custom-1:focus, .button-custom-1:active {
                        background-color: #ffffff !important;
                        border-color: #D9D9D9 !important;
                        color: #000000 !important;
                        }
                    `}
                  </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-2"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-2 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-2 {
                            background-color: #ffffff !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-2 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-2.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-2 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-2 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-2 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12} md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-3"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-3 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-3 {
                            background-color: #ffffff !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-3 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-3.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-3 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-3 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-3 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-4">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-4 {
                      background-color: #ededf1 !important;
                      width: 70px !important;
                      height: 36px !important;
                      border: 1px solid #D9D9D9;
                      color: #000000 !important;
                      font-size: 17px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 18px;
                    }

                    .button-custom-4:hover, .button-custom-4:focus, .button-custom-4:active {
                      background-color: #ededf1 !important;
                      border-color: #D9D9D9 !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-5"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-5 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-5 {
                            background-color: #ededf1 !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            border-radius: 18px; /* Ajustar el borde según sea necesario */
                            
                        }

                        .switch-custom-5 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-5.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-5 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-5 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-5 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-6"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-6 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-6 {
                            background-color: #ededf1 !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-6 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-6.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-6 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-6 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-6 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-7">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-7 {
                      background-color: #ededf1 !important;
                      width: 70px !important;
                      height: 36px !important;
                      border: 3px solid #91C3FD;
                      color: #000000 !important;
                      font-size: 17px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 28px;
                    }

                    .button-custom-7:hover, .button-custom-7:focus, .button-custom-7:active {
                      background-color: #ededf1 !important;
                      border-color: #91C3FD !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-8"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-8 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-8 {
                            background-color: #ededf1 !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-8 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-8.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-8 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-8 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-8 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-9"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-9 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-9 {
                            background-color: #ededf1 !important;
                            width: 92px !important;
                            height: 36px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            border-radius: 28px; /* Ajustar el borde según sea necesario */
                            
                        }

                        .switch-custom-9 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-9.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-9 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-9 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-9 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 17px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-10">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-10 {
                      background-color: #0778B1 !important;
                      width: 70px !important;
                      height: 36px !important;
                      border: none;
                      color: #FFFFFF !important;
                      font-size: 17px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 18px;
                    }

                    .button-custom-10:hover, .button-custom-10:focus, .button-custom-10:active {
                      background-color: #1890ff !important;
                      border-color: #1890ff !important;
                      color: #FFFFFF !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-11"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-11 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-11 {
                        background-color: #0778B1 !important;
                        width: 92px !important;
                        height: 36px !important;
                        }

                        .switch-custom-11 .ant-switch-handle {
                        width: 20px !important;
                        height: 20px !important;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10px; 
                        transition: left 0.3s ease;
                        }

                        .switch-custom-11.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-11 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-11 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-11 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 17px;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-12"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-12 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-12 {
                        background-color: #0778B1 !important;
                        width: 92px !important;
                        height: 36px !important;
                        }

                        .switch-custom-12 .ant-switch-handle {
                        width: 20px !important;
                        height: 20px !important;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10px; 
                        transition: left 0.3s ease;
                        }

                        .switch-custom-12.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-12 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .ant-switch .ant-switch-inner .ant-switch-inner-checked, .ant-switch .ant-switch-inner .ant-switch-inner-unchecked {
                          display: block;
                          color: #c93333;
                          font-size: 17px;
                          transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                          pointer-events: none;
                          min-height: 22px;
                        }
                        .switch-custom-12 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-12 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 17px;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
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
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-1-1">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-1-1 {
                      background-color: #ffffff !important;
                      width: 84px !important;
                      height: 44px !important;
                      border: 1px solid #D9D9D9;
                      color: #000000 !important;
                      font-size: 19px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px; /* Más redondeado */
                    }

                    .button-custom-1-1:hover, .button-custom-1-1:focus, .button-custom-1-1:active {
                      background-color: #ffffff !important;
                      border-color: #D9D9D9 !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-2-2"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-2-2 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-2-2 {
                            background-color: #ffffff !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-2-2 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-2-2.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-2-2 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-2-2 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-2-2 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-3-3"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-3-3 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-3-3 {
                            background-color: #ffffff !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-3-3 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-3-3.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-3-3 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-3-3 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-3-3 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-4-4">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-4-4 {
                      background-color: #ededf1 !important;
                      width: 84px !important;
                      height: 44px !important;
                      border: 1px solid #D9D9D9;
                      color: #000000 !important;
                      font-size: 17px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px;
                    }

                    .button-custom-4-4:hover, .button-custom-4-4:focus, .button-custom-4-4:active {
                      background-color: #ededf1 !important;
                      border-color: #D9D9D9 !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-5-5"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-5-5 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-5-5 {
                            background-color: #ededf1 !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-5-5 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-5-5.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-5-5 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-5-5 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-5-5 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-6-6"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-6-6 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-6-6 {
                            background-color: #ededf1 !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-6-6 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-6-6.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-6-6 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-6-6 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-6-6 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-7-1">
                    Label
                  </Button>
                <style>
                  {`
                    .button-custom-7-1 {
                      background-color: #ededf1 !important;
                      width: 84px !important;
                      height: 44px !important;
                      border: 3px solid #91C3FD;
                      color: #000000 !important;
                      font-size: 20px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px;
                    }

                    .button-custom-7-1:hover, .button-custom-7-1:focus, .button-custom-7-1:active {
                      background-color: #ededf1 !important;
                      border-color: #91C3FD !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-8-8"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-8-8 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-8-8 {
                            background-color: #ededf1 !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-8-8 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-8-8.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-8-8 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-8-8 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-8-8 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-9-9"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-9-9 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-9-9 {
                            background-color: #ededf1 !important;
                            width: 114px !important;
                            height: 44px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-9-9 .ant-switch-handle {
                            width: 20px !important;
                            height: 20px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-9-9.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-9-9 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-9-9 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-9-9 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-10-1">
                    Label
                  </Button>
                  <style>
                    {`
                      .button-custom-10-1 {
                        background-color: #0778B1 !important;
                        width: 84px !important;
                        height: 44px !important;
                        border: none;
                        color: #FFFFFF !important;
                        font-size: 19px;
                        font-weight: 600 !important;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background-color 0.3s ease, border-color 0.3s ease;
                        border-radius: 28px;
                      }

                      .button-custom-10-1:hover, .button-custom-10-1:focus, .button-custom-10-1:active {
                        background-color: #1890ff !important;
                        border-color: #1890ff !important;
                        color: #FFFFFF !important;
                      }
                    `}
                  </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-11-1"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-11-1 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-11-1 {
                        background-color: #0778B1 !important;
                        width: 114px !important;
                        height: 44px !important;
                        }

                        .switch-custom-11-1 .ant-switch-handle {
                        width: 20px !important;
                        height: 20px !important;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10px; 
                        transition: left 0.3s ease;
                        }

                        .switch-custom-11-1.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-11-1 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-11-1 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-11-1 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-12-1"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-12-1 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-12-1 {
                        background-color: #0778B1 !important;
                        width: 114px !important;
                        height: 44px !important;
                        }

                        .switch-custom-12-1 .ant-switch-handle {
                        width: 20px !important;
                        height: 20px !important;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10px; 
                        transition: left 0.3s ease;
                        }

                        .switch-custom-12-1.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 30px);
                        }

                        .switch-custom-12-1 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-12-1 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-12-1 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 19px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
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
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="switch-custom-1-1-1">
                    Label
                  </Button>
                <style>
                  {`
                    .switch-custom-1-1-1 {
                      background-color: #ffffff !important;
                      width: 89px !important;
                      height: 58px !important;
                      border: 1px solid #D9D9D9;
                      color: #000000 !important;
                      font-size: 21px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px; /* Más redondeado */
                    }

                    .switch-custom-1-1-1:hover, .switch-custom-1-1-1:focus, .switch-custom-1-1-1:active {
                      background-color: #ffffff !important;
                      border-color: #D9D9D9 !important;
                      color: #000000 !important;
                      }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-2-2-2"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-2-2-2 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-2-2-2 {
                            background-color: #ffffff !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-2-2-2 .ant-switch-handle {
                            width: 30px !important;
                            height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 8px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-2-2-2.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-2-2-2 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-2-2-2 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-2-2-2 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                        .ant-switch .ant-switch-handle::before {
                          border-radius: 19px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-3-3-3"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-3-3-3 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-3-3-3 {
                            background-color: #ffffff !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 1px solid #D9D9D9;
                            
                        }

                        .switch-custom-3-3-3 .ant-switch-handle {
                            width: 30px !important;
                          height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-3-3-3.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-3-3-3 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-3-3-3 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-3-3-3 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-4-4-4">
                  Label
                </Button>
                <style>
                  {`
                    .button-custom-4-4-4 {
                      background-color: #ededf1 !important;
                      width: 89px !important;
                      height: 58px !important;
                      border: 1px solid #D9D9D9;
                      color: #000000 !important;
                      font-size: 21px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px;
                    }

                    .button-custom-4-4-4:hover, .button-custom-4-4-4:focus, .button-custom-4-4-4:active {
                      background-color: #ededf1 !important;
                      border-color: #D9D9D9 !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-5-5-5"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-5-5-5 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-5-5-5 {
                            background-color: #ededf1 !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-5-5-5 .ant-switch-handle {
                            width: 30px !important;
                          height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-5-5-5.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-5-5-5 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-5-5-5 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-5-5-5 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-6-6-6"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-6-6-6 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-6-6-6 {
                            background-color: #ededf1 !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 1px solid #D9D9D9; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-6-6-6 .ant-switch-handle {
                            width: 30px !important;
                          height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-6-6-6.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-6-6-6 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-6-6-6 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-6-6-6 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-7-1-1">
                    Label
                  </Button>
                <style>
                  {`
                    .button-custom-7-1-1 {
                      background-color: #ededf1 !important;
                      width: 89px !important;
                      height: 58px !important;
                      border: 3px solid #91C3FD;
                      color: #000000 !important;
                      font-size: 21px;
                      font-weight: 600 !important;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: background-color 0.3s ease, border-color 0.3s ease;
                      border-radius: 38px;
                    }

                    .button-custom-7-1-1:hover, .button-custom-7-1-1:focus, .button-custom-7-1-1:active {
                      background-color: #ededf1 !important;
                      border-color: #91C3FD !important;
                      color: #000000 !important;
                    }
                  `}
                </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-8-8-8"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-8-8-8 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-8-8-8 {
                            background-color: #ededf1 !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-8-8-8 .ant-switch-handle {
                            width: 30px !important;
                          height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-8-8-8.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-8-8-8 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-8-8-8 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-8-8-8 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-9-9-9"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-9-9-9 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }

                        .switch-custom-9-9-9 {
                            background-color: #ededf1 !important;
                            width: 125px !important;
                            height: 58px !important;
                            border: 3px solid #91C3FD; /* Agregar borde color plomo */
                            
                        }

                        .switch-custom-9-9-9 .ant-switch-handle {
                            width: 30px !important;
                            height: 30px !important;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 10px; 
                            transition: left 0.3s ease;
                        }

                        .switch-custom-9-9-9.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-9-9-9 .ant-switch-inner {
                            color: #FFFFFF;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-9-9-9 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-9-9-9 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: black !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        }
                      `}
                    </style>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]} className="mb-4 overflow-x-auto">
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                  <Button className="button-custom-10-1-1">
                    Label
                  </Button>
                  <style>
                    {`
                      .button-custom-10-1-1 {
                        background-color: #0778B1 !important;
                        width: 89px !important;
                        height: 58px !important;
                        border: none;
                        color: #FFFFFF !important;
                        font-size: 21px;
                        font-weight: 600 !important;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background-color 0.3s ease, border-color 0.3s ease;
                        border-radius: 28px;
                      }

                      .button-custom-10-1-1:hover, .button-custom-10-1-1:focus, .button-custom-10-1-1:active {
                        background-color: #1890ff !important;
                        border-color: #1890ff !important;
                        color: #FFFFFF !important;
                      }
                    `}
                  </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-11-1-1"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                    />
                    <style>
                      {`
                        .switch-custom-11-1-1 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-11-1-1 {
                          background-color: #0778B1 !important;
                          width: 125px !important;
                          height: 58px !important;
                        }

                        .switch-custom-11-1-1 .ant-switch-handle {
                          width: 30px !important;
                          height: 30px !important;
                          top: 50%;
                          transform: translateY(-50%);
                          left: 10px; 
                          transition: left 0.3s ease;
                        }

                        .switch-custom-11-1-1.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-11-1-1 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-11-1-1 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-11-1-1 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
                        } 
                      `}
                    </style>
                  </Space>
                </Col>
                <Col xs={24} sm={12}  md={8} className="flex justify-center">
                  <Space direction="vertical">
                    <Switch
                      className="switch-custom-12-1-1"
                      checkedChildren="Label"
                      unCheckedChildren="Label"
                      defaultChecked
                    />
                    <style>
                      {`
                        .switch-custom-12-1-1 .ant-switch-checked {
                            background-color: #1890ff !important;
                            border-color: #1890ff !important;
                        }
                        .switch-custom-12-1-1 {
                        background-color: #0778B1 !important;
                        width: 125px !important;
                        height: 58px !important;
                        }

                        .switch-custom-12-1-1 .ant-switch-handle {
                        width: 30px !important; /*modificas esto*/
                        height: 30px !important;/*modificas esto*/
                        top: 50%;
                        transform: translateY(-50%);
                        left: 10px; 
                        transition: left 0.3s ease;
                        }

                        .switch-custom-12-1-1.ant-switch-checked .ant-switch-handle {
                            left: calc(100% - 40px);
                        }

                        .switch-custom-12-1-1 .ant-switch-inner {
                            color: #000000;
                            text-size-adjust: 15;
                            height: 25px;
                        }
                        .switch-custom-12-1-1 .ant-switch-inner .ant-switch-inner-checked,
                        .switch-custom-12-1-1 .ant-switch-inner .ant-switch-inner-unchecked {
                            display: block;
                            color: rgb(255, 255, 255) !important;
                            font-size: 21px;
                            font-weight: 600 !important;
                            transition: margin-inline-start 0.2s ease-in-out, margin-inline-end 0.2s ease-in-out;
                            pointer-events: none;
                            min-height: 22px;
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

export default Chip;
