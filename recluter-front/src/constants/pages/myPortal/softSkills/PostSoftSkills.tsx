// src/constants/pages/myPortal/softSkills/CreateSoftSkillUsuario.ts

export const CREATE_SOFT_SKILL_USUARIO_REQUEST = 'CREATE_SOFT_SKILL_USUARIO_REQUEST';
export const CREATE_SOFT_SKILL_USUARIO_SUCCESS = 'CREATE_SOFT_SKILL_USUARIO_SUCCESS';
export const CREATE_SOFT_SKILL_USUARIO_FAILURE = 'CREATE_SOFT_SKILL_USUARIO_FAILURE';

export interface CreateSoftSkillUsuarioRequestAction {
  type: typeof CREATE_SOFT_SKILL_USUARIO_REQUEST;
}

export interface CreateSoftSkillUsuarioSuccessAction {
  type: typeof CREATE_SOFT_SKILL_USUARIO_SUCCESS;
  payload: any;
}

export interface CreateSoftSkillUsuarioFailureAction {
  type: typeof CREATE_SOFT_SKILL_USUARIO_FAILURE;
  payload: string;
}

export type CreateSoftSkillUsuarioActionTypes =
  | CreateSoftSkillUsuarioRequestAction
  | CreateSoftSkillUsuarioSuccessAction
  | CreateSoftSkillUsuarioFailureAction;