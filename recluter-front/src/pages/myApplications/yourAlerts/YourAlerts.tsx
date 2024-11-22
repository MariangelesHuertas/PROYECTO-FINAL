import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Skeleton, Drawer, Button } from "antd";
import "tailwindcss/tailwind.css";
import CardAlerts from "../../../components/pages/employment/yourAlerts/CardAlerts";
import SettingsComponent from "../../../components/pages/employment/yourAlerts/SidebarSettings";
import ButtonText from '../../../components/button/ButtonText';
import { MenuOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Text } = Typography;

const YourAlerts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Estado para las alertas
  const [alerts, setAlerts] = useState([
    {
      title: "",
      subtitle: "",
      description: "",
      image: ""
    }
  ]);

  const initialAlerts = [
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      image: ""
    }
  ];

  // Estados separados para controlar el texto del botón y el número de alertas visibles por cada bloque
  const [buttonTexts, setButtonTexts] = useState(["Ver todas", "Ver todas", "Ver todas"]);
  const [visibleAlerts, setVisibleAlerts] = useState([4, 4, 4]);

  // Estados de carga por sección
  const [sectionLoading, setSectionLoading] = useState([false, false, false]);
  const [newLoading, setNewLoading] = useState([false, false, false]);

  // Función para manejar el clic del botón para cada sección
  const handleButtonClick = (index: number) => {
    const newVisibleAlerts = [...visibleAlerts];
    const newButtonTexts = [...buttonTexts];
    const newSectionLoading = [...sectionLoading];
    const newNewLoading = [...newLoading];

    if (newVisibleAlerts[index] === 4) {
      newNewLoading[index] = true;
      setNewLoading(newNewLoading);
      newSectionLoading[index] = true;

      setTimeout(() => {
        newVisibleAlerts[index] = alerts.length;
        newButtonTexts[index] = "Ver menos";
        newSectionLoading[index] = false;
        newNewLoading[index] = false;
        setVisibleAlerts(newVisibleAlerts);
        setButtonTexts(newButtonTexts);
        setSectionLoading(newSectionLoading);
        setNewLoading(newNewLoading);
      }, 1000);
    } else {
      newVisibleAlerts[index] = 4;
      newButtonTexts[index] = "Ver todas";
      setVisibleAlerts(newVisibleAlerts);
      setButtonTexts(newButtonTexts);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlerts(initialAlerts);
      setLoading(false);
    }, 2000);
  }, []);

  // Añadimos un array con la cantidad de alertas para cada sección
  const alertsCount = [24, 44, 44];

  const renderAlertSection = (sectionIndex: number, titleText: string, titleColor: string, alertCount: number) => (
    <>
      <Row className="mt-6">
        <Col span={24} className="flex justify-between items-center">
          <div>
            <Text className="text-heading-x1 font-bold text-green32">{alertCount}</Text>
            <Text className="text-heading-x1 font-medium ml-2" style={{ color: titleColor }}>{titleText}</Text>
          </div>
          <ButtonText
            buttons={[
              {
                type: 'link',
                label: buttonTexts[sectionIndex],
                size: 'small',
                textColor: '#006497',
                color: 'white',
                fontWeight: 600,
                fontSize: "14px",
                onClick: () => handleButtonClick(sectionIndex)
              }
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        {loading
          ? Array(4).fill(null).map((_, index) => (
            <Col key={`loading-${index}`} xs={24} sm={24} md={24} lg={12} xl={12}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          ))
          : alerts.slice(0, 4).map((alert, index) => (
            <Col key={index} xs={24} sm={24} md={24} lg={12} xl={12}>
              <CardAlerts
                title={alert.title}
                subtitle={alert.subtitle}
                description={alert.description}
                image={alert.image} selected={false} onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
          ))}

        {newLoading[sectionIndex]
          ? Array(4).fill(null).map((_, index) => (
            <Col key={`new-loading-${index}`} xs={24} sm={24} md={24} lg={12} xl={12}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          ))
          : alerts.slice(4, visibleAlerts[sectionIndex]).map((alert, index) => (
            <Col key={`alert-${index + 4}`} xs={24} sm={24} md={24} lg={12} xl={12}>
              <CardAlerts
                title={alert.title}
                subtitle={alert.subtitle}
                description={alert.description}
                image={alert.image} selected={false} onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Col>
          ))}
      </Row>
    </>
  );

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout className="bg-white">
      <Content className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-heading-sm font-bold">Alertas activas</h1>
          <Button
            className="md:hidden ml-4 mt-4"
            type="primary"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
          />
        </div>
        {renderAlertSection(0, "de Reponedor en Campo de Criptana", "#5F5F5F", alertsCount[0])}
        {renderAlertSection(1, "de Diseñador UX en Toda España", "#5F5F5F", alertsCount[1])}
        {renderAlertSection(2, "de Palabras clave", "#5F5F5F", alertsCount[2])}
      </Content>



      <Sider
        width={234}
        breakpoint="md"
        collapsedWidth="80"
        style={{ backgroundColor: 'white' }}
        className="hidden md:block ml-4"
      >
        <SettingsComponent />
      </Sider>

      <Drawer
        title={null}
        placement="right"
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={268}
        className="md:hidden"
      >
        <SettingsComponent inDrawer/>
      </Drawer>
    </Layout>
  );
};

export default YourAlerts;