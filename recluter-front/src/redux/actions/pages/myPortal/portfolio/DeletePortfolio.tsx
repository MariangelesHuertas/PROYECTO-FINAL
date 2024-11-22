import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  DELETE_PORTFOLIO_REQUEST,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_FAILURE,
  DeletePortfolioActionTypes,
} from '../../../../../constants/pages/myPortal/portfolio/DeletePortfolio';
import FetchWithIP from '../../../utils/FetchHeaders';

export const deletePortfolioRequestReducer = (): DeletePortfolioActionTypes => ({
  type: DELETE_PORTFOLIO_REQUEST,
});

export const deletePortfolioSuccessReducer = (portafolioId: number): DeletePortfolioActionTypes => ({
  type: DELETE_PORTFOLIO_SUCCESS,
  payload: portafolioId,
});

export const deletePortfolioFailureReducer = (error: string): DeletePortfolioActionTypes => ({
  type: DELETE_PORTFOLIO_FAILURE,
  payload: error,
});

export const DeletePortfolioReducer = (portafolioId: number): ThunkAction<Promise<any>, RootState, unknown, DeletePortfolioActionTypes> => async (dispatch) => {
  dispatch(deletePortfolioRequestReducer());

  try {
    const response = await FetchWithIP(`portafolios-usuarios/deletePortafolio/${portafolioId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deletePortfolioSuccessReducer(portafolioId));
    return { success: true };
  } catch (error: any) {
    dispatch(deletePortfolioFailureReducer(error.message || 'Error al eliminar el portafolio'));
    return { error: error.message };
  }
};