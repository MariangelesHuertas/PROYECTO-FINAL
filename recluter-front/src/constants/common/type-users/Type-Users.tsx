// Constantes para las acciones relacionadas con "Skills"
export const FETCH_TYPE_USERS_REQUEST = 'FETCH_TYPE_USERS_REQUEST';
export const FETCH_TYPE_USERS_SUCCESS = 'FETCH_TYPE_USERS_SUCCESS';
export const FETCH_TYPE_USERS_FAILURE = 'FETCH_TYPE_USERS_FAILURE';
export const FETCH_TYPE_USERS_TABLE = 'FETCH_TYPE_USERS_TABLE';
export const CREATE_TYPE_USERS_REQUEST = 'CREATE_TYPE_USERS_REQUEST';
export const CREATE_TYPE_USERS_SUCCESS = 'CREATE_TYPE_USERS_SUCCESS';
export const CREATE_TYPE_USERS_FAILURE = 'CREATE_TYPE_USERS_FAILURE';


// Tipos de las acciones
interface FetchTypeUsersRequestAction {
  type: typeof FETCH_TYPE_USERS_REQUEST;
}

interface FetchTypeUsersSuccessAction {
  type: typeof FETCH_TYPE_USERS_SUCCESS;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchTypeUsersTableAction {
  type: typeof FETCH_TYPE_USERS_TABLE;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateTypeUsersRequestAction {
  type: typeof CREATE_TYPE_USERS_REQUEST;
}

interface CreateTypeUsersSuccessAction {
  type: typeof CREATE_TYPE_USERS_SUCCESS;
  payload: any;
}

interface CreateTypeUsersFailureAction {
  type: typeof CREATE_TYPE_USERS_FAILURE;
  payload: string;
}

interface FetchTypeUsersFailureAction {
  type: typeof FETCH_TYPE_USERS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Skills"
export type TypeUsersActionTypes = 
  | FetchTypeUsersRequestAction
  | FetchTypeUsersSuccessAction
  | FetchTypeUsersFailureAction
  | FetchTypeUsersTableAction
  | CreateTypeUsersRequestAction
  | CreateTypeUsersSuccessAction
  | CreateTypeUsersFailureAction;

