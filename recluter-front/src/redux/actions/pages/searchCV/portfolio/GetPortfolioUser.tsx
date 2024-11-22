// src/actions/pages/myPortal/portfolio/getUserPortfolioByIdActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_USER_PORTFOLIO_BY_ID_REQUEST,
  GET_USER_PORTFOLIO_BY_ID_SUCCESS,
  GET_USER_PORTFOLIO_BY_ID_FAILURE,
  GetUserPortfolioByIdActionTypes,
} from '../../../../../constants/pages/searchCV/portfolio/GetPortfolioUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getUserPortfolioByIdRequestReducer = (): GetUserPortfolioByIdActionTypes => ({
  type: GET_USER_PORTFOLIO_BY_ID_REQUEST,
});

export const getUserPortfolioByIdSuccessReducer = (data: any): GetUserPortfolioByIdActionTypes => ({
  type: GET_USER_PORTFOLIO_BY_ID_SUCCESS,
  payload: { data },
});

export const getUserPortfolioByIdFailureReducer = (error: string): GetUserPortfolioByIdActionTypes => ({
  type: GET_USER_PORTFOLIO_BY_ID_FAILURE,
  payload: error,
});

export const GetUserPortfolioByIdReducer = (userId: number): ThunkAction<Promise<any>, RootState, unknown, GetUserPortfolioByIdActionTypes> => async (dispatch) => {
  dispatch(getUserPortfolioByIdRequestReducer());

  try {
    const response = await FetchWithIP(`portafolios-usuarios/findPortafolioUsuarioByUser/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getUserPortfolioByIdSuccessReducer(responseData));
    return responseData;
  } catch (error: any) {
    dispatch(getUserPortfolioByIdFailureReducer(error.message || 'Error al obtener el portafolio del usuario'));
    return { error: error.message };
  }
};