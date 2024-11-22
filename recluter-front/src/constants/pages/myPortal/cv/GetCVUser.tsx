// src/constants/pages/myPortal/cv/GetUserCV.ts

export const GET_USER_CV_REQUEST = 'GET_USER_CV_REQUEST';
export const GET_USER_CV_SUCCESS = 'GET_USER_CV_SUCCESS';
export const GET_USER_CV_FAILURE = 'GET_USER_CV_FAILURE';

// Tipos de las acciones
interface GetUserCVRequestAction {
  type: typeof GET_USER_CV_REQUEST;
}

interface GetUserCVSuccessAction {
  type: typeof GET_USER_CV_SUCCESS;
  payload: {
    data: any; // Datos del CV del usuario
  };
}

interface GetUserCVFailureAction {
  type: typeof GET_USER_CV_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type GetUserCVActionTypes =
  | GetUserCVRequestAction
  | GetUserCVSuccessAction
  | GetUserCVFailureAction;