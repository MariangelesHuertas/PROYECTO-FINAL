import React, { useState } from "react";
import { Row, Col, Typography, Checkbox, Slider, Radio, Divider } from "antd"; // Make sure Radio is imported
import { PlusOutlined } from "@ant-design/icons";
import QuestionTypeSelect from "./ComponentsKillersQ/QuestionTypeSelect";
import InputC from "./ComponentsKillersQ/Input";
import CustomInputNumber from "./ComponentsKillersQ/CustomInputNumber";
import InputNumber from "./ComponentsKillersQ/InputNumber";
import CheckboxC from "../../../../components/checkbox/CheckboxProps";
import CustomRadio from "./ComponentsKillersQ/CustomRadio"; // Import the CustomRadio component
import CheckQuestion from "./ComponentsKillersQ/CheckQuestion"; // Import the CheckQuestion component
import Ckeditor from '../../../../components/pages/offers/CreateOffers/Ckeditor';
// Icons
import IconPlusBlue from '../../../../assets/icons/plusBlue.svg';
import IconMinusBlue from '../../../../assets/icons/minusBlue.svg';
import IconTrashWhiteBlue from '../../../../assets/icons/trashWhiteBlue.svg';

const { Title } = Typography;

const CustomSlider = ({
  options, setOptions
}: any) => {
  const [value, setValue] = useState(1);
  // const [options, setOptions] = useState<string[]>([""]);

  return (
    <div className="max-w-full ">
      <div className="flex justify-between mb-2">
        {
          options.map((opt: string) => {
            return (
              <span>{opt}</span>
            )
          })
        }
        {/* <span>Pequeño</span>
        <span>Mediano</span>
        <span>Grande</span> */}
      </div>
      <Slider
        min={0}
        max={options.length - 1}
        step={1}
        value={value}
        onChange={setValue}
        tooltip={{ formatter: null }}
        trackStyle={{ backgroundColor: "#0778b1" }}
        railStyle={{ backgroundColor: "#d9d9d9" }}
      />
      <Divider />
      <div
        style={{
          display: 'flex',
          color: '#52525B',
          fontSize: '14px',
          fontFamily: 'Inter',
          cursor: 'pointer',
          alignItems: 'center',
          marginBottom: '5px'
        }}
        onClick={() => {
          const newOptions = [...options, ""]
          setOptions(newOptions)
        }}
      >
        <img src={IconPlusBlue} style={{ marginRight: '5px' }} />Añadir Opción:
      </div>
      <Row
        gutter={36}
      >
        {
          options.map((opt: string, index: number) => {
            return (
              <Col
                xxl={12}
                xl={12}
              >
                <div
                  style={{ display: 'flex', marginBottom: '10px' }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      marginRight: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1})
                  </div>
                  <InputC
                    style={{ height: '35px' }}
                    onChange={(e) => {
                      options[index] = e.target.value
                      setOptions([...options])
                    }}
                    value={opt}
                  />
                  <img
                    src={IconMinusBlue} style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => {
                      console.log(index);

                      options.splice(index, 1);
                      console.log(options);
                      setOptions([...options])
                    }}
                  />
                </div>
              </Col>
            )
          })
        }
      </Row>

    </div >
  );
};

const CustomOptions = ({
  options, setOptions
}: any) => {

  return (
    <div className="max-w-full ">
      <Radio.Group className="mt-4 font-bold text-body-md">
        {
          options.map((opt: string) => {
            return (
              <CustomRadio value={opt}>{opt}</CustomRadio>
            )
          })
        }
      </Radio.Group>
      <Divider />
      <div
        style={{
          display: 'flex',
          color: '#52525B',
          fontSize: '14px',
          fontFamily: 'Inter',
          cursor: 'pointer',
          alignItems: 'center',
          marginBottom: '5px'
        }}
        onClick={() => {
          const newOptions = [...options, ""]
          setOptions(newOptions)
        }}
      >
        <img src={IconPlusBlue} style={{ marginRight: '5px' }} />Añadir Opción:
      </div>
      <Row
        gutter={36}
      >
        {
          options.map((opt: string, index: number) => {
            return (
              <Col
                xxl={12}
                xl={12}
              >
                <div
                  style={{ display: 'flex', marginBottom: '10px' }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      marginRight: '6px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1})
                  </div>
                  <InputC
                    style={{ height: '35px' }}
                    onChange={(e) => {
                      options[index] = e.target.value
                      setOptions([...options])
                    }}
                    value={opt}
                  />
                  <img
                    src={IconMinusBlue} style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => {
                      options.splice(index, 1);
                      setOptions([...options])
                    }}
                  />
                </div>
              </Col>
            )
          })
        }
      </Row>

    </div >
  );
};

const CustomDiferentsOptions = ({
  options, setOptions
}: any) => {

  // const [options, setOptions] = useState<string[]>([
  //   "Manejo de la caja y transacciones financieras",
  //   "Atención directa y asesoramiento a clientes",
  //   "Organización de productos en las áreas cercanas a la caja",
  //   "Resolución de incidencias y devoluciones de clientes",
  // ]);

  return (
    <div className="max-w-full ">
      <div className="">
        {options.map((option: string, index: number) => (
          <div key={index} className="flex items-center mb-3 mr-5">
            <CheckboxC
              value={0}
              className="mr-[-6px]"
            // checked={checkedItems[index]}
            // onChange={() => handleCheckboxChange(index)}
            />
            {/* <span className="ml-1 font-bold text-body-md mr-[15px]">{option}</span> */}
            <InputC
              value={option}
              className="ml-1 font-bold text-body-md mr-[15px]"
              style={{ height: '35px', marginLeft: '10px', marginRight: '20px' }}
              onChange={(e) => {
                options[index] = e.target.value
                setOptions([...options])
              }}
            />
            <img
              src={IconTrashWhiteBlue} style={{ cursor: 'pointer', marginLeft: '-5px', width: '22px' }}
              onClick={() => {
                options.splice(index, 1);
                setOptions([...options])
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          color: '#52525B',
          fontSize: '14px',
          fontFamily: 'Inter',
          cursor: 'pointer',
          alignItems: 'center',
          marginBottom: '5px'
        }}
        onClick={() => {
          const newOptions = [...options, ""]
          setOptions(newOptions)
        }}
      >
        <img src={IconPlusBlue} style={{ marginRight: '5px' }} />Añadir Nueva Casilla:
      </div>
    </div >
  );
};

const KillerQuestionItem = ({
  number,
  title,
  options,
  changeOptions,
  defaultSelectedOption = "Margen numérico",
  changeTitle,
  changeType,
  deleteQuestion
}: any) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption);
  const [numValue1, setNumValue1] = useState(0);
  const [numValue2, setNumValue2] = useState(2);
  // const [options, setOptions] = useState<string[]>([""]);

  const renderAdditionalContent = () => {
    switch (selectedOption) {
      case 2: //"Escala lineal"
        return <CustomSlider options={options} setOptions={changeOptions} />;
      case 3: //"Elegir opción"
        return (
          <CustomOptions options={options} setOptions={changeOptions} />
        );
      case 4: //"Respuesta personalizada"
        return null;
      case 5: //"Diferentes casillas"
        return (
          <CustomDiferentsOptions options={options} setOptions={changeOptions} />
          // <CheckQuestion
          //   options={checkOptions}
          //   onAddOption={handleAddCheckOption}
          //   showAddOption={true}
          // />
        );
      default:
        return (
          <div className="flex flex-wrap items-center">
            <CustomInputNumber value={numValue1} onChange={setNumValue1} />
            <h1 className="mt-0 pl-[43px] mr-[55px] font-medium text-gray">
              {/* <PlusOutlined
                onClick={() => console.log("Plus button clicked")}
                className="text-blue3 text-body-sm pr-[8px]"
              />
              Añadir campo numérico */}
            </h1>

            <CheckboxC value={0} children={undefined} />
            <h1 className="text-gray-600 font-medium text-gray mr-[0px]">
              Descartar candidato si es inferior a
            </h1>
            <InputNumber value={numValue2} onChange={setNumValue2} />
          </div>
        );
    }
  };

  return (
    <div className="mb-8 p-4">
      {/* <Title level={4} className="font-bold text-heading-x1 mb-2 text-center md:text-left">
        {number}. <InputC defaultValue={title}  />
      </Title> */}
      <div
        style={{ display: 'flex', placeItems: 'center' }}
        className="font-bold text-heading-x1 mb-2 text-center md:text-left"
      >
        {number}.
        <InputC
          // style={{ marginLeft: '10px' }}
          defaultValue={title}
          value={title}
          onChange={(e) => {
            changeTitle(e.target.value)
          }}
          style={{ marginLeft: '10px', marginRight: '20px' }}
        />
        <img
          src={IconTrashWhiteBlue} style={{ cursor: 'pointer', marginLeft: '-5px', width: '22px' }}
          onClick={() => deleteQuestion()}
        />
      </div>
      <Row gutter={[16, 16]}>
        {/* <Col xs={24} md={15}>
          <div className="w-full mb-4">
            <Ckeditor mode="killerQuestions" placeholder={placeholder} />
          </div>
          </Col> */}
        <Col xs={24} md={15}>
          {renderAdditionalContent()}
        </Col>
        <Col xs={24} md={9} className="">
          <QuestionTypeSelect
            onChange={(e) => {
              setSelectedOption(e)
              changeType(e)
            }}
            defaultValue={selectedOption}
          />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
      </Row> */}
    </div>
  );
};

export default KillerQuestionItem;