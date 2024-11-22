// src/reducers/pages/myPortal/education/addEducationReducer.ts

import {
    ADD_EDUCATION_REQUEST,
    ADD_EDUCATION_SUCCESS,
    ADD_EDUCATION_FAILURE,
    AddEducationActionTypes,
  } from '../../../../../constants/pages/myPortal/education/PostEducation';
  
  interface AddEducationState {
    rex_loading: boolean;
    rex_education: any | null; // Datos de la educación agregada
    rex_error: string | null;
  }
  
  const initialState: AddEducationState = {
    rex_loading: false,
    rex_education: null,
    rex_error: null,
  };
  
  export const addEducationReducer = (
    state = initialState,
    action: AddEducationActionTypes
  ): AddEducationState => {
    switch (action.type) {
      case ADD_EDUCATION_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case ADD_EDUCATION_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_education: action.payload.data, // Guardamos la educación agregada
          rex_error: null,
        };
      case ADD_EDUCATION_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload, // Guardamos el rex_error si ocurre
        };
      default:
        return state;
    }
  };
  
  export default addEducationReducer;