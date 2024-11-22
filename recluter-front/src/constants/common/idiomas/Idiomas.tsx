// Constantes para las acciones relacionadas con "Idiomas"
export const FETCH_IDIOMAS_REQUEST = 'FETCH_IDIOMAS_REQUEST';
export const FETCH_IDIOMAS_SUCCESS = 'FETCH_IDIOMAS_SUCCESS';
export const FETCH_IDIOMAS_FAILURE = 'FETCH_IDIOMAS_FAILURE';
export const FETCH_IDIOMAS_TABLE = 'FETCH_IDIOMAS_TABLE';
export const CREATE_IDIOMAS_REQUEST = 'CREATE_IDIOMAS_REQUEST';
export const CREATE_IDIOMAS_SUCCESS = 'CREATE_IDIOMAS_SUCCESS';
export const CREATE_IDIOMAS_FAILURE = 'CREATE_IDIOMAS_FAILURE';
export const DELETE_IDIOMAS_REQUEST = 'DELETE_IDIOMAS_REQUEST';
export const DELETE_IDIOMAS_SUCCESS = 'DELETE_IDIOMAS_SUCCESS';
export const DELETE_IDIOMAS_FAILURE = 'DELETE_IDIOMAS_FAILURE';
export const UPDATE_IDIOMAS_REQUEST = 'UPDATE_IDIOMAS_REQUEST';
export const UPDATE_IDIOMAS_SUCCESS = 'UPDATE_IDIOMAS_SUCCESS';
export const UPDATE_IDIOMAS_FAILURE = 'UPDATE_IDIOMAS_FAILURE';


// Tipos de las acciones
interface FetchIdiomasRequestAction {
  type: typeof FETCH_IDIOMAS_REQUEST;
}

interface FetchIdiomasSuccessAction {
  type: typeof FETCH_IDIOMAS_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchIdiomasFailureAction {
  type: typeof FETCH_IDIOMAS_FAILURE;
  payload: string;
}

interface FetchIdiomasTableAction {
  type: typeof FETCH_IDIOMAS_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateIdiomasRequestAction {
  type: typeof CREATE_IDIOMAS_REQUEST;
}

interface CreateIdiomasSuccessAction {
  type: typeof CREATE_IDIOMAS_SUCCESS;
  payload: any;
}

interface CreateIdiomasFailureAction {
  type: typeof CREATE_IDIOMAS_FAILURE;
  payload: string;
}

interface DeleteIdiomasRequestAction {
  type: typeof DELETE_IDIOMAS_REQUEST;
}

interface DeleteIdiomasSuccessAction {
  type: typeof DELETE_IDIOMAS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteIdiomasFailureAction {
  type: typeof DELETE_IDIOMAS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateIdiomasRequestAction {
  type: typeof UPDATE_IDIOMAS_REQUEST;
}

interface UpdateIdiomasSuccessAction {
  type: typeof UPDATE_IDIOMAS_SUCCESS;
  payload: any;
}

interface UpdateIdiomasFailureAction {
  type: typeof UPDATE_IDIOMAS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Sectores"
export type IdiomasActionTypes = 
  | FetchIdiomasRequestAction
  | FetchIdiomasSuccessAction
  | FetchIdiomasFailureAction
  | FetchIdiomasTableAction
  | CreateIdiomasRequestAction
  | CreateIdiomasSuccessAction
  | CreateIdiomasFailureAction
  | DeleteIdiomasRequestAction
  | DeleteIdiomasSuccessAction
  | DeleteIdiomasFailureAction
  | UpdateIdiomasRequestAction
  | UpdateIdiomasSuccessAction
  | UpdateIdiomasFailureAction;
