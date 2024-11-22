import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import axios from 'axios';
import {
  FETCH_EMPLOYMENTS_REQUEST,
  FETCH_EMPLOYMENTS_SUCCESS,
  FETCH_EMPLOYMENTS_FAILURE,
  FETCH_GET_OFFER_REQUEST,
  FETCH_GET_OFFER_FAILURE,
  FETCH_GET_OFFER_SUCCESS
} from '../../../constants/pages/Employment';
import FetchWithIP from '../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const FetchEmploymentsReducer = (
  reset = true
): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  Action<any>
> => async (dispatch: Dispatch) => {
  if (reset) dispatch({ type: FETCH_EMPLOYMENTS_REQUEST });

  try {
    const response = await FetchWithIP(`ofertas?sortColumn=id&sortOrder=desc`, {
      method: 'GET'
    }).then(res => res.json());
    // const response = await axios.get(`${API_URL}ofertas?sortColumn=id&sortOrder=desc`);

    // const employmentData = response.data.map((offer: any) => ({
    //   id: offer.id,
    //   empresa_id: offer.empresa_id,
    //   cargo: offer.cargo,
    //   descripcion: offer.descripcion,
    //   ubi_poblacion: offer.ubi_poblacion,
    //   sal_max: offer.sal_max,
    //   jornada_laboral: offer.jornada_laboral,
    //   createdAt: offer.createdAt,
    //   updatedAt: offer.updatedAt,
    //   postulaciones_guardadas: offer.postulaciones_guardadas,
    // }));

    dispatch({
      type: FETCH_EMPLOYMENTS_SUCCESS,
      payload: {
        data: response.data,
        meta: response.meta
      }
    });
    return true
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYMENTS_FAILURE, error });
    console.error('Error al obtener las ofertas', error);
  }
  return true
};

export const GetOfferReducer = (oferta_id: number): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch, getState) => {
  const {
    rex_user
  } = getState().auth

  dispatch({ type: FETCH_GET_OFFER_REQUEST });

  let usuario_id = 0;
  if (rex_user) usuario_id = rex_user.id;

  try {
    // const response = await axios.get(`${API_URL}ofertas/${oferta_id}/${usuario_id}`);
    const response = await FetchWithIP(`ofertas/${oferta_id}/byUser`, {
      method: 'GET'
    }).then(res => res.json());;

    console.log("data: ---");
    console.log(response);

    dispatch({
      type: FETCH_GET_OFFER_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    dispatch({ type: FETCH_GET_OFFER_FAILURE, error });
    console.error('Error al obtener las ofertas', error);
  }
};