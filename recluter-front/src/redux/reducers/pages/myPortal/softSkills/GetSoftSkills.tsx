// src/reducers/pages/myPortal/softSkills/getSoftSkillsReducer.ts

import {
    GET_SOFT_SKILLS_REQUEST,
    GET_SOFT_SKILLS_SUCCESS,
    GET_SOFT_SKILLS_FAILURE,
    GetSoftSkillsActionTypes,
  } from '../../../../../constants/pages/myPortal/softSkills/GetSoftSkills';
  
  interface GetSoftSkillsState {
    rex_loading: boolean;
    rex_softSkills: any[] | null; // Array de soft skills
    rex_error: string | null;
  }
  
  const initialState: GetSoftSkillsState = {
    rex_loading: false,
    rex_softSkills: null,
    rex_error: null,
  };
  
  export const getSoftSkillsReducer = (
    state = initialState,
    action: GetSoftSkillsActionTypes
  ): GetSoftSkillsState => {
    switch (action.type) {
      case GET_SOFT_SKILLS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case GET_SOFT_SKILLS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_softSkills: action.payload.data, // Guardamos las soft skills obtenidas
          rex_error: null,
        };
      case GET_SOFT_SKILLS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload, // Guardamos el rex_error si ocurre
          rex_softSkills: null,
        };
      default:
        return state;
    }
  };
  
  export default getSoftSkillsReducer;