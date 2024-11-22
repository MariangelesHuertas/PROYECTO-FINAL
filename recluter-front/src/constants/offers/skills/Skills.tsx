// Constantes para las acciones relacionadas con "Skills"
export const FETCH_SKILLS_REQUEST = 'FETCH_SKILLS_REQUEST';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAILURE = 'FETCH_SKILLS_FAILURE';

// Tipos de las acciones
interface FetchSkillsRequestAction {
  type: typeof FETCH_SKILLS_REQUEST;
}

interface FetchSkillsSuccessAction {
  type: typeof FETCH_SKILLS_SUCCESS;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface FetchSkillsFailureAction {
  type: typeof FETCH_SKILLS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Skills"
export type SkillsActionTypes = 
  | FetchSkillsRequestAction
  | FetchSkillsSuccessAction
  | FetchSkillsFailureAction;
