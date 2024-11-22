import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetInscritosByDiaReducer } from '../../../redux/actions/pages/controlPanel/RegisteredCandidates';
import inscritosByDia from '../../../redux/reducers/pages/controlPanel/RegisteredCandidates';

// Datos del gráfico
const data = [
  { date: '13 /06/ 2024', count: 20 },
  { date: '14 /06/   2024', count: 17 },
  { date: '14 /06/   2024', count: 18 },
  { date: '14 /06/   2024', count: 11 },
  { date: '14 /06/   2024', count: 19 },
];

interface formBarras {
  dia: string,
  inscritos: number
}
const CandidatesEnrolledByDay: React.FC = () => {
  const [dataInscritos, setDataInscritos] = useState<any[]>([])

  const dispatch: AppDispatch = useDispatch();
  const {
    rex_inscritoByDia, rex_loading
  } = useSelector(({ inscritosByDia }: RootState) => inscritosByDia);

  /*  const getGrafica = () => {
     if(rex_inscritoByDia){
       console.log(rex_inscritoByDia?.data?.inscritos , "data -----")
       return rex_inscritoByDia?.data?.inscritos.map((rex: any) => ({
         date : rex.dia,
         count: rex.inscritos,
       }));
     }
    
   }; */

  useEffect(() => {
    dispatch(GetInscritosByDiaReducer())
  }, [])

  useEffect(() => {
    if (rex_inscritoByDia) {
      setDataInscritos(rex_inscritoByDia?.data?.inscritos)
      if (dataInscritos != undefined) {
        console.log(dataInscritos[3]?.date, dataInscritos[3]?.count, " se dargo d la data ....")

      }
    }
  }, [rex_inscritoByDia, rex_loading])

  /*   useEffect(()=>{
     // console.log(rex_inscritoByDia?.data?.inscritos , "ESTA BIEN")
      if(rex_inscritoByDia){
        setDataInscritos(rex_inscritoByDia?.data?.inscritos)
      }
        
    } , [rex_inscritoByDia])
    
  
     */





  return (
    <div>

      <h3 className='font-bold text-heading-x1 pb-[25px]'>
        Candidatos inscrito por días
      </h3>
      <div className='ml-[-42px]'>
        {/* <button 
          onClick={() => { 
            console.log(rex_inscritoByDia?.data?.inscritos[0], "se cargo la data") 
          }}
        >
          hola
        </button> */}
        {!rex_loading && dataInscritos != undefined ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={dataInscritos}
              barCategoryGap={32} // Espacio entre las barras
              barSize={32} // Grosor de las barras
            >
              <CartesianGrid
                stroke="#e0e0e0"
                vertical={true}
                horizontal={true}
                strokeDasharray="1 1" // Líneas horizontales guionadas
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#9e9e9e' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                /* ticks={[dataInscritos[0]?.dia || "y", da  taInscritos[dataInscritos.length - 1]?.inscritos || 0]} */
                ticks={[]} // Mostrar solo los valores en los extremos
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#9e9e9e' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                domain={[0, 10]} // Límite del eje Y
                ticks={[0, 10]} // Valores específicos en el eje Y
              />
              <Tooltip
                cursor={{ fill: 'none' }} // Color del cursor
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                }} />
              <Bar dataKey="count" fill="#81BFEC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>cargando ....</p>
        )}
      </div>
    </div>
  );
};

export default CandidatesEnrolledByDay;
