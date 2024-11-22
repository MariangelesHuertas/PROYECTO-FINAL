import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import FetchWithIP from '../../../utils/FetchHeaders';
import {
  GET_COMPANY_RATINGS_REQUEST,
  GET_COMPANY_RATINGS_SUCCESS,
  GET_COMPANY_RATINGS_FAILURE,
  GetCompanyRatingsActionTypes,
  CompanyRating,
  GET_COMPANY_RATING_STATS_REQUEST,
  GET_COMPANY_RATING_STATS_SUCCESS,
  ValoracionStatsDto,
  GET_COMPANY_RATING_STATS_FAILURE
} from '../../../../../constants/pages/company/rating/GetRatingCompany';

export const getCompanyRatingsRequest = (): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATINGS_REQUEST
});

export const getCompanyRatingsSuccess = (data: CompanyRating[]): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATINGS_SUCCESS,
  payload: data
});

export const getCompanyRatingsFailure = (error: string): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATINGS_FAILURE,
  payload: error
});

export const getCompanyRatingStatsRequest = (): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATING_STATS_REQUEST
});

export const getCompanyRatingStatsSuccess = (data: ValoracionStatsDto[], promedio:number): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATING_STATS_SUCCESS,
  payload: {
    stats: data,
    promedio: promedio,
  }
});

export const getCompanyRatingStatsFailure = (error: string): GetCompanyRatingsActionTypes => ({
  type: GET_COMPANY_RATING_STATS_FAILURE,
  payload: error
});

export const GetCompanyRatingStatsAction = (
  empresaId: number
): ThunkAction<Promise<void>, RootState, unknown, GetCompanyRatingsActionTypes> => async (dispatch) => {
  dispatch(getCompanyRatingStatsRequest());

  try {
    const response = await FetchWithIP(`valoraciones-empresas/stats/${empresaId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData:{ stats: [], promedioValoracion : number} = await response.json();

    if (responseData) {
      dispatch(getCompanyRatingStatsSuccess(responseData.stats, responseData.promedioValoracion));
    } else {
      throw new Error('Formato de datos inesperado');
    }
  } catch (error: any) {
    dispatch(getCompanyRatingStatsFailure(error.message || 'Ha ocurrido un error al obtener las estadísticas de valoraciones de la empresa'));
  }
};

export const GetCompanyRatingsReducer = (
  empresaId: number
): ThunkAction<Promise<void>, RootState, unknown, GetCompanyRatingsActionTypes> => async (dispatch) => {
  dispatch(getCompanyRatingsRequest());

  try {
    const response = await FetchWithIP(`empresas/findAllValoracionesDetails/${empresaId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    // Asumiendo que responseData.data es un array de CompanyRating
    if (responseData && responseData.data) {
      dispatch(getCompanyRatingsSuccess(responseData.data));
    } else {
      throw new Error('Formato de datos inesperado');
    }
  } catch (error: any) {
    dispatch(getCompanyRatingsFailure(error.message || 'Ha ocurrido un error al obtener las valoraciones de la empresa'));
  }
};