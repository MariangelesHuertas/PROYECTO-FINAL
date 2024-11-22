// src/reducers/pages/myPortal/portfolio/getUserPortfolioByIdReducer.ts

import {
    GET_USER_PORTFOLIO_BY_ID_REQUEST,
    GET_USER_PORTFOLIO_BY_ID_SUCCESS,
    GET_USER_PORTFOLIO_BY_ID_FAILURE,
    GetUserPortfolioByIdActionTypes,
  } from '../../../../../constants/pages/searchCV/portfolio/GetPortfolioUser';
  
  interface GetUserPortfolioByIdState {
    rex_loading: boolean;
    rex_userPortfolioById: any | null;
    rex_error: string | null;
  }
  
  const initialState: GetUserPortfolioByIdState = {
    rex_loading: false,
    rex_userPortfolioById: null,
    rex_error: null,
  };
  
  export const getUserPortfolioByIdReducer = (
    state = initialState,
    action: GetUserPortfolioByIdActionTypes
  ): GetUserPortfolioByIdState => {
    switch (action.type) {
      case GET_USER_PORTFOLIO_BY_ID_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case GET_USER_PORTFOLIO_BY_ID_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_userPortfolioById: action.payload.data,
          rex_error: null,
        };
      case GET_USER_PORTFOLIO_BY_ID_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
          rex_userPortfolioById: null,
        };
      default:
        return state;
    }
  };
  
  export default getUserPortfolioByIdReducer;