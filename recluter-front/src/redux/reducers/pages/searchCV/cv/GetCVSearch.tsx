// src/reducers/pages/myPortal/cv/getUserCVByIdReducer.ts

import {
    GET_USER_CV_BY_ID_REQUEST,
    GET_USER_CV_BY_ID_SUCCESS,
    GET_USER_CV_BY_ID_FAILURE,
    GetUserCVByIdActionTypes,
  } from '../../../../../constants/pages/searchCV/cv/GetCVSearch';
  
  interface GetUserCVByIdState {
    rex_loading: boolean;
    rex_userCVById: any | null;
    rex_error: string | null;
  }
  
  const initialState: GetUserCVByIdState = {
    rex_loading: false,
    rex_userCVById: null,
    rex_error: null,
  };
  
  export const getUserCVByIdReducer = (
    state = initialState,
    action: GetUserCVByIdActionTypes
  ): GetUserCVByIdState => {
    switch (action.type) {
      case GET_USER_CV_BY_ID_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case GET_USER_CV_BY_ID_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_userCVById: action.payload.data,
          rex_error: null,
        };
      case GET_USER_CV_BY_ID_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
          rex_userCVById: null,
        };
      default:
        return state;
    }
  };
  
  export default getUserCVByIdReducer;