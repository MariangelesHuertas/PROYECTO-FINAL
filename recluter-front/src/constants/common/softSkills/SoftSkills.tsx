// Constantes para las acciones relacionadas con "Soft Skills"
export const FETCH_SOFT_SKILLS_REQUEST = 'FETCH_SOFT_SKILLS_REQUEST';
export const FETCH_SOFT_SKILLS_SUCCESS = 'FETCH_SOFT_SKILLS_SUCCESS';
export const FETCH_SOFT_SKILLS_FAILURE = 'FETCH_SOFT_SKILLS_FAILURE';
export const FETCH_SOFT_SKILLS_TABLE = 'FETCH_SOFT_SKILLS_TABLE';
export const CREATE_SOFT_SKILLS_REQUEST = 'CREATE_SOFT_SKILLS_REQUEST';
export const CREATE_SOFT_SKILLS_SUCCESS = 'CREATE_SOFT_SKILLS_SUCCESS';
export const CREATE_SOFT_SKILLS_FAILURE = 'CREATE_SOFT_SKILLS_FAILURE';
export const DELETE_SOFT_SKILLS_REQUEST = 'DELETE_SOFT_SKILLS_REQUEST';
export const DELETE_SOFT_SKILLS_SUCCESS = 'DELETE_SOFT_SKILLS_SUCCESS';
export const DELETE_SOFT_SKILLS_FAILURE = 'DELETE_SOFT_SKILLS_FAILURE';
export const UPDATE_SOFT_SKILLS_REQUEST = 'UPDATE_SOFT_SKILLS_REQUEST';
export const UPDATE_SOFT_SKILLS_SUCCESS = 'UPDATE_SOFT_SKILLS_SUCCESS';
export const UPDATE_SOFT_SKILLS_FAILURE = 'UPDATE_SOFT_SKILLS_FAILURE';

// Tipos de las acciones
interface FetchSoftSkillsRequestAction {
  type: typeof FETCH_SOFT_SKILLS_REQUEST;
}

interface FetchSoftSkillsSuccessAction {
  type: typeof FETCH_SOFT_SKILLS_SUCCESS;
  payload: {
    data: any[]; // Datos de las soft skills
  };
}

interface FetchSoftSkillsFailureAction {
  type: typeof FETCH_SOFT_SKILLS_FAILURE;
  payload: string;
}

interface FetchSoftSkillsTableAction {
  type: typeof FETCH_SOFT_SKILLS_TABLE;
  payload: {
    data: any[]; // Datos de los sectores
    meta?: { total: number; limit: number; page: number }; // Información adicional de paginación (opcional)
  };
}

interface CreateSoftSkillsRequestAction {
  type: typeof CREATE_SOFT_SKILLS_REQUEST;
}

interface CreateSoftSkillsSuccessAction {
  type: typeof CREATE_SOFT_SKILLS_SUCCESS;
  payload: any;
}

interface CreateSoftSkillsFailureAction {
  type: typeof CREATE_SOFT_SKILLS_FAILURE;
  payload: string;
}

interface DeleteSoftSkillsRequestAction {
  type: typeof DELETE_SOFT_SKILLS_REQUEST;
}

interface DeleteSoftSkillsSuccessAction {
  type: typeof DELETE_SOFT_SKILLS_SUCCESS;
  payload: number; // ID del skill eliminado
}

interface DeleteSoftSkillsFailureAction {
  type: typeof DELETE_SOFT_SKILLS_FAILURE;
  payload: string; // Mensaje de error
}

interface UpdateSoftSkillsRequestAction {
  type: typeof UPDATE_SOFT_SKILLS_REQUEST;
}

interface UpdateSoftSkillsSuccessAction {
  type: typeof UPDATE_SOFT_SKILLS_SUCCESS;
  payload: any;
}

interface UpdateSoftSkillsFailureAction {
  type: typeof UPDATE_SOFT_SKILLS_FAILURE;
  payload: string;
}

// Union Type para todas las posibles acciones de "Soft Skills"
export type SoftSkillsActionTypes = 
  | FetchSoftSkillsRequestAction
  | FetchSoftSkillsSuccessAction
  | FetchSoftSkillsFailureAction
  | FetchSoftSkillsTableAction
  | CreateSoftSkillsRequestAction
  | CreateSoftSkillsSuccessAction
  | CreateSoftSkillsFailureAction
  | DeleteSoftSkillsRequestAction
  | DeleteSoftSkillsSuccessAction
  | DeleteSoftSkillsFailureAction
  | UpdateSoftSkillsRequestAction
  | UpdateSoftSkillsSuccessAction
  | UpdateSoftSkillsFailureAction;
