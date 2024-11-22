export const FETCH_SAVED_OFFERS_REQUEST = 'FETCH_SAVED_OFFERS_REQUEST';
export const FETCH_SAVED_OFFERS_SUCCESS = 'FETCH_SAVED_OFFERS_SUCCESS';
export const FETCH_SAVED_OFFERS_FAILURE = 'FETCH_SAVED_OFFERS_FAILURE';

interface FetchSavedOffersRequestAction {
  type: typeof FETCH_SAVED_OFFERS_REQUEST;
}

interface FetchSavedOffersSuccessAction {
  type: typeof FETCH_SAVED_OFFERS_SUCCESS;
  payload: {
    data: any[];
    meta: { total: number; limit: number; page: number };
  };
}

interface FetchSavedOffersFailureAction {
  type: typeof FETCH_SAVED_OFFERS_FAILURE;
  payload: string;
}

export type SavedOfferActionTypes =
  | FetchSavedOffersRequestAction
  | FetchSavedOffersSuccessAction
  | FetchSavedOffersFailureAction;
