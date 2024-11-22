// src/reducers/pages/myPortal/cv/getUserCVReducer.ts

import {
    GET_USER_CV_REQUEST,
    GET_USER_CV_SUCCESS,
    GET_USER_CV_FAILURE,
    GetUserCVActionTypes,
  } from '../../../../../constants/pages/myPortal/cv/GetCVUser';
  
  interface GetUserCVState {
    rex_loading: boolean;
    rex_userCV: any | null;
    rex_error: string | null;
  }
  
  const initialState: GetUserCVState = {
    rex_loading: false,
    rex_userCV: null,
    rex_error: null,
  };
  
  export const getUserCVReducer = (
    state = initialState,
    action: GetUserCVActionTypes
  ): GetUserCVState => {
    switch (action.type) {
      case GET_USER_CV_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case GET_USER_CV_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_userCV: action.payload.data,
          rex_error: null,
        };
      case GET_USER_CV_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
          rex_userCV: null,
        };
      default:
        return state;
    }
  };
  
  export default getUserCVReducer;