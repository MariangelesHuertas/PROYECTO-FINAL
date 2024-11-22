// src/constants/pages/myPortal/aptitudes/DeleteAptitudUsuario.ts

export const DELETE_APTITUD_USUARIO_REQUEST = 'DELETE_APTITUD_USUARIO_REQUEST';
export const DELETE_APTITUD_USUARIO_SUCCESS = 'DELETE_APTITUD_USUARIO_SUCCESS';
export const DELETE_APTITUD_USUARIO_FAILURE = 'DELETE_APTITUD_USUARIO_FAILURE';

export interface DeleteAptitudUsuarioRequestAction {
  type: typeof DELETE_APTITUD_USUARIO_REQUEST;
}

export interface DeleteAptitudUsuarioSuccessAction {
  type: typeof DELETE_APTITUD_USUARIO_SUCCESS;
  payload: number; // ID de la aptitud eliminada
}

export interface DeleteAptitudUsuarioFailureAction {
  type: typeof DELETE_APTITUD_USUARIO_FAILURE;
  payload: string;
}

export type DeleteAptitudUsuarioActionTypes =
  | DeleteAptitudUsuarioRequestAction
  | DeleteAptitudUsuarioSuccessAction
  | DeleteAptitudUsuarioFailureAction;