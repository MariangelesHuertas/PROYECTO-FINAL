// Constantes para las acciones relacionadas con "Company"
export const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

// Tipos de las acciones
interface FetchCompaniesRequestAction {
  type: typeof FETCH_COMPANIES_REQUEST;
}

interface FetchCompaniesSuccessAction {
  type: typeof FETCH_COMPANIES_SUCCESS;
  payload: {
    data: any[]; // Datos de la empresa
    meta: { total: number; limit: number; page: number }; // Información adicional sobre la paginación
  };
}

interface FetchCompaniesFailureAction {
  type: typeof FETCH_COMPANIES_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Company"
export type CompanyActionTypes = 
  | FetchCompaniesRequestAction
  | FetchCompaniesSuccessAction
  | FetchCompaniesFailureAction;
