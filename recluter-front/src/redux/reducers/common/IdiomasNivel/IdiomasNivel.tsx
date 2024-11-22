import {
  CREATE_IDIOMAS_NIVEL_FAILURE,
  CREATE_IDIOMAS_NIVEL_REQUEST,
  CREATE_IDIOMAS_NIVEL_SUCCESS,
  FETCH_IDIOMAS_NIVEL_FAILURE,
  FETCH_IDIOMAS_NIVEL_REQUEST,
  FETCH_IDIOMAS_NIVEL_SUCCESS,
  FETCH_IDIOMAS_NIVEL_TABLE,
  IdiomasNivelActionTypes,
  DELETE_IDIOMAS_NIVEL_REQUEST,
  DELETE_IDIOMAS_NIVEL_SUCCESS,
  DELETE_IDIOMAS_NIVEL_FAILURE,
  UPDATE_IDIOMAS_NIVEL_REQUEST,
  UPDATE_IDIOMAS_NIVEL_SUCCESS,
  UPDATE_IDIOMAS_NIVEL_FAILURE
} from '../../../../constants/common/idiomasNivel/IdiomasNivel';

// Estado inicial para los idiomas
interface IdiomasNivelState {
  rex_loading: boolean;
  rex_idioma_nivel: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: IdiomasNivelState = {
  rex_loading: false,
  rex_idioma_nivel: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const IdiomasNivelReducer = (state = initialState, action: IdiomasNivelActionTypes): IdiomasNivelState => {
  switch (action.type) {
    case FETCH_IDIOMAS_NIVEL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_IDIOMAS_NIVEL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma_nivel: [
          ...state.rex_idioma_nivel,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_IDIOMAS_NIVEL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_IDIOMAS_NIVEL_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_idioma_nivel: action.payload.data,
        rex_meta: action.payload.meta,
      };
    case CREATE_IDIOMAS_NIVEL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_IDIOMAS_NIVEL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma_nivel: [action.payload, ...state.rex_idioma_nivel],
        rex_error: null,
      };
    case CREATE_IDIOMAS_NIVEL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_IDIOMAS_NIVEL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_IDIOMAS_NIVEL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma_nivel: state.rex_idioma_nivel.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_IDIOMAS_NIVEL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_IDIOMAS_NIVEL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_IDIOMAS_NIVEL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma_nivel: state.rex_idioma_nivel.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_IDIOMAS_NIVEL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default IdiomasNivelReducer;
