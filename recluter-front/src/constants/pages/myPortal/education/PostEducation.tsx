// src/constants/pages/myPortal/education/PostEducation.ts

export const ADD_EDUCATION_REQUEST = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE = 'ADD_EDUCATION_FAILURE';

// Tipos de las acciones
interface AddEducationRequestAction {
  type: typeof ADD_EDUCATION_REQUEST;
}

interface AddEducationSuccessAction {
  type: typeof ADD_EDUCATION_SUCCESS;
  payload: {
    data: any; // Datos de la nueva educación agregada
  };
}

interface AddEducationFailureAction {
  type: typeof ADD_EDUCATION_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type AddEducationActionTypes =
  | AddEducationRequestAction
  | AddEducationSuccessAction
  | AddEducationFailureAction;