import React from 'react';
import { Card, Row, Col, Avatar, Typography, Space, Divider } from 'antd';
import check from '../../../assets/img/MyPortal/CheckP.svg';
import RatingBlue from '../../rating/RatingBlue';
import { UserRating } from '../../../constants/pages/searchCV/GetRatings';
import CalculateDifferentTime from '../../../utils/CalculateDifferentTime';

const { Text } = Typography;
const IMAGE_USER_DEFAULT = process.env.REACT_APP_IMAGE_USER_DEFAULT;
const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;

const ReviewCard: React.FC<UserRating> = ({
  usuario,
  valoracion,
  observacion,
  createdAt
}) => {
  const fullName = `${usuario.personas.nombre} ${usuario.personas.apellido_paterno} ${usuario.personas.apellido_materno}`;

  return (
    <Card className="rounded-none shadow-xl" style={{ maxWidth: '335px', marginRight: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6} className="flex justify-center items-center">
          <Avatar
            src={
              usuario.imagen
                ? API_BASE_URL_EXACT + usuario.imagen
                : IMAGE_USER_DEFAULT
            }
            size={60} className="rounded-full"
          />
        </Col>
        <Col span={18}>
          <Space direction="vertical" size="small" style={{ rowGap: '3px' }}>
            <div className="flex items-center whitespace-nowrap">
              <Text title={fullName} className="font-bold text-body-md">{fullName}</Text>
              <img src={check} alt="Check" className="ml-1" />
            </div>
            <Text className="text-green42 font-medium text-body-sm">{usuario.cargo}</Text>
            <RatingBlue
              filledStars={Number(valoracion)}
              showRatingValue={false}
              filledStarSize={{ width: '20px', height: '20px', marginRight: '2px', marginTop: '2px' }}
              emptyStarSize={{ width: '24px', height: '24px', marginLeft: '-2px' }}
            />
          </Space>
        </Col>
      </Row>
      {/* <Row className="mt-4">
        <Col span={6}>
          <Text className="font-bold text-greenv text-body-sm">Lo mejor</Text>
        </Col>
        <Col span={18}>
          <Text className="font-bold text-green42 text-body-sm">Aspectos positivos de la experiencia</Text>
        </Col>
      </Row> */}
      {/* <Row className="mt-2">
        <Col span={6}>
          <Text className="font-bold text-orangeo text-body-sm">Lo peor</Text>
        </Col>
        <Col span={18}>
          <Text className="font-bold text-green42 text-body-sm">Aspectos a mejorar</Text>
        </Col>
      </Row> */}
      <Divider />
      <Row className="mt-4">
        <Col span={24}>
          <Text className="font-medium text-green42 text-body-sm">{observacion || 'Sin observaciones'}</Text>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={24} className="flex justify-end">
          <Text className="text-grays font-medium text-caption">
            {/* {new Date(createdAt).toLocaleDateString()} */}
            <CalculateDifferentTime fecha={createdAt} />
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ReviewCard;