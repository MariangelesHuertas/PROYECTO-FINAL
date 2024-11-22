// src/constants/pages/myPortal/workExperience/UpdateWorkExperience.ts

export const UPDATE_EXPERIENCE_REQUEST = 'UPDATE_EXPERIENCE_REQUEST';
export const UPDATE_EXPERIENCE_SUCCESS = 'UPDATE_EXPERIENCE_SUCCESS';
export const UPDATE_EXPERIENCE_FAILURE = 'UPDATE_EXPERIENCE_FAILURE';

// Tipos de las acciones
interface UpdateExperienceRequestAction {
  type: typeof UPDATE_EXPERIENCE_REQUEST;
}

interface UpdateExperienceSuccessAction {
  type: typeof UPDATE_EXPERIENCE_SUCCESS;
  payload: {
    data: any; // Datos de la experiencia laboral actualizada
  };
}

interface UpdateExperienceFailureAction {
  type: typeof UPDATE_EXPERIENCE_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type UpdateExperienceActionTypes =
  | UpdateExperienceRequestAction
  | UpdateExperienceSuccessAction
  | UpdateExperienceFailureAction;