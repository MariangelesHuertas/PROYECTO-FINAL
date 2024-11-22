import {
  FETCH_VALUE_COMPANY_FAILURE,
  FETCH_VALUE_COMPANY_REQUEST,
  FETCH_VALUE_COMPANY_SUCCESS,
  ValueCompanyActionTypes
} from '../../../../constants/company/rating/ValueCompany';

interface ValueCompanyState {
  rex_loading: boolean;
  rex_data_value_company: any | null;
  rex_error: string | null;
}

const initialState: ValueCompanyState = {
  rex_loading: false,
  rex_data_value_company: null,
  rex_error: null,
};

const offerDetailReducer = (
  state = initialState, action: ValueCompanyActionTypes
): ValueCompanyState => {
  switch (action.type) {
    case FETCH_VALUE_COMPANY_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_VALUE_COMPANY_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_data_value_company: action.payload,
        rex_error: null,
      };
    case FETCH_VALUE_COMPANY_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_data_value_company: null,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default offerDetailReducer;