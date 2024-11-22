import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import '../../../styles/pages/controlPanel/ControlPanel.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { GetCandidateSummaryReducer } from '../../../redux/actions/pages/controlPanel/CandidateSummary';

// Datos del gráfico
const data = [
  { name: 'Pasan KQ', value: 1200 },
  { name: 'Siguiente fase', value: 1200 },
  { name: 'Descartados', value: 1200 },
];

// Colores correspondientes a cada sector del gráfico
const COLORS = ['#C4DEFE', '#C9C4FE', '#FEC4E0'];

const SummaryOfCandidates: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_candidateSummary, rex_loading
  } = useSelector(({ candidateSummaryReducer }: RootState) => candidateSummaryReducer);

  useEffect(() => {
    dispatch(GetCandidateSummaryReducer())
  }, [])

  const totalCandidates = () => {
    let total = 0
    if(rex_candidateSummary?.data){
      rex_candidateSummary?.data?.map((dat: any) => {
        total += dat.value
      })
    }

    return total;
  }

  return (
    <div>
      {/* Título general para ambos gráficos */}
      <h3 className="font-bold text-heading-x1 pb-[5px]">
        Sumario de candidatos
      </h3>

      {/* Contenedor para los gráficos y leyenda */}
      <div className='flex pl-[34px]'>
        {/* <button
          onClick={() => {
            console.log(rex_candidateSummary.data);
            
          }}
        >
a
        </button> */}
        {/* Gráfico de pastel */}
        <div>
          {
            rex_candidateSummary?.data?.length > 0 ? (
              <ResponsiveContainer width={160} height={160}>
                <PieChart className='Pie-Panel-Control'>
                  <Pie
                    data={rex_candidateSummary.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50} // Radio interno del donut
                    outerRadius={80} // Radio externo del donut
                    startAngle={90}  // Ajusta el ángulo de inicio para la rotación
                    endAngle={450}   // Ajusta el ángulo final para la rotación
                    paddingAngle={0} // Espaciado entre segmentos
                    dataKey="value"
                    stroke="none"    // Sin borde en los segmentos
                  >
                    {rex_candidateSummary.data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={{ fill: 'none' }} // Color del cursor
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
                    }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              null
            )
          }

        </div >

        {/* Leyenda y total de candidatos */}
        < div style={{ textAlign: 'left', marginLeft: '25px' }}>
          <p
            className='font-medium text-body-md text-[#6E6E6E]'

          >Total candidatos</p>
          <h2 className='font-bold text-heading-md pb-[16px]'>
            {/* 3.567 */}
            {
              totalCandidates()
            }
          </h2>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {rex_candidateSummary?.data?.map((entry: any, index: number) => (
              <li key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: '2px',
                  marginRight: '8px',
                  fontWeight: '500'
                }}></span>
                <span className='text-caption font-medium pb-1'>{entry.name}</span>
              </li>
            ))}
          </ul>
        </div >
      </div >
    </div >
  );
};

export default SummaryOfCandidates;
