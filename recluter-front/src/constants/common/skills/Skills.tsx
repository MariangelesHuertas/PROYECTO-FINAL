// Constantes para las acciones relacionadas con "Skills"
export const FETCH_SKILLS_REQUEST = 'FETCH_SKILLS_REQUEST';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAILURE = 'FETCH_SKILLS_FAILURE';
export const FETCH_SKILLS_TABLE = 'FETCH_SKILLS_TABLE';
export const CREATE_SKILLS_REQUEST = 'CREATE_SKILLS_REQUEST';
export const CREATE_SKILLS_SUCCESS = 'CREATE_SKILLS_SUCCESS';
export const CREATE_SKILLS_FAILURE = 'CREATE_SKILLS_FAILURE';
export const DELETE_SKILLS_REQUEST = 'DELETE_SKILLS_REQUEST';
export const DELETE_SKILLS_SUCCESS = 'DELETE_SKILLS_SUCCESS';
export const DELETE_SKILLS_FAILURE = 'DELETE_SKILLS_FAILURE';
export const UPDATE_SKILLS_REQUEST = 'UPDATE_SKILLS_REQUEST';
export const UPDATE_SKILLS_SUCCESS = 'UPDATE_SKILLS_SUCCESS';
export const UPDATE_SKILLS_FAILURE = 'UPDATE_SKILLS_FAILURE';


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

interface FetchSkillsTableAction {
  type: typeof FETCH_SKILLS_TABLE;
  payload: {
    data: any[]; // Datos de las aptitudes
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateSkillsRequestAction {
  type: typeof CREATE_SKILLS_REQUEST;
}

interface CreateSkillsSuccessAction {
  type: typeof CREATE_SKILLS_SUCCESS;
  payload: any;
}

interface CreateSkillsFailureAction {
  type: typeof CREATE_SKILLS_FAILURE;
  payload: string;
}

interface FetchSkillsFailureAction {
  type: typeof FETCH_SKILLS_FAILURE;
  payload: string;
}

interface DeleteSkillsRequestAction {
  type: typeof DELETE_SKILLS_REQUEST;
}

interface DeleteSkillsSuccessAction {
  type: typeof DELETE_SKILLS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteSkillsFailureAction {
  type: typeof DELETE_SKILLS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateSkillsRequestAction {
  type: typeof UPDATE_SKILLS_REQUEST;
}

interface UpdateSkillsSuccessAction {
  type: typeof UPDATE_SKILLS_SUCCESS;
  payload: any;
}

interface UpdateSkillsFailureAction {
  type: typeof UPDATE_SKILLS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Skills"
export type SkillsActionTypes = 
  | FetchSkillsRequestAction
  | FetchSkillsSuccessAction
  | FetchSkillsFailureAction
  | FetchSkillsTableAction
  | CreateSkillsRequestAction
  | CreateSkillsSuccessAction
  | CreateSkillsFailureAction
  | DeleteSkillsRequestAction
  | DeleteSkillsSuccessAction
  | DeleteSkillsFailureAction
  | UpdateSkillsRequestAction
  | UpdateSkillsSuccessAction
  | UpdateSkillsFailureAction;

