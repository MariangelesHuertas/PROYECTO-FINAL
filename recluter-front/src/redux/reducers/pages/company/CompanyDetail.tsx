import { 
  FETCH_COMPANY_DETAIL_REQUEST,
  FETCH_COMPANY_DETAIL_SUCCESS,
  FETCH_COMPANY_DETAIL_FAILURE,
  CompanyDetailActionTypes
} from '../../../../constants/pages/company/CompanyDetail';

interface CompanyDetailState {
  rex_loading: boolean;
  rex_enterprise: {
    empresa: string,
    descripcion: string,
    empresa_seguida: []
  } | null; // Nombre de la empresa
  rex_error: string | null;
}

const initialState: CompanyDetailState = {
  rex_loading: false,
  rex_enterprise: null, // Inicializa como null
  rex_error: null,
};

const companyDetailReducer = (state = initialState, action: CompanyDetailActionTypes): CompanyDetailState => {
  switch (action.type) {
    case FETCH_COMPANY_DETAIL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_enterprise: action.payload,
        rex_error: null,
      };
    case FETCH_COMPANY_DETAIL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default companyDetailReducer;
