// src/constants/pages/myPortal/portfolio/GetUserPortfolioById.ts

export const GET_USER_PORTFOLIO_BY_ID_REQUEST = 'GET_USER_PORTFOLIO_BY_ID_REQUEST';
export const GET_USER_PORTFOLIO_BY_ID_SUCCESS = 'GET_USER_PORTFOLIO_BY_ID_SUCCESS';
export const GET_USER_PORTFOLIO_BY_ID_FAILURE = 'GET_USER_PORTFOLIO_BY_ID_FAILURE';

interface GetUserPortfolioByIdRequestAction {
  type: typeof GET_USER_PORTFOLIO_BY_ID_REQUEST;
}

interface GetUserPortfolioByIdSuccessAction {
  type: typeof GET_USER_PORTFOLIO_BY_ID_SUCCESS;
  payload: {
    data: any; // Datos del portafolio del usuario
  };
}

interface GetUserPortfolioByIdFailureAction {
  type: typeof GET_USER_PORTFOLIO_BY_ID_FAILURE;
  payload: string;
}

export type GetUserPortfolioByIdActionTypes =
  | GetUserPortfolioByIdRequestAction
  | GetUserPortfolioByIdSuccessAction
  | GetUserPortfolioByIdFailureAction;