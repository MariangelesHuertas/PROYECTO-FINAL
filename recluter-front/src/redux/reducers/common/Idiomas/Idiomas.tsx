import {
  CREATE_IDIOMAS_FAILURE,
  CREATE_IDIOMAS_REQUEST,
  CREATE_IDIOMAS_SUCCESS,
  DELETE_IDIOMAS_FAILURE,
  DELETE_IDIOMAS_REQUEST,
  DELETE_IDIOMAS_SUCCESS,
  FETCH_IDIOMAS_FAILURE,
  FETCH_IDIOMAS_REQUEST,
  FETCH_IDIOMAS_SUCCESS,
  FETCH_IDIOMAS_TABLE,
  IdiomasActionTypes,
  UPDATE_IDIOMAS_FAILURE,
  UPDATE_IDIOMAS_REQUEST,
  UPDATE_IDIOMAS_SUCCESS
} from "../../../../constants/common/idiomas/Idiomas";

// Estado inicial para los idiomas
interface IdiomasState {
  rex_loading: boolean;
  rex_idioma: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: IdiomasState = {
  rex_loading: false,
  rex_idioma: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const IdiomasReducer = (state = initialState, action: IdiomasActionTypes): IdiomasState => {
  switch (action.type) {
    case FETCH_IDIOMAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_IDIOMAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma: [
          ...state.rex_idioma,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_IDIOMAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_IDIOMAS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_idioma: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_IDIOMAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_IDIOMAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma: [action.payload, ...state.rex_idioma],
        rex_error: null,
      };
    case CREATE_IDIOMAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_IDIOMAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_IDIOMAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma: state.rex_idioma.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_IDIOMAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_IDIOMAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_IDIOMAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_idioma: state.rex_idioma.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_IDIOMAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default IdiomasReducer;
