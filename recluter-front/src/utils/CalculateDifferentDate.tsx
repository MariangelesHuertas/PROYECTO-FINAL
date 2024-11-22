import React from "react";

// Función que calcula la diferencia en tiempo entre la fecha actual y una fecha proporcionada (en formato ISO)
const calcularDiferenciaFecha = (fechaProporcionada: string): string => {
  const fechaActual = new Date();
  const fecha = new Date(fechaProporcionada); // Convertimos la cadena ISO a un objeto Date
  const diferenciaMs = fechaActual.getTime() - fecha.getTime();

  // Unidades de tiempo en milisegundos
  const UN_SEGUNDO = 1000;
  const UN_MINUTO = UN_SEGUNDO * 60;
  const UNA_HORA = UN_MINUTO * 60;
  const UN_DIA = UNA_HORA * 24;
  const UN_MES = UN_DIA * 30.44; // Aproximado
  const UN_ANIO = UN_DIA * 365.25; // Aproximado

  if (diferenciaMs >= UN_ANIO) {
    const años = Math.floor(diferenciaMs / UN_ANIO);
    return `hace ${años} año${años > 1 ? "s" : ""}`;
  } else if (diferenciaMs >= UN_MES) {
    const meses = Math.floor(diferenciaMs / UN_MES);
    return `hace ${meses} mes${meses > 1 ? "es" : ""}`;
  } else if (diferenciaMs >= UN_DIA) {
    const dias = Math.floor(diferenciaMs / UN_DIA);
    return `hace ${dias} día${dias > 1 ? "s" : ""}`;
  } else if (diferenciaMs >= UNA_HORA) {
    const horas = Math.floor(diferenciaMs / UNA_HORA);
    return `hace ${horas}h`;
  } else if (diferenciaMs >= UN_MINUTO) {
    const minutos = Math.floor(diferenciaMs / UN_MINUTO);
    return `hace ${minutos}m`;
  } else {
    const segundos = Math.floor(diferenciaMs / UN_SEGUNDO);
    return `hace ${segundos}s`;
  }
};

// Componente funcional que recibe una fecha en formato ISO y muestra la diferencia
interface DiferenciaFechaProps {
  fecha: string; // Ahora el tipo es string para aceptar una fecha en formato ISO
}

const DiferenciaFecha: React.FC<DiferenciaFechaProps> = ({ fecha }) => {
  return <span>Subida {calcularDiferenciaFecha(fecha)}</span>;
};

export default DiferenciaFecha;
