// Constantes para las acciones relacionadas con "Idiomas"
export const FETCH_IDIOMAS_NIVEL_REQUEST = 'FETCH_IDIOMAS_NIVEL_REQUEST';
export const FETCH_IDIOMAS_NIVEL_SUCCESS = 'FETCH_IDIOMAS_NIVEL_SUCCESS';
export const FETCH_IDIOMAS_NIVEL_FAILURE = 'FETCH_IDIOMAS_NIVEL_FAILURE';
export const FETCH_IDIOMAS_NIVEL_TABLE = 'FETCH_IDIOMAS_NIVEL_TABLE';
export const CREATE_IDIOMAS_NIVEL_REQUEST = 'CREATE_IDIOMAS_NIVEL_REQUEST';
export const CREATE_IDIOMAS_NIVEL_SUCCESS = 'CREATE_IDIOMAS_NIVEL_SUCCESS';
export const CREATE_IDIOMAS_NIVEL_FAILURE = 'CREATE_IDIOMAS_NIVEL_FAILURE';
export const DELETE_IDIOMAS_NIVEL_REQUEST = 'DELETE_IDIOMAS_NIVEL_REQUEST';
export const DELETE_IDIOMAS_NIVEL_SUCCESS = 'DELETE_IDIOMAS_NIVEL_SUCCESS';
export const DELETE_IDIOMAS_NIVEL_FAILURE = 'DELETE_IDIOMAS_NIVEL_FAILURE';
export const UPDATE_IDIOMAS_NIVEL_REQUEST = 'UPDATE_IDIOMAS_NIVEL_REQUEST';
export const UPDATE_IDIOMAS_NIVEL_SUCCESS = 'UPDATE_IDIOMAS_NIVEL_SUCCESS';
export const UPDATE_IDIOMAS_NIVEL_FAILURE = 'UPDATE_IDIOMAS_NIVEL_FAILURE';


// Tipos de las acciones
interface FetchIdiomasNivelRequestAction {
  type: typeof FETCH_IDIOMAS_NIVEL_REQUEST;
}

interface FetchIdiomasNivelSuccessAction {
  type: typeof FETCH_IDIOMAS_NIVEL_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchIdiomasNivelFailureAction {
  type: typeof FETCH_IDIOMAS_NIVEL_FAILURE;
  payload: string;
}

interface FetchIdiomasNivelTableAction {
  type: typeof FETCH_IDIOMAS_NIVEL_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateIdiomasNivelRequestAction {
  type: typeof CREATE_IDIOMAS_NIVEL_REQUEST;
}

interface CreateIdiomasNivelSuccessAction {
  type: typeof CREATE_IDIOMAS_NIVEL_SUCCESS;
  payload: any;
}

interface CreateIdiomasNivelFailureAction {
  type: typeof CREATE_IDIOMAS_NIVEL_FAILURE;
  payload: string;
}

interface DeleteIdiomasNivelRequestAction {
  type: typeof DELETE_IDIOMAS_NIVEL_REQUEST;
}

interface DeleteIdiomasNivelSuccessAction {
  type: typeof DELETE_IDIOMAS_NIVEL_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteIdiomasNivelFailureAction {
  type: typeof DELETE_IDIOMAS_NIVEL_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateIdiomasNivelRequestAction {
  type: typeof UPDATE_IDIOMAS_NIVEL_REQUEST;
}

interface UpdateIdiomasNivelSuccessAction {
  type: typeof UPDATE_IDIOMAS_NIVEL_SUCCESS;
  payload: any;
}

interface UpdateIdiomasNivelFailureAction {
  type: typeof UPDATE_IDIOMAS_NIVEL_FAILURE;
  payload: string;
}
// Union Type para todas las posibles acciones de "Sectores"
export type IdiomasNivelActionTypes = 
  | FetchIdiomasNivelRequestAction
  | FetchIdiomasNivelSuccessAction
  | FetchIdiomasNivelFailureAction
  | FetchIdiomasNivelTableAction
  | CreateIdiomasNivelRequestAction
  | CreateIdiomasNivelSuccessAction
  | CreateIdiomasNivelFailureAction
  | DeleteIdiomasNivelRequestAction
  | DeleteIdiomasNivelSuccessAction
  | DeleteIdiomasNivelFailureAction
  | UpdateIdiomasNivelRequestAction
  | UpdateIdiomasNivelSuccessAction
  | UpdateIdiomasNivelFailureAction;
