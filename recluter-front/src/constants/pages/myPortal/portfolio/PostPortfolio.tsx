
// src/constants/pages/myPortal/portfolio/UploadPortfolio.ts

export const UPLOAD_PORTFOLIO_REQUEST = 'UPLOAD_PORTFOLIO_REQUEST';
export const UPLOAD_PORTFOLIO_SUCCESS = 'UPLOAD_PORTFOLIO_SUCCESS';
export const UPLOAD_PORTFOLIO_FAILURE = 'UPLOAD_PORTFOLIO_FAILURE';

interface UploadPortfolioRequestAction {
  type: typeof UPLOAD_PORTFOLIO_REQUEST;
}

interface UploadPortfolioSuccessAction {
  type: typeof UPLOAD_PORTFOLIO_SUCCESS;
  payload: {
    data: any; // Datos del portafolio subido
  };
}

interface UploadPortfolioFailureAction {
  type: typeof UPLOAD_PORTFOLIO_FAILURE;
  payload: string;
}

export type UploadPortfolioActionTypes =
  | UploadPortfolioRequestAction
  | UploadPortfolioSuccessAction
  | UploadPortfolioFailureAction;