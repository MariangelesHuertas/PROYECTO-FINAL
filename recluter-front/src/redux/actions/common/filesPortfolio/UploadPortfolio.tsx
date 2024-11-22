import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  UPLOAD_PORTFOLIO_FILES_REQUEST,
  UPLOAD_PORTFOLIO_FILES_SUCCESS,
  UPLOAD_PORTFOLIO_FILES_FAILURE,
  PortfolioFilesActionTypes,
  PortfolioFile
} from '../../../../constants/common/filesPortfolio/UploadPortfolio';
import FetchWithIP from '../../utils/FetchHeaders';

export const uploadPortfolioFilesRequest = (): PortfolioFilesActionTypes => ({
  type: UPLOAD_PORTFOLIO_FILES_REQUEST,
});

export const uploadPortfolioFilesSuccess = (data: PortfolioFile[]): PortfolioFilesActionTypes => ({
  type: UPLOAD_PORTFOLIO_FILES_SUCCESS,
  payload: data,
});

export const uploadPortfolioFilesFailure = (error: string): PortfolioFilesActionTypes => ({
  type: UPLOAD_PORTFOLIO_FILES_FAILURE,
  payload: error,
});

export const uploadPortfolioFilesReducer = (
  formData: FormData
): ThunkAction<Promise<{ error?: string; data?: PortfolioFile[] }>, RootState, unknown, PortfolioFilesActionTypes> => async (dispatch) => {
  dispatch(uploadPortfolioFilesRequest());

  try {
    const response = await FetchWithIP('archivos-portafolio/uploadPortafolio', {
      method: 'POST'},
      formData,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(uploadPortfolioFilesSuccess(responseData.data));
      return { data: responseData.data }; // Retorna los datos si todo está bien
    } else {
      throw new Error('No data in response');
    }
  } catch (error: any) {
    const errorMessage = error.message || 'An error occurred while uploading portfolio files';
    dispatch(uploadPortfolioFilesFailure(errorMessage));
    return { error: errorMessage }; // Retorna el error si ocurre algún problema
  }
};

