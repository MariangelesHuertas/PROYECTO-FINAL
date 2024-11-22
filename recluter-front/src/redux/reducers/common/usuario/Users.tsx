import {
  CREATE_USERS_FAILURE,
  CREATE_USERS_REQUEST,
  CREATE_USERS_SUCCESS,
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_TABLE,
  UPDATE_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
  UsersActionTypes
} from '../../../../constants/common/usuario/Users';

// Estado inicial para los USERS
interface UsersState {
  rex_loading: boolean;
  rex_usuarios: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: UsersState = {
  rex_loading: false,
  rex_usuarios: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const UsuariosReducer = (state = initialState, action: UsersActionTypes): UsersState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_usuarios: [
          ...state.rex_usuarios,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_USERS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_usuarios: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_USERS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_USERS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_usuarios: [action.payload, ...state.rex_usuarios],
        rex_error: null,
      };
    case CREATE_USERS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_USERS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_usuarios: state.rex_usuarios.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_USERS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_USERS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_usuarios: state.rex_usuarios.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_USERS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default UsuariosReducer;
