export const UPDATE_USER_LANGUAGES_REQUEST = 'UPDATE_USER_LANGUAGES_REQUEST';
export const UPDATE_USER_LANGUAGES_SUCCESS = 'UPDATE_USER_LANGUAGES_SUCCESS';
export const UPDATE_USER_LANGUAGES_FAILURE = 'UPDATE_USER_LANGUAGES_FAILURE';

export interface UpdateUserLanguagesRequestAction {
  type: typeof UPDATE_USER_LANGUAGES_REQUEST;
}

export interface UpdateUserLanguagesSuccessAction {
  type: typeof UPDATE_USER_LANGUAGES_SUCCESS;
  payload: any;
}

export interface UpdateUserLanguagesFailureAction {
  type: typeof UPDATE_USER_LANGUAGES_FAILURE;
  payload: string;
}

export type UpdateUserLanguagesActionTypes =
  | UpdateUserLanguagesRequestAction
  | UpdateUserLanguagesSuccessAction
  | UpdateUserLanguagesFailureAction;

export interface Language {
  id?: number;
  idioma_id: number;
  nivel_idioma_id: number;
  name: string;
  level: string;
}