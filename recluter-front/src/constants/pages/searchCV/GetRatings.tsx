// src/constants/pages/myPortal/ratings/GetUserRatings.ts

export const GET_USER_RATINGS_REQUEST = 'GET_USER_RATINGS_REQUEST';
export const GET_USER_RATINGS_SUCCESS = 'GET_USER_RATINGS_SUCCESS';
export const GET_USER_RATINGS_FAILURE = 'GET_USER_RATINGS_FAILURE';

export interface UserRating {
  id: number;
  observacion: string | null;
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

interface GetUserRatingsRequestAction {
  type: typeof GET_USER_RATINGS_REQUEST;
}

interface GetUserRatingsSuccessAction {
  type: typeof GET_USER_RATINGS_SUCCESS;
  payload: {
    data: UserRating[];
    meta: any
  }
}

interface GetUserRatingsFailureAction {
  type: typeof GET_USER_RATINGS_FAILURE;
  payload: string;
}

export type GetUserRatingsActionTypes =
  | GetUserRatingsRequestAction
  | GetUserRatingsSuccessAction
  | GetUserRatingsFailureAction;