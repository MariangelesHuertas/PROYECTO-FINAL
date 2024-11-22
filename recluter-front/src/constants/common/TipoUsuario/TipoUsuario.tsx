// Constantes para las acciones relacionadas con "TIPO_USUARIO"
export const FETCH_TIPO_USUARIO_REQUEST = 'FETCH_TIPO_USUARIO_REQUEST';
export const FETCH_TIPO_USUARIO_SUCCESS = 'FETCH_TIPO_USUARIO_SUCCESS';
export const FETCH_TIPO_USUARIO_FAILURE = 'FETCH_TIPO_USUARIO_FAILURE';
export const FETCH_TIPO_USUARIO_TABLE = 'FETCH_TIPO_USUARIO_TABLE';
export const CREATE_TIPO_USUARIO_REQUEST = 'CREATE_TIPO_USUARIO_REQUEST';
export const CREATE_TIPO_USUARIO_SUCCESS = 'CREATE_TIPO_USUARIO_SUCCESS';
export const CREATE_TIPO_USUARIO_FAILURE = 'CREATE_TIPO_USUARIO_FAILURE';
export const DELETE_TIPO_USUARIO_REQUEST = 'DELETE_TIPO_USUARIO_REQUEST';
export const DELETE_TIPO_USUARIO_SUCCESS = 'DELETE_TIPO_USUARIO_SUCCESS';
export const DELETE_TIPO_USUARIO_FAILURE = 'DELETE_TIPO_USUARIO_FAILURE';


// Tipos de las acciones
interface FetchTipoUsuarioRequestAction {
  type: typeof FETCH_TIPO_USUARIO_REQUEST;
}

interface FetchTipoUsuarioSuccessAction {
  type: typeof FETCH_TIPO_USUARIO_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchTipoUsuarioFailureAction {
  type: typeof FETCH_TIPO_USUARIO_FAILURE;
  payload: string;
}

interface FetchTipoUsuarioTableAction {
  type: typeof FETCH_TIPO_USUARIO_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateTipoUsuarioRequestAction {
  type: typeof CREATE_TIPO_USUARIO_REQUEST;
}

interface CreateTipoUsuarioSuccessAction {
  type: typeof CREATE_TIPO_USUARIO_SUCCESS;
  payload: any;
}

interface CreateTipoUsuarioFailureAction {
  type: typeof CREATE_TIPO_USUARIO_FAILURE;
  payload: string;
}

interface DeleteTipoUsuarioRequestAction {
  type: typeof DELETE_TIPO_USUARIO_REQUEST;
}

interface DeleteTipoUsuarioSuccessAction {
  type: typeof DELETE_TIPO_USUARIO_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteTipoUsuarioFailureAction {
  type: typeof DELETE_TIPO_USUARIO_FAILURE;
  payload: string; // Mensaje de error
}

// Union Type para todas las posibles acciones de "Sectores"
export type TipoUsuarioActionTypes = 
  | FetchTipoUsuarioRequestAction
  | FetchTipoUsuarioSuccessAction
  | FetchTipoUsuarioFailureAction
  | FetchTipoUsuarioTableAction
  | CreateTipoUsuarioRequestAction
  | CreateTipoUsuarioSuccessAction
  | CreateTipoUsuarioFailureAction
  | DeleteTipoUsuarioRequestAction
  | DeleteTipoUsuarioSuccessAction
  | DeleteTipoUsuarioFailureAction;
