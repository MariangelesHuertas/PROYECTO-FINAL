import {
  FETCH_CENTROS_EDUCATIVOS_REQUEST,
  FETCH_CENTROS_EDUCATIVOS_SUCCESS,
  FETCH_CENTROS_EDUCATIVOS_FAILURE,
  CentrosEducativosActionTypes,
  FETCH_CENTROS_EDUCATIVOS_TABLE,
  CREATE_CENTROS_EDUCATIVOS_REQUEST,
  CREATE_CENTROS_EDUCATIVOS_SUCCESS,
  CREATE_CENTROS_EDUCATIVOS_FAILURE,
  DELETE_CENTROS_EDUCATIVOS_REQUEST,
  DELETE_CENTROS_EDUCATIVOS_SUCCESS,
  DELETE_CENTROS_EDUCATIVOS_FAILURE,
  UPDATE_CENTROS_EDUCATIVOS_REQUEST,
  UPDATE_CENTROS_EDUCATIVOS_SUCCESS,
  UPDATE_CENTROS_EDUCATIVOS_FAILURE
} from '../../../../constants/common/centroEducativo/CentroEducativo';

// Estado inicial para los centros educativos
interface CentrosEducativosState {
  rex_loading: boolean;
  rex_centros_educativos: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;

}

const initialState: CentrosEducativosState = {
  rex_loading: false,
  rex_centros_educativos: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const CentroEducativoReducer = (state = initialState, action: CentrosEducativosActionTypes): CentrosEducativosState => {
  switch (action.type) {
    case FETCH_CENTROS_EDUCATIVOS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_CENTROS_EDUCATIVOS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_centros_educativos: [
          ...state.rex_centros_educativos,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_CENTROS_EDUCATIVOS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_CENTROS_EDUCATIVOS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_centros_educativos: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_CENTROS_EDUCATIVOS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_CENTROS_EDUCATIVOS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_centros_educativos: [action.payload, ...state.rex_centros_educativos],
        rex_error: null,
      };
    case CREATE_CENTROS_EDUCATIVOS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
      case DELETE_CENTROS_EDUCATIVOS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case DELETE_CENTROS_EDUCATIVOS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_centros_educativos: state.rex_centros_educativos.filter(skill => skill.id !== action.payload),
          rex_error: null,
        };
      case DELETE_CENTROS_EDUCATIVOS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
    case UPDATE_CENTROS_EDUCATIVOS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_CENTROS_EDUCATIVOS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_centros_educativos: state.rex_centros_educativos.map(skill => 
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_CENTROS_EDUCATIVOS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default CentroEducativoReducer;