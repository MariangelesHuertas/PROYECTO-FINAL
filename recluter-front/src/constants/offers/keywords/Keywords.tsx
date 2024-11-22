// Constantes para las acciones relacionadas con "Keywords"
export const FETCH_KEYWORDS_REQUEST = 'FETCH_KEYWORDS_REQUEST';
export const FETCH_KEYWORDS_SUCCESS = 'FETCH_KEYWORDS_SUCCESS';
export const FETCH_KEYWORDS_FAILURE = 'FETCH_KEYWORDS_FAILURE';

// Tipos de las acciones
interface FetchKeywordsRequestAction {
  type: typeof FETCH_KEYWORDS_REQUEST;
}

interface FetchKeywordsSuccessAction {
  type: typeof FETCH_KEYWORDS_SUCCESS;
  payload: {
    data: any[];
    meta?: { total: number; limit: number; page: number }; // Información de paginación opcional
  };
}

interface FetchKeywordsFailureAction {
  type: typeof FETCH_KEYWORDS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Keywords"
export type KeywordsActionTypes = 
  | FetchKeywordsRequestAction
  | FetchKeywordsSuccessAction
  | FetchKeywordsFailureAction;
