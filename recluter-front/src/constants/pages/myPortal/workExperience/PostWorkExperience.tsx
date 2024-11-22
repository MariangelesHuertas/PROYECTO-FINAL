// Constants para las acciones relacionadas con agregar experiencias laborales
export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';

// Tipos de las acciones
interface AddExperienceRequestAction {
  type: typeof ADD_EXPERIENCE_REQUEST;
}

interface AddExperienceSuccessAction {
  type: typeof ADD_EXPERIENCE_SUCCESS;
  payload: {
    data: any; // Datos de la nueva experiencia agregada
  };
}

interface AddExperienceFailureAction {
  type: typeof ADD_EXPERIENCE_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type AddExperienceActionTypes =
  | AddExperienceRequestAction
  | AddExperienceSuccessAction
  | AddExperienceFailureAction;
