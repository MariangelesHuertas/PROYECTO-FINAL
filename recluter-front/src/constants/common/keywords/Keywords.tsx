// Constantes para las acciones relacionadas con "Keywords"
export const FETCH_KEYWORDS_REQUEST = 'FETCH_KEYWORDS_REQUEST';
export const FETCH_KEYWORDS_SUCCESS = 'FETCH_KEYWORDS_SUCCESS';
export const FETCH_KEYWORDS_FAILURE = 'FETCH_KEYWORDS_FAILURE';
export const FETCH_KEYWORDS_TABLE = 'FETCH_KEYWORDS_TABLE';
export const CREATE_KEYWORDS_REQUEST = 'CREATE_KEYWORDS_REQUEST';
export const CREATE_KEYWORDS_SUCCESS = 'CREATE_KEYWORDS_SUCCESS';
export const CREATE_KEYWORDS_FAILURE = 'CREATE_KEYWORDS_FAILURE';
export const DELETE_KEYWORDS_REQUEST = 'DELETE_KEYWORDS_REQUEST';
export const DELETE_KEYWORDS_SUCCESS = 'DELETE_KEYWORDS_SUCCESS';
export const DELETE_KEYWORDS_FAILURE = 'DELETE_KEYWORDS_FAILURE';
export const UPDATE_KEYWORDS_REQUEST = 'UPDATE_KEYWORDS_REQUEST';
export const UPDATE_KEYWORDS_SUCCESS = 'UPDATE_KEYWORDS_SUCCESS';
export const UPDATE_KEYWORDS_FAILURE = 'UPDATE_KEYWORDS_FAILURE';

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

interface FetchKeywordsTableAction {
  type: typeof FETCH_KEYWORDS_TABLE;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateKeywordsRequestAction {
  type: typeof CREATE_KEYWORDS_REQUEST;
}

interface CreateKeywordsSuccessAction {
  type: typeof CREATE_KEYWORDS_SUCCESS;
  payload: any;
}

interface CreateKeywordsFailureAction {
  type: typeof CREATE_KEYWORDS_FAILURE;
  payload: string;
}

interface DeleteKeywordsRequestAction {
  type: typeof DELETE_KEYWORDS_REQUEST;
}

interface DeleteKeywordsSuccessAction {
  type: typeof DELETE_KEYWORDS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteKeywordsFailureAction {
  type: typeof DELETE_KEYWORDS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateKeywordsRequestAction {
  type: typeof UPDATE_KEYWORDS_REQUEST;
}

interface UpdateKeywordsSuccessAction {
  type: typeof UPDATE_KEYWORDS_SUCCESS;
  payload: any;
}

interface UpdateKeywordsFailureAction {
  type: typeof UPDATE_KEYWORDS_FAILURE;
  payload: string;
}


// Union Type para todas las posibles acciones de "Keywords"
export type KeywordsActionTypes = 
  | FetchKeywordsRequestAction
  | FetchKeywordsSuccessAction
  | FetchKeywordsFailureAction
  | FetchKeywordsTableAction
  | CreateKeywordsRequestAction
  | CreateKeywordsSuccessAction
  | CreateKeywordsFailureAction
  | DeleteKeywordsRequestAction
  | DeleteKeywordsSuccessAction
  | DeleteKeywordsFailureAction
  | UpdateKeywordsRequestAction
  | UpdateKeywordsSuccessAction
  | UpdateKeywordsFailureAction;
