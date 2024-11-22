// src/constants/pages/myPortal/languages/GetLanguages.ts

export const GET_USER_LANGUAGES_REQUEST = 'GET_USER_LANGUAGES_REQUEST';
export const GET_USER_LANGUAGES_SUCCESS = 'GET_USER_LANGUAGES_SUCCESS';
export const GET_USER_LANGUAGES_FAILURE = 'GET_USER_LANGUAGES_FAILURE';

// Tipos de las acciones
interface GetUserLanguagesRequestAction {
  type: typeof GET_USER_LANGUAGES_REQUEST;
}

interface GetUserLanguagesSuccessAction {
  type: typeof GET_USER_LANGUAGES_SUCCESS;
  payload: {
    data: any; // Datos de los idiomas del usuario
  };
}

interface GetUserLanguagesFailureAction {
  type: typeof GET_USER_LANGUAGES_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type GetUserLanguagesActionTypes =
  | GetUserLanguagesRequestAction
  | GetUserLanguagesSuccessAction
  | GetUserLanguagesFailureAction;