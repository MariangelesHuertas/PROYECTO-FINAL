import {
    FINALIZE_OFFER_REQUEST,
    FINALIZE_OFFER_SUCCESS,
    FINALIZE_OFFER_FAILURE,
    FinalizeOfferActionTypes,
  } from '../../../../constants/company/FinalizeOfferReducer';
  
  const initialState = {
    loading: false,
    error: null,
  };
  
  const finalizeOfferReducer = (state = initialState, action: FinalizeOfferActionTypes) => {
    switch (action.type) {
      case FINALIZE_OFFER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FINALIZE_OFFER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case FINALIZE_OFFER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default finalizeOfferReducer;
  