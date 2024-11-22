import {
  FETCH_TIPOS_EDUCACION_REQUEST,
  FETCH_TIPOS_EDUCACION_SUCCESS,
  FETCH_TIPOS_EDUCACION_FAILURE,
  TiposEducacionActionTypes,
  FETCH_EDUCACION_TABLE,
  CREATE_EDUCACION_REQUEST,
  CREATE_EDUCACION_SUCCESS,
  CREATE_EDUCACION_FAILURE,
  DELETE_EDUCACION_REQUEST,
  DELETE_EDUCACION_SUCCESS,
  DELETE_EDUCACION_FAILURE,
  UPDATE_EDUCACION_REQUEST,
  UPDATE_EDUCACION_SUCCESS,
  UPDATE_EDUCACION_FAILURE
} from '../../../../constants/common/education/Education';

// Estado inicial para los tipos de educación
interface TiposEducacionState {
  rex_loading: boolean;
  tiposEducacion: any[]; // Aquí se almacenarán los tipos de educación
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: TiposEducacionState = {
  rex_loading: false,
  tiposEducacion: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const tiposEducacionReducer = (state = initialState, action: TiposEducacionActionTypes): TiposEducacionState => {
  switch (action.type) {
    case FETCH_TIPOS_EDUCACION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_TIPOS_EDUCACION_SUCCESS:
      console.log('Tipos de educación recibidos en el reducer:', action.payload.data);
      return {
        ...state,
        rex_loading: false,
        tiposEducacion: [
          ...state.tiposEducacion, // Mantenemos los tipos de educación previos y añadimos los nuevos
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_TIPOS_EDUCACION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };

    case FETCH_EDUCACION_TABLE:
      return {
        ...state,
        rex_loading: false,
        tiposEducacion: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_EDUCACION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_EDUCACION_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        tiposEducacion: [action.payload, ...state.tiposEducacion],
        rex_error: null,
      };
    case CREATE_EDUCACION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_EDUCACION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_EDUCACION_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        tiposEducacion: state.tiposEducacion.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_EDUCACION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_EDUCACION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_EDUCACION_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        tiposEducacion: state.tiposEducacion.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_EDUCACION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default tiposEducacionReducer;
