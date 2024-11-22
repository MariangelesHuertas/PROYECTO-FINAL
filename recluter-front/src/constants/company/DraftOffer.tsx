// constants/company/DraftOffer.ts

export const DRAFT_OFFER_REQUEST = 'DRAFT_OFFER_REQUEST';
export const DRAFT_OFFER_SUCCESS = 'DRAFT_OFFER_SUCCESS';
export const DRAFT_OFFER_FAILURE = 'DRAFT_OFFER_FAILURE';

interface DraftOfferRequestAction {
  type: typeof DRAFT_OFFER_REQUEST;
}

interface DraftOfferSuccessAction {
  type: typeof DRAFT_OFFER_SUCCESS;
  payload: {
    offerId: number;
  };
}

interface DraftOfferFailureAction {
  type: typeof DRAFT_OFFER_FAILURE;
  payload: string;
}

export type OfferActionTypes =
  | DraftOfferRequestAction
  | DraftOfferSuccessAction
  | DraftOfferFailureAction;
