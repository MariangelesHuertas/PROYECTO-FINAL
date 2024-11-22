// Constantes para las acciones relacionadas con "FollowedCompanies"
export const FETCH_FOLLOWED_COMPANIES_REQUEST = 'FETCH_FOLLOWED_COMPANIES_REQUEST';
export const FETCH_FOLLOWED_COMPANIES_SUCCESS = 'FETCH_FOLLOWED_COMPANIES_SUCCESS';
export const FETCH_FOLLOWED_COMPANIES_FAILURE = 'FETCH_FOLLOWED_COMPANIES_FAILURE';

// Tipos de las acciones
interface FetchFollowedCompaniesRequestAction {
  type: typeof FETCH_FOLLOWED_COMPANIES_REQUEST;
}

interface FetchFollowedCompaniesSuccessAction {
  type: typeof FETCH_FOLLOWED_COMPANIES_SUCCESS;
  payload: { id: number, name: string }[]; // Ahora es un array de objetos con id y nombre
}

interface FetchFollowedCompaniesFailureAction {
  type: typeof FETCH_FOLLOWED_COMPANIES_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "FollowedCompanies"
export type FollowedCompaniesActionTypes = 
  | FetchFollowedCompaniesRequestAction
  | FetchFollowedCompaniesSuccessAction
  | FetchFollowedCompaniesFailureAction;
