import {
    ADD_EXPERIENCE_REQUEST,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EXPERIENCE_FAILURE,
    AddExperienceActionTypes,
  } from '../../../../../constants/pages/myPortal/workExperience/PostWorkExperience';
  
  // Estado inicial
  interface AddExperienceState {
    loading: boolean;
    experience: any | null; // Datos de la experiencia agregada
    error: string | null;
  }
  
  const initialState: AddExperienceState = {
    loading: false,
    experience: null,
    error: null,
  };
  
  // Reducer
  export const addExperienceReducer = (
    state = initialState,
    action: AddExperienceActionTypes
  ): AddExperienceState => {
    switch (action.type) {
      case ADD_EXPERIENCE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_EXPERIENCE_SUCCESS:
        return {
          ...state,
          loading: false,
          experience: action.payload.data, // Guardamos la experiencia agregada
          error: null,
        };
      case ADD_EXPERIENCE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Guardamos el error si ocurre
        };
      default:
        return state;
    }
  };
  
  export default addExperienceReducer;
  