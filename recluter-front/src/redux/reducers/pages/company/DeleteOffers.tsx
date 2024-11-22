// reducers/pages/company/offersReducer.ts
import {
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAILURE,
    DeleteOfferActionTypes,
  } from '../../../../constants/company/DeleteOffers';
  
  interface OfferState {
    rex_loading: boolean;
    rex_offers: any[];
    rex_error: string | null;
  }
  
  const initialState: OfferState = {
    rex_loading: false,
    rex_offers: [],
    rex_error: null,
  };
  
  const offerReducer = (state = initialState, action: DeleteOfferActionTypes): OfferState => {
    switch (action.type) {
      case DELETE_OFFER_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case DELETE_OFFER_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_offers: state.rex_offers.filter((offer) => offer.id !== action.payload), // Elimina la oferta del estado
          rex_error: null,
        };
      case DELETE_OFFER_FAILURE:
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
  