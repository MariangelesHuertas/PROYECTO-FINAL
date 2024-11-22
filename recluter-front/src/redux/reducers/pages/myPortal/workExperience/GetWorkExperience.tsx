import {
    FETCH_EXPERIENCES_REQUEST,
    FETCH_EXPERIENCES_SUCCESS,
    FETCH_EXPERIENCES_FAILURE,
    ExperienceActionTypes,
  } from '../../../../../constants/pages/myPortal/workExperience/GetWorkExperience';
  
  // Estado inicial
  interface ExperienceState {
    rex_loading: boolean;
    rex_experiences: {
      id: number;
      cargo: string;
      descripcion: string;
      nombre_empresa: string;
      nombre_sector: string;
      fecha_inicio: string;
      fecha_fin: string;
      lugar_trabajo: string;

    }[]; // Array de objetos con los datos relevantes de las experiencias
    rex_error: string | null;
  }
  
  const initialState: ExperienceState = {
    rex_loading: false,
    rex_experiences: [],
    rex_error: null,
  };
  
  // Reducer
  export const experiencesReducer = (
    state = initialState,
    action: ExperienceActionTypes
  ): ExperienceState => {
    switch (action.type) {
      case FETCH_EXPERIENCES_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_EXPERIENCES_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_experiences: action.payload.data,
          rex_error: null,
        };
      case FETCH_EXPERIENCES_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default experiencesReducer;
  