import {
  FETCH_SKILLS_REQUEST,
  FETCH_SKILLS_SUCCESS,
  FETCH_SKILLS_FAILURE,
  SkillsActionTypes,
  FETCH_SKILLS_TABLE,
  CREATE_SKILLS_SUCCESS,
  CREATE_SKILLS_REQUEST,
  CREATE_SKILLS_FAILURE,
  DELETE_SKILLS_REQUEST,
  DELETE_SKILLS_SUCCESS,
  DELETE_SKILLS_FAILURE,
  UPDATE_SKILLS_REQUEST,
  UPDATE_SKILLS_SUCCESS,
  UPDATE_SKILLS_FAILURE
} from '../../../../constants/common/skills/Skills';

// Estado inicial para las aptitudes
interface SkillsState {
  rex_loading: boolean;
  rex_skills: any[]; // Aquí se almacenarán todas las aptitudes
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: SkillsState = {
  rex_loading: false,
  rex_skills: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
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
      return {
        ...state,
        rex_loading: false,
        rex_skills: [
          ...state.rex_skills,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_SKILLS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_skills: action.payload.data,
        rex_meta: action.payload.meta,
      };
    case CREATE_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_skills: [action.payload, ...state.rex_skills],
        rex_error: null,
      };
    case CREATE_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_skills: state.rex_skills.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_SKILLS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_SKILLS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_SKILLS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_skills: state.rex_skills.map(skill => 
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_SKILLS_FAILURE:
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
