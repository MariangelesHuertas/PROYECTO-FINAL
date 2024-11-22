// src/actions/pages/myPortal/cv/getUserCVByIdActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_USER_CV_BY_ID_REQUEST,
  GET_USER_CV_BY_ID_SUCCESS,
  GET_USER_CV_BY_ID_FAILURE,
  GetUserCVByIdActionTypes,
} from '../../../../../constants/pages/searchCV/cv/GetCVSearch';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getUserCVByIdRequestReducer = (): GetUserCVByIdActionTypes => ({
  type: GET_USER_CV_BY_ID_REQUEST,
});

export const getUserCVByIdSuccessReducer = (data: any): GetUserCVByIdActionTypes => ({
  type: GET_USER_CV_BY_ID_SUCCESS,
  payload: { data },
});

export const getUserCVByIdFailureReducer = (error: string): GetUserCVByIdActionTypes => ({
  type: GET_USER_CV_BY_ID_FAILURE,
  payload: error,
});

export const GetUserCVByIdReducer = (userId: number): ThunkAction<Promise<any>, RootState, unknown, GetUserCVByIdActionTypes> => async (dispatch) => {
  dispatch(getUserCVByIdRequestReducer());

  try {
    const response = await FetchWithIP(`cvs-usuarios/findCVUsuarioByUser/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getUserCVByIdSuccessReducer(responseData));
    return responseData;
  } catch (error: any) {
    dispatch(getUserCVByIdFailureReducer(error.message || 'Error al obtener el CV del usuario'));
    return { error: error.message };
  }
};