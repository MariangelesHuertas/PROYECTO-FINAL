import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_UPDATE_PROFILE_FAILURE,
  FETCH_UPDATE_PROFILE_REQUEST,
  FETCH_UPDATE_PROFILE_SUCCESS,
  UpdateProfileActionTypes
} from '../../../../../constants/pages/myPortal/profile/Profile';
import FetchWithIP from '../../../utils/FetchHeaders';

export const fetchUpdateProfileRequestReducer = (): UpdateProfileActionTypes => ({
  type: FETCH_UPDATE_PROFILE_REQUEST,
});

export const fetchUpdateProfileSuccessReducer = (data: any): UpdateProfileActionTypes => ({
  type: FETCH_UPDATE_PROFILE_SUCCESS,
  payload: data,
});

export const fetchUpdateProfileFailureReducer = (error: string): UpdateProfileActionTypes => ({
  type: FETCH_UPDATE_PROFILE_FAILURE,
  payload: error,
});

export const UpdateProfileReducer = (
  data: {}
): ThunkAction<Promise<void>, RootState, unknown, UpdateProfileActionTypes> =>
  async (dispatch) => {
    dispatch(fetchUpdateProfileRequestReducer());

    try {
      const response = await FetchWithIP(`auth/update-profile`, {
        method: 'PUT'
      }, data);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.data) {
        dispatch(fetchUpdateProfileSuccessReducer(responseData.data));
      } else {
        throw new Error('No se encontraron datos de la oferta');
      }

    } catch (error) {
      dispatch(fetchUpdateProfileFailureReducer('Error al obtener los detalles de la oferta'));
    }
  };