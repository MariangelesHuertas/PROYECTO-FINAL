import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_SOFT_SKILLS_REQUEST,
  FETCH_SOFT_SKILLS_SUCCESS,
  FETCH_SOFT_SKILLS_FAILURE,
  SoftSkillsActionTypes,
  SoftSkill
} from '../../../../constants/common/softPortfolio/CreateSoftPortfolio';
import FetchWithIP from '../../utils/FetchHeaders';

export const fetchSoftSkillsRequest = (): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_REQUEST,
});

export const fetchSoftSkillsSuccess = (data: SoftSkill[]): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_SUCCESS,
  payload: data,
});

export const fetchSoftSkillsFailure = (error: string): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_FAILURE,
  payload: error,
});

export const fetchSoftSkillsReducer = (portafolioId: number, softSkillIds: number[]): ThunkAction<Promise<void>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
  dispatch(fetchSoftSkillsRequest());

  try {
    const response = await FetchWithIP('soft-skills-portafolios/createSoftPortafolio', {
      method: 'POST'},
     {
        portafolio_usuario_id: portafolioId,   // ID del portafolio recién creado
        soft_skill_id: softSkillIds            // Array de IDs de skills seleccionados
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchSoftSkillsSuccess(responseData.data));
    } else {
      throw new Error('No data in response');
    }
  } catch (error: any) {
    dispatch(fetchSoftSkillsFailure(error.message || 'An error occurred while fetching soft skills'));
  }
};
