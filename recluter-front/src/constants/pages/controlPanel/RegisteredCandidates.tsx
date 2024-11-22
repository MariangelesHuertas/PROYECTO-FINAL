export const FETCH_INSCRITOS_BY_DIA_REQUEST = 'FETCH_INSCRITOS_BY_DIA_REQUEST';
export const FETCH_INSCRITOS_BY_DIA_SUCCESS = 'FETCH_INSCRITOS_BY_DIA_SUCCESS';
export const FETCH_INSCRITOS_BY_DIA_FAILURE = 'FETCH_INSCRITOS_BY_DIA_FAILURE';

interface InscritosByDiaRequestAction {
  type: typeof FETCH_INSCRITOS_BY_DIA_REQUEST;
}
interface InscritosByDiaSuccessAction {
  type: typeof FETCH_INSCRITOS_BY_DIA_SUCCESS;
  payload: {
    data: any[];
  };
}
interface InscritosByDiaFailureAction {
  type: typeof FETCH_INSCRITOS_BY_DIA_FAILURE;
  payload: string;
}
export type InscritosByDiaActionTypes = 
  | InscritosByDiaRequestAction
  | InscritosByDiaSuccessAction
  | InscritosByDiaFailureAction;