import React from "react";
import { Row, Col, Card, Segmented, Tabs } from "antd";
import type { TabsProps } from "antd";

type Align = "start" | "center" | "end";

const TabsMen: React.FC = () => {
const items2: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
];
const items3: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
{ key: "3", label: "Label" },
];
const items4: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
{ key: "3", label: "Label" },
{ key: "4", label: "Label" },
];
const items5: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
{ key: "3", label: "Label" },
{ key: "4", label: "Label" },
{ key: "5", label: "Label" },
];
const items6: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
{ key: "3", label: "Label" },
{ key: "4", label: "Label" },
{ key: "5", label: "Label" },
{ key: "6", label: "Label" },
];
const items7: TabsProps["items"] = [
{ key: "1", label: "Label" },
{ key: "2", label: "Label" },
{ key: "3", label: "Label" },
{ key: "4", label: "Label" },
{ key: "5", label: "Label" },
{ key: "6", label: "Label" },
{ key: "7", label: "Label" },
];

const [alignValue, setAlignValue] = React.useState<Align>("center");

const onChange = (key: string) => {
console.log(key);
};

return (
<div className="app-container">
    <Row gutter={[16, 16]} className="tabs-container">
    <Col span={24}>
      
        <Card>
        <Row gutter={[16, 16]} justify="center" className="flex flex-wrap">
            <Col
            xs={24}
            md={12}
            lg={8}
            className="mb-4 flex-wrap overflow-x-hidden pb-4"
            >
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2", "Label3"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2", "Label3", "Label4"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={[
                "Label",
                "Label1",
                "Label2",
                "Label3",
                "Label4",
                "Label5",
                ]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{
                marginBottom: 30,
                backgroundColor: "transparent",
                fontWeight: "600",
                }}
                onChange={(value) => setAlignValue(value as Align)}
                options={[
                "Label",
                "Label1",
                "Label2",
                "Label3",
                "Label4",
                "Label5",
                "Label6",
                ]}
            />
            <br />
            </Col>
            <Col
            xs={24}
            md={12}
            lg={8}
            className="mb-4 flex-wrap overflow-x-hidden pb-4"
            >
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2", "Label3"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={["Label", "Label1", "Label2", "Label3", "Label4"]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={[
                "Label",
                "Label1",
                "Label2",
                "Label3",
                "Label4",
                "Label5",
                ]}
            />
            <br />
            <Segmented
                defaultValue="Label"
                style={{ marginBottom: 30, fontWeight: "600" }}
                onChange={(value) => setAlignValue(value as Align)}
                options={[
                "Label",
                "Label1",
                "Label2",
                "Label3",
                "Label4",
                "Label5",
                "Label6",
                ]}
            />
            <br />
            </Col>
            <Col
            xs={24}
            md={12}
            lg={8}
            className="mb-4 flex-wrap overflow-x-hidden pb-4"
            >
            <Tabs
                defaultActiveKey="1"
                items={items2}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items3}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items4}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items5}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items6}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items7}
                onChange={onChange}
                tabBarStyle={{ textAlign: alignValue, fontWeight: "600" }}
            />
            </Col>
        </Row>
        </Card>
   
    </Col>
    </Row>
</div>
);
};
export default TabsMen;
