import {
  FETCH_EMPRESAS_REQUEST,
  FETCH_EMPRESAS_SUCCESS,
  FETCH_EMPRESAS_FAILURE,
  EmpresasActionTypes,
  FETCH_EMPRESAS_TABLE,
  CREATE_EMPRESAS_REQUEST,
  CREATE_EMPRESAS_SUCCESS,
  CREATE_EMPRESAS_FAILURE,
  DELETE_EMPRESAS_REQUEST,
  DELETE_EMPRESAS_SUCCESS,
  DELETE_EMPRESAS_FAILURE,
  UPDATE_EMPRESAS_REQUEST,
  UPDATE_EMPRESAS_SUCCESS,
  UPDATE_EMPRESAS_FAILURE
} from '../../../../constants/common/company/Company';

// Estado inicial para las empresas
interface EmpresasState {
  rex_loading: boolean;
  rex_company: any[];
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: EmpresasState = {
  rex_loading: false,
  rex_company: [],
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const CompanyReducer = (state = initialState, action: EmpresasActionTypes): EmpresasState => {
  switch (action.type) {
    case FETCH_EMPRESAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_EMPRESAS_SUCCESS:
      console.log('Empresas recibidas en el reducer:', action.payload.data);
      return {
        ...state,
        rex_loading: false,
        rex_company: action.payload.data,
        rex_error: null,
      };
    case FETCH_EMPRESAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_EMPRESAS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_company: action.payload.data,
        rex_meta: action.payload.meta,
      };

    case CREATE_EMPRESAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_EMPRESAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_company: [action.payload, ...state.rex_company],
        rex_error: null,
      };
    case CREATE_EMPRESAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case DELETE_EMPRESAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case DELETE_EMPRESAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_company: state.rex_company.filter(skill => skill.id !== action.payload),
        rex_error: null,
      };
    case DELETE_EMPRESAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case UPDATE_EMPRESAS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_EMPRESAS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_company: state.rex_company.map(skill =>
          skill.id === action.payload.id ? action.payload : skill
        ),
        rex_error: null,
      };
    case UPDATE_EMPRESAS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default CompanyReducer;
