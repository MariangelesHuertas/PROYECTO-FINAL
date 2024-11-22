// src/reducers/pages/myPortal/aptitudes/deleteAptitudUsuarioReducer.ts

import {
    DELETE_APTITUD_USUARIO_REQUEST,
    DELETE_APTITUD_USUARIO_SUCCESS,
    DELETE_APTITUD_USUARIO_FAILURE,
    DeleteAptitudUsuarioActionTypes
  } from '../../../../../constants/pages/myPortal/aptitudes/DeleteAptitud';
  
  interface DeleteAptitudUsuarioState {
    rex_loading: boolean;
    rex_error: string | null;
    rex_deleted_id: number | null;
  }
  
  const initialState: DeleteAptitudUsuarioState = {
    rex_loading: false,
    rex_error: null,
    rex_deleted_id: null,
  };
  
  const deleteAptitudUsuarioReducer = (
    state = initialState,
    action: DeleteAptitudUsuarioActionTypes
  ): DeleteAptitudUsuarioState => {
    switch (action.type) {
      case DELETE_APTITUD_USUARIO_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_error: null,
        };
      case DELETE_APTITUD_USUARIO_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_deleted_id: action.payload,
          rex_error: null,
        };
      case DELETE_APTITUD_USUARIO_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default deleteAptitudUsuarioReducer;