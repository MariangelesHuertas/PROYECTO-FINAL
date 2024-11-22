import {
    UPLOAD_PORTFOLIO_FILES_REQUEST,
    UPLOAD_PORTFOLIO_FILES_SUCCESS,
    UPLOAD_PORTFOLIO_FILES_FAILURE,
    PortfolioFilesActionTypes,
    PortfolioFile
} from '../../../../constants/common/filesPortfolio/UploadPortfolio';
  
  interface PortfolioFilesState {
    loading: boolean;
    files: PortfolioFile[];
    error: string | null;
  }
  
  const initialState: PortfolioFilesState = {
    loading: false,
    files: [],
    error: null,
  };
  
  const portfolioFilesReducer = (
    state = initialState,
    action: PortfolioFilesActionTypes
  ): PortfolioFilesState => {
    switch (action.type) {
      case UPLOAD_PORTFOLIO_FILES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPLOAD_PORTFOLIO_FILES_SUCCESS:
        return {
          ...state,
          loading: false,
          files: action.payload,
          error: null,
        };
      case UPLOAD_PORTFOLIO_FILES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default portfolioFilesReducer;