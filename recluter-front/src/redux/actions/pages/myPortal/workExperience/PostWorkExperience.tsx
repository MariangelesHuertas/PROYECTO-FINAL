import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAILURE,
  AddExperienceActionTypes,
} from '../../../../../constants/pages/myPortal/workExperience/PostWorkExperience';
import FetchWithIP from '../../../utils/FetchHeaders';

// Action Creators
export const addExperienceRequest = (): AddExperienceActionTypes => ({
  type: ADD_EXPERIENCE_REQUEST,
});

export const addExperienceSuccess = (data: any): AddExperienceActionTypes => ({
  type: ADD_EXPERIENCE_SUCCESS,
  payload: { data },
});

export const addExperienceFailure = (error: string): AddExperienceActionTypes => ({
  type: ADD_EXPERIENCE_FAILURE,
  payload: error,
});

// Thunk Action para agregar una nueva experiencia laboral
export const AddExperienceReducer = (
  experienceData: any
): ThunkAction<Promise<any>, RootState, unknown, AddExperienceActionTypes> => async (dispatch) => {
  dispatch(addExperienceRequest());

  try {
    const response = await FetchWithIP('experiencias-laborales-usuarios', {
      method: 'POST',
    }, experienceData);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(addExperienceSuccess(responseData.data));
    return responseData; // Retornamos la respuesta para manejarla en el frontend
  } catch (error: any) {
    dispatch(addExperienceFailure(error.message || 'Error al agregar la experiencia laboral'));
    return { error: error.message };
  }
};