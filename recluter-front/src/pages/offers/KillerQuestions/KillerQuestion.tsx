import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import KillerQuestions from "../../../components/pages/offers/KillerQuestions/KillerQuestions";
import OfferDescription from "../../../components/pages/offers/KillerQuestions/SidebarOfferDescription";
import Header from "../../../components/pages/principalNav/HeaderOffers";
import icons from "../../../assets/icons/right.svg";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const CreateOffer2: React.FC = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobDetails = [
    "2 años de experiencia",
    "ESO",
    "Jornada completa",
    "Mañana y tarde",
    "Retail",
  ];

  const skills = ["Office", "Atención al público", "Inglés"];

  const keywords = [
    "Campo de Criptana",
    "Alcázar de San Juan",
    "Herencia",
    "ESO",
    "Más de 2 años de experiencia",
  ];

  return (
    <>
      <Header />
      <Formik
        initialValues={{
          jobTitle: "Cajero de supermercado",
          jobLocation: "Campo de Criptana, CR",
          salaryRange: "18.000-20.000€",
          jobDetails: jobDetails,
          skills: skills,
          keywords: keywords,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="bg-white px-[24px] py-[24px]">
              <Row>
                <Col>
                  <h1
                    onClick={() => {
                      navigate("/offers")
                    }}
                    className="font-bold text-heading-md text-blue3 cursor-pointer"
                  >
                    Ofertas{" "}
                    <img
                      src={icons}
                      alt="Right Arrow"
                      className="inline mx-[8px]"
                    />
                  </h1>
                </Col>
                <Col>
                  <h1
                    onClick={() => {
                      navigate("/offer/createOffer")
                    }}

                    className="font-bold text-heading-md text-blue3 cursor-pointer"
                  >
                    Creación de nueva oferta de empleo{" "}
                    <img
                      src={icons}
                      alt="Right Arrow"
                      className="inline mx-[8px]"
                    />
                  </h1>
                </Col>
                <h1 className="font-bold text-heading-md">Killer questions</h1>
                <Col></Col>
                <Divider className=" bg-grays"></Divider>
              </Row>

              <div className="flex">
                <div className="flex-1">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                      <div className="pt-3">
                        <KillerQuestions />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div
                  style={{ width: "234px", backgroundColor: "white" }}
                  className="hidden lg:block"
                >
                  <OfferDescription
                    jobTitle={values.jobTitle}
                    jobLocation={values.jobLocation}
                    salaryRange={values.salaryRange}
                    jobDetails={values.jobDetails}
                    skills={values.skills}
                    keywords={values.keywords}
                  />
                </div>

                <Button
                  type="primary"
                  className="lg:hidden mb-4"
                  onClick={() => setDrawerVisible(true)}
                  icon={<MenuOutlined />}
                />

                <Drawer
                  title={null}
                  placement="right"
                  drawerStyle={{ padding: 0 }}
                  width={265}
                  onClose={() => setDrawerVisible(false)}
                  open={drawerVisible}
                  className="lg:hidden"
                >
                  <OfferDescription inDrawer
                    jobTitle={values.jobTitle}
                    jobLocation={values.jobLocation}
                    salaryRange={values.salaryRange}
                    jobDetails={values.jobDetails}
                    skills={values.skills}
                    keywords={values.keywords}
                  />
                </Drawer>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateOffer2;
