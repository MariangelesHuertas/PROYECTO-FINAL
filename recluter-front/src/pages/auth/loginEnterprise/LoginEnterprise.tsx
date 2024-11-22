import React, { useState } from "react";
import { Button, Row, Col, Divider, App } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import LoginP from "../../../assets/img/login/login2.svg";
import IconFacebook from '../../../assets/icons/Facebook.svg';
import IconGoogle from '../../../assets/icons/Google.svg';
import IconArrowL from "../../../assets/icons/IconArrowL.svg";
import InputL from "../../../components/pages/login/InputL";
import "../../../components/styles/pages/login/Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { LoginAuthReducer } from "../../../redux/actions/auth/Auth";
import { LoginEnterpriseAuthReducer } from "../../../redux/actions/auth/AuthEnterprise";
const API_URL = process.env.REACT_APP_API_BASE_URL;

const validationSchema = Yup.object({
  usuario: Yup.string()
    // .email("Correo electrónico inválido")
    .required("Por favor ingresa tu correo electrónico"),
  contrasena: Yup.string()
    .required("Por favor ingresa tu contraseña"),
});

const LoginEnterprise: React.FC = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: { usuario: string; contrasena: string },
    { setSubmitting }: { setSubmitting: any }
  ) => {
    const rpta: any = await dispatch(LoginEnterpriseAuthReducer(values));

    if (rpta.respuesta) {
      notification.success({ message: rpta.mensaje });
      navigate('/controlPanel');
    } else {
      notification.error({ message: rpta.mensaje });
    }

    setSubmitting(false);
  };

  const loginGoogle = () => {
    window.location.href = `${API_URL}auth/googleEmpresa`;
  };

  return (
    <div style={{ height: "100vh" }}>
      <Row className="lo" style={{ height: "100%" }}>
        <Col
          xl={13}
          className=""
          style={{
            backgroundColor: "#f0f2f5",
            backgroundImage: "url(" + LoginP + ")",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* <img
            src={LoginP}
            alt="Login"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          /> */}
        </Col>
        <Col
          xl={11}
          className="p-[50px]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >

          {/* Botón Volver */}
          <Row className="mt-4">
            <Col xl={12}>
              <h1 className="font-semibold text-green32 text-heading-x1">
                <Link
                  className="flex items-center font-bold text-heading-x1"
                  style={{ color: "#006497" }}
                  to="/homeCompany"
                >
                  <img src={IconArrowL} alt="Arrow Left" className="mr-[15px]" />
                  <span className="font-semibold text-green32 text-heading-x1">
                    Volver
                  </span>
                </Link>
              </h1>
            </Col>
            <Col xl={12}>
              <h1 className="font-semibold text-gray-500 text-heading-x1">
                ¿No tienes cuenta?{" "}
                <Link
                  className="font-bold text-heading-x1"
                  style={{ color: "#006497" }}
                  to="/register"
                >
                  Regístrate
                </Link>
              </h1>
            </Col>
          </Row>

          <div
            style={{
              height: '100%',
              alignContent: 'center',
              placeSelf: 'center',
              width: '70%'
            }}
          >
            <Formik
              initialValues={{ usuario: "", contrasena: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  className="login-form max-w-[454px] p-4 mt-0"
                  method="post"
                  role="form"
                >
                  <h1 className="text-heading-md font-bold mb-7">
                    Inicia sesión en Merēre
                  </h1>

                  <div className="mb-12">
                    <h1 className="font-medium text-body-md mb-2">
                      ¿Cuál es tu correo electrónico? *
                    </h1>
                    <Field
                      name="usuario"
                      as={InputL}
                      placeholder=""
                      customClassName="h-[58px]"
                      className="mb-1"
                    />
                    <ErrorMessage
                      name="usuario"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-5 relative">
                    <h1 className="font-medium text-body-md mb-2">
                      Por favor introduce tu contraseña *
                    </h1>
                    <Field
                      name="contrasena"
                      as={InputL}
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      customClassName="h-[58px] pr-10"
                      className="mb-1"
                    />
                    <ErrorMessage
                      name="contrasena"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer flex items-center"
                    >
                      {showPassword ? <EyeOutlined className="text-lg mt-8" /> : <EyeInvisibleOutlined className="text-lg mt-8" />}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-gray-600">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Button
                      htmlType="submit"
                      disabled={isSubmitting}
                      className="bg-blue3 principal-nav-notify-button2 text-white w-[278px] h-[44px] rounded-[4px]"
                    >
                      Iniciar sesión
                    </Button>
                  </div>

                  <Divider className="text-gray-400">
                    <h1 className="text-gray-500 text-body-sm">
                      O inicia sesión con
                    </h1>
                  </Divider>

                  <div className="flex justify-center gap-5 mt-7 w-[222px] mx-auto">
                    {/* <Button
                      className=" border border-[#E1E1E2] principal-nav-notify-button rounded-[12px] h-[44px] flex-1"
                      onClick={loginFacebook}
                    >
                      <img
                        src={IconFacebook}
                        alt="Facebook Icon"
                        className="w-[24px]"
                      />
                    </Button> */}
                    <Button
                      className="border border-[#E1E1E2] principal-nav-notify-button rounded-[12px] h-[44px] flex-1"
                      onClick={loginGoogle}
                    >
                      <img src={IconGoogle} alt="Google Icon" className="w-[24px]" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>


        </Col>
      </Row>
    </div>
  );
};

export default LoginEnterprise;
