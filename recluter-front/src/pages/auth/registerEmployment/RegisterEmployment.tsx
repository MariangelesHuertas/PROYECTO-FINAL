import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { App, Button, Row, Col, Divider } from "antd";
import LoginP from "../../../assets/img/login/login2.svg";
import IconGoogle from "../../../assets/icons/Google.svg";
import InputL from "../../../components/pages/login/InputL";
import IconArrowL from "../../../assets/icons/IconArrowL.svg";
import RedIconX from '../../../assets/icons/RedIconX.svg';
import GreenIconCheck from '../../../assets/icons/GreenIconCheck.svg';
import CheckboxC from "../../../components/checkbox/CheckboxProps";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
//import { RegisterCompanyReducer } from "../../../redux/actions/auth/Auth";
import * as Yup from "yup";
import { RegisterCompanyAuthReducer } from "../../../redux/actions/auth/RegisterCompany";
import { LoginEnterpriseAuthReducer } from "../../../redux/actions/auth/AuthEnterprise";

const validationSchema = Yup.object({
  empresa: Yup.string()
    .required("Por favor ingresa el nombre de tu empresa"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Por favor ingresa el correo electrónico de tu empresa"),
  contrasena: Yup.string()
  //.min(8, "La contraseña debe tener al menos 8 caracteres")
  //.matches(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un símbolo")
  //.required("Por favor ingresa tu contraseña"),
});

const Login: React.FC = () => {
  const { message, notification, modal } = App.useApp();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Para manejar la acción de registro

  const [password, setPassword] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleTermsClick = () => {
    window.open('/securityPolicies', '_blank');
  };

  useEffect(() => {
    setIsLengthValid(password.length >= 8);
    setHasSymbol(/[\W_]/.test(password)); // Verifica si la contraseña tiene un símbolo o carácter especial\
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
  }, [password]);

  const onFinish = async (
    values: any, {
      setSubmitting
    }: {
      setSubmitting: any
    }) => {

    const rpta: any = await dispatch(RegisterCompanyAuthReducer(values));
    if (rpta.respuesta) {
      // notification.success({ message: rpta.mensaje });

      const rpta2: any = await dispatch(LoginEnterpriseAuthReducer({
        usuario: values.email,
        contrasena: values.contrasena
      }));

      if (rpta2.respuesta) {
        notification.success({ message: rpta2.mensaje });
        navigate('/controlPanel');
      } else {
        notification.error({ message: rpta2.mensaje });
      }
      // navigate('/registerEmployment');
    } else {
      notification.error({ message: rpta.mensaje });
    }

    setSubmitting(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


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
          className="mt-[52px]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Row className="mb-4 ml-[35px] justify-start items-center">
            <h1 className="font-semibold text-green32 text-heading-x1">
              <Link
                className="flex items-center font-bold text-heading-x1"
                style={{ color: "#006497" }}
                to="/register"
              >
                <img src={IconArrowL} alt="Arrow Left" className="mr-[15px]" />
                <span className="font-semibold text-green32 text-heading-x1">
                  Volver
                </span>
              </Link>
            </h1>
          </Row>

          <Formik
            initialValues={{
              nombre: '',
              apellido_paterno: '',
              apellido_materno: '',
              usuario: '',
              email: '',
              contrasena: '',
              empresa: '',
              pagina_web: '',
              sede_fiscal: '',
              tamanio: '',
              descripcion: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onFinish}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="login-form max-w-[444px] ml-[72px]">
                <h1 className="text-heading-md font-bold mb-[17px]">
                  Por favor, registra tu cuenta en Merēre
                </h1>
                <h1 className="text-body-sm font-medium mb-[30px]">
                  Para conocer a tus candidatos como nunca antes se había hecho
                </h1>
                <Divider className="text-[#BFBFBF]">
                  <h1 className="text-[#7F7F7F] text-body-sm">Regístrate con</h1>
                </Divider>

                <div
                  className="flex justify-center gap-[19px] mx-auto  my-[40px]"
                  style={{ width: "102px" }}
                >
                  <Button
                    className=" ml-0 principal-nav-notify-button border border-[#E1E1E2] rounded-[12px] h-[44px]"
                    style={{ flex: "1" }}
                    icon={
                      <img
                        src={IconGoogle}
                        alt="Google Icon"
                        className="w-[24px]"
                      />
                    }
                  />
                </div>

                <div className="mb-[47px]">
                  <h1 className="font-medium text-body-md mb-[28px]">
                    ¿Cuál es el nombre de tu empresa? *
                  </h1>
                  <Field name="empresa">
                    {({ field }: any) => (
                      <InputL {...field} placeholder="" customClassName="h-[58px]" />
                    )}
                  </Field>
                  <ErrorMessage name="empresa" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-[47px]">
                  <h1 className="font-medium text-body-md mb-[28px]">
                    ¿Cuál es el correo electrónico de tu empresa? *
                  </h1>
                  <Field name="email">
                    {({ field }: any) => (
                      <InputL {...field} placeholder="" customClassName="h-[58px]" />
                    )}
                  </Field>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-[22px]">
                  <h1 className="font-medium text-body-md mb-[28px]">
                    Por favor crea tu contraseña *
                  </h1>
                  <Field name="contrasena">
                    {({ field }: any) => (
                      <InputL
                        {...field}
                        placeholder=""
                        isPassword
                        customClassName="h-[58px]"
                        value={password}
                        onChange={(e) => {
                          setFieldValue('contrasena', e.target.value)
                          setPassword(e.target.value)
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="contrasena" component="div" className="text-red-500 text-sm" />
                </div>

                <Row className="mb-4 justify-start items-center mt-[34px]">
                  <Col span={24}>
                    <div className="flex items-center mb-2">
                      <img
                        src={isLengthValid ? GreenIconCheck : RedIconX}
                        alt={isLengthValid ? "Green Check" : "Red X"}
                        className="w-[20px] mr-[10px]"
                      />
                      <span style={{ color: isLengthValid ? "#16A249" : "#B3261E", fontSize: "16px", fontWeight: "bold" }}>
                        8 caracteres
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={hasUppercase ? GreenIconCheck : RedIconX}
                        alt={hasUppercase ? "Green Check" : "Red X"}
                        className="w-[20px] mr-[10px]"
                      />
                      <span style={{ color: hasUppercase ? "#16A249" : "#B3261E", fontSize: "16px", fontWeight: "bold" }}>
                        1 mayúscula
                      </span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="flex items-center mb-2">
                      <img
                        src={hasLowercase ? GreenIconCheck : RedIconX}
                        alt={hasLowercase ? "Green Check" : "Red X"}
                        className="w-[20px] mr-[10px]"
                      />
                      <span style={{ color: hasLowercase ? "#16A249" : "#B3261E", fontSize: "16px", fontWeight: "bold" }}>
                        1 minúscula
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={hasNumber ? GreenIconCheck : RedIconX}
                        alt={hasNumber ? "Green Check" : "Red X"}
                        className="w-[20px] mr-[10px]"
                      />
                      <span style={{ color: hasNumber ? "#16A249" : "#B3261E", fontSize: "16px", fontWeight: "bold" }}>
                        1 número
                      </span>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={hasSymbol ? GreenIconCheck : RedIconX}
                        alt={hasSymbol ? "Green Check" : "Red X"}
                        className="w-[20px] mr-[10px]"
                      />
                      <span style={{ color: hasSymbol ? "#16A249" : "#B3261E", fontSize: "16px", fontWeight: "bold" }}>
                        1 símbolo
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* Barra de progreso */}
                <div className="progress-bar-container my-[20px] mt-8 flex">
                  <div
                    className={`progress-bar h-[8px] rounded-full ${isLengthValid || hasUppercase || hasLowercase || hasNumber || hasSymbol
                      ? "bg-[#006497] w-[100px]"
                      : "bg-[#E1E1E1] w-[100px]"
                      }`}
                  />
                  <div
                    className={`progress-bar h-[8px] rounded-full ml-[10px] ${(isLengthValid && (hasUppercase || hasLowercase || hasNumber || hasSymbol)) ||
                      (hasUppercase && (hasLowercase || hasNumber || hasSymbol)) ||
                      (hasLowercase && (hasNumber || hasSymbol)) ||
                      (hasNumber && hasSymbol)
                      ? "bg-[#006497] w-[100px]"
                      : "bg-[#E1E1E1] w-[100px]"
                      }`}
                  />
                  <div
                    className={`progress-bar h-[8px] rounded-full ml-[10px] ${((isLengthValid && hasUppercase && (hasLowercase || hasNumber || hasSymbol)) ||
                      (hasUppercase && hasLowercase && (hasNumber || hasSymbol)) ||
                      (hasLowercase && hasNumber && hasSymbol))
                      ? "bg-[#006497] w-[100px]"
                      : "bg-[#E1E1E1] w-[100px]"
                      }`}
                  />
                  <div
                    className={`progress-bar h-[8px] rounded-full ml-[10px] ${((isLengthValid && hasUppercase && hasLowercase && (hasNumber || hasSymbol)) ||
                      (hasUppercase && hasLowercase && hasNumber && hasSymbol))
                      ? "bg-[#006497] w-[100px]"
                      : "bg-[#E1E1E1] w-[100px]"
                      }`}
                  />
                  <div
                    className={`progress-bar h-[8px] rounded-full ml-[10px] ${(isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSymbol)
                      ? "bg-[#006497] w-[100px]"
                      : "bg-[#E1E1E1] w-[100px]"
                      }`}
                  />
                </div>

                <Row className="mb-4 justify-start items-center mt-[30px]">
                  <h1 className="flex items-center font-semibold text-heading-x1">
                    <CheckboxC
                      className="w-[24px] mr-[22px]"
                      //checked={isCheckboxChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span className=" -ml-3 mt-1 font-medium text-black text-body-sm">
                      Estoy de acuerdo con
                      <span
                        style={{ color: "#00476D", cursor: 'pointer', marginLeft: "5px" }}
                        onClick={handleTermsClick}
                      >
                        términos y condiciones</span>
                    </span>
                  </h1>
                </Row>

                <div className="mt-[40px]">
                  <Button
                    className="bg-blue3 ml-0 mb-10 text-white w-[278px] h-[44px] principal-nav-notify-button2 rounded-[4px]"
                    htmlType="submit"
                    disabled={!isCheckboxChecked || isSubmitting}
                  >
                    Crear cuenta
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
