import {
  FETCH_SOFT_SKILLS_REQUEST,
  FETCH_SOFT_SKILLS_SUCCESS,
  FETCH_SOFT_SKILLS_FAILURE,
  SoftSkillsActionTypes,
  FETCH_SOFT_SKILLS_TABLE,
  CREATE_SOFT_SKILLS_REQUEST,
  CREATE_SOFT_SKILLS_SUCCESS,
  CREATE_SOFT_SKILLS_FAILURE,
  DELETE_SOFT_SKILLS_REQUEST,
  DELETE_SOFT_SKILLS_SUCCESS,
  DELETE_SOFT_SKILLS_FAILURE,
  UPDATE_SOFT_SKILLS_REQUEST,
  UPDATE_SOFT_SKILLS_SUCCESS,
  UPDATE_SOFT_SKILLS_FAILURE
} from '../../../../constants/common/softSkills/SoftSkills';

// Estado inicial para las soft skills
interface SoftSkillsState {
  rex_loading: boolean;
  rex_softSkills: any[]; // Aquí se almacenarán todas las soft skills
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: SoftSkillsState = {
  rex_loading: false,
  rex_softSkills: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const softSkillsReducer = (state = initialState, action: SoftSkillsActionTypes): SoftSkillsState => {
  switch (action.type) {
    case FETCH_SOFT_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_SOFT_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_softSkills: [
          ...state.rex_softSkills,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_SOFT_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_SOFT_SKILLS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_softSkills: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_SOFT_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_SOFT_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_softSkills: [action.payload, ...state.rex_softSkills],
        rex_error: null,
      };
    case CREATE_SOFT_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_SOFT_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_SOFT_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_softSkills: state.rex_softSkills.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_SOFT_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_SOFT_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_SOFT_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_softSkills: state.rex_softSkills.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_SOFT_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default softSkillsReducer;