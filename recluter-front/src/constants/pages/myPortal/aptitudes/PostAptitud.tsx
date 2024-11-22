// src/constants/pages/myPortal/aptitudes/CreateAptitudUsuario.ts

export const CREATE_APTITUD_USUARIO_REQUEST = 'CREATE_APTITUD_USUARIO_REQUEST';
export const CREATE_APTITUD_USUARIO_SUCCESS = 'CREATE_APTITUD_USUARIO_SUCCESS';
export const CREATE_APTITUD_USUARIO_FAILURE = 'CREATE_APTITUD_USUARIO_FAILURE';

export interface CreateAptitudUsuarioRequestAction {
  type: typeof CREATE_APTITUD_USUARIO_REQUEST;
}

export interface CreateAptitudUsuarioSuccessAction {
  type: typeof CREATE_APTITUD_USUARIO_SUCCESS;
  payload: any; // Ajusta este tipo según la respuesta de tu API
}

export interface CreateAptitudUsuarioFailureAction {
  type: typeof CREATE_APTITUD_USUARIO_FAILURE;
  payload: string;
}

export type CreateAptitudUsuarioActionTypes =
  | CreateAptitudUsuarioRequestAction
  | CreateAptitudUsuarioSuccessAction
  | CreateAptitudUsuarioFailureAction;