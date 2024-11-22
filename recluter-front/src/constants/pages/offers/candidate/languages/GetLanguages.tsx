// src/constants/pages/offers/candidate/languages/GetLanguages.ts

export const FETCH_USER_LANGUAGES_REQUEST = 'FETCH_USER_LANGUAGES_REQUEST';
export const FETCH_USER_LANGUAGES_SUCCESS = 'FETCH_USER_LANGUAGES_SUCCESS';
export const FETCH_USER_LANGUAGES_FAILURE = 'FETCH_USER_LANGUAGES_FAILURE';

interface FetchUserLanguagesRequestAction {
  type: typeof FETCH_USER_LANGUAGES_REQUEST;
}

interface FetchUserLanguagesSuccessAction {
  type: typeof FETCH_USER_LANGUAGES_SUCCESS;
  payload: {
    data: any[];
  };
}

interface FetchUserLanguagesFailureAction {
  type: typeof FETCH_USER_LANGUAGES_FAILURE;
  payload: string;
}

export type UserLanguagesActionTypes =
  | FetchUserLanguagesRequestAction
  | FetchUserLanguagesSuccessAction
  | FetchUserLanguagesFailureAction;