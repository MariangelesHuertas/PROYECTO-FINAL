// Constants para las acciones relacionadas con educación de usuarios por ID
export const FETCH_USER_EDUCATION_REQUEST = 'FETCH_USER_EDUCATION_REQUEST';
export const FETCH_USER_EDUCATION_SUCCESS = 'FETCH_USER_EDUCATION_SUCCESS';
export const FETCH_USER_EDUCATION_FAILURE = 'FETCH_USER_EDUCATION_FAILURE';

// Tipos de las acciones
interface FetchUserEducationRequestAction {
  type: typeof FETCH_USER_EDUCATION_REQUEST;
}

interface FetchUserEducationSuccessAction {
  type: typeof FETCH_USER_EDUCATION_SUCCESS;
  payload: {
    data: any[]; // Datos de la educación
  };
}

interface FetchUserEducationFailureAction {
  type: typeof FETCH_USER_EDUCATION_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type UserEducationActionTypes =
  | FetchUserEducationRequestAction
  | FetchUserEducationSuccessAction
  | FetchUserEducationFailureAction;