// Constantes para las acciones relacionadas con "Tipos de Educación"
export const FETCH_TIPOS_EDUCACION_REQUEST = 'FETCH_TIPOS_EDUCACION_REQUEST';
export const FETCH_TIPOS_EDUCACION_SUCCESS = 'FETCH_TIPOS_EDUCACION_SUCCESS';
export const FETCH_TIPOS_EDUCACION_FAILURE = 'FETCH_TIPOS_EDUCACION_FAILURE';
export const FETCH_EDUCACION_TABLE = 'FETCH_EDUCACION_TABLE';
export const CREATE_EDUCACION_REQUEST = 'CREATE_EDUCACION_REQUEST';
export const CREATE_EDUCACION_SUCCESS = 'CREATE_EDUCACION_SUCCESS';
export const CREATE_EDUCACION_FAILURE = 'CREATE_EDUCACION_FAILURE';
export const DELETE_EDUCACION_REQUEST = 'DELETE_EDUCACION_REQUEST';
export const DELETE_EDUCACION_SUCCESS = 'DELETE_EDUCACION_SUCCESS';
export const DELETE_EDUCACION_FAILURE = 'DELETE_EDUCACION_FAILURE';
export const UPDATE_EDUCACION_REQUEST = 'UPDATE_EDUCACION_REQUEST';
export const UPDATE_EDUCACION_SUCCESS = 'UPDATE_EDUCACION_SUCCESS';
export const UPDATE_EDUCACION_FAILURE = 'UPDATE_EDUCACION_FAILURE';

// Tipos de las acciones
interface FetchTiposEducacionRequestAction {
  type: typeof FETCH_TIPOS_EDUCACION_REQUEST;
}

interface FetchTiposEducacionSuccessAction {
  type: typeof FETCH_TIPOS_EDUCACION_SUCCESS;
  payload: {
    data: any[];
    meta?: { total: number; limit: number; page: number };
  };
}

interface FetchTiposEducacionFailureAction {
  type: typeof FETCH_TIPOS_EDUCACION_FAILURE;
  payload: string;
}

interface FetchTiposEducacionTableAction {
  type: typeof FETCH_EDUCACION_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateTiposEducacionRequestAction {
  type: typeof CREATE_EDUCACION_REQUEST;
}

interface CreateTiposEducacionSuccessAction {
  type: typeof CREATE_EDUCACION_SUCCESS;
  payload: any;
}

interface CreateTiposEducacionFailureAction {
  type: typeof CREATE_EDUCACION_FAILURE;
  payload: string;
}

interface DeleteTiposEducacionRequestAction {
  type: typeof DELETE_EDUCACION_REQUEST;
}

interface DeleteTiposEducacionSuccessAction {
  type: typeof DELETE_EDUCACION_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteTiposEducacionFailureAction {
  type: typeof DELETE_EDUCACION_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateTiposEducacionRequestAction {
  type: typeof UPDATE_EDUCACION_REQUEST;
}

interface UpdateTiposEducacionSuccessAction {
  type: typeof UPDATE_EDUCACION_SUCCESS;
  payload: any;
}

interface UpdateTiposEducacionFailureAction {
  type: typeof UPDATE_EDUCACION_FAILURE;
  payload: string;
}

export type TiposEducacionActionTypes = 
  | FetchTiposEducacionRequestAction
  | FetchTiposEducacionSuccessAction
  | FetchTiposEducacionFailureAction
  | FetchTiposEducacionTableAction
  | CreateTiposEducacionRequestAction
  | CreateTiposEducacionSuccessAction
  | CreateTiposEducacionFailureAction
  | DeleteTiposEducacionRequestAction
  | DeleteTiposEducacionSuccessAction
  | DeleteTiposEducacionFailureAction
  | UpdateTiposEducacionRequestAction
  | UpdateTiposEducacionSuccessAction
  | UpdateTiposEducacionFailureAction;

