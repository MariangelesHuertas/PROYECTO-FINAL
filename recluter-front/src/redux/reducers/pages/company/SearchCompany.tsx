import { 
    SEARCH_COMPANY_REQUEST, 
    SEARCH_COMPANY_SUCCESS, 
    SEARCH_COMPANY_FAILURE 
  } from "../../../../constants/company/SearchCompany";
  
  interface CompanyState {
    rex_loading: boolean;
    rex_companies: any[];
    rex_error?: string;
    page: number;  // Pagination handling
  }
  
  const initialState: CompanyState = {
    rex_loading: false,
    rex_companies: [],
    page: 1,  // Initial page
  };
  
  const searchCompanyReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SEARCH_COMPANY_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_error: undefined,
        };
      case SEARCH_COMPANY_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_companies: action.payload.page === 1 
            ? action.payload.companies 
            : [...state.rex_companies, ...action.payload.companies],  // Append in case of multiple pages
          page: action.payload.page,
        };
      case SEARCH_COMPANY_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchCompanyReducer;
  