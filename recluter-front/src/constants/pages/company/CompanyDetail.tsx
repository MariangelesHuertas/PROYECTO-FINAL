// Constantes para las acciones relacionadas con "CompanyDetail"
export const FETCH_COMPANY_DETAIL_REQUEST = 'FETCH_COMPANY_DETAIL_REQUEST';
export const FETCH_COMPANY_DETAIL_SUCCESS = 'FETCH_COMPANY_DETAIL_SUCCESS';
export const FETCH_COMPANY_DETAIL_FAILURE = 'FETCH_COMPANY_DETAIL_FAILURE';

// Tipos de las acciones
interface FetchCompanyDetailRequestAction {
  type: typeof FETCH_COMPANY_DETAIL_REQUEST;
}

interface FetchCompanyDetailSuccessAction {
  type: typeof FETCH_COMPANY_DETAIL_SUCCESS;
  payload: {
    empresa: string,
    descripcion: string,
    empresa_seguida: []
  };
}

interface FetchCompanyDetailFailureAction {
  type: typeof FETCH_COMPANY_DETAIL_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "CompanyDetail"
export type CompanyDetailActionTypes = 
  | FetchCompanyDetailRequestAction
  | FetchCompanyDetailSuccessAction
  | FetchCompanyDetailFailureAction;
