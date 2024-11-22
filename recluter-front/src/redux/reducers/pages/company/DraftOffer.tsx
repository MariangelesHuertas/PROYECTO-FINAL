// redux/reducers/pages/company/DraftOfferReducer.ts

import {
    DRAFT_OFFER_REQUEST,
    DRAFT_OFFER_SUCCESS,
    DRAFT_OFFER_FAILURE,
    OfferActionTypes
  } from '../../../../constants/company/DraftOffer';
  
  interface DraftOfferState {
    rex_loading: boolean;
    rex_success: boolean;
    rex_error: string | null;
    rex_offerId: number | null;
  }
  
  const initialState: DraftOfferState = {
    rex_loading: false,
    rex_success: false,
    rex_error: null,
    rex_offerId: null,
  };
  
  export const draftOfferReducer = (
    state = initialState,
    action: OfferActionTypes
  ): DraftOfferState => {
    switch (action.type) {
      case DRAFT_OFFER_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_success: false,
          rex_error: null,
        };
      case DRAFT_OFFER_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_success: true,
          rex_offerId: action.payload.offerId,
        };
      case DRAFT_OFFER_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_success: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default draftOfferReducer;