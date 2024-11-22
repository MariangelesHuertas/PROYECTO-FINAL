export const FETCH_CLOSED_OFFERS_REQUEST = 'FETCH_CLOSED_OFFERS_REQUEST';
export const FETCH_CLOSED_OFFERS_SUCCESS = 'FETCH_CLOSED_OFFERS_SUCCESS';
export const FETCH_CLOSED_OFFERS_FAILURE = 'FETCH_CLOSED_OFFERS_FAILURE';
export const FETCH_CLOSED_OFFERS_REQUEST_TABLE  = 'FETCH_CLOSED_OFFERS_REQUEST_TABLE ';
export const FETCH_CLOSED_OFFERS_SUCCESS_TABLE = 'FETCH_CLOSED_OFFERS_SUCCESS_TABLE';
export const FETCH_CLOSED_OFFERS_FAILURE_TABLE  = 'FETCH_CLOSED_OFFERS_FAILURE_TABLE ';

interface FetchClosedOffersRequestAction {
  type: typeof FETCH_CLOSED_OFFERS_REQUEST;
}

interface FetchClosedOffersSuccessAction {
  type: typeof FETCH_CLOSED_OFFERS_SUCCESS;
  payload: {
    data: any[];
    meta: { total: number; limit: number; page: number };
  };
}

interface FetchClosedOffersFailureAction {
  type: typeof FETCH_CLOSED_OFFERS_FAILURE;
  payload: string;
}

interface FetchClosedOffersRequestActionTable {
  type: typeof FETCH_CLOSED_OFFERS_REQUEST_TABLE;
}

interface FetchClosedOffersSuccessActionTable {
  type: typeof FETCH_CLOSED_OFFERS_SUCCESS_TABLE;
  payload: {
    data: any[];
    meta: { total: number; limit: number; page: number };
  };
}

interface FetchClosedOffersFailureActionTable {
  type: typeof FETCH_CLOSED_OFFERS_FAILURE_TABLE;
  payload: string;
}

export type ClosedOfferActionTypes =
  | FetchClosedOffersRequestAction
  | FetchClosedOffersSuccessAction
  | FetchClosedOffersFailureAction
  | FetchClosedOffersRequestActionTable
  | FetchClosedOffersSuccessActionTable
  | FetchClosedOffersFailureActionTable;
