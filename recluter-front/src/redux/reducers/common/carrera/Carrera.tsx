import {
  FETCH_CARRERAS_REQUEST,
  FETCH_CARRERAS_SUCCESS,
  FETCH_CARRERAS_FAILURE,
  CarrerasActionTypes,
  FETCH_CARRERAS_TABLE,
  CREATE_CARRERAS_REQUEST,
  CREATE_CARRERAS_SUCCESS,
  CREATE_CARRERAS_FAILURE,
  DELETE_CARRERAS_REQUEST,
  DELETE_CARRERAS_SUCCESS,
  DELETE_CARRERAS_FAILURE,
  UPDATE_CARRERAS_REQUEST,
  UPDATE_CARRERAS_SUCCESS,
  UPDATE_CARRERAS_FAILURE
} from '../../../../constants/common/carrera/Carrera';

// Estado inicial para las carreras
interface CarrerasState {
  rex_loading: boolean;
  rex_carreras: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: CarrerasState = {
  rex_loading: false,
  rex_carreras: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const CarreraReducer = (state = initialState, action: CarrerasActionTypes): CarrerasState => {
  switch (action.type) {
    case FETCH_CARRERAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_CARRERAS_SUCCESS:
      console.log('Carreras recibidas en el reducer:', action.payload.data);
      return {
        ...state,
        rex_loading: false,
        rex_carreras: action.payload.data,
        rex_error: null,
      };
    case FETCH_CARRERAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_CARRERAS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_carreras: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_CARRERAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_CARRERAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_carreras: [action.payload, ...state.rex_carreras],
        rex_error: null,
      };
    case CREATE_CARRERAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_CARRERAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_CARRERAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_carreras: state.rex_carreras.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_CARRERAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_CARRERAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_CARRERAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_carreras: state.rex_carreras.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_CARRERAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default CarreraReducer;