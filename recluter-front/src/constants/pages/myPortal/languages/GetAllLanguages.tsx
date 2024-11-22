// src/constants/pages/myPortal/languages/GetAllLanguages.ts

export const GET_ALL_LANGUAGES_REQUEST = 'GET_ALL_LANGUAGES_REQUEST';
export const GET_ALL_LANGUAGES_SUCCESS = 'GET_ALL_LANGUAGES_SUCCESS';
export const GET_ALL_LANGUAGES_FAILURE = 'GET_ALL_LANGUAGES_FAILURE';

interface Language {
  id: number;
  idioma: string;
  createdAt: string;
  updatedAt: string;
  niveles: {
    id: number;
    nivel: string;
    idioma_id: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface GetAllLanguagesRequestAction {
  type: typeof GET_ALL_LANGUAGES_REQUEST;
}

interface GetAllLanguagesSuccessAction {
  type: typeof GET_ALL_LANGUAGES_SUCCESS;
  payload: {
    data: Language[];
    meta: {
      limit: number;
      page: number;
      total: number;
      sortColumn: string;
      sortOrder: string;
    };
  };
}

interface GetAllLanguagesFailureAction {
  type: typeof GET_ALL_LANGUAGES_FAILURE;
  payload: string;
}

export type GetAllLanguagesActionTypes =
  | GetAllLanguagesRequestAction
  | GetAllLanguagesSuccessAction
  | GetAllLanguagesFailureAction;