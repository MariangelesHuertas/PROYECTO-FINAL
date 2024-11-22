import {
    GET_SOFT_SKILLS_BY_ID_REQUEST,
    GET_SOFT_SKILLS_BY_ID_SUCCESS,
    GET_SOFT_SKILLS_BY_ID_FAILURE,
    GetSoftSkillsByIdActionTypes,
  } from '../../../../../../constants/pages/offers/candidate/softSkills/GetSoftSkillsID';
  
  interface GetSoftSkillsByIdState {
    loading: boolean;
    softSkills: any[] | null;
    error: string | null;
  }
  
  const initialState: GetSoftSkillsByIdState = {
    loading: false,
    softSkills: null,
    error: null,
  };
  
  export const getSoftSkillsByIdReducer = (
    state = initialState,
    action: GetSoftSkillsByIdActionTypes
  ): GetSoftSkillsByIdState => {
    switch (action.type) {
      case GET_SOFT_SKILLS_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_SOFT_SKILLS_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          softSkills: action.payload.data,
          error: null,
        };
      case GET_SOFT_SKILLS_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          softSkills: null,
        };
      default:
        return state;
    }
  };
  
  export default getSoftSkillsByIdReducer;