// src/actions/pages/myPortal/softSkills/getSoftSkillsActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_SOFT_SKILLS_REQUEST,
  GET_SOFT_SKILLS_SUCCESS,
  GET_SOFT_SKILLS_FAILURE,
  GetSoftSkillsActionTypes,
} from '../../../../../constants/pages/myPortal/softSkills/GetSoftSkills';
import FetchWithIP from '../../../utils/FetchHeaders';

// Action Creators
export const getSoftSkillsRequestReducer = (): GetSoftSkillsActionTypes => ({
  type: GET_SOFT_SKILLS_REQUEST,
});

export const getSoftSkillsSuccessReducer = (data: any): GetSoftSkillsActionTypes => ({
  type: GET_SOFT_SKILLS_SUCCESS,
  payload: { data },
});

export const getSoftSkillsFailureReducer = (error: string): GetSoftSkillsActionTypes => ({
  type: GET_SOFT_SKILLS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las soft skills
export const GetSoftSkillsUReducer = (): ThunkAction<Promise<any>, RootState, unknown, GetSoftSkillsActionTypes> => async (dispatch) => {
  dispatch(getSoftSkillsRequestReducer());

  try {
    const response = await FetchWithIP('soft-skills-usuarios/findAllByUsuarioToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getSoftSkillsSuccessReducer(responseData.data));
    return responseData; // Retornamos la respuesta para manejarla en el frontend
  } catch (error: any) {
    dispatch(getSoftSkillsFailureReducer(error.message || 'Error al obtener las soft skills'));
    return { error: error.message };
  }
};