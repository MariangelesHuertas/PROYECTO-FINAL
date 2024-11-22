import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CV_GENERAL_REQUEST,
  FETCH_CV_GENERAL_SUCCESS,
  FETCH_CV_GENERAL_FAILURE,
  CvGeneralActionTypes,
  CvGeneral
} from '../../../../constants/pages/searchCV/GetSearchCV';
import FetchWithIP from '../../utils/FetchHeaders';

export const fetchCvGeneralRequest = (): CvGeneralActionTypes => ({
  type: FETCH_CV_GENERAL_REQUEST,
});

export const fetchCvGeneralSuccess = (data: CvGeneral[]): CvGeneralActionTypes => ({
  type: FETCH_CV_GENERAL_SUCCESS,
  payload: { data },
});

export const fetchCvGeneralFailure = (error: string): CvGeneralActionTypes => ({
  type: FETCH_CV_GENERAL_FAILURE,
  payload: error,
});

export const getCvGeneralReducer = (): ThunkAction<Promise<any>, RootState, unknown, CvGeneralActionTypes> => async (dispatch) => {
  dispatch(fetchCvGeneralRequest());

  try {
    const response = await FetchWithIP('cv-general?sortOrder=desc&sortColumn=createdAt', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchCvGeneralSuccess(responseData.data));
      return responseData;
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchCvGeneralFailure(error.message || 'Error al cargar CV general'));
    return { error: error.message };
  }
};