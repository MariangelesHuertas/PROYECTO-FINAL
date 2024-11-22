export const FETCH_OFFERS_REQUEST = 'FETCH_OFFERS_REQUEST';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';
export const FETCH_OFFERS_REQUEST_TABLE  = 'FETCH_OFFERS_REQUEST_TABLE ';
export const FETCH_OFFERS_SUCCESS_TABLE = 'FETCH_OFFERS_SUCCESS_TABLE';
export const FETCH_OFFERS_FAILURE_TABLE  = 'FETCH_OFFERS_FAILURE_TABLE ';

interface FetchOffersRequestAction {
  type: typeof FETCH_OFFERS_REQUEST;
}

interface FetchOffersSuccessAction {
  type: typeof FETCH_OFFERS_SUCCESS;
  payload: {
    data: any[];
    meta: { total: number; limit: number; page: number };
  };
}

interface FetchOffersFailureAction {
  type: typeof FETCH_OFFERS_FAILURE;
  payload: string;
}

interface FetchOffersRequestActionTable {
  type: typeof FETCH_OFFERS_REQUEST_TABLE;
}

interface FetchOffersSuccessActionTable {
  type: typeof FETCH_OFFERS_SUCCESS_TABLE;
  payload: {
    data: any[];
    meta: { total: number; limit: number; page: number };
  };
}

interface FetchOffersFailureActionTable {
  type: typeof FETCH_OFFERS_FAILURE_TABLE;
  payload: string;
}


export type OfferActionTypes =
  | FetchOffersRequestAction
  | FetchOffersSuccessAction
  | FetchOffersFailureAction
  | FetchOffersRequestActionTable
  | FetchOffersSuccessActionTable
  | FetchOffersFailureActionTable;
  ;

