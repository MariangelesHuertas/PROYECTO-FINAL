// constants/company/OfferDetail.ts

export const FETCH_OFFER_DETAIL_REQUEST = 'FETCH_OFFER_DETAIL_REQUEST';
export const FETCH_OFFER_DETAIL_SUCCESS = 'FETCH_OFFER_DETAIL_SUCCESS';
export const FETCH_OFFER_DETAIL_FAILURE = 'FETCH_OFFER_DETAIL_FAILURE';

interface FetchOfferDetailRequestAction {
  type: typeof FETCH_OFFER_DETAIL_REQUEST;
}

interface FetchOfferDetailSuccessAction {
  type: typeof FETCH_OFFER_DETAIL_SUCCESS;
  payload: any; // Tipo de la oferta detallada
}

interface FetchOfferDetailFailureAction {
  type: typeof FETCH_OFFER_DETAIL_FAILURE;
  payload: string;
}

export type OfferDetailActionTypes =
  | FetchOfferDetailRequestAction
  | FetchOfferDetailSuccessAction
  | FetchOfferDetailFailureAction;