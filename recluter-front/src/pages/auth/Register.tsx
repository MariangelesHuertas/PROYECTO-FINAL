import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import LoginP from "../../assets/img/login/login2.svg";
import "../../components/styles/pages/login/Login.css";
import CardEmployment from "../../components/pages/login/CardLoginEmployment";
import CardCandidate from "../../components/pages/login/CardLoginCandidate";

const Register: React.FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Row className="login-container" style={{ height: "100%" }}>
        <Col
          span={8}
          className="login-image"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <img
            src={LoginP}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col
          span={16}
          className=" p-[50px]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
         <Row className="mb-4 justify-end items-center">
            <h1 className="font-semibold text-heading-x1">
              <span style={{ color: "#808080" }}>¿Ya tienes cuenta?</span>{" "}
              <Link
                className="font-bold text-heading-x1"
                style={{ color: "#006497" }}
                to="/login"
              >
                Iniciar sesión
              </Link>
            </h1>
          </Row>

          <div className="max-w-[621px]">
            <h1 className="text-[45px] font-medium text-blue3">
              Unete a Merēre
            </h1>
            <h1 className="text-body-xl">
              En Merēre, creemos que quienes mejor desempeñan su trabajo merecen
              encontrarlo más rápidamente.
            </h1>
          </div>

          <Row gutter={[16, 16]}>
            <div className="max-w-[560px]">
              <Col span={24} className=" my-[60px]">
                <CardCandidate />
              </Col>
              <Col span={24}>
                <CardEmployment />
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
