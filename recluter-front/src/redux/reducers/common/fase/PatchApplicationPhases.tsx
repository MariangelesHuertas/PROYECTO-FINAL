// src/reducers/updateFasePostulacion.ts

import {
    UPDATE_FASE_POSTULACION_REQUEST,
    UPDATE_FASE_POSTULACION_SUCCESS,
    UPDATE_FASE_POSTULACION_FAILURE,
    UpdateFasePostulacionActionTypes
  } from '../../../../constants/common/fase/PatchApplicationPhases';
  
  interface UpdateFasePostulacionState {
    loading: boolean;
    error: string | null;
    success: boolean;
  }
  
  const initialState: UpdateFasePostulacionState = {
    loading: false,
    error: null,
    success: false,
  };
  
  const updateFasePostulacionReducer = (
    state = initialState,
    action: UpdateFasePostulacionActionTypes
  ): UpdateFasePostulacionState => {
    switch (action.type) {
      case UPDATE_FASE_POSTULACION_REQUEST:
        return { ...state, loading: true, error: null, success: false };
      case UPDATE_FASE_POSTULACION_SUCCESS:
        return { ...state, loading: false, error: null, success: true };
      case UPDATE_FASE_POSTULACION_FAILURE:
        return { ...state, loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  export default updateFasePostulacionReducer;