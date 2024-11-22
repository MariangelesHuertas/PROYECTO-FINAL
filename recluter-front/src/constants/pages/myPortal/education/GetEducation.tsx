// Constants para las acciones relacionadas con la educación de usuarios
export const FETCH_EDUCATION_REQUEST = 'FETCH_EDUCATION_REQUEST';
export const FETCH_EDUCATION_SUCCESS = 'FETCH_EDUCATION_SUCCESS';
export const FETCH_EDUCATION_FAILURE = 'FETCH_EDUCATION_FAILURE';

// Tipos de las acciones
interface FetchEducationRequestAction {
  type: typeof FETCH_EDUCATION_REQUEST;
}

interface FetchEducationSuccessAction {
  type: typeof FETCH_EDUCATION_SUCCESS;
  payload: {
    data: any[]; // Datos de la educación
  };
}

interface FetchEducationFailureAction {
  type: typeof FETCH_EDUCATION_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type EducationActionTypes =
  | FetchEducationRequestAction
  | FetchEducationSuccessAction
  | FetchEducationFailureAction;
