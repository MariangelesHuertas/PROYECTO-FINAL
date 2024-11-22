import {
  GET_COMPANY_RATINGS_REQUEST,
  GET_COMPANY_RATINGS_SUCCESS,
  GET_COMPANY_RATINGS_FAILURE,
  GetCompanyRatingsActionTypes,
  CompanyRating,
  ValoracionStatsDto,
  GET_COMPANY_RATING_STATS_REQUEST,
  GET_COMPANY_RATING_STATS_SUCCESS,
  GET_COMPANY_RATING_STATS_FAILURE,
} from '../../../../../constants/pages/company/rating/GetRatingCompany';

interface GetCompanyRatingsState {
  rex_loading_companie: boolean;
  rex_companyRatings: CompanyRating[] | null;
  rex_ratingStats: ValoracionStatsDto[] | null;
  rex_promedioStats: number;
  rex_loadingStats: boolean;
  rex_loading: boolean;
  rex_error: string | null;
}

const initialState: GetCompanyRatingsState = {
  rex_loading_companie: false,
  rex_loading: false,
  rex_companyRatings: null,
  rex_ratingStats: null,
  rex_promedioStats: 0,
  rex_loadingStats: false,
  rex_error: null
};

const getCompanyRatingsReducer = (
  state = initialState,
  action: GetCompanyRatingsActionTypes
): GetCompanyRatingsState => {
  switch (action.type) {
    case GET_COMPANY_RATINGS_REQUEST:
      return {
        ...state,
        rex_loading_companie: true,
        rex_error: null
      };
    case GET_COMPANY_RATINGS_SUCCESS:
      return {
        ...state,
        rex_loading_companie: false,
        rex_companyRatings: action.payload,
        rex_error: null
      };
    case GET_COMPANY_RATINGS_FAILURE:
      return {
        ...state,
        rex_loading_companie: false,
        rex_error: action.payload,
        rex_companyRatings: null
      };
    case GET_COMPANY_RATING_STATS_REQUEST:
      return {
        ...state,
        rex_loadingStats: true,
        rex_error: null
      };
    case GET_COMPANY_RATING_STATS_SUCCESS:
      return {
        ...state,
        rex_loadingStats: false,
        rex_ratingStats: action.payload.stats,
        rex_promedioStats: action.payload.promedio,
        rex_error: null
      };
    case GET_COMPANY_RATING_STATS_FAILURE:
      return {
        ...state,
        rex_loadingStats: false,
        rex_error: action.payload,
        rex_ratingStats: null
      };
    default:
      return state;
  }
};

export default getCompanyRatingsReducer;
