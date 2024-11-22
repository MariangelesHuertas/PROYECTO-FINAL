import {
  FETCH_OFFERS_REQUEST,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  FETCH_OFFERS_REQUEST_TABLE,
  FETCH_OFFERS_SUCCESS_TABLE,
  FETCH_OFFERS_FAILURE_TABLE,
  OfferActionTypes
} from '../../../../constants/company/Offers';

interface OfferState {
  rex_loading: boolean;
  rex_offers: any[];
  rex_offers_table: any[];
  rex_total: number;
  rex_limit: number;
  rex_page: number;
  rex_error: string | null;
  rex_meta: { total: number; limit: number; page: number } | undefined;
}

const initialState: OfferState = {
  rex_loading: false,
  rex_offers: [],
  rex_offers_table: [],
  rex_total: 0,
  rex_limit: 10,
  rex_page: 1,
  rex_meta: { total: 0, limit: 10, page: 1 },
  rex_error: null,
};

const offerReducer = (state = initialState, action: OfferActionTypes): OfferState => {
  switch (action.type) {
    case FETCH_OFFERS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_offers: action.payload.data,  // Sobrescribe las ofertas en lugar de concatenar
        rex_total: action.payload.meta.total,
        rex_limit: action.payload.meta.limit,
        rex_page: action.payload.meta.page,
        rex_meta: action.payload.meta,
        rex_error: null,
      };
    case FETCH_OFFERS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_OFFERS_REQUEST_TABLE:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_OFFERS_SUCCESS_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_offers_table: action.payload.data,  // Sobrescribe las ofertas en lugar de concatenar
        rex_error: null,
      };
    case FETCH_OFFERS_FAILURE_TABLE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default offerReducer;
