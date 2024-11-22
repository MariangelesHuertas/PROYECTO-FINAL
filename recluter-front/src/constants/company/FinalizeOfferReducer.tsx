export const FINALIZE_OFFER_REQUEST = 'FINALIZE_OFFER_REQUEST';
export const FINALIZE_OFFER_SUCCESS = 'FINALIZE_OFFER_SUCCESS';
export const FINALIZE_OFFER_FAILURE = 'FINALIZE_OFFER_FAILURE';

interface FinalizeOfferRequestAction {
  type: typeof FINALIZE_OFFER_REQUEST;
}

interface FinalizeOfferSuccessAction {
  type: typeof FINALIZE_OFFER_SUCCESS;
  payload: { offerId: number };
}

interface FinalizeOfferFailureAction {
  type: typeof FINALIZE_OFFER_FAILURE;
  payload: string;
}

export type FinalizeOfferActionTypes = 
  | FinalizeOfferRequestAction
  | FinalizeOfferSuccessAction
  | FinalizeOfferFailureAction;
