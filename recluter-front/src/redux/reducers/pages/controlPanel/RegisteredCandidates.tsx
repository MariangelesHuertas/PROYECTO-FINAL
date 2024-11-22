import {
    FETCH_INSCRITOS_BY_DIA_FAILURE , FETCH_INSCRITOS_BY_DIA_REQUEST , FETCH_INSCRITOS_BY_DIA_SUCCESS , InscritosByDiaActionTypes
  } from "../../../../constants/pages/controlPanel/RegisteredCandidates";
  interface InscritosByDia {
    rex_loading: boolean;
    rex_inscritoByDia: any; 
    rex_error: string | null;
  }
  const initialState: InscritosByDia = {
    rex_loading: false, 
    rex_inscritoByDia:[],
    rex_error: null,
  };
  
  const inscritosByDia = (state = initialState, action: InscritosByDiaActionTypes): InscritosByDia => {
    switch (action.type) {
      case FETCH_INSCRITOS_BY_DIA_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_INSCRITOS_BY_DIA_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_inscritoByDia: action.payload,
          rex_error: null,
        };
      case FETCH_INSCRITOS_BY_DIA_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  export default inscritosByDia;
  