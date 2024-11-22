import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { getCvGeneralByIdReducer } from '../../../../redux/actions/pages/searchCV/GetSearchCV_ID';

const API_BASE_URL_EXACT = process.env.REACT_APP_API_BASE_URL_EXACT;
const BANNER_DEFAULT = process.env.REACT_APP_BANNER_DEFAULT;

const CompanyHeader: React.FC = () => {
  const {
    cvGeneralById,
    loading,
    error
  } = useSelector((state: RootState) => state.getSearchIDCV);

  // Verificar si cvGeneralById es nulo o indefinido antes de acceder a sus propiedades
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  // Validamos cvGeneralById y cvGeneralById.data antes de acceder a ellos
  if (!cvGeneralById || !cvGeneralById.data) {
    return <div>No se encontró el candidato</div>;
  }

  const candidato = cvGeneralById.data;

  return (
    <div
      style={{
        backgroundImage: `url(${candidato && candidato.imagen_banner ? API_BASE_URL_EXACT + candidato.imagen_banner : BANNER_DEFAULT})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%'
      }}
    >
      {candidato.imagen_banner}
    </div>
  );
};

export default CompanyHeader;
