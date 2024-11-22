// src/actions/pages/myPortal/ratings/getUserRatingsActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import FetchWithIP from '../../utils/FetchHeaders';
import {
  GET_USER_RATINGS_REQUEST,
  GET_USER_RATINGS_SUCCESS,
  GET_USER_RATINGS_FAILURE,
  GetUserRatingsActionTypes,
  UserRating
} from '../../../../constants/pages/searchCV/GetRatings';

export const getUserRatingsRequest = (): GetUserRatingsActionTypes => ({
  type: GET_USER_RATINGS_REQUEST
});

export const getUserRatingsSuccess = (
  data: UserRating[],
  meta: any
): GetUserRatingsActionTypes => ({
  type: GET_USER_RATINGS_SUCCESS,
  payload: {
    data,
    meta
  }
});

export const getUserRatingsFailure = (error: string): GetUserRatingsActionTypes => ({
  type: GET_USER_RATINGS_FAILURE,
  payload: error
});

export const GetUserRatingsReducer = (
  userId: number
): ThunkAction<Promise<void>, RootState, unknown, GetUserRatingsActionTypes> => async (dispatch) => {
  dispatch(getUserRatingsRequest());

  try {
    const response = await FetchWithIP(`valoraciones-usuarios/findByUser/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.respuesta && data.data && data.data.valoraciones_usuarios.length > 0) {
      dispatch(getUserRatingsSuccess(
        data.data,
        data.meta
      ));
    } else {
      dispatch(getUserRatingsFailure("No se encontraron valoraciones para este usuario"));
    }
  } catch (error: any) {
    dispatch(getUserRatingsFailure(error.message || 'Ha ocurrido un error al obtener las valoraciones'));
  }
};