// src/constants/updateFasePostulacion.ts

export const UPDATE_FASE_POSTULACION_REQUEST = 'UPDATE_FASE_POSTULACION_REQUEST';
export const UPDATE_FASE_POSTULACION_SUCCESS = 'UPDATE_FASE_POSTULACION_SUCCESS';
export const UPDATE_FASE_POSTULACION_FAILURE = 'UPDATE_FASE_POSTULACION_FAILURE';

export interface UpdateFasePostulacionRequestAction {
  type: typeof UPDATE_FASE_POSTULACION_REQUEST;
}

export interface UpdateFasePostulacionSuccessAction {
  type: typeof UPDATE_FASE_POSTULACION_SUCCESS;
  payload: any; // Ajusta este tipo según la respuesta de tu API
}

export interface UpdateFasePostulacionFailureAction {
  type: typeof UPDATE_FASE_POSTULACION_FAILURE;
  payload: string;
}

export type UpdateFasePostulacionActionTypes =
  | UpdateFasePostulacionRequestAction
  | UpdateFasePostulacionSuccessAction
  | UpdateFasePostulacionFailureAction;