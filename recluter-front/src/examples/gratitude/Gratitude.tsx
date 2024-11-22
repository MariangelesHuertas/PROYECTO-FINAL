import React from 'react';
import banner from '../../assets/imageGratitude/BannerGratitude.png';
import logoG from '../../assets/imageGratitude/logoGratitude.svg';
import facebook from '../../assets/imageGratitude/facebook.svg';
import email from '../../assets/imageGratitude/email.svg';
import twitter from '../../assets/imageGratitude/twitter.svg';
import whatsapp from '../../assets/imageGratitude/whatsapp.svg';
import compartir from '../../assets/imageGratitude/compartir.svg';
import './Gratitude.css';

const Gratitude: React.FC = () => {
  return (
    <div className="gratitude-container">
      <div className="banner-gratitude">
        <img src={logoG} alt="Kommmunity.com" className="logo-gratitude" />
        <img src={banner} alt="Gracias" className="banner-image-gratitude" />
      </div>
      <div className="content-gratitude">
        <h1 className="title-gratitude">¡Gracias por registrarte al evento!</h1>
        <button className="action-button-gratitude">Agregar al calendario</button>
        <p className="subtitle-gratitude">Tu lugar ya está reservado</p>
        <p className="description-gratitude">
          Revisa tu correo, en breve recibirás el link de acceso al evento.<br />
          <span className="event-date"> Tenemos una cita el [00/00/00] a las [00:00] h UTC-6</span><br />
          <span className="extra-information-gratitude"> También puedes encontrar el evento en el apartado “Mis eventos” dentro de la plataforma.</span>
        </p>
        <button className="my-events-button-gratitude">Ver mis eventos</button>
      </div>
      <div className="footer-gratitude">
        <p className="share-text-gratitude">Comparte con tus colegas</p>
        <div className="social-icons-gratitude">
          <img src={facebook} alt="Facebook" />
          <img src={twitter} alt="Twitter" />
          <img src={whatsapp} alt="WhatsApp" />
          <img src={email} alt="Email" />
          <img src={compartir} alt="Compartir" />
        </div>
      </div>
    </div>
  );
}

export default Gratitude;
