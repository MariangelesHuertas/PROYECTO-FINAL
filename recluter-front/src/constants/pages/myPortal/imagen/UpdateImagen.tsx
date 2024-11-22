// src/constants/pages/myPortal/education/UpdateEducation.ts

export const UPDATE_IMAGEN_REQUEST = 'UPDATE_IMAGEN_REQUEST';
export const UPDATE_IMAGEN_SUCCESS = 'UPDATE_IMAGEN_SUCCESS';
export const UPDATE_IMAGEN_FAILURE = 'UPDATE_IMAGEN_FAILURE';

interface UpdateImagenRequestAction {
  type: typeof UPDATE_IMAGEN_REQUEST;
}

interface UpdateImagenSuccessAction {
  type: typeof UPDATE_IMAGEN_SUCCESS;
  payload: any;
}

interface UpdateImagenFailureAction {
  type: typeof UPDATE_IMAGEN_FAILURE;
  payload: string;
}

export type UpdateImagenActionTypes =
  | UpdateImagenRequestAction
  | UpdateImagenSuccessAction
  | UpdateImagenFailureAction;