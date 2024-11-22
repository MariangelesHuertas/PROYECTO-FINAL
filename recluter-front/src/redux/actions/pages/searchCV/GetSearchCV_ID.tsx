import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CV_GENERAL_BY_ID_REQUEST,
  FETCH_CV_GENERAL_BY_ID_SUCCESS,
  FETCH_CV_GENERAL_BY_ID_FAILURE,
  CvGeneralByIdActionTypes,
  CvGeneralById
} from '../../../../constants/pages/searchCV/GetSearchCV_ID';
import FetchWithIP from '../../utils/FetchHeaders';

export const fetchCvGeneralByIdRequest = (): CvGeneralByIdActionTypes => ({
  type: FETCH_CV_GENERAL_BY_ID_REQUEST,
});

export const fetchCvGeneralByIdSuccess = (data: CvGeneralById): CvGeneralByIdActionTypes => ({
  type: FETCH_CV_GENERAL_BY_ID_SUCCESS,
  payload: data,
});

export const fetchCvGeneralByIdFailure = (error: string): CvGeneralByIdActionTypes => ({
  type: FETCH_CV_GENERAL_BY_ID_FAILURE,
  payload: error,
});

export const  getCvGeneralByIdReducer = (userId: number): ThunkAction<Promise<any>, RootState, unknown, CvGeneralByIdActionTypes> => async (dispatch) => {
  dispatch(fetchCvGeneralByIdRequest());

  try {
    console.log('Realizando solicitud al API con ID:', userId);  // Verifica que el ID es el correcto
    const response = await FetchWithIP(`cv-general/${userId}`, {
      method: 'GET',
    });

    console.log('Respuesta del servidor:', response);  // Verifica la respuesta de la API

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Datos recibidos del servidor:', responseData);  // Revisa los datos de la API

    if (responseData && responseData.data) {
      dispatch(fetchCvGeneralByIdSuccess(responseData));
      return responseData;
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    console.error('Error en la solicitud al API:', error.message);
    dispatch(fetchCvGeneralByIdFailure(error.message || 'Error al cargar CV general por ID'));
    return { error: error.message };
  }
};

