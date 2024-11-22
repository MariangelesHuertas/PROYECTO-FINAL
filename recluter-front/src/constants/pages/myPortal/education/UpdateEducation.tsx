// Constants para las acciones relacionadas con la edición de educación de usuarios
export const EDIT_EDUCATION_REQUEST = 'EDIT_EDUCATION_REQUEST';
export const EDIT_EDUCATION_SUCCESS = 'EDIT_EDUCATION_SUCCESS';
export const EDIT_EDUCATION_FAILURE = 'EDIT_EDUCATION_FAILURE';

// Tipos de las acciones
interface EditEducationRequestAction {
  type: typeof EDIT_EDUCATION_REQUEST;
}

interface EditEducationSuccessAction {
  type: typeof EDIT_EDUCATION_SUCCESS;
  payload: {
    data: any; // Datos actualizados de la educación
  };
}

interface EditEducationFailureAction {
  type: typeof EDIT_EDUCATION_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type EducationEditActionTypes =
  | EditEducationRequestAction
  | EditEducationSuccessAction
  | EditEducationFailureAction;

// Interfaz para los datos de educación
export interface EducationData {
  id: number;
  tipo_educacion_id: number;
  centro_educativo_id: number;
  carrera_id: number;
  fecha_inicio: string;
  fecha_final: string;
  nombre_centro_educativo: string;
  carrera: string;
  ubicacion: string;
}