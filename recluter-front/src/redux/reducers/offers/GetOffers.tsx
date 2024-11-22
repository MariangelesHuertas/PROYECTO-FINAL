import {
  FETCH_EMPLOYMENTS_REQUEST,
  FETCH_EMPLOYMENTS_SUCCESS,
  FETCH_EMPLOYMENTS_FAILURE,

  FETCH_GET_OFFER_REQUEST,
  FETCH_GET_OFFER_SUCCESS,
  FETCH_GET_OFFER_FAILURE
} from "../../../constants/pages/Employment";

interface EmploymentState {
  rex_loading: boolean;
  rex_data: any[] | null;
  rex_error: string | null;
  rex_meta: object | null;

  rex_loading_offer: boolean;
  rex_data_offer: any[] | null;
  rex_error_offer: string | null;
}

const initialState: EmploymentState = {
  rex_loading: false,
  rex_data: null,
  rex_error: null,
  rex_meta: null,

  rex_loading_offer: false,
  rex_data_offer: null,
  rex_error_offer: null

};

const GetOffers = (state = initialState, action: any): EmploymentState => {
  switch (action.type) {
    case FETCH_EMPLOYMENTS_REQUEST:
      return {
        ...state,
        rex_loading: true,
        rex_error: null,
      };
    case FETCH_EMPLOYMENTS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_data: action.payload.data,
        rex_meta: action.payload.meta
      };
    case FETCH_EMPLOYMENTS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error?.message || "Error desconocido",
      };

    case FETCH_GET_OFFER_REQUEST:
      return {
        ...state,
        rex_loading_offer: true,
        rex_error_offer: null,
      };
    case FETCH_GET_OFFER_SUCCESS:
      return {
        ...state,
        rex_loading_offer: false,
        rex_data_offer: action.payload
      };
    case FETCH_GET_OFFER_FAILURE:
      return {
        ...state,
        rex_loading_offer: false,
        rex_error_offer: action.error?.message || "Error desconocido",
      };
    default:
      return state;
  }
};

export default GetOffers;
