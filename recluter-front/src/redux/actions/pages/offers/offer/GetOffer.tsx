// actions/company/GetOfferDetail.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  FETCH_OFFER_DETAIL_REQUEST,
  FETCH_OFFER_DETAIL_SUCCESS,
  FETCH_OFFER_DETAIL_FAILURE,
  OfferDetailActionTypes
} from '../../../../../constants/pages/offers/offer/GetOffer';
import FetchWithIP from '../../../utils/FetchHeaders';

export const fetchOfferDetailRequestReducer = (): OfferDetailActionTypes => ({
  type: FETCH_OFFER_DETAIL_REQUEST,
});

export const fetchOfferDetailSuccessReducer = (data: any): OfferDetailActionTypes => ({
  type: FETCH_OFFER_DETAIL_SUCCESS,
  payload: data,
});

export const fetchOfferDetailFailureReducer = (error: string): OfferDetailActionTypes => ({
  type: FETCH_OFFER_DETAIL_FAILURE,
  payload: error,
});

export const GetOfferDetailReducer = (
  offerId: number
): ThunkAction<Promise<void>, RootState, unknown, OfferDetailActionTypes> =>
  async (dispatch) => {
    dispatch(fetchOfferDetailRequestReducer());

    try {
      const response = await FetchWithIP(`ofertas/${offerId}/byUser`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.data) {
        dispatch(fetchOfferDetailSuccessReducer(responseData.data));
      } else {
        throw new Error('No se encontraron datos de la oferta');
      }

    } catch (error) {
      dispatch(fetchOfferDetailFailureReducer('Error al obtener los detalles de la oferta'));
    }
  };