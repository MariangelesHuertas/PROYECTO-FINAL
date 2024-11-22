import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FINALIZE_OFFER_REQUEST,
  FINALIZE_OFFER_SUCCESS,
  FINALIZE_OFFER_FAILURE,
  FinalizeOfferActionTypes
} from '../../../../constants/company/FinalizeOfferReducer';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const finalizeOfferRequestReducer = (): FinalizeOfferActionTypes => ({
  type: FINALIZE_OFFER_REQUEST,
});

export const finalizeOfferSuccessReducer = (offerId: number): FinalizeOfferActionTypes => ({
  type: FINALIZE_OFFER_SUCCESS,
  payload: { offerId },
});

export const finalizeOfferFailureReducer = (error: string): FinalizeOfferActionTypes => ({
  type: FINALIZE_OFFER_FAILURE,
  payload: error,
});

export const finalizeOfferReducer = (
  offerId: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(finalizeOfferRequestReducer());

    try {
      const response = await fetch(`${API_URL}ofertas/changeFieldFinalizado/${offerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      dispatch(finalizeOfferSuccessReducer(offerId));
    } catch (error) {
      dispatch(finalizeOfferFailureReducer('Error al finalizar la oferta'));
    }
  };
