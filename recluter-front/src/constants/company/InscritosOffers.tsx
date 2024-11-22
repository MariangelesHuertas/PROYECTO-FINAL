export const FETCH_INSCRITOS_OFFERS_REQUEST = 'FETCH_INSCRITOS_OFFERS_REQUEST';
export const FETCH_INSCRITOS_OFFERS_SUCCESS = 'FETCH_INSCRITOS_OFFERS_SUCCESS';
export const FETCH_INSCRITOS_OFFERS_FAILURE = 'FETCH_INSCRITOS_OFFERS_FAILURE';
export const FETCH_INSCRITOS_OFFERS_SUCCESS_ALL = 'FETCH_INSCRITOS_OFFERS_SUCCESS_ALL';


interface FetchInscritosOffersRequestAction {
  type: typeof FETCH_INSCRITOS_OFFERS_REQUEST;
}

interface FetchInscritosOffersSuccessAction {
  type: typeof FETCH_INSCRITOS_OFFERS_SUCCESS;
  payload: {
    data: any;
  };
}

interface FetchInscritosOffersSuccessAllAction {
    type: typeof FETCH_INSCRITOS_OFFERS_SUCCESS_ALL;
    payload: {
      data: any;
    };
  }
  

interface FetchInscritosOffersFailureAction {
  type: typeof FETCH_INSCRITOS_OFFERS_FAILURE;
  payload: string;
}

export type InscritosOfferActionTypes =
  | FetchInscritosOffersRequestAction
  | FetchInscritosOffersSuccessAction
  | FetchInscritosOffersFailureAction
  | FetchInscritosOffersSuccessAllAction; 

