import React from 'react';

const CustomLegend = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#1A1A1A', fontSize: 14, marginRight: '6px', fontWeight: 'bold', opacity: 0.5 }}>Perfil del candidato</span>
        <div style={{ width: 12, height: 12, backgroundColor: '#006497', marginRight: '8px' }}></div>

      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#1A1A1A', fontSize: 14, marginRight: '6px', fontWeight: 'bold', opacity: 0.5 }}>Perfil de la oferta</span>
        <div style={{ width: 12, height: 12, backgroundColor: '#FDBCB4', marginRight: '8px' }}></div>

      </div>
    </div>
  );
};

export default CustomLegend;
