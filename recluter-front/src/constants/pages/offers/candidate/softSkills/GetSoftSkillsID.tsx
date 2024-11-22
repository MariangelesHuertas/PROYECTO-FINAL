export const GET_SOFT_SKILLS_BY_ID_REQUEST = 'GET_SOFT_SKILLS_BY_ID_REQUEST';
export const GET_SOFT_SKILLS_BY_ID_SUCCESS = 'GET_SOFT_SKILLS_BY_ID_SUCCESS';
export const GET_SOFT_SKILLS_BY_ID_FAILURE = 'GET_SOFT_SKILLS_BY_ID_FAILURE';

interface GetSoftSkillsByIdRequestAction {
  type: typeof GET_SOFT_SKILLS_BY_ID_REQUEST;
}

interface GetSoftSkillsByIdSuccessAction {
  type: typeof GET_SOFT_SKILLS_BY_ID_SUCCESS;
  payload: {
    data: any; // Datos de las soft skills del usuario
  };
}

interface GetSoftSkillsByIdFailureAction {
  type: typeof GET_SOFT_SKILLS_BY_ID_FAILURE;
  payload: string;
}

export type GetSoftSkillsByIdActionTypes =
  | GetSoftSkillsByIdRequestAction
  | GetSoftSkillsByIdSuccessAction
  | GetSoftSkillsByIdFailureAction;