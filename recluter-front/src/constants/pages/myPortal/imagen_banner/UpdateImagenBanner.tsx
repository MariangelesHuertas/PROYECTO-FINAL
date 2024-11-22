// src/constants/pages/myPortal/education/UpdateEducation.ts

export const UPDATE_IMAGEN_BANNER_REQUEST = 'UPDATE_IMAGEN_BANNER_REQUEST';
export const UPDATE_IMAGEN_BANNER_SUCCESS = 'UPDATE_IMAGEN_BANNER_SUCCESS';
export const UPDATE_IMAGEN_BANNER_FAILURE = 'UPDATE_IMAGEN_BANNER_FAILURE';

interface UpdateImagenBannerRequestAction {
  type: typeof UPDATE_IMAGEN_BANNER_REQUEST;
}

interface UpdateImagenBannerSuccessAction {
  type: typeof UPDATE_IMAGEN_BANNER_SUCCESS;
  payload: any;
}

interface UpdateImagenBannerFailureAction {
  type: typeof UPDATE_IMAGEN_BANNER_FAILURE;
  payload: string;
}

export type UpdateImagenBannerActionTypes =
  | UpdateImagenBannerRequestAction
  | UpdateImagenBannerSuccessAction
  | UpdateImagenBannerFailureAction;