// src/constants/pages/myPortal/cv/UploadCV.ts

export const UPLOAD_CV_REQUEST = 'UPLOAD_CV_REQUEST';
export const UPLOAD_CV_SUCCESS = 'UPLOAD_CV_SUCCESS';
export const UPLOAD_CV_FAILURE = 'UPLOAD_CV_FAILURE';

interface UploadCVRequestAction {
  type: typeof UPLOAD_CV_REQUEST;
}

interface UploadCVSuccessAction {
  type: typeof UPLOAD_CV_SUCCESS;
  payload: {
    data: any; // Respuesta de la API después de subir el CV
  };
}

interface UploadCVFailureAction {
  type: typeof UPLOAD_CV_FAILURE;
  payload: string;
}

export type UploadCVActionTypes =
  | UploadCVRequestAction
  | UploadCVSuccessAction
  | UploadCVFailureAction;