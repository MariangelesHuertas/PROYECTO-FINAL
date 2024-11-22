import {
  FETCH_SIGNUP_OFFER,
  FETCH_FAILED_SIGNUP_OFFER,
  FETCH_SUCCESS_SIGNUP_OFFER,
  FETCH_RESET_SIGNUP_OFFER
} from "../../../constants/offers/SignUpOffer";

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
    case FETCH_SIGNUP_OFFER: {
      return {
        ...state,
        rex_loading: true
      };
    }
    case FETCH_FAILED_SIGNUP_OFFER: {
      return {
        ...state,
        rex_loading: false,
        rex_failed: true,
        rex_request_failed: action.payload
      }
    }
    case FETCH_SUCCESS_SIGNUP_OFFER: {
      return {
        ...state,
        rex_loading: false,
        rex_request: action.payload
      }
    }
    case FETCH_RESET_SIGNUP_OFFER: {
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
