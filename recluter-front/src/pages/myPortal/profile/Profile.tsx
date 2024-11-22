import React from "react";
import { Card, Row, Col } from "antd";
import imageP from "../../../assets/img/MyPortal/ImageP.svg";
import ProfileInfo from "../../../components/pages/myPortal/ProfileInfo";
import ReviewSection from "../../../components/pages/myPortal/ReviewSection";
import Portfolio from "../../../components/pages/myPortal/Portfolio";
import ViewerList from "../../../components/pages/myPortal/ViewerList";
import Curriculum from "../../../components/pages/myPortal/MyCurriculum";

const ProfilePage: React.FC = () => {
  const profileInfo = {
    aboutMe:
      "Soy un entusiasta del mundo digital con una pasión por transformar datos en decisiones estratégicas...",
    skills: ["Office", "Informática", "Dependiente con experiencia"],
    languages: [
      { name: "Castellano", level: "C2" },
      { name: "Catalán", level: "C2" },
      { name: "Inglés", level: "B1" },
    ],
  };

  const reviews = [
    {
      name: "Elena R.",
      jobTitle: "Vendedor textil",
      rating: 4,
      pros: "Teletrabajo. Gestión del horario.",
      cons: "No enriquecerte de un gran equipo de trabajo",
      review: "100% recomendable...",
      avatarUrl: imageP,
      timeAgo: "Hace 3 semanas",
    },
  ];

  const viewers = [
    {
      logoUrl:
        "https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png",
      name: "Supermercados Carrefour",
      timeAgo: "Hace 11 horas",
    },
    {
      logoUrl:
        "https://popgroup.global/wp-content/uploads/2017/11/carrefour-logo-1.png",
      name: "Mercadona",
      timeAgo: "Hace 3 días",
    },
  ];

  return (
    <div className="bg-white pl-6">
      <Row gutter={[16, 16]}>
        <Col xxl={24} xs={24} md={24}>
          <Card className='rounded-lg border border-sky-blue0'>
            <div id="profile-info-section">
              <ProfileInfo {...profileInfo} />
            </div>
            <div id="review-section">
              <ReviewSection />
            </div>
            <div id="portfolio-section">
              <Portfolio />
            </div>
            <div id="curriculum-section">
              <Curriculum/>
            </div>
            {/* <div id="viewer-list-section">
              <ViewerList viewers={viewers} />
            </div> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;