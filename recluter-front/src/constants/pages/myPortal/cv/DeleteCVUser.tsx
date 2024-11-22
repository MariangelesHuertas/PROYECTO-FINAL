// src/constants/pages/myPortal/cv/DeleteCV.ts

export const DELETE_CV_REQUEST = 'DELETE_CV_REQUEST';
export const DELETE_CV_SUCCESS = 'DELETE_CV_SUCCESS';
export const DELETE_CV_FAILURE = 'DELETE_CV_FAILURE';

interface DeleteCVRequestAction {
  type: typeof DELETE_CV_REQUEST;
}

interface DeleteCVSuccessAction {
  type: typeof DELETE_CV_SUCCESS;
  payload: number; // ID del CV eliminado
}

interface DeleteCVFailureAction {
  type: typeof DELETE_CV_FAILURE;
  payload: string;
}

export type DeleteCVActionTypes =
  | DeleteCVRequestAction
  | DeleteCVSuccessAction
  | DeleteCVFailureAction;