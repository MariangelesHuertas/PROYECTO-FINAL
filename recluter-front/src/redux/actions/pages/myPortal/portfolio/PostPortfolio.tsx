import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  UPLOAD_PORTFOLIO_REQUEST,
  UPLOAD_PORTFOLIO_SUCCESS,
  UPLOAD_PORTFOLIO_FAILURE,
  UploadPortfolioActionTypes,
} from '../../../../../constants/pages/myPortal/portfolio/PostPortfolio';
import FetchWithIP from '../../../utils/FetchHeaders';

export const UploadPortfolioReducer = (
  formData: FormData
): ThunkAction<Promise<any>, RootState, unknown, UploadPortfolioActionTypes> => async (dispatch) => {
  dispatch({ type: UPLOAD_PORTFOLIO_REQUEST });

  try {
    const response = await FetchWithIP('portafolios-usuarios/uploadPortafolio', {
      method: 'POST'},
      formData,  // Aquí se pasa el FormData con los archivos
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch({ type: UPLOAD_PORTFOLIO_SUCCESS, payload: responseData });
    
    return responseData;
  } catch (error: any) {
    dispatch({ type: UPLOAD_PORTFOLIO_FAILURE, payload: error.message });
    throw error;
  }
};