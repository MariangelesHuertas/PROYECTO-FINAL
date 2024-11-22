import {
  FETCH_SOFT_SKILLS_REQUEST,
  FETCH_SOFT_SKILLS_SUCCESS,
  FETCH_SOFT_SKILLS_FAILURE,
  SoftSkillsActionTypes,
  SoftSkill
} from '../../../../constants/common/softPortfolio/CreateSoftPortfolio';

interface SoftSkillsState {
  loading: boolean;
  softSkills: SoftSkill[];
  error: string | null;
}

const initialState: SoftSkillsState = {
  loading: false,
  softSkills: [],
  error: null,
};

const softSkillsReducer = (
  state = initialState,
  action: SoftSkillsActionTypes
): SoftSkillsState => {
  switch (action.type) {
    case FETCH_SOFT_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SOFT_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        softSkills: action.payload,
        error: null,
      };
    case FETCH_SOFT_SKILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default softSkillsReducer;