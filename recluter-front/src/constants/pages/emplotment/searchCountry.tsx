export const FETCH_PAISES_REQUEST = 'FETCH_PAISES_REQUEST';
export const FETCH_PAISES_SUCCESS = 'FETCH_PAISES_SUCCESS';
export const FETCH_PAISES_FAILURE = 'FETCH_PAISES_FAILURE';

interface FetchPaisesRequestAction {
  type: typeof FETCH_PAISES_REQUEST;
}

interface FetchPaisesSuccessAction {
  type: typeof FETCH_PAISES_SUCCESS;
  payload: {
    data: any[]; // Datos de los sectores
    // meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchPaisesFailureAction {
  type: typeof FETCH_PAISES_FAILURE;
  payload: string;
}

export type PaisesActionTypes = 
  | FetchPaisesRequestAction
  | FetchPaisesSuccessAction
  | FetchPaisesFailureAction;