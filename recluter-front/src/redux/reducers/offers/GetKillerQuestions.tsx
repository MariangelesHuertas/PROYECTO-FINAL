import {
    FETCH_GET_KILLER_QUESTIONS_OFFER,
    FETCH_GET_FAILED_KILLER_QUESTIONS_OFFER,
    FETCH_GET_SUCCESS_KILLER_QUESTIONS_OFFER,
    FETCH_GET_RESET_KILLER_QUESTIONS_OFFER
  } from "../../../constants/offers/GetKillerQuestions";
  
  interface KillerQuestionState {
    rex_loading: boolean;
    rex_failed: boolean;
    rex_request: object | null;
    rex_request_failed: object | null;
  }
  
  const INIT_STATE: KillerQuestionState = {
    rex_loading: false,
    rex_failed: false,
    rex_request: null,
    rex_request_failed: null,
  };
  
  export default (state = INIT_STATE, action: any): KillerQuestionState => {
    switch (action.type) {
      case FETCH_GET_KILLER_QUESTIONS_OFFER: {
        return {
          ...state,
          rex_loading: true
        };
      }
      case FETCH_GET_FAILED_KILLER_QUESTIONS_OFFER: {
        return {
          ...state,
          rex_loading: false,
          rex_failed: true,
          rex_request_failed: action.payload
        }
      }
      case FETCH_GET_SUCCESS_KILLER_QUESTIONS_OFFER: {
        return {
          ...state,
          rex_loading: false,
          rex_request: action.payload
        }
      }
      case FETCH_GET_RESET_KILLER_QUESTIONS_OFFER: {
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
  