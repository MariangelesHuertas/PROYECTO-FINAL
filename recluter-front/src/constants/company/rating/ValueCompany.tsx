export const FETCH_VALUE_COMPANY_REQUEST = 'FETCH_VALUE_COMPANY_REQUEST';
export const FETCH_VALUE_COMPANY_SUCCESS = 'FETCH_VALUE_COMPANY_SUCCESS';
export const FETCH_VALUE_COMPANY_FAILURE = 'FETCH_VALUE_COMPANY_FAILURE';

interface FetchValueCompanyRequestAction {
  type: typeof FETCH_VALUE_COMPANY_REQUEST;
}

interface FetchValueCompanySuccessAction {
  type: typeof FETCH_VALUE_COMPANY_SUCCESS;
  payload: any; // Tipo de la oferta detallada
}

interface FetchValueCompanyFailureAction {
  type: typeof FETCH_VALUE_COMPANY_FAILURE;
  payload: string;
}

export type ValueCompanyActionTypes =
  | FetchValueCompanyRequestAction
  | FetchValueCompanySuccessAction
  | FetchValueCompanyFailureAction;