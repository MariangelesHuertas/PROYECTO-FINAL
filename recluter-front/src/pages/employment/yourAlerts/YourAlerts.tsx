import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Skeleton, Drawer, Button, Modal } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import CardAlerts from "../../../components/pages/employment/yourAlerts/CardAlerts";
import SettingsComponent from "../../../components/pages/employment/yourAlerts/SidebarSettings";
import ButtonText from '../../../components/button/ButtonText';
import Information from '../../../components/pages/employment/recommendations/Information'; // Importa tu componente

const { Content, Sider } = Layout;
const { Text } = Typography;

const YourAlerts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedAlertIndex, setSelectedAlertIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);



  const initialAlerts = [
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "En Carrefour consideramos que todas las personas tienen un talento que ofrecer. Buscamos personas que empaticen con los clientes, compartan nuestros valores y estén dispuestas a probar nuevos retos. Si desbordas energía, te gusta que todo esté en su sitio y te encanta trabajar codo con codo con tus compañeros, trae tu talento a LOGÍSTICA.",
      requirements: ["Inglés: Nivel B1",
          "Incorporación: inmediata",
          "Jornada: Tiempo parcial, mañana",
          "Qué harás día a día"],
      responsibilities: [ "Cargar y descargar las mercancías de los camiones, comprobar su correcto estado, y chequear los correspondientes albaranes para evitar posibles errores.",
        "Poner la mercancía a disposición del cliente en su correspondiente punto de venta en la tienda, así como realizar las devoluciones de mercancía al almacén en caso de que no sea necesaria en el punto de venta, con el objetivo de garantizar el stock de mercancía en el punto de ventas.",
        "Estás disponible para ayudar a los compañeros del departamento y otras áreas de la tienda cuando sea necesario.",
        "Te comprometes con todas las reglas y requisitos de Carrefour en materia de salud, seguridad y protección, y ayudas activamente a los compañeros a evitar cualquier incidente en el que puedan verse implicados colaboradores, clientes, equipos o instalaciones."
      ],
      extraText: [ "Porque formas parte de la gran familia CARREFOUR queremos compartir contigo los momentos importantes, por ello celebramos aniversarios, fiestas, Teams Buildings, la llegada del verano, regalo de Navidad. ¡Siempre hay un motivo para sonreír!"],
      extraText2: "¡Muchos más te están esperando, ¡descúbrelos!",
      postedTime: "Subida hace 23h",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    },
    {
      title: "Supermercados Carrefour",
      subtitle: "Reponedor de supermercado",
      description: "Importante cadena de alimentación busca incorporar un/a dependiente/a",
      location: "Campo de Criptana",
      employmentType: "Full-Time",
      salary: "$20,000 - $25,000",
      comments: 12,
      applicantsCount: "5",
      introText: "Buscamos un dependiente con experiencia en ventas...",
      requirements: ["Experiencia previa", "Disponibilidad inmediata"],
      responsibilities: ["Atención al cliente", "Gestión de inventario"],
      extraText: ["Beneficios: Seguro médico", "Horas extras pagadas"],
      extraText2: "Horario flexible",
      postedTime: "Hace 3 días",
      applied: false,
      onApply: () => { },
      loading: false
    }
  ];

  // Estados separados para controlar el texto del botón y el número de alertas visibles por cada bloque
  const [buttonTexts, setButtonTexts] = useState(["Ver todas", "Ver todas", "Ver todas"]);
  const [visibleAlerts, setVisibleAlerts] = useState([4, 4, 4]);

  // Estados de carga por sección
  const [sectionLoading, setSectionLoading] = useState([false, false, false]);
  const [newLoading, setNewLoading] = useState([false, false, false]);

  // Estado para controlar la visibilidad del Drawer
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Función para manejar el clic del botón para cada sección
  const handleButtonClick = (index: number) => {
    const newVisibleAlerts = [...visibleAlerts];
    const newButtonTexts = [...buttonTexts];
    const newSectionLoading = [...sectionLoading];
    const newNewLoading = [...newLoading];

    if (newVisibleAlerts[index] === 4) {
      newNewLoading[index] = true; // Activa el efecto de carga para las nuevas alertas
      setNewLoading(newNewLoading);
      newSectionLoading[index] = true; // Activa el efecto de carga para la sección

      setTimeout(() => {
        newVisibleAlerts[index] = alerts.length; // Muestra todas las alertas de esa sección
        newButtonTexts[index] = "Ver menos"; // Cambia el texto del botón
        newSectionLoading[index] = false; // Desactiva el efecto de carga para la sección
        newNewLoading[index] = false; // Desactiva el efecto de carga para las nuevas alertas
        setVisibleAlerts(newVisibleAlerts);
        setButtonTexts(newButtonTexts);
        setSectionLoading(newSectionLoading);
        setNewLoading(newNewLoading);
      }, 1000); // Simula un tiempo de carga de 1 segundo
    } else {
      newVisibleAlerts[index] = 4; // Muestra solo 4 alertas de esa sección
      newButtonTexts[index] = "Ver todas"; // Cambia el texto del botón
      setVisibleAlerts(newVisibleAlerts);
      setButtonTexts(newButtonTexts);
    }
  };

  // Simulate initial data fetching
  useEffect(() => {
    setTimeout(() => {
      setAlerts(initialAlerts);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedAlertIndex(index);
    setModalVisible(true);
  };

  // Añadimos un array con la cantidad de alertas para cada sección
  const alertsCount = [24, 44, 44];

  const renderAlertSection = (sectionIndex: number, titleText: string, titleColor: string, alertCount: number) => (
    <>
      <Row className="mt-6">
        <Col span={24} className="flex justify-between items-center">
          <div>
            {/* Muestra el número de alertas */}
            <Text className="text-heading-x1 font-bold text-blue3">{alertCount}</Text> {/* Cambia el color y tamaño aquí */}
            {/* Muestra el texto de la sección */}
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
                fontWeight: 600, // Semibold
                fontSize: "14px",
                onClick: () => handleButtonClick(sectionIndex) // Pasa el índice correspondiente
              }
            ]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        {loading
          ? Array(4).fill(null).map((_, index) => (
            <Col key={`loading-${index}`} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          ))
          : alerts.slice(0, 4).map((alert: any, index: number) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
              <CardAlerts
                title={alert.title}
                subtitle={alert.subtitle}
                description={alert.description}
                image={alert.image}
                onClick={() => handleCardClick(index)}
                selected={selectedAlertIndex === index}
              />
            </Col>
          ))}

        {newLoading[sectionIndex]
          ? Array(4).fill(null).map((_, index) => (
            <Col key={`new-loading-${index}`} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          ))
          : alerts.slice(4, visibleAlerts[sectionIndex]).map((alert: any, index: number) => (
            <Col key={`alert-${index + 4}`} xs={24} sm={24} md={12} lg={12} xl={12}>
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

  return (
    <Layout className="bg-white">
      <Content className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-heading-sm font-bold">Alertas activas</h1>
          {/* Botón de menú de hamburguesa */}
          <Button
            type="primary"
            className="lg:hidden" // Mostrar solo en pantallas pequeñas
            onClick={() => setDrawerVisible(true)}
            icon={<MenuOutlined />}
          />
        </div>

        {renderAlertSection(0, "de Reponedor en Campo de Criptana", "#5F5F5F", alertsCount[0])}
        {renderAlertSection(1, "de Diseñador UX en Toda España", "#5F5F5F", alertsCount[1])}
        {renderAlertSection(2, "de Palabras clave", "#5F5F5F", alertsCount[2])}

        {/* Modal para mostrar la información */}
       <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedAlertIndex !== null && (
            <Information
              {...alerts[selectedAlertIndex]}
              onApply={() => console.log("Aplicado")}
              loading={false}
            />
          )}
        </Modal>
      </Content>

      {/* Sidebar visible en pantallas grandes */}
      <Sider
        width={234}
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: 'white' }}
        className="hidden lg:block ml-4" // Ocultar en pantallas pequeñas
      >
        <SettingsComponent />
      </Sider>

      {/* Drawer para pantallas pequeñas */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={268}
        className="lg:hidden" // Mostrar solo en pantallas pequeñas
      >
        <SettingsComponent inDrawer/>
      </Drawer>

    </Layout>
  );
};

export default YourAlerts;
