// src/constants/userAptitudes.ts

export const FETCH_USER_APTITUDES_REQUEST = 'FETCH_USER_APTITUDES_REQUEST';
export const FETCH_USER_APTITUDES_SUCCESS = 'FETCH_USER_APTITUDES_SUCCESS';
export const FETCH_USER_APTITUDES_FAILURE = 'FETCH_USER_APTITUDES_FAILURE';

export interface UserAptitude {
  id: number;
  aptitud_id: number;
  usuario_id: number;
  createdAt: string;
  updatedAt: string;
  aptitudes: {
    id: number;
    aptitud: string;
    aprobado: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface FetchUserAptitudesRequestAction {
  type: typeof FETCH_USER_APTITUDES_REQUEST;
}

export interface FetchUserAptitudesSuccessAction {
  type: typeof FETCH_USER_APTITUDES_SUCCESS;
  payload: UserAptitude[];
}

export interface FetchUserAptitudesFailureAction {
  type: typeof FETCH_USER_APTITUDES_FAILURE;
  payload: string;
}

export type UserAptitudesActionTypes =
  | FetchUserAptitudesRequestAction
  | FetchUserAptitudesSuccessAction
  | FetchUserAptitudesFailureAction;