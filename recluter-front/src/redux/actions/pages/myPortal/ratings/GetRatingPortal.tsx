import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import FetchWithIP from '../../../utils/FetchHeaders';
import {
  GET_USER_RATINGS_BY_TOKEN_REQUEST,
  GET_USER_RATINGS_BY_TOKEN_SUCCESS,
  GET_USER_RATINGS_BY_TOKEN_FAILURE,
  GetUserRatingsByTokenActionTypes,
  UserRatingByToken
} from '../../../../../constants/pages/myPortal/ratings/GetRatingPortal';

export const getUserRatingsByTokenRequest = (): GetUserRatingsByTokenActionTypes => ({
  type: GET_USER_RATINGS_BY_TOKEN_REQUEST
});

export const getUserRatingsByTokenSuccess = (data: UserRatingByToken[]): GetUserRatingsByTokenActionTypes => ({
  type: GET_USER_RATINGS_BY_TOKEN_SUCCESS,
  payload: data
});

export const getUserRatingsByTokenFailure = (error: string): GetUserRatingsByTokenActionTypes => ({
  type: GET_USER_RATINGS_BY_TOKEN_FAILURE,
  payload: error
});

export const GetUserRatingsByTokenReducer = (): ThunkAction<Promise<void>, RootState, unknown, GetUserRatingsByTokenActionTypes> => async (dispatch) => {
  dispatch(getUserRatingsByTokenRequest());

  try {
    const response = await FetchWithIP('valoraciones-usuarios/findByToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    dispatch(getUserRatingsByTokenSuccess(data.data));
  } catch (error: any) {
    dispatch(getUserRatingsByTokenFailure(error.message || 'Ha ocurrido un error al obtener las valoraciones'));
  }
};