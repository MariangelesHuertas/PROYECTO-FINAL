import { 
  SEARCH_OFFERS_EMPL_REQUEST, 
  SEARCH_OFFERS_EMPL_SUCCESS, 
  SEARCH_OFFERS_EMPL_FAILURE 
} from '../../../constants/offers/SearchOffers';

interface OfferEmplState {
  rex_loading: boolean;
  rex_offersEmpl: any[];
  rex_error?: string;
  rex_page: number;
}

const initialState: OfferEmplState = {
  rex_loading: false,
  rex_offersEmpl: [],
  rex_page: 1,
};

const searchOffersEmplReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_OFFERS_EMPL_REQUEST:
      return {
        ...state,
        rex_loading: true,
        rex_error: undefined,
      };
      
    case SEARCH_OFFERS_EMPL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_offersEmpl: action.payload.page === 1 
          ? Array.isArray(action.payload.rex_offersEmpl) ? action.payload.rex_offersEmpl : [] 
          : [...state.rex_offersEmpl, ...(Array.isArray(action.payload.rex_offersEmpl) ? action.payload.rex_offersEmpl : [])],
        rex_page: action.payload.page,
      };

    case SEARCH_OFFERS_EMPL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };

    default:
      return state;
  }
};

export default searchOffersEmplReducer;
