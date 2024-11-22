// Constantes para las acciones relacionadas con "USERS"
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_USERS_TABLE = 'FETCH_USERS_TABLE';
export const CREATE_USERS_REQUEST = 'CREATE_USERS_REQUEST';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILURE = 'CREATE_USERS_FAILURE';
export const DELETE_USERS_REQUEST = 'DELETE_USERS_REQUEST';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USERS_FAILURE = 'DELETE_USERS_FAILURE';
export const UPDATE_USERS_REQUEST = 'UPDATE_USERS_REQUEST';
export const UPDATE_USERS_SUCCESS = 'UPDATE_USERS_SUCCESS';
export const UPDATE_USERS_FAILURE = 'UPDATE_USERS_FAILURE';


// Tipos de las acciones
interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

interface FetchUsersTableAction {
  type: typeof FETCH_USERS_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateUsersRequestAction {
  type: typeof CREATE_USERS_REQUEST;
}

interface CreateUsersSuccessAction {
  type: typeof CREATE_USERS_SUCCESS;
  payload: any;
}

interface CreateUsersFailureAction {
  type: typeof CREATE_USERS_FAILURE;
  payload: string;
}

interface DeleteUsersRequestAction {
  type: typeof DELETE_USERS_REQUEST;
}

interface DeleteUsersSuccessAction {
  type: typeof DELETE_USERS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteUsersFailureAction {
  type: typeof DELETE_USERS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateUsersRequestAction {
  type: typeof UPDATE_USERS_REQUEST;
}

interface UpdateUsersSuccessAction {
  type: typeof UPDATE_USERS_SUCCESS;
  payload: any;
}

interface UpdateUsersFailureAction {
  type: typeof UPDATE_USERS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Sectores"
export type UsersActionTypes = 
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | FetchUsersTableAction
  | CreateUsersRequestAction
  | CreateUsersSuccessAction
  | CreateUsersFailureAction
  | DeleteUsersRequestAction
  | DeleteUsersSuccessAction
  | DeleteUsersFailureAction
  | UpdateUsersRequestAction
  | UpdateUsersSuccessAction
  | UpdateUsersFailureAction;
