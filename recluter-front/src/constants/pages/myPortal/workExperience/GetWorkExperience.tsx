// Constants para las acciones relacionadas con experiencias laborales de usuarios
export const FETCH_EXPERIENCES_REQUEST = 'FETCH_EXPERIENCES_REQUEST';
export const FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
export const FETCH_EXPERIENCES_FAILURE = 'FETCH_EXPERIENCES_FAILURE';

// Tipos de las acciones
interface FetchExperiencesRequestAction {
  type: typeof FETCH_EXPERIENCES_REQUEST;
}

interface FetchExperiencesSuccessAction {
  type: typeof FETCH_EXPERIENCES_SUCCESS;
  payload: {
    data: any[]; // Datos de las experiencias laborales
  };
}

interface FetchExperiencesFailureAction {
  type: typeof FETCH_EXPERIENCES_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type ExperienceActionTypes =
  | FetchExperiencesRequestAction
  | FetchExperiencesSuccessAction
  | FetchExperiencesFailureAction;
