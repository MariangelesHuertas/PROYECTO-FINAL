// src/reducers/pages/myPortal/cv/deleteCVReducer.ts

import {
    DELETE_CV_REQUEST,
    DELETE_CV_SUCCESS,
    DELETE_CV_FAILURE,
    DeleteCVActionTypes,
  } from '../../../../../constants/pages/myPortal/cv/DeleteCVUser';
  
  interface DeleteCVState {
    rex_deleting: boolean;
    rex_deleteSuccess: boolean;
    rex_deleteError: string | null;
    rex_deletedCVId: number | null;
  }
  
  const initialState: DeleteCVState = {
    rex_deleting: false,
    rex_deleteSuccess: false,
    rex_deleteError: null,
    rex_deletedCVId: null,
  };
  
  export const deleteCVReducer = (
    state = initialState,
    action: DeleteCVActionTypes
  ): DeleteCVState => {
    switch (action.type) {
      case DELETE_CV_REQUEST:
        return {
          ...state,
          rex_deleting: true,
          rex_deleteSuccess: false,
          rex_deleteError: null,
        };
      case DELETE_CV_SUCCESS:
        return {
          ...state,
          rex_deleting: false,
          rex_deleteSuccess: true,
          rex_deleteError: null,
          rex_deletedCVId: action.payload,
        };
      case DELETE_CV_FAILURE:
        return {
          ...state,
          rex_deleting: false,
          rex_deleteSuccess: false,
          rex_deleteError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default deleteCVReducer;