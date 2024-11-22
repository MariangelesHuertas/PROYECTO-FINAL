// Constantes para las acciones relacionadas con "Soft Skills"
export const FETCH_PERMISSIONS_TYPE_USER_REQUEST = 'FETCH_PERMISSIONS_TYPE_USER_REQUEST';
export const FETCH_PERMISSIONS_TYPE_USER_SUCCESS = 'FETCH_PERMISSIONS_TYPE_USER_SUCCESS';
export const FETCH_PERMISSIONS_TYPE_USER_FAILURE = 'FETCH_PERMISSIONS_TYPE_USER_FAILURE';
export const FETCH_TYPE_PERMISSION_REQUEST = 'FETCH_TYPE_PERMISSION_REQUEST';
export const FETCH_TYPE_PERMISSION_SUCCESS = 'FETCH_TYPE_PERMISSION_SUCCESS';
export const FETCH_TYPE_PERMISSION_FAILURE = 'FETCH_TYPE_PERMISSION_FAILURE';
export const CREATE_PERMISSIONS_USER_REQUEST = 'CREATE_PERMISSIONS_USER_REQUEST';
export const CREATE_PERMISSIONS_USER_SUCCESS = 'CREATE_PERMISSIONS_USER_SUCCESS';
export const CREATE_PERMISSIONS_USER_FAILURE = 'CREATE_PERMISSIONS_USER_FAILURE';
export const CREATE_TYPE_PERMISSIONS_USER_REQUEST = 'CREATE_TYPE_PERMISSIONS_USER_REQUEST';
export const CREATE_TYPE_PERMISSIONS_USER_SUCCESS = 'CREATE_TYPE_PERMISSIONS_USER_SUCCESS';
export const CREATE_TYPE_PERMISSIONS_USER_FAILURE = 'CREATE_TYPE_PERMISSIONS_USER_FAILURE';
export const CREATE_UPDATE_PERMISSIONS_USER_REQUEST = 'CREATE_UPDATE_PERMISSIONS_USER_REQUEST';
export const CREATE_UPDATE_PERMISSIONS_USER_SUCCESS = 'CREATE_UPDATE_PERMISSIONS_USER_SUCCESS';
export const CREATE_UPDATE_PERMISSIONS_USER_FAILURE = 'CREATE_UPDATE_PERMISSIONS_USER_FAILURE';


// Tipos de las acciones
interface FetchPermissionsTypeUserRequestAction {
  type: typeof FETCH_PERMISSIONS_TYPE_USER_REQUEST;
}

interface FetchPermissionsTypeUserSuccessAction {
  type: typeof FETCH_PERMISSIONS_TYPE_USER_SUCCESS;
  payload: {
    data: any[]; // Datos de las soft skills
  };
}

interface FetchPermissionsTypeUserFailureAction {
  type: typeof FETCH_PERMISSIONS_TYPE_USER_FAILURE;
  payload: string;
}
// 

interface FetchTypePermissionsRequestAction {
  type: typeof FETCH_TYPE_PERMISSION_REQUEST;
}

interface FetchTypePermissionsSuccessAction {
  type: typeof FETCH_TYPE_PERMISSION_SUCCESS;
  payload: {
    data: any[]; 
  };
}

interface FetchTypePermissionsFailureAction {
  type: typeof FETCH_TYPE_PERMISSION_FAILURE;
  payload: string;
}

interface CreatePermissionsTypeUserRequestAction {
  type: typeof CREATE_PERMISSIONS_USER_REQUEST;
}

interface CreatePermissionsTypeUserSuccessAction {
  type: typeof CREATE_PERMISSIONS_USER_SUCCESS;
  payload: {
    data: any[]; // Datos de las soft skills
  };
}

interface CreatePermissionsTypeUserFailureAction {
  type: typeof CREATE_PERMISSIONS_USER_FAILURE;
  payload: string;
}

interface CreateTypePermissionsUserRequestAction {
  type: typeof CREATE_TYPE_PERMISSIONS_USER_REQUEST;
}

interface CreateTypePermissionsUserSuccessAction {
  type: typeof CREATE_TYPE_PERMISSIONS_USER_SUCCESS;
  payload: {
    data: any[]; // Datos de las soft skills
  };
}

interface CreateTypePermissionsUserFailureAction {
  type: typeof CREATE_TYPE_PERMISSIONS_USER_FAILURE;
  payload: string;
}


interface CreateUpdatePermissionsTypeUserRequestAction {
  type: typeof CREATE_UPDATE_PERMISSIONS_USER_REQUEST;
}

interface CreateUpdatePermissionsTypeUserSuccessAction {
  type: typeof CREATE_UPDATE_PERMISSIONS_USER_SUCCESS;
  payload: {
    data: any[]; // Datos de las soft skills
  };
}

interface CreateUpdatePermissionsTypeUserFailureAction {
  type: typeof CREATE_UPDATE_PERMISSIONS_USER_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Soft Skills"
export type PermissionsTypeUserActionTypes = 
  | FetchPermissionsTypeUserRequestAction
  | FetchPermissionsTypeUserSuccessAction
  | FetchPermissionsTypeUserFailureAction
  | FetchTypePermissionsRequestAction
  | FetchTypePermissionsSuccessAction
  | FetchTypePermissionsFailureAction
  | CreateUpdatePermissionsTypeUserRequestAction
  | CreateUpdatePermissionsTypeUserSuccessAction
  | CreateUpdatePermissionsTypeUserFailureAction
  | CreatePermissionsTypeUserRequestAction
  | CreatePermissionsTypeUserSuccessAction
  | CreatePermissionsTypeUserFailureAction
  | CreateTypePermissionsUserRequestAction
  | CreateTypePermissionsUserSuccessAction
  | CreateTypePermissionsUserFailureAction;

