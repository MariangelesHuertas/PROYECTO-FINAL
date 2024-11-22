// src/reducers/pages/myPortal/cv/changeDefaultCVReducer.ts

import {
    CHANGE_DEFAULT_CV_REQUEST,
    CHANGE_DEFAULT_CV_SUCCESS,
    CHANGE_DEFAULT_CV_FAILURE,
    ChangeDefaultCVActionTypes,
  } from '../../../../../constants/pages/myPortal/cv/PatchCVUser';
  
  interface ChangeDefaultCVState {
    rex_changing: boolean;
    rex_changeSuccess: boolean;
    rex_changeError: string | null;
    rex_defaultCVId: number | null;
  }
  
  const initialState: ChangeDefaultCVState = {
    rex_changing: false,
    rex_changeSuccess: false,
    rex_changeError: null,
    rex_defaultCVId: null,
  };
  
  export const changeDefaultCVReducer = (
    state = initialState,
    action: ChangeDefaultCVActionTypes
  ): ChangeDefaultCVState => {
    switch (action.type) {
      case CHANGE_DEFAULT_CV_REQUEST:
        return {
          ...state,
          rex_changing: true,
          rex_changeSuccess: false,
          rex_changeError: null,
        };
      case CHANGE_DEFAULT_CV_SUCCESS:
        return {
          ...state,
          rex_changing: false,
          rex_changeSuccess: true,
          rex_changeError: null,
          rex_defaultCVId: action.payload,
        };
      case CHANGE_DEFAULT_CV_FAILURE:
        return {
          ...state,
          rex_changing: false,
          rex_changeSuccess: false,
          rex_changeError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default changeDefaultCVReducer;