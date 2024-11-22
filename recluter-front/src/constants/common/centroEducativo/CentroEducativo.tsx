// Constantes para las acciones relacionadas con "Centros Educativos"
export const FETCH_CENTROS_EDUCATIVOS_REQUEST = 'FETCH_CENTROS_EDUCATIVOS_REQUEST';
export const FETCH_CENTROS_EDUCATIVOS_SUCCESS = 'FETCH_CENTROS_EDUCATIVOS_SUCCESS';
export const FETCH_CENTROS_EDUCATIVOS_FAILURE = 'FETCH_CENTROS_EDUCATIVOS_FAILURE';
export const FETCH_CENTROS_EDUCATIVOS_TABLE = 'FETCH_CENTROS_EDUCATIVOS_TABLE';
export const CREATE_CENTROS_EDUCATIVOS_REQUEST = 'CREATE_CENTROS_EDUCATIVOS_REQUEST';
export const CREATE_CENTROS_EDUCATIVOS_SUCCESS = 'CREATE_CENTROS_EDUCATIVOS_SUCCESS';
export const CREATE_CENTROS_EDUCATIVOS_FAILURE = 'CREATE_CENTROS_EDUCATIVOS_FAILURE';
export const DELETE_CENTROS_EDUCATIVOS_REQUEST = 'DELETE_CENTROS_EDUCATIVOS_REQUEST';
export const DELETE_CENTROS_EDUCATIVOS_SUCCESS = 'DELETE_CENTROS_EDUCATIVOS_SUCCESS';
export const DELETE_CENTROS_EDUCATIVOS_FAILURE = 'DELETE_CENTROS_EDUCATIVOS_FAILURE';
export const UPDATE_CENTROS_EDUCATIVOS_REQUEST = 'UPDATE_CENTROS_EDUCATIVOS_REQUEST';
export const UPDATE_CENTROS_EDUCATIVOS_SUCCESS = 'UPDATE_CENTROS_EDUCATIVOS_SUCCESS';
export const UPDATE_CENTROS_EDUCATIVOS_FAILURE = 'UPDATE_CENTROS_EDUCATIVOS_FAILURE';


// Tipos de las acciones
interface FetchCentrosEducativosRequestAction {
  type: typeof FETCH_CENTROS_EDUCATIVOS_REQUEST;
}

interface FetchCentrosEducativosSuccessAction {
  type: typeof FETCH_CENTROS_EDUCATIVOS_SUCCESS;
  payload: {
    data: any[];
    meta?: { total: number; limit: number; page: number }; // Información de paginación opcional
  };
}

interface FetchCentrosEducativosFailureAction {
  type: typeof FETCH_CENTROS_EDUCATIVOS_FAILURE;
  payload: string;
}

interface FetchCentrosEducativosTableAction {
  type: typeof FETCH_CENTROS_EDUCATIVOS_TABLE;
  payload: {
    data: any[]; // Datos de los CentrosEducativoses
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateCentrosEducativosRequestAction {
  type: typeof CREATE_CENTROS_EDUCATIVOS_REQUEST;
}

interface CreateCentrosEducativosSuccessAction {
  type: typeof CREATE_CENTROS_EDUCATIVOS_SUCCESS;
  payload: any;
}

interface CreateCentrosEducativosFailureAction {
  type: typeof CREATE_CENTROS_EDUCATIVOS_FAILURE;
  payload: string;
}

interface DeleteCentrosEducativosRequestAction {
  type: typeof DELETE_CENTROS_EDUCATIVOS_REQUEST;
}

interface DeleteCentrosEducativosSuccessAction {
  type: typeof DELETE_CENTROS_EDUCATIVOS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteCentrosEducativosFailureAction {
  type: typeof DELETE_CENTROS_EDUCATIVOS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateCentrosEducativosRequestAction {
  type: typeof UPDATE_CENTROS_EDUCATIVOS_REQUEST;
}

interface UpdateCentrosEducativosSuccessAction {
  type: typeof UPDATE_CENTROS_EDUCATIVOS_SUCCESS;
  payload: any;
}

interface UpdateCentrosEducativosFailureAction {
  type: typeof UPDATE_CENTROS_EDUCATIVOS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Centros Educativos"
export type CentrosEducativosActionTypes = 
  | FetchCentrosEducativosRequestAction
  | FetchCentrosEducativosSuccessAction
  | FetchCentrosEducativosFailureAction
  | FetchCentrosEducativosTableAction
  | CreateCentrosEducativosRequestAction
  | CreateCentrosEducativosSuccessAction
  | CreateCentrosEducativosFailureAction
  | DeleteCentrosEducativosRequestAction
  | DeleteCentrosEducativosSuccessAction
  | DeleteCentrosEducativosFailureAction
  | UpdateCentrosEducativosRequestAction
  | UpdateCentrosEducativosSuccessAction
  | UpdateCentrosEducativosFailureAction;