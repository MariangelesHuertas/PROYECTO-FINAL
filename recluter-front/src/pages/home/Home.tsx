import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import CardTopHome from '../../components/homes/CardTopHome';
import googleLogo from '../../assets/img/home/Google.svg';
import facebookLogo from '../../assets/img/home/Facebook.svg';
import banner from '../../assets/img/home/Banner.svg';
import valoracion1 from '../../assets/img/home/Valoraciones1.svg';
import valoracion2 from '../../assets/img/home/Valoraciones2.svg';
import valoracion3 from '../../assets/img/home/Valoraciones3.svg';
import '../../styles/pages/home/Home.css';
import { useNavigate, useParams } from 'react-router-dom';
import ModalValorarPerfil from '../../components/pages/modals/ModalValoraPerfil';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const { Meta } = Card;

const Step: React.FC<{ number: number; index: number }> = ({ number, index }) => (
  <div className={`step-home ${index % 2 === 0 ? 'dynamic-left' : ''}`} style={{ left: `${index * 20}%` }}>
    <h3 className="stepNumber-home text-blue3 font-bold">{number}</h3>
    <p className="stepText-home font-sans">Por fin una plataforma que permite que tus referencias te ayuden a encontrar empleo</p>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { link_valoracion } = useParams<{ link_valoracion: string }>();

  const loginGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {

    // window.location.href =`${config.API_URL}auth/google`;
    window.location.href = `${API_URL}auth/google`;

  };

  const loginFacebook = (event: React.MouseEvent<HTMLButtonElement>) => {
    // window.location.href =`${config.API_URL}auth/google`;
    window.location.href = `${API_URL}auth/facebook`;
  };

  return (
    <div>
      <div>
        <CardTopHome />
      </div>
      <style>
        {`
          .cardInfoHome > .ant-card-actions {
            border: none;
          }
          .cardButton-home {
            position: absolute;
            bottom: 16px;
            left: 16px;
          }
        `}
      </style>
      <div className="fullPageContainer-home bg-pink">
        <div className="narrowContent-home">
          <h2 className="heading-home text-blue font-sans">¿Quieres que te contraten por méritos propios?</h2>
          <p className="paragraph-home text-blue font-sans">Por fin una plataforma que permite que tus referencias te ayuden a encontrar empleo</p>
          <div className="buttonContainer-home">
            <button className="button-home" onClick={loginGoogle}>
              <img src={googleLogo} alt="Google" className="h-5 w-5 inline-block" />
              <span className="buttonText-home">Continuar con Google</span>
            </button>
            <button className="button-home" onClick={loginFacebook}>
              <img src={facebookLogo} alt="Facebook" className="h-5 w-5 inline-block" />
              <span className="buttonText-home">Continuar con Facebook</span>
            </button>
            <div className="dividerContainer-home">
              <div className="customDivider-home">O</div>
            </div>
            <input type="email" placeholder="Introducir correo electrónico" className="inputEmail-home" />
            <button
              className="button-home"
              onClick={() => {
                navigate('/login');
              }}
            >
              <span className="buttonText-home">Continuar con correo electrónico</span>
            </button>
          </div>
        </div>
        <div className="wideContent-home object-contain md:object-scale-down">
          <img src={banner} alt="Banner" className="image-home" />
        </div>
      </div>
      <div className="topSection-home">
        <h1 className="topHeading-home text-blue2 font-sans">El portal cargadito de inteligencia artificial para ahorrarte tiempo y objetivos</h1>
        <Row gutter={[16, 16]} className="cardContainer-home">
          <Col xs={24} sm={12} md={8}>
            <Card
              className="cardInfoHome card-home"
              cover={<div className="cardCover-home" />}
              actions={[
                <div className="cardActions-home">
                  <Button className="cardButton-home" key="leer-mas">Leer más</Button>
                </div>,
              ]}
            >
              <Meta className='font-sans'
                title="Completa tu perfil con la ayuda de la Inteligencia artificial en tiempo record"
                description="Gracias a la IA, si utilizas alguna de las plataformas más recurrentes, tu perfil lo puedes crear en un par de clics."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              className="cardInfoHome card-home"
              cover={<div className="cardCover-home" />}
              actions={[
                <div className="cardActions-home">
                  <Button className="cardButton-home" key="leer-mas">Leer más</Button>
                </div>,
              ]}
            >
              <Meta className='font-sans'
                title="Vamos a dar visibilidad a tus méritos"
                description="Quién mejor que tus propios clientes para mostrar a los reclutadores lo que vales. Pide referencias que acrediten como trabajas."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              className="cardInfoHome card-home"
              cover={<div className="cardCover-home" />}
              actions={[
                <div className="cardActions-home">
                  <Button className="cardButton-home" key="leer-mas">Leer más</Button>
                </div>,
              ]}
            >  
              <Meta className='font-sans'
                title="Contacta con los reclutadores que busquen perfiles como tú y sé el primero en enterarte"
                description="Se el primero en apuntarte a las ofertas de la gente que busca trabajadores como tú."
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="bottomSection-home">
        <div className="narrowContent-home">
          <h2 className="bottomHeading-home font-sans font-bold text-blue3">Tus valoraciones responden por ti</h2>
          <div className="steps-home">
            {[1, 2, 3].map((number, index) => (
              <Step key={index} number={number} index={index} />
            ))}
          </div>
        </div>
        <div className="wideContent-home">
          <div className="reviews-home">
            <img src={valoracion1} alt="Valoración 1" className="reviewImage-home reviewImage1-home" />
            <img src={valoracion2} alt="Valoración 2" className="reviewImage-home reviewImage2-home" />
            <img src={valoracion3} alt="Valoración 3" className="reviewImage-home reviewImage3-home" />
          </div>
        </div>
      </div>

      {
        link_valoracion ? (
          <ModalValorarPerfil
            visible={isModalVisible}
            onClose={() => setIsModalVisible(!isModalVisible)}
            entityName=''
            entityType='candidate'
            linkVal={link_valoracion}
          />
        ) : null
      }

{/* visible={isModalVisible}
            onClose={() => setIsModalVisible(!isModalVisible)}
            link={link_valoracion} */}
    </div>
  );
};

export default Home;
