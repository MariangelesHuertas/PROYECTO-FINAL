export const FETCH_UPDATE_PROFILE_REQUEST = 'FETCH_UPDATE_PROFILE_REQUEST';
export const FETCH_UPDATE_PROFILE_SUCCESS = 'FETCH_UPDATE_PROFILE_SUCCESS';
export const FETCH_UPDATE_PROFILE_FAILURE = 'FETCH_UPDATE_PROFILE_FAILURE';

interface FetchUpdateProfileRequestAction {
  type: typeof FETCH_UPDATE_PROFILE_REQUEST;
}

interface FetchUpdateProfileSuccessAction {
  type: typeof FETCH_UPDATE_PROFILE_SUCCESS;
  payload: any; // Tipo de la oferta detallada
}

interface FetchUpdateProfileFailureAction {
  type: typeof FETCH_UPDATE_PROFILE_FAILURE;
  payload: string;
}

export type UpdateProfileActionTypes =
  | FetchUpdateProfileRequestAction
  | FetchUpdateProfileSuccessAction
  | FetchUpdateProfileFailureAction;