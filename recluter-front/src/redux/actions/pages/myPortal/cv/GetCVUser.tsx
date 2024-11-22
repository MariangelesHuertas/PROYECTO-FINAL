// src/actions/pages/myPortal/cv/getUserCVActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_USER_CV_REQUEST,
  GET_USER_CV_SUCCESS,
  GET_USER_CV_FAILURE,
  GetUserCVActionTypes,
} from '../../../../../constants/pages/myPortal/cv/GetCVUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getUserCVRequestReducer = (): GetUserCVActionTypes => ({
  type: GET_USER_CV_REQUEST,
});

export const getUserCVSuccessReducer = (data: any): GetUserCVActionTypes => ({
  type: GET_USER_CV_SUCCESS,
  payload: { data: data.data }, // Asumiendo que la API devuelve { data: {...} }
});

export const getUserCVFailureReducer = (error: string): GetUserCVActionTypes => ({
  type: GET_USER_CV_FAILURE,
  payload: error,
});

export const GetUserCVReducer = (): ThunkAction<Promise<any>, RootState, unknown, GetUserCVActionTypes> => async (dispatch) => {
  dispatch({ type: GET_USER_CV_REQUEST });

  try {
    const response = await FetchWithIP('cvs-usuarios/findCVUsuarioByToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Datos del CV obtenidos:', responseData);
    dispatch({ type: GET_USER_CV_SUCCESS, payload: responseData });
    return responseData;
  } catch (error: any) {
    console.error('Error al obtener el CV del usuario:', error);
    dispatch({ type: GET_USER_CV_FAILURE, payload: error.message });
    throw error;
  }
};