import React from "react";
import { Card, Col, Row, Skeleton} from "antd";
import "tailwindcss/tailwind.css";
import ButtonText from "../../../components/button/ButtonText";
import moment from "moment";

interface CardOffersProps {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  activeDate: string;
  inscritos: number;
  seleccionados: number;
  descartados: number;
  loading: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: (id: number) => void;
  onFinalize?: (id: number) => void;
  onDraft?: (id: number) => void;
}

const CardOffers: React.FC<CardOffersProps> = ({
  id,
  title,
  subtitle,
  location,
  activeDate,
  inscritos,
  seleccionados,
  descartados,
  loading,
  onClick,
}) => {

  return (
    <Card
      key={id}
      onClick={onClick}
      className="cursor-pointer bg-white shadow-md border-greene rounded-[4px] hover:shadow-lg transition-all duration-200"
    >
      <Skeleton loading={loading} active>
        <div className="flex items-center justify-between mb-[-4px] mt-[-5px]">
          <ButtonText
            buttons={[
              {
                type: "link",
                label: title,
                size: "middle",
                textColor: "#006497",
                fontWeight: "bold",
              },
            ]}
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>
        <p
          className="text-body-md mb-[4px]"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        ></p>
        <div className="text-body-sm font-normal mb-[4px]">
          {location} |{" "}
          <ButtonText
            buttons={[
              {
                type: "link",
                label: moment(activeDate).format("DD-MM-YYYY HH:mm"),
                size: "small",
                textColor: "#006497",
                fontWeight: "normal",
              },
            ]}
            className="Btn-Offer-List-SidebarOffer"
          />
        </div>
        <Row gutter={[10, 10]} className="">
          <Col xs={24} sm={6} md={4} lg={2}>
            <div className="font-bold text-caption">{inscritos} inscritos</div>
          </Col>
          <Col xs={24} sm={8} md={5} lg={3}>
            <div className="font-bold text-caption">
              {seleccionados} seleccionados
            </div>
          </Col>
          <Col xs={24} sm={8} md={5} lg={3}>
            <div className="font-bold text-caption">
              {descartados} descartados
            </div>
          </Col>
        </Row>
      </Skeleton>
    </Card>
  );
};

export default CardOffers;
