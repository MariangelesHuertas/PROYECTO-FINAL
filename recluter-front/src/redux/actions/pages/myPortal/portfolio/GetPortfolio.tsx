// src/actions/pages/myPortal/portfolio/getUserPortfolioActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_USER_PORTFOLIO_REQUEST,
  GET_USER_PORTFOLIO_SUCCESS,
  GET_USER_PORTFOLIO_FAILURE,
  GetUserPortfolioActionTypes,
} from '../../../../../constants/pages/myPortal/portfolio/GetPortfolio';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getUserPortfolioRequestReducer = (): GetUserPortfolioActionTypes => ({
  type: GET_USER_PORTFOLIO_REQUEST,
});

export const getUserPortfolioSuccessReducer = (data: any): GetUserPortfolioActionTypes => ({
  type: GET_USER_PORTFOLIO_SUCCESS,
  payload: { data },
});

export const getUserPortfolioFailureReducer = (error: string): GetUserPortfolioActionTypes => ({
  type: GET_USER_PORTFOLIO_FAILURE,
  payload: error,
});

export const GetUserPortfolioReducer = (): ThunkAction<Promise<any>, RootState, unknown, GetUserPortfolioActionTypes> => async (dispatch) => {
  dispatch(getUserPortfolioRequestReducer());

  try {
    const response = await FetchWithIP('portafolios-usuarios/findPortafolioUsuarioByToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getUserPortfolioSuccessReducer(responseData));
    return responseData;
  } catch (error: any) {
    dispatch(getUserPortfolioFailureReducer(error.message || 'Error al obtener el portafolio del usuario'));
    return { error: error.message };
  }
};