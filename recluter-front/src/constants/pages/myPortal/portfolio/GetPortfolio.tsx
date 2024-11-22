// src/constants/pages/myPortal/portfolio/GetUserPortfolio.ts

export const GET_USER_PORTFOLIO_REQUEST = 'GET_USER_PORTFOLIO_REQUEST';
export const GET_USER_PORTFOLIO_SUCCESS = 'GET_USER_PORTFOLIO_SUCCESS';
export const GET_USER_PORTFOLIO_FAILURE = 'GET_USER_PORTFOLIO_FAILURE';

// Tipos de las acciones
interface GetUserPortfolioRequestAction {
  type: typeof GET_USER_PORTFOLIO_REQUEST;
}

interface GetUserPortfolioSuccessAction {
  type: typeof GET_USER_PORTFOLIO_SUCCESS;
  payload: {
    data: any; // Datos del portafolio del usuario
  };
}

interface GetUserPortfolioFailureAction {
  type: typeof GET_USER_PORTFOLIO_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type GetUserPortfolioActionTypes =
  | GetUserPortfolioRequestAction
  | GetUserPortfolioSuccessAction
  | GetUserPortfolioFailureAction;