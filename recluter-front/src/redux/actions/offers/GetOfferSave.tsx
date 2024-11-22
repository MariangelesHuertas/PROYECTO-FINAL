import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  FETCH_GET_OFFER_SAVE_REQUEST,
  FETCH_GET_OFFER_SAVE_SUCCESS,
  FETCH_GET_OFFER_SAVE_FAILURE
} from '../../../constants/offers/GetOfferSave';
import FetchWithIP from '../utils/FetchHeaders';

export const GetOfferSaveReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch, getState) => {

  dispatch({ type: FETCH_GET_OFFER_SAVE_REQUEST });

  try {

    await FetchWithIP(`postulaciones-guardadas/getAllByUserToken`,
      {
        method: 'GET',
      }
    )
      .then(async res => {
        return res.json()
      })
      .then(response => {

        const employmentData = response.data.map((offer: any) => ({
          id: offer.ofertas.id,
          empresa_id: offer.ofertas.empresa_id,
          cargo: offer.ofertas.cargo,
          descripcion: offer.ofertas.descripcion,
          ubi_poblacion: offer.ofertas.ubi_poblacion,
          sal_max: offer.ofertas.sal_max,
          jornada_laboral: offer.ofertas.jornada_laboral,
          createdAt: offer.createdAt,
          updatedAt: offer.updatedAt,
          postulaciones_guardadas: offer.postulaciones_guardadas,
        }));

        dispatch({
          type: FETCH_GET_OFFER_SAVE_SUCCESS,
          payload: {
            data: employmentData,
            meta: response.meta
          }
        });

      }).catch((error) => {
        console.log(error)
      });

  } catch (error) {
    dispatch({ type: FETCH_GET_OFFER_SAVE_FAILURE, error });
    console.error('Error al obtener las ofertas', error);
  }
};
