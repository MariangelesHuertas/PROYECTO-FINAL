// reducers/company/OfferDetailReducer.ts

import {
    FETCH_OFFER_DETAIL_REQUEST,
    FETCH_OFFER_DETAIL_SUCCESS,
    FETCH_OFFER_DETAIL_FAILURE,
    OfferDetailActionTypes
  } from '../../../../../constants/pages/offers/offer/GetOffer';
  
  interface OfferDetailState {
    rex_loading: boolean;
    rex_offer_detail: any | null;
    rex_error: string | null;
  }
  
  const initialState: OfferDetailState = {
    rex_loading: false,
    rex_offer_detail: null,
    rex_error: null,
  };
  
  const offerDetailReducer = (state = initialState, action: OfferDetailActionTypes): OfferDetailState => {
    switch (action.type) {
      case FETCH_OFFER_DETAIL_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_OFFER_DETAIL_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_offer_detail: action.payload,
          rex_error: null,
        };
      case FETCH_OFFER_DETAIL_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_offer_detail: null,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default offerDetailReducer;