import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_POSTULACIONES_REQUEST,
  FETCH_POSTULACIONES_SUCCESS,
  FETCH_POSTULACIONES_FAILURE,
  PostulacionesActionTypes,
  Postulacion
} from '../../../../../constants/pages/offers/offersProfile/GetOffersProfile';
import FetchWithIP from '../../../utils/FetchHeaders';

export const fetchPostulacionesRequest = (): PostulacionesActionTypes => ({
  type: FETCH_POSTULACIONES_REQUEST,
});

export const fetchPostulacionesSuccess = (data: Postulacion[]): PostulacionesActionTypes => ({
  type: FETCH_POSTULACIONES_SUCCESS,
  payload: { data },
});

export const fetchPostulacionesFailure = (error: string): PostulacionesActionTypes => ({
  type: FETCH_POSTULACIONES_FAILURE,
  payload: error,
});

export const GetPostulacionesByOfertaReducer = (
  idOferta: number
): ThunkAction<Promise<any>, RootState, unknown, PostulacionesActionTypes> => async (dispatch) => {
  dispatch(fetchPostulacionesRequest());

  try {
    const response = await FetchWithIP(`postulaciones/findAllPostulacionesByOferta/${idOferta}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchPostulacionesSuccess(responseData.data));
      return responseData;
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchPostulacionesFailure(error.message || 'Error al cargar las postulaciones'));
    return { error: error.message };
  }
};
