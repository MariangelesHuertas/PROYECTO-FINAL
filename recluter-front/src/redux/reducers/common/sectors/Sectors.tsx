import {
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_FAILURE,
  FETCH_SECTORS_TABLE,
  SectorsActionTypes,
  CREATE_SECTOR_REQUEST,
  CREATE_SECTOR_SUCCESS,
  CREATE_SECTOR_FAILURE,
  DELETE_SECTOR_REQUEST,
  DELETE_SECTOR_SUCCESS,
  DELETE_SECTOR_FAILURE,
  UPDATE_SECTOR_SUCCESS,
  UPDATE_SECTOR_FAILURE,
  UPDATE_SECTOR_REQUEST
} from '../../../../constants/common/sectors/Sectors';

// Estado inicial para los sectores
interface SectorsState {
  rex_loading: boolean;
  rex_sectors: any[]; // Aquí se almacenarán todos los sectores
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: SectorsState = {
  rex_loading: false,
  rex_sectors: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const sectorsReducer = (state = initialState, action: SectorsActionTypes): SectorsState => {
  switch (action.type) {
    case FETCH_SECTORS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_SECTORS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_sectors: [
          ...state.rex_sectors,
          ...action.payload.data
        ],
        rex_error: null,
      };
    case FETCH_SECTORS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_SECTORS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_sectors: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_SECTOR_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_SECTOR_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_sectors: [action.payload, ...state.rex_sectors],
        rex_error: null,
      };
    case CREATE_SECTOR_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_SECTOR_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_SECTOR_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_sectors: state.rex_sectors.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_SECTOR_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_SECTOR_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_SECTOR_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_sectors: state.rex_sectors.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_SECTOR_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default sectorsReducer;
