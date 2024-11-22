// Constants para las acciones relacionadas con experiencias laborales de usuarios por ID
export const FETCH_USER_EXPERIENCES_REQUEST = 'FETCH_USER_EXPERIENCES_REQUEST';
export const FETCH_USER_EXPERIENCES_SUCCESS = 'FETCH_USER_EXPERIENCES_SUCCESS';
export const FETCH_USER_EXPERIENCES_FAILURE = 'FETCH_USER_EXPERIENCES_FAILURE';

// Tipos de las acciones
interface FetchUserExperiencesRequestAction {
  type: typeof FETCH_USER_EXPERIENCES_REQUEST;
}

interface FetchUserExperiencesSuccessAction {
  type: typeof FETCH_USER_EXPERIENCES_SUCCESS;
  payload: {
    data: any[]; // Datos de las experiencias laborales
  };
}

interface FetchUserExperiencesFailureAction {
  type: typeof FETCH_USER_EXPERIENCES_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type UserExperienceActionTypes =
  | FetchUserExperiencesRequestAction
  | FetchUserExperiencesSuccessAction
  | FetchUserExperiencesFailureAction;