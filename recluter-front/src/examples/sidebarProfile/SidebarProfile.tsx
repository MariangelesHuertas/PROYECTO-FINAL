// src/examples/SidebarExample.tsx
import React, { useState } from "react";
import { Row, Col } from "antd";
import SidebarProfile from "../../components/sidebarProfile/SidebarProfile";

const SidebarExample: React.FC = () => {
const [isJobSearchActive, setIsJobSearchActive] = useState(true);

const handleJobSearchToggle = (checked: boolean) => {
setIsJobSearchActive(checked);
};

    function handleImageUpdate(newImage: string): void {
        throw new Error("Function not implemented.");
    }

return (
<Row justify="center" align="middle" style={{ height: "100vh" }}>
    <Col>
    <SidebarProfile
        profilePicture="https://path-to-profile-picture.jpg"
        name="Elena Rodriguez"
        jobTitle="Vendedora"
        location="Paterna, Valencia"
        isJobSearchActive={isJobSearchActive}
        onJobSearchToggle={handleJobSearchToggle}
        width={234}
        onImageChange={handleImageUpdate}
    />
    </Col>
</Row>
);
};

export default SidebarExample;
