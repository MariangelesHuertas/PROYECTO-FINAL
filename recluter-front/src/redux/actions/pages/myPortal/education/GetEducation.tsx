import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_EDUCATION_REQUEST,
  FETCH_EDUCATION_SUCCESS,
  FETCH_EDUCATION_FAILURE,
  EducationActionTypes,
} from '../../../../../constants/pages/myPortal/education/GetEducation';
import FetchWithIP from '../../../utils/FetchHeaders';

export const fetchEducationRequestReducer = (): EducationActionTypes => ({
  type: FETCH_EDUCATION_REQUEST,
});

export const fetchEducationSuccessReducer = (data: any[]): EducationActionTypes => ({
  type: FETCH_EDUCATION_SUCCESS,
  payload: { data },
});

export const fetchEducationFailureReducer = (error: string): EducationActionTypes => ({
  type: FETCH_EDUCATION_FAILURE,
  payload: error,
});

// Thunk Action
export const GetUserEducationReducer = (
  limit: number
): ThunkAction<Promise<any>, RootState, unknown, EducationActionTypes> => async (dispatch) => {
  dispatch(fetchEducationRequestReducer());

  try {
    const response = await FetchWithIP(`educacion-usuarios/findByUserToken?limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchEducationSuccessReducer(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchEducationFailureReducer(error.message || 'Error al cargar los datos de educación'));
    return { payload: { data: [] } };
  }
};