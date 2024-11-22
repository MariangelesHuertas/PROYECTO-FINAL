// src/reducers/pages/myPortal/languages/getUserLanguagesReducer.ts

import {
  GET_USER_LANGUAGES_REQUEST,
  GET_USER_LANGUAGES_SUCCESS,
  GET_USER_LANGUAGES_FAILURE,
  GetUserLanguagesActionTypes,
} from '../../../../../constants/pages/myPortal/languages/GetLanguagesUser';


interface GetUserLanguagesState {
  rex_loading: boolean;
  rex_userLanguages: any[] | null;
  rex_error: string | null;
}

const initialState: GetUserLanguagesState = {
  rex_loading: false,
  rex_userLanguages: [],
  rex_error: null,
};

export const getUserLanguagesReducer = (
  state = initialState,
  action: GetUserLanguagesActionTypes
): GetUserLanguagesState => {
  switch (action.type) {
    case GET_USER_LANGUAGES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case GET_USER_LANGUAGES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_userLanguages: Array.isArray(action.payload.data) ? action.payload.data : [],
        rex_error: null,
      };
    case GET_USER_LANGUAGES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
        rex_userLanguages: [],
      };
    default:
      return state;
  }
};

export default getUserLanguagesReducer;