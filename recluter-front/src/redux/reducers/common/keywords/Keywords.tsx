import {
  FETCH_KEYWORDS_REQUEST,
  FETCH_KEYWORDS_SUCCESS,
  FETCH_KEYWORDS_FAILURE,
  FETCH_KEYWORDS_TABLE,
  KeywordsActionTypes,
  CREATE_KEYWORDS_REQUEST,
  CREATE_KEYWORDS_SUCCESS,
  CREATE_KEYWORDS_FAILURE,
  DELETE_KEYWORDS_REQUEST,
  DELETE_KEYWORDS_SUCCESS,
  DELETE_KEYWORDS_FAILURE,
  UPDATE_KEYWORDS_REQUEST,
  UPDATE_KEYWORDS_SUCCESS,
  UPDATE_KEYWORDS_FAILURE
} from '../../../../constants/common/keywords/Keywords';

// Estado inicial para las palabras clave
interface KeywordsState {
  rex_loading: boolean;
  rex_keywords: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: KeywordsState = {
  rex_loading: false,
  rex_keywords: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const keywordsReducer = (state = initialState, action: KeywordsActionTypes): KeywordsState => {
  switch (action.type) {
    case FETCH_KEYWORDS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_KEYWORDS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_keywords: [
          ...state.rex_keywords,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_KEYWORDS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };

    case FETCH_KEYWORDS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_keywords: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_KEYWORDS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_KEYWORDS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_keywords: [action.payload, ...state.rex_keywords],
        rex_error: null,
      };
    case CREATE_KEYWORDS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_KEYWORDS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_KEYWORDS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_keywords: state.rex_keywords.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_KEYWORDS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_KEYWORDS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_KEYWORDS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_keywords: state.rex_keywords.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_KEYWORDS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default keywordsReducer;
