// actions/pages/company/DeleteOffer.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILURE,
  DeleteOfferActionTypes,
} from '../../../../constants/company/DeleteOffers';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const deleteOfferRequestReducer = (): DeleteOfferActionTypes => ({
  type: DELETE_OFFER_REQUEST,
});

export const deleteOfferSuccessReducer = (id: number): DeleteOfferActionTypes => ({
  type: DELETE_OFFER_SUCCESS,
  payload: id, // El ID de la oferta eliminada
});

export const deleteOfferFailureReducer = (error: string): DeleteOfferActionTypes => ({
  type: DELETE_OFFER_FAILURE,
  payload: error,
});

export const deleteOfferReducer = (id: number): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(deleteOfferRequestReducer());

    try {
      const response = await fetch(`${API_URL}ofertas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      dispatch(deleteOfferSuccessReducer(id)); // Despacha la acción de éxito con el ID de la oferta eliminada
    } catch (error) {
      dispatch(deleteOfferFailureReducer('Error al eliminar la oferta'));
    }
  };
