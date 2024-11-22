import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../../store/store';
import {
  FETCH_USER_EDUCATION_REQUEST,
  FETCH_USER_EDUCATION_SUCCESS,
  FETCH_USER_EDUCATION_FAILURE,
  UserEducationActionTypes
} from '../../../../../../constants/pages/offers/candidate/education/GetEducation';
import FetchWithIP from '../../../../utils/FetchHeaders';

// Action Creators
export const fetchUserEducationRequest = (): UserEducationActionTypes => ({
  type: FETCH_USER_EDUCATION_REQUEST,
});

export const fetchUserEducationSuccess = (data: any[]): UserEducationActionTypes => ({
  type: FETCH_USER_EDUCATION_SUCCESS,
  payload: { data },
});

export const fetchUserEducationFailure = (error: string): UserEducationActionTypes => ({
  type: FETCH_USER_EDUCATION_FAILURE,
  payload: error,
});

// Thunk Action para obtener la educación por ID de usuario
export const GetUserEducationByIdReducer = (
  userId: number,
  limit: number = 4
): ThunkAction<Promise<any>, RootState, unknown, UserEducationActionTypes> => async (dispatch) => {
  dispatch(fetchUserEducationRequest());

  try {
    const response = await FetchWithIP(`educacion-usuarios/findByUser/${userId}?limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchUserEducationSuccess(responseData.data));
      return responseData;
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchUserEducationFailure(error.message || 'Error al cargar la educación'));
    return { payload: { data: [] } };
  }
};