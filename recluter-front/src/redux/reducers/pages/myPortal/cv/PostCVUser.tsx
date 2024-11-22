// src/reducers/pages/myPortal/cv/uploadCVReducer.ts

import {
    UPLOAD_CV_REQUEST,
    UPLOAD_CV_SUCCESS,
    UPLOAD_CV_FAILURE,
    UploadCVActionTypes,
  } from '../../../../../constants/pages/myPortal/cv/PostCVUser';
  
  interface UploadCVState {
    rex_uploading: boolean;
    rex_uploadSuccess: boolean;
    rex_uploadError: string | null;
  }
  
  const initialState: UploadCVState = {
    rex_uploading: false,
    rex_uploadSuccess: false,
    rex_uploadError: null,
  };
  
  export const uploadCVReducer = (
    state = initialState,
    action: UploadCVActionTypes
  ): UploadCVState => {
    switch (action.type) {
      case UPLOAD_CV_REQUEST:
        return {
          ...state,
          rex_uploading: true,
          rex_uploadSuccess: false,
          rex_uploadError: null,
        };
      case UPLOAD_CV_SUCCESS:
        return {
          ...state,
          rex_uploading: false,
          rex_uploadSuccess: true,
          rex_uploadError: null,
        };
      case UPLOAD_CV_FAILURE:
        return {
          ...state,
          rex_uploading: false,
          rex_uploadSuccess: false,
          rex_uploadError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default uploadCVReducer;