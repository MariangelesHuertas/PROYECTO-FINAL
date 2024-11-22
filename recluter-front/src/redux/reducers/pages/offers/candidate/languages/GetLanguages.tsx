// src/reducers/pages/offers/candidate/languages/GetLanguagesReducer.ts

import {
    FETCH_USER_LANGUAGES_REQUEST,
    FETCH_USER_LANGUAGES_SUCCESS,
    FETCH_USER_LANGUAGES_FAILURE,
    UserLanguagesActionTypes,
  } from '../../../../../../constants/pages/offers/candidate/languages/GetLanguages';
  
  interface Language {
    id: number;
    nivel_idioma_id: number;
    usuario_id: number;
    createdAt: string;
    updatedAt: string;
    niveles_idiomas: {
      id: number;
      nivel: string;
      idioma_id: number;
      createdAt: string;
      updatedAt: string;
      idiomas: {
        idioma: string;
      };
    };
  }
  
  interface UserLanguagesState {
    loading: boolean;
    languages: Language[];
    error: string | null;
  }
  
  const initialState: UserLanguagesState = {
    loading: false,
    languages: [],
    error: null,
  };
  
  export const userLanguagesByIdReducer = (
    state = initialState,
    action: UserLanguagesActionTypes
  ): UserLanguagesState => {
    switch (action.type) {
      case FETCH_USER_LANGUAGES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_LANGUAGES_SUCCESS:
        return {
          ...state,
          loading: false,
          languages: action.payload.data,
          error: null,
        };
      case FETCH_USER_LANGUAGES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          languages: [],
        };
      default:
        return state;
    }
  };
  
  export default userLanguagesByIdReducer;