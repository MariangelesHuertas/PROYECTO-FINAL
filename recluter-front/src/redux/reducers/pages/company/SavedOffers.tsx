import { 
  FETCH_SAVED_OFFERS_REQUEST,
  FETCH_SAVED_OFFERS_SUCCESS,
  FETCH_SAVED_OFFERS_FAILURE,
  SavedOfferActionTypes 
} from "../../../../constants/company/SavedOffers";
  
  interface OfferState {
    rex_loading: boolean;
    rex_savedoffers: any[];
    rex_total: number;
    rex_limit: number;
    rex_page: number;
    rex_error: string | null;
  }
  
  const initialState: OfferState = {
    rex_loading: false,
    rex_savedoffers: [],
    rex_total: 0,
    rex_limit: 10,
    rex_page: 1,
    rex_error: null,
  };
  
  const savedofferReducer = (state = initialState, action: SavedOfferActionTypes): OfferState => {
    switch (action.type) {
      case FETCH_SAVED_OFFERS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_SAVED_OFFERS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_savedoffers: action.payload.data,  // Sobrescribe las ofertas en lugar de concatenar
          rex_total: action.payload.meta.total,
          rex_limit: action.payload.meta.limit,
          rex_page: action.payload.meta.page,
          rex_error: null,
        };
      case FETCH_SAVED_OFFERS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default savedofferReducer;
  