import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  DRAFT_OFFER_REQUEST,
  DRAFT_OFFER_SUCCESS,
  DRAFT_OFFER_FAILURE,
  OfferActionTypes
} from '../../../../constants/company/DraftOffer';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const draftOfferRequestReducer = (): OfferActionTypes => ({
  type: DRAFT_OFFER_REQUEST,
});

export const draftOfferSuccessReducer = (offerId: number): OfferActionTypes => ({
  type: DRAFT_OFFER_SUCCESS,
  payload: { offerId },
});

export const draftOfferFailureReducer = (error: string): OfferActionTypes => ({
  type: DRAFT_OFFER_FAILURE,
  payload: error,
});

export const draftOfferReducer = (
  offerId: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(draftOfferRequestReducer());

    try {
      const response = await fetch(`${API_URL}ofertas/changeFieldBorrador/${offerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      dispatch(draftOfferSuccessReducer(offerId));
    } catch (error) {
      dispatch(draftOfferFailureReducer('Error al cambiar oferta a borrador'));
    }
  };
