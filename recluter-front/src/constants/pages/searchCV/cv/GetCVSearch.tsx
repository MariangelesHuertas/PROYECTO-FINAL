// src/constants/pages/myPortal/cv/GetUserCVById.ts

export const GET_USER_CV_BY_ID_REQUEST = 'GET_USER_CV_BY_ID_REQUEST';
export const GET_USER_CV_BY_ID_SUCCESS = 'GET_USER_CV_BY_ID_SUCCESS';
export const GET_USER_CV_BY_ID_FAILURE = 'GET_USER_CV_BY_ID_FAILURE';

// Tipos de las acciones
interface GetUserCVByIdRequestAction {
  type: typeof GET_USER_CV_BY_ID_REQUEST;
}

interface GetUserCVByIdSuccessAction {
  type: typeof GET_USER_CV_BY_ID_SUCCESS;
  payload: {
    data: any; // Datos del CV del usuario
  };
}

interface GetUserCVByIdFailureAction {
  type: typeof GET_USER_CV_BY_ID_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type GetUserCVByIdActionTypes =
  | GetUserCVByIdRequestAction
  | GetUserCVByIdSuccessAction
  | GetUserCVByIdFailureAction;