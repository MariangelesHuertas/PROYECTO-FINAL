import React, { useState } from "react";
import { Row, Col, Button, Typography, Divider, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EyeFilled } from "@ant-design/icons";
import IconRecommendations from "../../../../assets/icons/recommendations.svg";
import "../../../../components/styles/pages/principalNav/PrincipalNav.css";
import KillerQuestionItem from "../../../../components/pages/offers/KillerQuestions/KillerQuestionItem";
import QuestionModal from "../../../../components/pages/offers/KillerQuestions/ModalOffers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { CreateKillerQuestionReducer } from "../../../../redux/actions/offers/CreateOffers";
import { ResponseFetchInterface } from "../../../../interface/Meta";

const { Text } = Typography;

const KillerQuestions: React.FC = () => {
  const navigate = useNavigate();
  const { idOffer } = useParams<{ idOffer: string }>();
  const dispatch = useDispatch<AppDispatch>();

  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listQuestions, setListQuestions] = useState([
    { tipo_pregunta_id: 1, question: "¿?", options: [], min: 0 }
  ]);

  // Función para mostrar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white pr-6">
      {/* Header */}
      <Row justify="space-between" align="middle" className="mb-6">
        <Col>
          <h1 className="font-extralight text-5xl text-blue3">
            Killer Questions
          </h1>
        </Col>
        <Col className="mt-[13px]">
          <Button className="text-blue3 pl-[30px] border principal-nav-notify-button font-semibold mr-[8px] text-body-sm w-[227px] h-[35px]">
            Formular preguntas con IA
            <img
              src={IconRecommendations}
              className="icon-merere w-[30px]"
              alt="Icon"
            />
          </Button>
          {/* Botón para cargar preguntas, llama a la función showModal */}
          <Button
            className="text-blue3 border principal-nav-notify-button font-semibold text-body-sm w-[227px] h-[35px]"
            onClick={showModal} // Abre el modal al hacer clic
          >
            Cargar preguntas de otra oferta
          </Button>
          {/* Componente del modal */}
          <QuestionModal
            visible={isModalVisible} // Estado de visibilidad del modal
            onClose={closeModal} // Función para cerrar el modal
          />
        </Col>
      </Row>

      {/* Offer Name Input */}
      {/* <Row gutter={24} className="mb-[64px]">
        <Col span={15}>
          <Text className="font-bold text-body-md">Nombre de la oferta</Text>
          <InputC
            placeholder="Nombre"
            className="w-[620px]"
            customClassName="my-[16px]"
          />
          <Text className="text-caption text-green32">
            Escribe un nombre descriptivo, para que te ayude a encontrarla
            después
          </Text>
        </Col>
      </Row> */}

      {/* Pregunta 1 */}
      {
        listQuestions.map((question, index) => {
          return (
            <div className="">
              <KillerQuestionItem
                number={index + 1}
                title={question.question}
                options={question.options}
                changeOptions={(val: any) => {
                  listQuestions[index]['options'] = val;
                  setListQuestions([...listQuestions])
                }}
                placeholder={question.question}
                defaultSelectedOption={question.tipo_pregunta_id}
                changeTitle={(value: string) => {
                  listQuestions[index]['question'] = value;
                  setListQuestions([...listQuestions])
                }}
                changeType={(val: number) => {
                  listQuestions[index]['tipo_pregunta_id'] = val;
                  setListQuestions([...listQuestions])
                }}
                deleteQuestion={() => {
                  listQuestions.splice(index, 1);
                  setListQuestions([...listQuestions])
                }}
              />
            </div>
          )
        })
      }

      <Divider />

      <Button
        className="bg-blue3 text-white rounded-[4px]"
        onClick={() => {
          const newQuestions = [...listQuestions, { tipo_pregunta_id: 1, question: "¿?", options: [], min: 0 }]
          setListQuestions(newQuestions)
        }}
      >
        + Nueva Pregunta
      </Button>

      {/* Acciones */}
      <Row className="justify-end mb-[24px]">
        <Col>
          <Button className="bg-white text-[#5F5F5F] border border-white w-[310px] mr-[8px] principal-nav-notify-button0">
            Cancelar creación de oferta de empleo
          </Button>
        </Col>
        <Col>
          <Button
            className="text-blue3 w-[98px] border principal-nav-notify-button mr-[8px] text-body-md"
            onClick={() => navigate("/offers/createOffer")}
          >
            Volver
          </Button>
        </Col>
        <Col>
          <Button
            className="bg-blue3 text-white w-[251px] principal-nav-notify-button2"
            onClick={async () => {
              const rpta: ResponseFetchInterface = await dispatch(CreateKillerQuestionReducer({
                oferta_id: idOffer ? parseInt(idOffer?.toString()) : 0,
                questions: listQuestions
              }))
              if (rpta.respuesta) {
                notification.success({ message: rpta.mensaje });
                navigate("/offers/open-offers")
              }

            }}
          >
            <EyeFilled className="text-[24px]" /> Vista previa y finalizar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default KillerQuestions;
