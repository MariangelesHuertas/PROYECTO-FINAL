// src/constants/pages/myPortal/cv/ChangeDefaultCV.ts

export const CHANGE_DEFAULT_CV_REQUEST = 'CHANGE_DEFAULT_CV_REQUEST';
export const CHANGE_DEFAULT_CV_SUCCESS = 'CHANGE_DEFAULT_CV_SUCCESS';
export const CHANGE_DEFAULT_CV_FAILURE = 'CHANGE_DEFAULT_CV_FAILURE';

interface ChangeDefaultCVRequestAction {
  type: typeof CHANGE_DEFAULT_CV_REQUEST;
}

interface ChangeDefaultCVSuccessAction {
  type: typeof CHANGE_DEFAULT_CV_SUCCESS;
  payload: number; // ID del CV establecido como predeterminado
}

interface ChangeDefaultCVFailureAction {
  type: typeof CHANGE_DEFAULT_CV_FAILURE;
  payload: string;
}

export type ChangeDefaultCVActionTypes =
  | ChangeDefaultCVRequestAction
  | ChangeDefaultCVSuccessAction
  | ChangeDefaultCVFailureAction;