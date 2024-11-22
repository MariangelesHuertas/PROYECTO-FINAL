export const FETCH_CARRERAS_REQUEST = 'FETCH_CARRERAS_REQUEST';
export const FETCH_CARRERAS_SUCCESS = 'FETCH_CARRERAS_SUCCESS';
export const FETCH_CARRERAS_FAILURE = 'FETCH_CARRERAS_FAILURE';
export const FETCH_CARRERAS_TABLE = 'FETCH_CARRERAS_TABLE';
export const CREATE_CARRERAS_REQUEST = 'CREATE_CARRERAS_REQUEST';
export const CREATE_CARRERAS_SUCCESS = 'CREATE_CARRERAS_SUCCESS';
export const CREATE_CARRERAS_FAILURE = 'CREATE_CARRERAS_FAILURE';
export const DELETE_CARRERAS_REQUEST = 'DELETE_CARRERAS_REQUEST';
export const DELETE_CARRERAS_SUCCESS = 'DELETE_CARRERAS_SUCCESS';
export const DELETE_CARRERAS_FAILURE = 'DELETE_CARRERAS_FAILURE';
export const UPDATE_CARRERAS_REQUEST = 'UPDATE_CARRERAS_REQUEST';
export const UPDATE_CARRERAS_SUCCESS = 'UPDATE_CARRERAS_SUCCESS';
export const UPDATE_CARRERAS_FAILURE = 'UPDATE_CARRERAS_FAILURE';

// Tipos de las acciones
interface FetchCarrerasRequestAction {
  type: typeof FETCH_CARRERAS_REQUEST;
}

interface FetchCarrerasSuccessAction {
  type: typeof FETCH_CARRERAS_SUCCESS;
  payload: {
    data: any[];
    meta?: { total: number; limit: number; page: number }; // Información de paginación opcional
  };
}

interface FetchCarrerasFailureAction {
  type: typeof FETCH_CARRERAS_FAILURE;
  payload: string;
}

interface FetchCarrerasTableAction {
  type: typeof FETCH_CARRERAS_TABLE;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateCarrerasRequestAction {
  type: typeof CREATE_CARRERAS_REQUEST;
}

interface CreateCarrerasSuccessAction {
  type: typeof CREATE_CARRERAS_SUCCESS;
  payload: any;
}

interface CreateCarrerasFailureAction {
  type: typeof CREATE_CARRERAS_FAILURE;
  payload: string;
}

interface DeleteCarrerasRequestAction {
  type: typeof DELETE_CARRERAS_REQUEST;
}

interface DeleteCarrerasSuccessAction {
  type: typeof DELETE_CARRERAS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteCarrerasFailureAction {
  type: typeof DELETE_CARRERAS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateCarrerasRequestAction {
  type: typeof UPDATE_CARRERAS_REQUEST;
}

interface UpdateCarrerasSuccessAction {
  type: typeof UPDATE_CARRERAS_SUCCESS;
  payload: any;
}

interface UpdateCarrerasFailureAction {
  type: typeof UPDATE_CARRERAS_FAILURE;
  payload: string;
}


// Union Type para todas las posibles acciones de "Carreras"
export type CarrerasActionTypes = 
  | FetchCarrerasRequestAction
  | FetchCarrerasSuccessAction
  | FetchCarrerasFailureAction
  | FetchCarrerasTableAction
  | CreateCarrerasRequestAction
  | CreateCarrerasSuccessAction
  | CreateCarrerasFailureAction
  | DeleteCarrerasRequestAction
  | DeleteCarrerasSuccessAction
  | DeleteCarrerasFailureAction
  | UpdateCarrerasRequestAction
  | UpdateCarrerasSuccessAction
  | UpdateCarrerasFailureAction;
