import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../../store/store';
import {
  FETCH_USER_EXPERIENCES_REQUEST,
  FETCH_USER_EXPERIENCES_SUCCESS,
  FETCH_USER_EXPERIENCES_FAILURE,
  UserExperienceActionTypes
} from '../../../../../../constants/pages/offers/candidate/workExperience/GetWorkExperience';
import FetchWithIP from '../../../../utils/FetchHeaders';

export const fetchUserExperiencesRequest = (): UserExperienceActionTypes => ({
  type: FETCH_USER_EXPERIENCES_REQUEST,
});

export const fetchUserExperiencesSuccess = (data: any[]): UserExperienceActionTypes => ({
  type: FETCH_USER_EXPERIENCES_SUCCESS,
  payload: { data },
});

export const fetchUserExperiencesFailure = (error: string): UserExperienceActionTypes => ({
  type: FETCH_USER_EXPERIENCES_FAILURE,
  payload: error,
});

export const GetUserExperiencesByIdReducer = (
  userId: number,
  limit: number = 4
): ThunkAction<Promise<any>, RootState, unknown, UserExperienceActionTypes> => async (dispatch) => {
  dispatch(fetchUserExperiencesRequest());

  try {
    const response = await FetchWithIP(`experiencias-laborales-usuarios/findAllByUser/${userId}?limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);

    if (responseData && responseData.data) {
      dispatch(fetchUserExperiencesSuccess(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchUserExperiencesFailure(error.message || 'Error al cargar las experiencias laborales'));
    return { payload: { data: [] } };
  }
};