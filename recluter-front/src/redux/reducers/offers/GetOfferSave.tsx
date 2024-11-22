import {
  FETCH_GET_OFFER_SAVE_REQUEST,
  FETCH_GET_OFFER_SAVE_SUCCESS,
  FETCH_GET_OFFER_SAVE_FAILURE
} from "../../../constants/offers/GetOfferSave";

interface EmploymentState {
  rex_loading: boolean;
  rex_data: any[] | null;
  rex_error: string | null;
  rex_meta: {
    total: 0
  } | null;
}

const initialState: EmploymentState = {
  rex_loading: false,
  rex_data: null,
  rex_error: null,
  rex_meta: null
};

const GetOfferSave = (state = initialState, action: any): EmploymentState => {
  switch (action.type) {
    case FETCH_GET_OFFER_SAVE_REQUEST:
      return {
        ...state,
        rex_loading: true,
        rex_error: null,
      };
    case FETCH_GET_OFFER_SAVE_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_data: action.payload.data,
        rex_meta: action.payload.meta
      };
    case FETCH_GET_OFFER_SAVE_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error?.message || "Error desconocido",
      };
    default:
      return state;
  }
};

export default GetOfferSave;
