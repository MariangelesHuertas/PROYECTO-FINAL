import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_EXPERIENCES_REQUEST,
  FETCH_EXPERIENCES_SUCCESS,
  FETCH_EXPERIENCES_FAILURE,
  ExperienceActionTypes
} from '../../../../../constants/pages/myPortal/workExperience/GetWorkExperience';
import FetchWithIP from '../../../utils/FetchHeaders';

// Action Creators
export const fetchExperiencesRequestReducer = (): ExperienceActionTypes => ({
  type: FETCH_EXPERIENCES_REQUEST,
});

export const fetchExperiencesSuccessReducer = (data: any[]): ExperienceActionTypes => ({
  type: FETCH_EXPERIENCES_SUCCESS,
  payload: { data },
});

export const fetchExperiencesFailureReducer = (error: string): ExperienceActionTypes => ({
  type: FETCH_EXPERIENCES_FAILURE,
  payload: error,
});

// Thunk Action para obtener las experiencias laborales del usuario con límite
export const GetUserExperiencesReducer = (
  limit: number
): ThunkAction<Promise<any>, RootState, unknown, ExperienceActionTypes> => async (dispatch) => {
  dispatch(fetchExperiencesRequestReducer());

  try {
    const response = await FetchWithIP(`experiencias-laborales-usuarios/findAllByUserToken?limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchExperiencesSuccessReducer(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchExperiencesFailureReducer(error.message || 'Error al cargar las experiencias laborales'));
    return { payload: { data: [] } };
  }
};