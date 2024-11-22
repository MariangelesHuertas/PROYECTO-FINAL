// src/constants/pages/myPortal/softSkills/GetSoftSkills.ts

export const GET_SOFT_SKILLS_REQUEST = 'GET_SOFT_SKILLS_REQUEST';
export const GET_SOFT_SKILLS_SUCCESS = 'GET_SOFT_SKILLS_SUCCESS';
export const GET_SOFT_SKILLS_FAILURE = 'GET_SOFT_SKILLS_FAILURE';

// Tipos de las acciones
interface GetSoftSkillsRequestAction {
  type: typeof GET_SOFT_SKILLS_REQUEST;
}

interface GetSoftSkillsSuccessAction {
  type: typeof GET_SOFT_SKILLS_SUCCESS;
  payload: {
    data: any; // Datos de las soft skills
  };
}

interface GetSoftSkillsFailureAction {
  type: typeof GET_SOFT_SKILLS_FAILURE;
  payload: string;
}

// Exportamos los tipos de las acciones
export type GetSoftSkillsActionTypes =
  | GetSoftSkillsRequestAction
  | GetSoftSkillsSuccessAction
  | GetSoftSkillsFailureAction;