import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
  CompanyActionTypes
} from '../../../../constants/pages/company/Company';

interface CompanyState {
  rex_loading: boolean;
  rex_companies: any[]; // Aquí se almacenarán todas las empresas
  rex_total: number; // Total de registros
  rex_limit: number; // Límite de registros por página
  rex_page: number; // Página actual
  rex_error: string | null;
}

const initialState: CompanyState = {
  rex_loading: false,
  rex_companies: [], // Inicializa como un array vacío
  rex_total: 0, // Inicializa en 0
  rex_limit: 10, // Inicializa con un valor por defecto
  rex_page: 1, // Inicializa con la primera página
  rex_error: null,
};

const companyReducer = (state = initialState, action: CompanyActionTypes): CompanyState => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_companies: [...state.rex_companies, ...action.payload.data], // Agrega las nuevas empresas
        rex_total: action.payload.meta.total, // Actualiza el total de registros
        rex_limit: action.payload.meta.limit, // Actualiza el límite por página
        rex_page: action.payload.meta.page, // Actualiza la página actual
        rex_error: null,
      };
    case FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
