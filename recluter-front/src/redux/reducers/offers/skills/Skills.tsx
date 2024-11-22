import {
    FETCH_SKILLS_REQUEST,
    FETCH_SKILLS_SUCCESS,
    FETCH_SKILLS_FAILURE,
    SkillsActionTypes
  } from '../../../../constants/offers/skills/Skills';
  
  // Estado inicial para las aptitudes
  interface SkillsState {
    rex_loading: boolean;
    rex_skills: any[]; // Aquí se almacenarán todas las aptitudes
    rex_error: string | null;
  }
  
  const initialState: SkillsState = {
    rex_loading: false,
    rex_skills: [], // Inicializa como un array vacío
    rex_error: null,
  };
  
  const skillsReducer = (state = initialState, action: SkillsActionTypes): SkillsState => {
    switch (action.type) {
      case FETCH_SKILLS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_SKILLS_SUCCESS:
        console.log('Aptitudes recibidas en el reducer:', action.payload.data);  // Verificar si los datos llegan al reducer
        return {
          ...state,
          rex_loading: false,
          rex_skills: action.payload.data,
          rex_error: null,
        };
      case FETCH_SKILLS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  
  export default skillsReducer;
  