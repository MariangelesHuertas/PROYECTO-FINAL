export const FETCH_APPLICATION_PHASES_REQUEST = 'FETCH_APPLICATION_PHASES_REQUEST';
export const FETCH_APPLICATION_PHASES_SUCCESS = 'FETCH_APPLICATION_PHASES_SUCCESS';
export const FETCH_APPLICATION_PHASES_FAILURE = 'FETCH_APPLICATION_PHASES_FAILURE';

export interface ApplicationPhase {
  id: number;
  fase: string;
  prioridad: number;
  createdAt: string;
  updatedAt: string;
}

interface FetchApplicationPhasesRequestAction {
  type: typeof FETCH_APPLICATION_PHASES_REQUEST;
}

interface FetchApplicationPhasesSuccessAction {
  type: typeof FETCH_APPLICATION_PHASES_SUCCESS;
  payload: ApplicationPhase[];
}

interface FetchApplicationPhasesFailureAction {
  type: typeof FETCH_APPLICATION_PHASES_FAILURE;
  payload: string;
}

export type ApplicationPhasesActionTypes =
  | FetchApplicationPhasesRequestAction
  | FetchApplicationPhasesSuccessAction
  | FetchApplicationPhasesFailureAction;