export const DELETE_PORTFOLIO_REQUEST = 'DELETE_PORTFOLIO_REQUEST';
export const DELETE_PORTFOLIO_SUCCESS = 'DELETE_PORTFOLIO_SUCCESS';
export const DELETE_PORTFOLIO_FAILURE = 'DELETE_PORTFOLIO_FAILURE';

// Tipos de las acciones
interface DeletePortfolioRequestAction {
  type: typeof DELETE_PORTFOLIO_REQUEST;
}

interface DeletePortfolioSuccessAction {
  type: typeof DELETE_PORTFOLIO_SUCCESS;
  payload: number; // ID del portafolio eliminado
}

interface DeletePortfolioFailureAction {
  type: typeof DELETE_PORTFOLIO_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type DeletePortfolioActionTypes =
  | DeletePortfolioRequestAction
  | DeletePortfolioSuccessAction
  | DeletePortfolioFailureAction;