export const GET_COMPANY_RATINGS_REQUEST = 'GET_COMPANY_RATINGS_REQUEST';
export const GET_COMPANY_RATINGS_SUCCESS = 'GET_COMPANY_RATINGS_SUCCESS';
export const GET_COMPANY_RATINGS_FAILURE = 'GET_COMPANY_RATINGS_FAILURE';
export const GET_COMPANY_RATING_STATS_REQUEST = 'GET_COMPANY_RATING_STATS_REQUEST';
export const GET_COMPANY_RATING_STATS_SUCCESS = 'GET_COMPANY_RATING_STATS_SUCCESS';
export const GET_COMPANY_RATING_STATS_FAILURE = 'GET_COMPANY_RATING_STATS_FAILURE';

export interface CompanyRatingData {
  id: number;
  valoracion: string;
  observacion: string;
  createdAt: string;
  usuarios: {
    imagen: string | null;
    cargo: string;
    personas: {
      apellido_materno: string;
      apellido_paterno: string;
      nombre: string;
    };
  };
}

export interface ValoracionStatsDto {
  valoracion: number;
  porcentaje: number;
  cantidadUsuarios: number;
}

export interface CompanyRating {
  id: number;
  empresa: string;
  valoraciones_empresas: CompanyRatingData[];
}

export interface GetCompanyRatingsRequestAction {
  type: typeof GET_COMPANY_RATINGS_REQUEST;
}

export interface GetCompanyRatingsSuccessAction {
  type: typeof GET_COMPANY_RATINGS_SUCCESS;
  payload: CompanyRating[];
}

export interface GetCompanyRatingsFailureAction {
  type: typeof GET_COMPANY_RATINGS_FAILURE;
  payload: string;
}

export interface GetCompanyRatingStatsRequestAction {
  type: typeof GET_COMPANY_RATING_STATS_REQUEST;
}

export interface GetCompanyRatingStatsSuccessAction {
  type: typeof GET_COMPANY_RATING_STATS_SUCCESS;
  payload: {
    stats: ValoracionStatsDto[],
    promedio: number,
  };
}

export interface GetCompanyRatingStatsFailureAction {
  type: typeof GET_COMPANY_RATING_STATS_FAILURE;
  payload: string;
}
export type GetCompanyRatingsActionTypes =
| GetCompanyRatingsRequestAction
| GetCompanyRatingsSuccessAction
| GetCompanyRatingsFailureAction
| GetCompanyRatingStatsRequestAction
| GetCompanyRatingStatsSuccessAction
| GetCompanyRatingStatsFailureAction;