// src/redux/actions/pages/myPortal/aptitudes/GetAptitud.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_USER_APTITUDES_REQUEST,
  FETCH_USER_APTITUDES_SUCCESS,
  FETCH_USER_APTITUDES_FAILURE,
  UserAptitudesActionTypes,
  UserAptitude
} from '../../../../../constants/pages/myPortal/aptitudes/GetAptitud';
import FetchWithIP from '../../../utils/FetchHeaders';

// Action Creators
export const fetchUserAptitudesRequestReducer = (): UserAptitudesActionTypes => ({
  type: FETCH_USER_APTITUDES_REQUEST,
});

export const fetchUserAptitudesSuccessReducer = (data: UserAptitude[]): UserAptitudesActionTypes => ({
  type: FETCH_USER_APTITUDES_SUCCESS,
  payload: data,
});

export const fetchUserAptitudesFailureReducer = (error: string): UserAptitudesActionTypes => ({
  type: FETCH_USER_APTITUDES_FAILURE,
  payload: error,
});

// Thunk Action para obtener las aptitudes del usuario
export const GetAptitudReducer = (): ThunkAction<Promise<any>, RootState, unknown, UserAptitudesActionTypes> => async (dispatch) => {
  dispatch(fetchUserAptitudesRequestReducer());

  try {
    const response = await FetchWithIP('aptitudes-usuarios/findByUserToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(fetchUserAptitudesSuccessReducer(responseData.data));
    return responseData; // Retornamos la respuesta para manejarla en el frontend
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener las aptitudes del usuario';
    dispatch(fetchUserAptitudesFailureReducer(errorMessage));
    return { error: errorMessage };
  }
};