import {
    FETCH_EDUCATION_REQUEST,
    FETCH_EDUCATION_SUCCESS,
    FETCH_EDUCATION_FAILURE,
    EducationActionTypes,
  } from '../../../../../constants/pages/myPortal/education/GetEducation';
  
  // Estado inicial
  interface EducationState {
    rex_loading: boolean;
    rex_education: {
      id: number;
      nombre_centro_educativo: string;
      carrera: string;
      ubicacion: string;
      fecha_inicio: string;
      fecha_final: string;
    }[]; // Array de objetos con los datos relevantes de la educación
    rex_error: string | null;
  }
  
  const initialState: EducationState = {
    rex_loading: false,
    rex_education: [],
    rex_error: null,
  };
  
  // Reducer
  export const educationReducer = (
    state = initialState,
    action: EducationActionTypes
  ): EducationState => {
    switch (action.type) {
      case FETCH_EDUCATION_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_EDUCATION_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_education: action.payload.data,
          rex_error: null,
        };
      case FETCH_EDUCATION_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default educationReducer;