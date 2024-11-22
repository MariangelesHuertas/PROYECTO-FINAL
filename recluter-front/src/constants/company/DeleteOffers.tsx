// constants/company/DeleteOffer.ts
export const DELETE_OFFER_REQUEST = 'DELETE_OFFER_REQUEST';
export const DELETE_OFFER_SUCCESS = 'DELETE_OFFER_SUCCESS';
export const DELETE_OFFER_FAILURE = 'DELETE_OFFER_FAILURE';

interface DeleteOfferRequestAction {
  type: typeof DELETE_OFFER_REQUEST;
}

interface DeleteOfferSuccessAction {
  type: typeof DELETE_OFFER_SUCCESS;
  payload: number; // El ID de la oferta eliminada
}

interface DeleteOfferFailureAction {
  type: typeof DELETE_OFFER_FAILURE;
  payload: string;
}

export type DeleteOfferActionTypes =
  | DeleteOfferRequestAction
  | DeleteOfferSuccessAction
  | DeleteOfferFailureAction;
