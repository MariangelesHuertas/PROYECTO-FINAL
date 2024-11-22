// Constantes para las acciones relacionadas con "Sectores"
export const FETCH_SECTORS_REQUEST = 'FETCH_SECTORS_REQUEST';
export const FETCH_SECTORS_SUCCESS = 'FETCH_SECTORS_SUCCESS';
export const FETCH_SECTORS_FAILURE = 'FETCH_SECTORS_FAILURE';
export const FETCH_SECTORS_TABLE = 'FETCH_SECTORS_TABLE';
export const CREATE_SECTOR_REQUEST = 'CREATE_SECTOR_REQUEST';
export const CREATE_SECTOR_SUCCESS = 'CREATE_SECTOR_SUCCESS';
export const CREATE_SECTOR_FAILURE = 'CREATE_SECTOR_FAILURE';
export const DELETE_SECTOR_REQUEST = 'DELETE_SECTOR_REQUEST';
export const DELETE_SECTOR_SUCCESS = 'DELETE_SECTOR_SUCCESS';
export const DELETE_SECTOR_FAILURE = 'DELETE_SECTOR_FAILURE';
export const UPDATE_SECTOR_REQUEST = 'UPDATE_SECTOR_REQUEST';
export const UPDATE_SECTOR_SUCCESS = 'UPDATE_SECTOR_SUCCESS';
export const UPDATE_SECTOR_FAILURE = 'UPDATE_SECTOR_FAILURE';


// Tipos de las acciones
interface FetchSectorsRequestAction {
  type: typeof FETCH_SECTORS_REQUEST;
}

interface FetchSectorsSuccessAction {
  type: typeof FETCH_SECTORS_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchSectorsFailureAction {
  type: typeof FETCH_SECTORS_FAILURE;
  payload: string;
}

interface FetchSectorsTableAction {
  type: typeof FETCH_SECTORS_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateSectorRequestAction {
  type: typeof CREATE_SECTOR_REQUEST;
}

interface CreateSectorSuccessAction {
  type: typeof CREATE_SECTOR_SUCCESS;
  payload: any;
}

interface CreateSectorFailureAction {
  type: typeof CREATE_SECTOR_FAILURE;
  payload: string;
}

interface DeleteSectorRequestAction {
  type: typeof DELETE_SECTOR_REQUEST;
}

interface DeleteSectorSuccessAction {
  type: typeof DELETE_SECTOR_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteSectorFailureAction {
  type: typeof DELETE_SECTOR_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateSectorsRequestAction {
  type: typeof UPDATE_SECTOR_REQUEST;
}

interface UpdateSectorsSuccessAction {
  type: typeof UPDATE_SECTOR_SUCCESS;
  payload: any;
}

interface UpdateSectorsFailureAction {
  type: typeof UPDATE_SECTOR_FAILURE;
  payload: string;
}


// Union Type para todas las posibles acciones de "Sectores"
export type SectorsActionTypes = 
  | FetchSectorsRequestAction
  | FetchSectorsSuccessAction
  | FetchSectorsFailureAction
  | FetchSectorsTableAction
  | CreateSectorRequestAction
  | CreateSectorSuccessAction
  | CreateSectorFailureAction
  | DeleteSectorRequestAction
  | DeleteSectorSuccessAction
  | DeleteSectorFailureAction
  | UpdateSectorsRequestAction
  | UpdateSectorsSuccessAction
  | UpdateSectorsFailureAction;
