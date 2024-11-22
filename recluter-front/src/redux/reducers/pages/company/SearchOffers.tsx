import { 
    SEARCH_OFFERS_REQUEST, 
    SEARCH_OFFERS_SUCCESS, 
    SEARCH_OFFERS_FAILURE 
  } from "../../../../constants/company/SearchOffers";
  
  interface OfferState {
    rex_loading: boolean;
    rex_offers: any[];
    rex_error?: string;
    page: number;  // Pagination handling
  }
  
  const initialState: OfferState = {
    rex_loading: false,
    rex_offers: [],
    page: 1,  // Initial page
  };
  
  const searchOffersReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SEARCH_OFFERS_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_error: undefined,
        };
      case SEARCH_OFFERS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_offers: action.payload.page === 1 
            ? action.payload.offers 
            : [...state.rex_offers, ...action.payload.offers],  // Append in case of multiple pages
          page: action.payload.page,
        };
      case SEARCH_OFFERS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchOffersReducer;
  