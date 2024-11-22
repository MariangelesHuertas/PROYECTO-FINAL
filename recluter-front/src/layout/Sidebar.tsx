import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Components", "sub1", <AppstoreOutlined />, [
    getItem("Chip", "/examples/chip", <PieChartOutlined />),
    getItem("Checkbox", "/examples/checkbox", <DesktopOutlined />),
    getItem("Badge", "/examples/badge", <FileOutlined />),
    getItem("Tabs", "/examples/tabs", <TeamOutlined />),
    getItem("Chart Donut", "/examples/chart-donut-example", <PieChartOutlined />),
    getItem("Legend Group", "/examples/legendGroup", <TeamOutlined />),
    getItem("Toggle Switch", "/examples/ToggleSwitch", <UserOutlined />),
    getItem("Dropdown Input", "/examples/AppExample", <DesktopOutlined />),
    getItem("Avatar Label", "/examples/AppExampleAvatar", <PieChartOutlined />),
    getItem("Avatar", "/examples/ExampleAvatar", <PieChartOutlined />),
    getItem("Rating", "/examples/RatingExample", <UserOutlined />),
    getItem("Modals", "/examples/modals", <TeamOutlined />),
    getItem("Sidebar Profile", "/examples/sidebarExample", <PieChartOutlined />),
    // Categorías
    getItem("Cards", "sub2", <AppstoreOutlined />, [
      getItem("Card User", "/examples/card-user"),
      getItem("Card Company", "/examples/card-company"),
      getItem("Card Employment", "/examples/card-employment-example"),
    ]),
    getItem("Buttons", "sub3", <ToolOutlined />, [
      getItem("Buttons", "/examples/Buttons"),
      getItem("Buttons Icon", "/examples/ButtonsIcon"),
      getItem("Buttons Text", "/examples/ButtonsText"),
    ]),
  ]),
  getItem("Aptitudes", "/administrator/aptitudes", <PieChartOutlined />),
  getItem("Sectores", "/administrator/sectores", <PieChartOutlined />),
  getItem("Palabras Clave", "/administrator/palabras-clave", <PieChartOutlined />),
  getItem("Tipos de Usuarios", "/administrator/tipos-usuarios", <PieChartOutlined />),
  
  getItem("Carreras", "/administrator/carreras", <PieChartOutlined />),
  getItem("Tipo Educación", "/administrator/tipo_educación", <PieChartOutlined />),
  getItem("Centros Educativos", "/administrator/centros_educativos", <PieChartOutlined />),
  getItem("Idiomas", "/administrator/idiomas", <PieChartOutlined />),
  getItem("Niveles_Idioma", "/administrator/niveles_idioma", <PieChartOutlined />),
  getItem("Softskills", "/administrator/softskills", <PieChartOutlined />),
  getItem("Company", "/administrator/company", <PieChartOutlined />),
  getItem("Users", "/administrator/usuarios", <PieChartOutlined />),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="bg-gray-900"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/examples/chip"]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="flex-1">
        <Header className="p-0 bg-gray-100" />
        <Content className="m-4 flex flex-col">
          <div
            className="p-4 flex-1 bg-gray-100 rounded-lg"
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
