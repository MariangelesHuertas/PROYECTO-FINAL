import { 
    FETCH_INSCRITOS_OFFERS_REQUEST,
    FETCH_INSCRITOS_OFFERS_SUCCESS,
    FETCH_INSCRITOS_OFFERS_FAILURE,
    FETCH_INSCRITOS_OFFERS_SUCCESS_ALL,
    InscritosOfferActionTypes 
} from "../../../../constants/company/InscritosOffers";

interface InscritosOfferState {
    loading: boolean; 
    data: any | null;  
    allData: any | null; 
    error: string | null; 
}

const initialState: InscritosOfferState = {
    loading: false,
    data: null,
    allData: null,
    error: null,
};

const inscritosOfferReducer = (
    state = initialState, 
    action: InscritosOfferActionTypes
): InscritosOfferState => {
    switch (action.type) {
        case FETCH_INSCRITOS_OFFERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null, 
            };
        
        case FETCH_INSCRITOS_OFFERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data, 
                error: null, 
            };

        case FETCH_INSCRITOS_OFFERS_SUCCESS_ALL:
            return {
                ...state,
                loading: false,
                allData: action.payload.data, 
                error: null, 
            };

        case FETCH_INSCRITOS_OFFERS_FAILURE:
            return {
                ...state,
                loading: false,
                data: null, 
                allData: null, 
                error: action.payload, 
            };
        
        default:
            return state;
    }
};

export default inscritosOfferReducer;
