// Constantes para las acciones relacionadas con "Empresas"
export const FETCH_EMPRESAS_REQUEST = 'FETCH_EMPRESAS_REQUEST';
export const FETCH_EMPRESAS_SUCCESS = 'FETCH_EMPRESAS_SUCCESS';
export const FETCH_EMPRESAS_FAILURE = 'FETCH_EMPRESAS_FAILURE';
export const FETCH_EMPRESAS_TABLE = 'FETCH_EMPRESAS_TABLE';
export const CREATE_EMPRESAS_REQUEST = 'CREATE_EMPRESAS_REQUEST';
export const CREATE_EMPRESAS_SUCCESS = 'CREATE_EMPRESAS_SUCCESS';
export const CREATE_EMPRESAS_FAILURE = 'CREATE_EMPRESAS_FAILURE';
export const DELETE_EMPRESAS_REQUEST = 'DELETE_EMPRESAS_REQUEST';
export const DELETE_EMPRESAS_SUCCESS = 'DELETE_EMPRESAS_SUCCESS';
export const DELETE_EMPRESAS_FAILURE = 'DELETE_EMPRESAS_FAILURE';
export const UPDATE_EMPRESAS_REQUEST = 'UPDATE_EMPRESAS_REQUEST';
export const UPDATE_EMPRESAS_SUCCESS = 'UPDATE_EMPRESAS_SUCCESS';
export const UPDATE_EMPRESAS_FAILURE = 'UPDATE_EMPRESAS_FAILURE';

// Tipos de las acciones
interface FetchEmpresasRequestAction {
  type: typeof FETCH_EMPRESAS_REQUEST;
}

interface FetchEmpresasSuccessAction {
  type: typeof FETCH_EMPRESAS_SUCCESS;
  payload: {
    data: any[];
    meta?: { total: number; limit: number; page: number }; // Información de paginación opcional
  };
}

interface FetchEmpresasFailureAction {
  type: typeof FETCH_EMPRESAS_FAILURE;
  payload: string;
}

interface FetchEmpresasTableAction {
  type: typeof FETCH_EMPRESAS_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateEmpresasRequestAction {
  type: typeof CREATE_EMPRESAS_REQUEST;
}

interface CreateEmpresasSuccessAction {
  type: typeof CREATE_EMPRESAS_SUCCESS;
  payload: any;
}

interface CreateEmpresasFailureAction {
  type: typeof CREATE_EMPRESAS_FAILURE;
  payload: string;
}

interface DeleteEmpresasRequestAction {
  type: typeof DELETE_EMPRESAS_REQUEST;
}

interface DeleteEmpresasSuccessAction {
  type: typeof DELETE_EMPRESAS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteEmpresasFailureAction {
  type: typeof DELETE_EMPRESAS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateEmpresasRequestAction {
  type: typeof UPDATE_EMPRESAS_REQUEST;
}

interface UpdateEmpresasSuccessAction {
  type: typeof UPDATE_EMPRESAS_SUCCESS;
  payload: any;
}

interface UpdateEmpresasFailureAction {
  type: typeof UPDATE_EMPRESAS_FAILURE;
  payload: string;
}


// Union Type para todas las posibles acciones de "Empresas"
export type EmpresasActionTypes = 
  | FetchEmpresasRequestAction
  | FetchEmpresasSuccessAction
  | FetchEmpresasFailureAction
  | FetchEmpresasTableAction
  | CreateEmpresasRequestAction
  | CreateEmpresasSuccessAction
  | CreateEmpresasFailureAction
  | DeleteEmpresasRequestAction
  | DeleteEmpresasSuccessAction
  | DeleteEmpresasFailureAction
  | UpdateEmpresasRequestAction
  | UpdateEmpresasSuccessAction
  | UpdateEmpresasFailureAction;
