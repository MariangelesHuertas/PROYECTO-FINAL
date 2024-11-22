// src/reducers/pages/myPortal/languages/getAllLanguagesReducer.ts

import {
    GET_ALL_LANGUAGES_REQUEST,
    GET_ALL_LANGUAGES_SUCCESS,
    GET_ALL_LANGUAGES_FAILURE,
    GetAllLanguagesActionTypes,
  } from '../../../../../constants/pages/myPortal/languages/GetAllLanguages';
  
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
  
  interface GetAllLanguagesState {
    rex_loading: boolean;
    rex_languages: Language[] | null;
    rex_error: string | null;
    rex_meta: {
      limit: number;
      page: number;
      total: number;
      sortColumn: string;
      sortOrder: string;
    } | null;
  }
  
  const initialState: GetAllLanguagesState = {
    rex_loading: false,
    rex_languages: null,
    rex_error: null,
    rex_meta: null,
  };
  
  export const getAllLanguagesReducer = (
    state = initialState,
    action: GetAllLanguagesActionTypes
  ): GetAllLanguagesState => {
    switch (action.type) {
      case GET_ALL_LANGUAGES_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case GET_ALL_LANGUAGES_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_languages: action.payload.data,
          rex_meta: action.payload.meta,
          rex_error: null,
        };
      case GET_ALL_LANGUAGES_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
          rex_languages: null,
          rex_meta: null,
        };
      default:
        return state;
    }
  };
  
  export default getAllLanguagesReducer;