export const GET_USER_RATINGS_BY_TOKEN_REQUEST = 'GET_USER_RATINGS_BY_TOKEN_REQUEST';
export const GET_USER_RATINGS_BY_TOKEN_SUCCESS = 'GET_USER_RATINGS_BY_TOKEN_SUCCESS';
export const GET_USER_RATINGS_BY_TOKEN_FAILURE = 'GET_USER_RATINGS_BY_TOKEN_FAILURE';

export interface UserRatingByToken {
  id: number;
  observacion: string;
  valoracion: string;
  createdAt: string;
  usuario: {
    imagen: string | null;
    cargo: string;
    personas: {
      apellido_materno: string;
      apellido_paterno: string;
      nombre: string;
    };
  };
}

export interface GetUserRatingsByTokenRequestAction {
  type: typeof GET_USER_RATINGS_BY_TOKEN_REQUEST;
}

export interface GetUserRatingsByTokenSuccessAction {
  type: typeof GET_USER_RATINGS_BY_TOKEN_SUCCESS;
  payload: UserRatingByToken[];
}

export interface GetUserRatingsByTokenFailureAction {
  type: typeof GET_USER_RATINGS_BY_TOKEN_FAILURE;
  payload: string;
}

export type GetUserRatingsByTokenActionTypes =
  | GetUserRatingsByTokenRequestAction
  | GetUserRatingsByTokenSuccessAction
  | GetUserRatingsByTokenFailureAction;