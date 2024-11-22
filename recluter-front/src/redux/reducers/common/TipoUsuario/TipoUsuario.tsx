import {
  CREATE_TIPO_USUARIO_FAILURE,
  CREATE_TIPO_USUARIO_REQUEST,
  CREATE_TIPO_USUARIO_SUCCESS,
  DELETE_TIPO_USUARIO_FAILURE,
  DELETE_TIPO_USUARIO_REQUEST,
  DELETE_TIPO_USUARIO_SUCCESS,
  FETCH_TIPO_USUARIO_FAILURE,
  FETCH_TIPO_USUARIO_REQUEST,
  FETCH_TIPO_USUARIO_SUCCESS,
  FETCH_TIPO_USUARIO_TABLE,
  TipoUsuarioActionTypes,
} from '../../../../constants/common/TipoUsuario/TipoUsuario';

// Estado inicial para los TIPO_USUARIO
interface TipoUsuarioState {
  rex_loading: boolean;
  rex_tipo_usuario: any[]; 
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: TipoUsuarioState = {
  rex_loading: false,
  rex_tipo_usuario: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const TipoUsuarioReducer = (state = initialState, action: TipoUsuarioActionTypes): TipoUsuarioState => {
  switch (action.type) {
    case FETCH_TIPO_USUARIO_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_TIPO_USUARIO_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_tipo_usuario: [
          ...state.rex_tipo_usuario,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_TIPO_USUARIO_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_TIPO_USUARIO_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_tipo_usuario: action.payload.data,
        rex_meta: action.payload.meta,
      };
    case CREATE_TIPO_USUARIO_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_TIPO_USUARIO_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_tipo_usuario: [action.payload, ...state.rex_tipo_usuario],
        rex_error: null,
      };
    case CREATE_TIPO_USUARIO_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
      case DELETE_TIPO_USUARIO_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case DELETE_TIPO_USUARIO_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_tipo_usuario: state.rex_tipo_usuario.filter(skill => skill.id !== action.payload),
          rex_error: null,
        };
      case DELETE_TIPO_USUARIO_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
    default:
      return state;
  }
};

export default TipoUsuarioReducer;
