export const FETCH_LATEST_INSCRITOS_REQUEST = 'FETCH_LATEST_INSCRITOS_REQUEST';
export const FETCH_LATEST_INSCRITOS_SUCCESS = 'FETCH_LATEST_INSCRITOS_SUCCESS';
export const FETCH_LATEST_INSCRITOS_FAILURE = 'FETCH_LATEST_INSCRITOS_FAILURE';

interface LatestInscritosRequestAction {
  type: typeof FETCH_LATEST_INSCRITOS_REQUEST;
}
interface LatestInscritosSuccessAction {
  type: typeof FETCH_LATEST_INSCRITOS_SUCCESS;
  payload: {
    data: any[];
  };
}
interface LatestInscritosFailureAction {
  type: typeof FETCH_LATEST_INSCRITOS_FAILURE;
  payload: string;
}
export type LatestInscritosActionTypes = 
  | LatestInscritosRequestAction
  | LatestInscritosSuccessAction
  | LatestInscritosFailureAction;