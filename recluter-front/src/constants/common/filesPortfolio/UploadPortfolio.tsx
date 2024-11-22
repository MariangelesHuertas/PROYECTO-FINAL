export const UPLOAD_PORTFOLIO_FILES_REQUEST = 'UPLOAD_PORTFOLIO_FILES_REQUEST';
export const UPLOAD_PORTFOLIO_FILES_SUCCESS = 'UPLOAD_PORTFOLIO_FILES_SUCCESS';
export const UPLOAD_PORTFOLIO_FILES_FAILURE = 'UPLOAD_PORTFOLIO_FILES_FAILURE';

export interface PortfolioFile {
  id: number;
  nombre: string;
  url: string;
}

interface UploadPortfolioFilesRequestAction {
  type: typeof UPLOAD_PORTFOLIO_FILES_REQUEST;
}

interface UploadPortfolioFilesSuccessAction {
  type: typeof UPLOAD_PORTFOLIO_FILES_SUCCESS;
  payload: PortfolioFile[];
}

interface UploadPortfolioFilesFailureAction {
  type: typeof UPLOAD_PORTFOLIO_FILES_FAILURE;
  payload: string;
}

export type PortfolioFilesActionTypes =
  | UploadPortfolioFilesRequestAction
  | UploadPortfolioFilesSuccessAction
  | UploadPortfolioFilesFailureAction;