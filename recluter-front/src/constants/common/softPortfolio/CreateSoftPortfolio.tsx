export const FETCH_SOFT_SKILLS_REQUEST = 'FETCH_SOFT_SKILLS_REQUEST';
export const FETCH_SOFT_SKILLS_SUCCESS = 'FETCH_SOFT_SKILLS_SUCCESS';
export const FETCH_SOFT_SKILLS_FAILURE = 'FETCH_SOFT_SKILLS_FAILURE';

export interface SoftSkill {
  id: number;
  soft_skill: string;
}

interface FetchSoftSkillsRequestAction {
  type: typeof FETCH_SOFT_SKILLS_REQUEST;
}

interface FetchSoftSkillsSuccessAction {
  type: typeof FETCH_SOFT_SKILLS_SUCCESS;
  payload: SoftSkill[];
}

interface FetchSoftSkillsFailureAction {
  type: typeof FETCH_SOFT_SKILLS_FAILURE;
  payload: string;
}

export type SoftSkillsActionTypes =
  | FetchSoftSkillsRequestAction
  | FetchSoftSkillsSuccessAction
  | FetchSoftSkillsFailureAction;

