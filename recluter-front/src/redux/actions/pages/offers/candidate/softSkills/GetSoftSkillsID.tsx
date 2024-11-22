import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../../store/store';
import {
  GET_SOFT_SKILLS_BY_ID_REQUEST,
  GET_SOFT_SKILLS_BY_ID_SUCCESS,
  GET_SOFT_SKILLS_BY_ID_FAILURE,
  GetSoftSkillsByIdActionTypes,
} from '../../../../../../constants/pages/offers/candidate/softSkills/GetSoftSkillsID';
import FetchWithIP from '../../../../utils/FetchHeaders';

export const getSoftSkillsByIdRequestReducer = (): GetSoftSkillsByIdActionTypes => ({
  type: GET_SOFT_SKILLS_BY_ID_REQUEST,
});

export const getSoftSkillsByIdSuccessReducer = (data: any): GetSoftSkillsByIdActionTypes => ({
  type: GET_SOFT_SKILLS_BY_ID_SUCCESS,
  payload: { data },
});

export const getSoftSkillsByIdFailureReducer = (error: string): GetSoftSkillsByIdActionTypes => ({
  type: GET_SOFT_SKILLS_BY_ID_FAILURE,
  payload: error,
});

export const GetSoftSkillsByIdReducer = (userId: number): ThunkAction<Promise<any>, RootState, unknown, GetSoftSkillsByIdActionTypes> => async (dispatch) => {
  dispatch(getSoftSkillsByIdRequestReducer());

  try {
    const response = await FetchWithIP(`soft-skills-usuarios/findAllByUsuario/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getSoftSkillsByIdSuccessReducer(responseData.data));
    return responseData;
  } catch (error: any) {
    dispatch(getSoftSkillsByIdFailureReducer(error.message || 'Error al obtener las soft skills del usuario'));
    return { error: error.message };
  }
};