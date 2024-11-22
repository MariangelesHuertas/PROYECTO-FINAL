// src/actions/pages/myPortal/cv/uploadCVActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  UPLOAD_CV_REQUEST,
  UPLOAD_CV_SUCCESS,
  UPLOAD_CV_FAILURE,
  UploadCVActionTypes,
} from '../../../../../constants/pages/myPortal/cv/PostCVUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const uploadCVRequestReducer = (): UploadCVActionTypes => ({
  type: UPLOAD_CV_REQUEST,
});

export const uploadCVSuccessReducer = (data: any): UploadCVActionTypes => ({
  type: UPLOAD_CV_SUCCESS,
  payload: { data },
});

export const uploadCVFailureReducer = (error: string): UploadCVActionTypes => ({
  type: UPLOAD_CV_FAILURE,
  payload: error,
});

export const UploadCVReducer = (formData: FormData): ThunkAction<Promise<any>, RootState, unknown, UploadCVActionTypes> => async (dispatch) => {
  dispatch({ type: UPLOAD_CV_REQUEST });

  try {
    console.log('Enviando FormData al servidor:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await FetchWithIP('cvs-usuarios/uploadCsv', {
      method: 'POST'
    }, formData);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Respuesta del servidor:', responseData);
    dispatch({ type: UPLOAD_CV_SUCCESS, payload: responseData });
    return responseData;
  } catch (error: any) {
    console.error('Error en UploadCVReducer:', error);
    dispatch({ type: UPLOAD_CV_FAILURE, payload: error.message });
    throw error;
  }
};