import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Row, Col, Card } from "antd";
import Examople from "../../../components/pages/myPortal/help/Help";

const GeneralSetting: React.FC = () => {
  return (
    <>
      <div className="pl-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Card className="rounded-lg border border-sky-blue0">
              <Examople />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GeneralSetting;
