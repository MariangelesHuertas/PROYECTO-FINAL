import React from 'react';
import { VerifiedOutlined, CheckOutlined, ShoppingOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined, TagOutlined } from '@ant-design/icons';
import { Avatar, Card, Button, Row, Col } from 'antd';

const { Meta } = Card;
//const title = "Title";
//const description = "Placeholder for body text. Enter text into this container.";

const App: React.FC = () => (
    <Row gutter={[16, 16]} justify="center" align="middle">
        <Col span={24}>
            <Card
                style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    margin: '20px',
                    borderRadius: '0px',
                    width: 982,
                    height: 142,
                }}
            >
                <Meta
                    avatar={<Avatar style={{ width: 100, height: 100 }} src="https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png" />}
                    title={<a style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Supermercados Carrefour<Avatar icon={<VerifiedOutlined style={{ color: "rgba(0, 100, 151, 1)", backgroundColor: "white" }} />} style={{ left: 590, width: 24, height: 24 }} /></a>}
                    description={
                        <a style={{ fontSize: 14, color: 'black' }}>
                            Retail • Alimentación y bebidas • Madrid, Spain • Valoraciones • +500 trabajadores
                            <br />
                            <a style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
                                carrefour.es
                            </a>
                            <br />
                            <Button style={{ width: 135, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<CheckOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>20 valoraciones</Button>
                            <Button style={{ width: 150, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<ShoppingOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>90 Ofertas activas</Button>
                            <Button style={{ width: 136, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupDeleteOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>450 Seguidores</Button>
                            <Button style={{ width: 151, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupAddOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>+500 trabajadores</Button>
                            <Button style={{ width: 130, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<TagOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>Administrativo</Button>
                            <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Reponedor</Button>
                            <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Ventas</Button>
                        </a>}
                />
            </Card>
            <br />
            <Card
            style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                margin: '20px',
                boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)', // Sombreado solo en el lado derecho
                border: '2px solid #81BFEC', // Bordeado de color
                borderRadius: '0px', // Quitando el bordeado redondo
                width: 982,
                height: 142,
            }}
        >
            <Meta
                avatar={<Avatar style={{ width: 100, height: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={<a style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Supermercados Carrefour<Avatar icon={<VerifiedOutlined style={{ color: "rgba(0, 100, 151, 1)", backgroundColor: "white" }} />} style={{ left: 590, width: 24, height: 24 }} /></a>}
                description={
                    <a style={{ fontSize: 14, color: 'black' }}>
                        Retail • Alimentación y bebidas • Madrid, Spain • Valoraciones • +500 trabajadores
                        <br />
                        <a style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
                            carrefour.es
                        </a>
                        <br />
                        <Button style={{ width: 135, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<CheckOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>20 valoraciones</Button>
                        <Button style={{ width: 150, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<ShoppingOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>90 Ofertas activas</Button>
                        <Button style={{ width: 136, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupDeleteOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>450 Seguidores</Button>
                        <Button style={{ width: 151, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupAddOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>+500 trabajadores</Button>
                        <Button style={{ width: 130, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<TagOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>Administrativo</Button>
                        <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Reponedor</Button>
                        <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Ventas</Button>
                    </a>}
            />
        </Card>

            <br />
            <Card
                style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    margin: '20px',
                    borderRadius: '0px',
                    border: '2px solid #81BFEC',
                    width: 982,
                    height: 142,

                }}
            >
                <Meta
                    avatar={<Avatar style={{ width: 100, height: 100 }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={<a style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Supermercados Carrefour<Avatar icon={<VerifiedOutlined style={{ color: "rgba(0, 100, 151, 1)", backgroundColor: "white" }} />} style={{ left: 590, width: 24, height: 24 }} /></a>}
                    description={
                        <a style={{ fontSize: 14, color: 'black' }}>
                            Retail • Alimentación y bebidas • Madrid, Spain • Valoraciones • +500 trabajadores
                            <br />
                            <a style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
                                carrefour.es
                            </a>
                            <br />
                            <Button style={{ width: 135, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<CheckOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>20 valoraciones</Button>
                            <Button style={{ width: 150, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<ShoppingOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>90 Ofertas activas</Button>
                            <Button style={{ width: 136, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupDeleteOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>450 Seguidores</Button>
                            <Button style={{ width: 151, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<UsergroupAddOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>+500 trabajadores</Button>
                            <Button style={{ width: 130, borderRadius: 25, blockSize: 20, margin: 1 }} icon={<TagOutlined style={{ color: "rgba(145, 195, 253, 1)", backgroundColor: "white" }} />}>Administrativo</Button>
                            <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Reponedor</Button>
                            <Button style={{ width: 80, borderRadius: 25, blockSize: 20, margin: 1 }} >Ventas</Button>
                        </a>}
                />
            </Card>
        </Col>
    </Row>

);

export default App;