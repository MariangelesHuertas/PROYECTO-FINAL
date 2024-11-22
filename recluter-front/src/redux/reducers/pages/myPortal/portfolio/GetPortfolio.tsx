import {
  GET_USER_PORTFOLIO_REQUEST,
  GET_USER_PORTFOLIO_SUCCESS,
  GET_USER_PORTFOLIO_FAILURE,
  GetUserPortfolioActionTypes,
} from '../../../../../constants/pages/myPortal/portfolio/GetPortfolio';

interface GetUserPortfolioState {
  rex_loading: boolean;
  rex_userPortfolio: any[];
  rex_error: string | null;
}

const initialState: GetUserPortfolioState = {
  rex_loading: false,
  rex_userPortfolio: [],
  rex_error: null,
};

export const getUserPortfolioReducer = (
  state = initialState,
  action: GetUserPortfolioActionTypes
): GetUserPortfolioState => {
  switch (action.type) {
    case GET_USER_PORTFOLIO_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case GET_USER_PORTFOLIO_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_userPortfolio: action.payload.data.data, // Accedemos al array 'data' dentro de la respuesta
        rex_error: null,
      };
    case GET_USER_PORTFOLIO_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
        rex_userPortfolio: [],
      };
    default:
      return state;
  }
};

export default getUserPortfolioReducer;