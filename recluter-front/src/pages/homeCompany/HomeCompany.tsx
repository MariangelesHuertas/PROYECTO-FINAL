import React from "react";
import { Row, Col, Input, Button, Card } from "antd";

import frameImage from "../../assets/img/homeCompany/Frame.svg";
import group25Image from "../../assets/img/homeCompany/Group 25.svg";
import grupImage from "../../assets/img/homeCompany/Group.svg";
import rectangleImage from "../../assets/img/homeCompany/Rectangle.svg";
import section2 from "../../assets/img/homeCompany/section21.svg";
import section3 from "../../assets/img/homeCompany/section3.svg";
import section4 from "../../assets/img/homeCompany/section4.svg";
import ats from "../../assets/img/homeCompany/ATS.svg";
import ia from "../../assets/img/homeCompany/IA.svg";
import sections5 from "../../assets/img/homeCompany/section5.svg";
import "../../styles/pages/homeCompany/HomeCompany.css";
import CardTopHome from "../../components/homes/CardTopHome";
import { useNavigate } from "react-router-dom";

const HomeCompany: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <CardTopHome />
      </div>
      <div className="container-homeCompany">
        {/* Primera sección */}
        <div className="section section1 ">
          <Row>
            <Col xs={24} md={12} className="padding0">
              <div className="textColumn0">
                <h1 className="title0 text-blue0 font-sans xs:text-heading-sm sm:text-heading-sm md:text-heading-sm lg:text-body-xl 2x3:text-heading-lg">
                  Conoce a tus candidatos como nunca antes se había hecho
                </h1>
                <p className="description text-blue0 font-sans 2x3:text-body-md xs:text-body-xs sm:text-body-xs md:text-body-xs lg:text-body-sm">
                  Busca por características basadas en los soft skills, verifica
                  los usuarios mediante sus valoraciones y deja que la
                  Inteligencia Artificial haga tu trabajo más fácil.
                </p>
              </div>
              <div className="butonContainers">
                <Input
                  placeholder="Introducir correo electrónico"
                  className="input"
                />
                <Button 
                  type="primary" className="button0"
                  onClick={() => {
                    navigate('/login-enterprise');
                  }}
                >
                  Continuar con correo electrónico
                </Button>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <img src={rectangleImage} alt="Rectangle" className="image0" />
              <img src={grupImage} alt="Radar" className="image1" />
              <img src={group25Image} alt="Ratings" className="image2" />
              <img src={frameImage} alt="Candidate" className="image3" />
              <img src={ats} alt="ATS" className="image4" />
              <img src={ia} alt="IA" className="image5" />
            </Col>
          </Row>
        </div>

        {/* Segunda sección */}
        <div className="section0 section2">
          <Row>
            <Col xs={24} md={12} className="padding">
              <div className="textColumn2">
                <h1 className="title2 text-black 2x3:text-heading-md xs:text-heading-sm sm:text-heading-sm md:text-heading-sm lg:text-heading-sm">
                  Merêre es el símbolo del Mérito
                </h1>
                <p className="description2 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-body-xs lg:text-body-sm">
                  En Merêre, creemos que quienes mejor desempeñan su trabajo
                  merecen encontrarlos más rápidamente.
                </p>
                <p className="description2 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-body-xs lg:text-body-sm">
                  Optimizamos la contratación alineando la personalidad de los
                  candidatos con las exigencias de sus roles. Esto reduce la
                  rotación laboral y mejora la satisfacción y productividad en el
                  trabajo.
                </p>
                <p className="description0 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-body-xs lg:text-body-sm">
                  Nos enfocamos en establecer relaciones laborables duraderas,
                  donde cada trabajador se siente valorado y escencial para el
                  exito de la empresa.
                </p>
                <Button
                  type="primary"
                  className="button2 bg-sky-blue0 text-black text-body-md"
                >
                  Únete a nosotros
                </Button>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Card className="card1">
                <img src={section2} alt="section2" className="image7" />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Tercera sección */}
        <div className="section0 section3">
          <Row>
            <Col xs={24} md={12} className="imageColumn3">
              <Card hoverable className="card2 bg-green2">
                <img src={section3} alt="section3" className="image9" />
              </Card>
            </Col>
            <Col xs={24} md={12} className="padding2">
              <div className="textColumn3">
                <h1 className="title3 2x3:text-heading-md xs:text-heading-sm lg:text-body-xl 2x2:text-heading-lg">
                  Optimización de tareas mediante ATS
                </h1>
                <p className="description3 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-caption lg:text-body-sm xl:text-body-xs">
                  Merêre acelera la integración de perfiles con las necesidades de roles, facilitando la colocación eficiente de candidatos.
                  Gracias a la compatibilidad con sistemas ATS, las empresas pueden gestionar aplicaciones eficientemente, acelerar los tiempos de contratación y mejorar la experiencia del candidato,asegurando relaciones laborales duraderas y productivas.
                </p>
                <Button
                  type="primary"
                  className="button3 bg-sky-blue0 text-black text-body-md"
                >
                  Únete a nosotros
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Cuarta sección */}
        <div className="section0 section4">
          <Row>
            <Col xs={24} md={12} className="padding3">
              <div className="textColumn4">
                <h1 className="title4 2x3:text-heading-md xs:text-heading-sm md:text-body-xs lg:text-heading-x1 xl:text-heading-sm 2x2:text-heading-lg">
                  A la vanguardia de la tecnología con la Inteligencia Artificial
                  aplicada a los procesos de selección
                </h1>
                <p className="description4 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-caption lg:text-body-sm xl:text-body-xs mb-4">
                  Descubre cómo la inteligencia artificial revoluciona la forma en
                  que conectamos candidatos y empresas. La IA no solo optimiza la
                  búsqueda y selección de talento al predecir el ajuste perfecto
                  entre candidatos y roles, sino que también simplifica los
                  procesos, haciendo que la contratación sea más rápida y menos
                  tediosa.
                </p>
                <p className="description4 2x3:text-heading-x1 xs:text-body-xs sm:text-body-xs md:text-caption lg:text-body-sm xl:text-body-xs">
                  Con nuestra tecnología, la eficiencia se encuentra con la
                  efectividad, haciendo que cada paso del proceso de reclutamiento
                  sea más fácil y más inteligente.
                </p>
                <Button
                  type="primary"
                  className="button4 bg-sky-blue0 text-black"
                >
                  Únete a nosotros
                </Button>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Card className="card4 bg-pink4">
                <img src={section4} alt="section4" className="image10" />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Quinta sección */}
        <div className="section0 section5">
          <Row>
            <Col xs={24} md={12}>
              <Card className="card5 bg-blue1">
                <img src={sections5} alt="los" className="image11 2x2:top-1" />
              </Card>
            </Col>
            <Col xs={24} md={12} className="padding4">
              <div className="textColumn5">
                <h1 className="title5 2x3:text-heading-md xs:text-heading-sm lg:text-body-xl 2x2:text-heading-lg">
                  Visibilidad sin coste de Los Rockies
                </h1>
                <p className="description5 2x3:text-heading-x1 sm:text-body-caption xl:text-body-md 2x2:text-heading-x1">
                  Nuestra iniciativa para dar visibilidad a talentos sin
                  experiencia previa, como estudiantes o quienes entran al mercado
                  laboral por primera vez.
                </p>
                <p className="description5 2x3:text-heading-x1 sm:text-body-caption xl:text-body-md 2x2:text-heading-x1">
                  En nuestro portal, ofrecemos a los reclutadores acceso gratuito
                  a los CVs de estos candidatos, permitiéndoles descubrir y
                  potenciar nuevas habilidades que son cruciales para el
                  crecimiento y la diversidad de sus equipos.
                </p>
                <Button
                  type="primary"
                  className="button5 bg-sky-blue0 text-black"
                >
                  Únete a nosotros
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>

  );
};

export default HomeCompany;
