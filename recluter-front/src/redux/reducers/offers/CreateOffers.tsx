import {
  FETCH_CREATE_OFFER,
  FETCH_FAILED_CREATE_OFFER,
  FETCH_SUCCESS_CREATE_OFFER,
  FETCH_RESET_CREATE_OFFER
} from "../../../constants/offers/CreateOffers";

interface AuthState {
  rex_loading: boolean;
  rex_failed: boolean;
  rex_request: object | null;
  rex_request_failed: object | null;
}

const INIT_STATE: AuthState = {
  rex_loading: false,
  rex_failed: false,
  rex_request: null,
  rex_request_failed: null,
};

export default (state = INIT_STATE, action: any): AuthState => {
  switch (action.type) {
    case FETCH_CREATE_OFFER: {
      return {
        ...state,
        rex_loading: true
      };
    }
    case FETCH_FAILED_CREATE_OFFER: {
      return {
        ...state,
        rex_loading: false,
        rex_failed: true,
        rex_request_failed: action.payload
      }
    }
    case FETCH_SUCCESS_CREATE_OFFER: {
      return {
        ...state,
        rex_loading: false,
        rex_request: action.payload
      }
    }
    case FETCH_RESET_CREATE_OFFER: {
      return {
        ...state,
        rex_loading: false,
        rex_failed: false,
        rex_request: null
      }
    }
    default:
      return state;
  }
}
