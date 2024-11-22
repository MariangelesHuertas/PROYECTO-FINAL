import {
    DELETE_PORTFOLIO_REQUEST,
    DELETE_PORTFOLIO_SUCCESS,
    DELETE_PORTFOLIO_FAILURE,
    DeletePortfolioActionTypes,
  } from '../../../../../constants/pages/myPortal/portfolio/DeletePortfolio';
  
  interface DeletePortfolioState {
    rex_deleting: boolean;
    rex_deleteError: string | null;
  }
  
  const initialState: DeletePortfolioState = {
    rex_deleting: false,
    rex_deleteError: null,
  };
  
  export const deletePortfolioReducer = (
    state = initialState,
    action: DeletePortfolioActionTypes
  ): DeletePortfolioState => {
    switch (action.type) {
      case DELETE_PORTFOLIO_REQUEST:
        return {
          ...state,
          rex_deleting: true,
          rex_deleteError: null,
        };
      case DELETE_PORTFOLIO_SUCCESS:
        return {
          ...state,
          rex_deleting: false,
          rex_deleteError: null,
        };
      case DELETE_PORTFOLIO_FAILURE:
        return {
          ...state,
          rex_deleting: false,
          rex_deleteError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default deletePortfolioReducer;