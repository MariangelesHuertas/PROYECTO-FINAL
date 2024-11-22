import {
  UPLOAD_PORTFOLIO_REQUEST,
  UPLOAD_PORTFOLIO_SUCCESS,
  UPLOAD_PORTFOLIO_FAILURE,
  UploadPortfolioActionTypes,
} from '../../../../../constants/pages/myPortal/portfolio/PostPortfolio';

interface UploadPortfolioState {
  rex_uploading: boolean;
  rex_uploadSuccess: boolean;
  rex_uploadError: string | null;
}

const initialState: UploadPortfolioState = {
  rex_uploading: false,
  rex_uploadSuccess: false,
  rex_uploadError: null,
};

export const uploadPortfolioReducer = (
  state = initialState,
  action: UploadPortfolioActionTypes
): UploadPortfolioState => {
  switch (action.type) {
    case UPLOAD_PORTFOLIO_REQUEST:
      return {
        ...state,
        rex_uploading: true,
        rex_uploadSuccess: false,
        rex_uploadError: null,
      };
    case UPLOAD_PORTFOLIO_SUCCESS:
      return {
        ...state,
        rex_uploading: false,
        rex_uploadSuccess: true,
        rex_uploadError: null,
      };
    case UPLOAD_PORTFOLIO_FAILURE:
      return {
        ...state,
        rex_uploading: false,
        rex_uploadSuccess: false,
        rex_uploadError: action.payload,
      };
    default:
      return state;
  }
};

export default uploadPortfolioReducer;
