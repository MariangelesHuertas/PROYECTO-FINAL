import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import GeneralSetting from "../../../components/pages/myPortal/GeneralSettings/GeneralSettings";
import { Row, Col, Card } from "antd";

const ProfilePage: React.FC = () => {
  return (
    <>
      <div className="flex-1 pl-6 pr-1">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24}>
            <Card className="rounded-lg border border-sky-blue0">
              <GeneralSetting
                email="Nombre"
                passwordHint="Contraseña****"
                jobApplicationChanges={true}
                interestingOffers={false}
                companyOffers={true}
                emailSummary="Semanal"
                subscriptionType="Freemium"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
