// src/reducers/pages/myPortal/aptitudes/createAptitudUsuarioReducer.ts

import {
    CREATE_APTITUD_USUARIO_REQUEST,
    CREATE_APTITUD_USUARIO_SUCCESS,
    CREATE_APTITUD_USUARIO_FAILURE,
    CreateAptitudUsuarioActionTypes
  } from '../../../../../constants/pages/myPortal/aptitudes/PostAptitud';
  
  interface CreateAptitudUsuarioState {
    rex_loading: boolean;
    rex_error: string | null;
    rex_data: any | null; // Ajusta este tipo según la respuesta de tu API
  }
  
  const initialState: CreateAptitudUsuarioState = {
    rex_loading: false,
    rex_error: null,
    rex_data: null,
  };
  
  const createAptitudUsuarioReducer = (
    state = initialState,
    action: CreateAptitudUsuarioActionTypes
  ): CreateAptitudUsuarioState => {
    switch (action.type) {
      case CREATE_APTITUD_USUARIO_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_error: null,
        };
      case CREATE_APTITUD_USUARIO_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_data: action.payload,
          rex_error: null,
        };
      case CREATE_APTITUD_USUARIO_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default createAptitudUsuarioReducer;