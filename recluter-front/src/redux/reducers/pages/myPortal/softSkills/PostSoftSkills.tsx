// src/reducers/pages/myPortal/softSkills/createSoftSkillUsuarioReducer.ts

import {
  CREATE_SOFT_SKILL_USUARIO_REQUEST,
  CREATE_SOFT_SKILL_USUARIO_SUCCESS,
  CREATE_SOFT_SKILL_USUARIO_FAILURE,
  CreateSoftSkillUsuarioActionTypes,
} from '../../../../../constants/pages/myPortal/softSkills/PostSoftSkills';

interface CreateSoftSkillUsuarioState {
  rex_loading: boolean;
  rex_data: any | null;
  rex_error: string | null;
}

const initialState: CreateSoftSkillUsuarioState = {
  rex_loading: false,
  rex_data: null,
  rex_error: null,
};

export const createSoftSkillUsuarioReducer = (
  state = initialState,
  action: CreateSoftSkillUsuarioActionTypes
): CreateSoftSkillUsuarioState => {
  switch (action.type) {
    case CREATE_SOFT_SKILL_USUARIO_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case CREATE_SOFT_SKILL_USUARIO_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_data: action.payload,
        rex_error: null,
      };
    case CREATE_SOFT_SKILL_USUARIO_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default createSoftSkillUsuarioReducer;
