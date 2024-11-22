// Constantes para las acciones relacionadas con "Sectores"
export const FETCH_SECTORS_REQUEST = 'FETCH_SECTORS_REQUEST';
export const FETCH_SECTORS_SUCCESS = 'FETCH_SECTORS_SUCCESS';
export const FETCH_SECTORS_FAILURE = 'FETCH_SECTORS_FAILURE';

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

// Union Type para todas las posibles acciones de "Sectores"
export type SectorsActionTypes = 
  | FetchSectorsRequestAction
  | FetchSectorsSuccessAction
  | FetchSectorsFailureAction;
