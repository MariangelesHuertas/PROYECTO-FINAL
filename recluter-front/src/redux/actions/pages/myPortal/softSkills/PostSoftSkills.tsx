// src/actions/pages/myPortal/softSkills/createSoftSkillUsuarioActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  CREATE_SOFT_SKILL_USUARIO_REQUEST,
  CREATE_SOFT_SKILL_USUARIO_SUCCESS,
  CREATE_SOFT_SKILL_USUARIO_FAILURE,
  CreateSoftSkillUsuarioActionTypes,
} from '../../../../../constants/pages/myPortal/softSkills/PostSoftSkills';
import FetchWithIP from '../../../utils/FetchHeaders';

export const createSoftSkillUsuarioRequest = (): CreateSoftSkillUsuarioActionTypes => ({
  type: CREATE_SOFT_SKILL_USUARIO_REQUEST,
});

export const createSoftSkillUsuarioSuccess = (data: any): CreateSoftSkillUsuarioActionTypes => ({
  type: CREATE_SOFT_SKILL_USUARIO_SUCCESS,
  payload: data,
});

export const createSoftSkillUsuarioFailure = (error: string): CreateSoftSkillUsuarioActionTypes => ({
  type: CREATE_SOFT_SKILL_USUARIO_FAILURE,
  payload: error,
});

export const CreateSoftSkillUsuarioReducer = (
  softSkillsData: { soft_skills: { id: number; soft_skill: string; porcentaje: number; nivel: number }[] }
): ThunkAction<Promise<any>, RootState, unknown, CreateSoftSkillUsuarioActionTypes> => async (dispatch) => {
  dispatch(createSoftSkillUsuarioRequest());

  try {
    const response = await FetchWithIP('soft-skills-usuarios/CreateSoftUsuario', {
      method: 'POST',
    }, softSkillsData);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createSoftSkillUsuarioSuccess(responseData.data));
    return responseData;
  } catch (error: any) {
    dispatch(createSoftSkillUsuarioFailure(error.message || 'Error al crear las soft skills de usuario'));
    return { error: error.message };
  }
};
