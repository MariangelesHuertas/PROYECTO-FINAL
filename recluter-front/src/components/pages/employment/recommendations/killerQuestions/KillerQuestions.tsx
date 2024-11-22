import React, { useState } from "react";
import { Typography, Slider, Radio, Input } from "antd";
import CustomInputNumber from "../../../../pages/offers/KillerQuestions/ComponentsKillersQ/CustomInputNumber";
import CustomRadio from "../../../../pages/offers/KillerQuestions/ComponentsKillersQ/CustomRadio";
import CheckQuestion from "../../../../pages/offers/KillerQuestions/ComponentsKillersQ/CheckQuestion";
import CheckboxC from "../../../../../components/checkbox/CheckboxProps";
import { useSelector } from "react-redux";
const { Title } = Typography;

const KillerQuestions = () => {
  const [numValue1, setNumValue1] = useState(0);
  const [numValue2, setNumValue2] = useState(2);
  const [sliderValue, setSliderValue] = useState(1);

  const {
    rex_request
  } = useSelector(({ getKillerQuestions }: any) => getKillerQuestions);

  // Lista de opciones para las casillas
  const checkOptions = [
    "Manejo de la caja y transacciones financieras",
    "Atención directa y asesoramiento a clientes",
    "Organización de productos en las áreas cercanas a la caja",
    "Resolución de incidencias y devoluciones de clientes",
  ];

  return (
    <div>

      {
        rex_request.data.map((question: any, index: number) => {
          return (
            <div className="mb-8">
              <p className="font-bold text-heading-x1 ">
                {index + 1}. {question.pregunta}
              </p>
              {
                question.tipos_preguntas.tipo == 'lineal'
                  ? <div className="max-w-full mt-[10px]">
                    <div className="flex justify-between mb-2 font-medium text-caption">
                      {
                        question.detalle_killers.map((detalle: any) => {
                          return (
                            <span>{detalle.detalle}</span>
                          )
                        })
                      }
                      {/* <span>Mediano</span>
                      <span>Grande</span> */}
                    </div>
                    <Slider
                      min={0}
                      max={question.detalle_killers.length - 1}
                      step={1}
                      value={sliderValue}
                      onChange={setSliderValue}
                      tooltip={{ formatter: null }}
                      trackStyle={{ backgroundColor: "#0778b1" }}
                      railStyle={{ backgroundColor: "#d9d9d9" }}
                    />
                  </div>
                  : question.tipos_preguntas.tipo == 'radio'
                    ? <Radio.Group className="mt-4 font-bold text-body-md">
                      {
                        question.detalle_killers.map((detalle: any) => {
                          return (
                            <CustomRadio value={detalle.detalle}>{detalle.detalle}</CustomRadio>
                          )
                        })
                      }
                    </Radio.Group>
                    : question.tipos_preguntas.tipo == 'numerico'
                      ? <div className="flex flex-wrap items-center mt-[10px]">
                        <CustomInputNumber value={numValue1} onChange={setNumValue1} />
                      </div>
                      : question.tipos_preguntas.tipo == 'checkbox'
                        ? <div className="flex flex-wrap">
                          {question.detalle_killers.map((detalle: any, index: number) => {
                            return (
                              <div key={index} className="flex items-center mb-3 mr-5">
                                <CheckboxC
                                  value={0}
                                  className="mr-[-6px]"
                                // checked={checkedItems[index]}
                                // onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="ml-1 font-bold text-body-md mr-[15px]">{detalle.detalle}</span>
                              </div>
                            )
                          })}
                        </div>
                        : question.tipos_preguntas.tipo == 'respuesta'
                          ? <Input.TextArea
                            rows={5}
                            className="w-full 
                                border
                                my-[8px]
                                border-[#D9D9D9] 
                                placeholder:text-green32 
                                focus:placeholder:text-grays 
                                hover:placeholder:text-black 
                                hover:bg-gray3 
                                hover:border-2 
                                hover:border-[#D9D9D9]
                                hover:text-black 
                                focus:border-4 
                                focus:border-[#91c3fd] 
                                focus:text-[#757575]
                                rounded-[8px] 
                                transition-all 
                                duration-200 
                                text-[#757575]
                                font-normal
                                text-body-md"
                            style={{ height: 80 }}
                          />
                          : null
              }
              {/* <div className="flex flex-wrap items-center">
                <CustomInputNumber value={numValue1} onChange={setNumValue1} />
              </div> */}
            </div>
          )
        })
      }

      {/* Pregunta 1 - Margen numérico */}
      {/* <div className="mb-8">
        <p className="font-bold text-heading-x1 mb-[24px]">
          1. ¿Cuántos años de experiencia tienes trabajando como cajero?
        </p>
        <div className="flex flex-wrap items-center">
          <CustomInputNumber value={numValue1} onChange={setNumValue1} />
        </div>
      </div> */}

      {/* Pregunta 2 - Escala lineal */}
      {/* <div className="mb-8">
        <p className="font-bold text-heading-x1 mb-[24px]">
          2. ¿En qué tipo de supermercado o tienda de tamaño tienes más experiencia: grande, mediano o pequeño?
        </p>
        <div className="max-w-full md:max-w-[420px]">
          <div className="flex justify-between mb-2 font-medium text-caption">
            <span>Pequeño</span>
            <span>Mediano</span>
            <span>Grande</span>
          </div>
          <Slider
            min={0}
            max={2}
            step={1}
            value={sliderValue}
            onChange={setSliderValue}
            tooltip={{ formatter: null }}
            trackStyle={{ backgroundColor: "#0778b1" }}
            railStyle={{ backgroundColor: "#d9d9d9" }}
          />
        </div>
      </div> */}

      {/* Pregunta 3 - Elegir opción */}
      {/* <div className="mb-8">
        <p className="font-bold text-heading-x1 mb-[24px]">
          3. ¿Tienes experiencia en el manejo de múltiples formas de pago, como efectivo, tarjetas de crédito y cheques?
        </p>
        <Radio.Group className="mt-4 font-bold text-body-md">
          <CustomRadio value="si">Sí</CustomRadio>
          <CustomRadio value="no">No</CustomRadio>
        </Radio.Group>
      </div> */}

      {/* Pregunta 4 - Respuesta personalizada */}
      {/* <div className="mb-8">
        <p className="font-bold text-heading-x1 mb-[24px]">
          4. Cuéntame sobre una situación donde tuviste que manejar a un cliente difícil. ¿Cómo resolviste la situación?
        </p>
        <Input.TextArea
          rows={5}
          className="w-full 
                border
                my-[8px]
                border-[#D9D9D9] 
                placeholder:text-green32 
                focus:placeholder:text-grays 
                hover:placeholder:text-black 
                hover:bg-gray3 
                hover:border-2 
                hover:border-[#D9D9D9]
                hover:text-black 
                focus:border-4 
                focus:border-[#91c3fd] 
                focus:text-[#757575]
                rounded-[8px] 
                transition-all 
                duration-200 
                text-[#757575]
                font-normal
                text-body-md"
          style={{ height: 80 }}
        />
        <span className="text-body-md font-normal text-[#757575]">
          Máximo 400 carácteres
        </span>
      </div> */}

      {/* <div className="mb-8">
        <p className="font-bold text-heading-x1 mb-2">
          5. Como cajero, ¿qué actividad prefieres realizar?
        </p>
        <CheckQuestion
          options={checkOptions}
          showAddOption={false}
        />
      </div> */}
    </div>
  );
};

export default KillerQuestions;