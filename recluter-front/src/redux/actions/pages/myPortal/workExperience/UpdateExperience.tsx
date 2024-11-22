import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAILURE,
  UpdateExperienceActionTypes
} from '../../../../../constants/pages/myPortal/workExperience/UpdateExperience';
import FetchWithIP from '../../../utils/FetchHeaders';

export const updateExperienceRequestReducer = (): UpdateExperienceActionTypes => ({
  type: UPDATE_EXPERIENCE_REQUEST,
});

export const updateExperienceSuccessReducer = (data: any): UpdateExperienceActionTypes => ({
  type: UPDATE_EXPERIENCE_SUCCESS,
  payload: { data },
});

export const updateExperienceFailureReducer = (error: string): UpdateExperienceActionTypes => ({
  type: UPDATE_EXPERIENCE_FAILURE,
  payload: error,
});

export const UpdateExperienceReducer = (experienceData: any): ThunkAction<Promise<any>, RootState, unknown, UpdateExperienceActionTypes> => async (dispatch) => {
  dispatch(updateExperienceRequestReducer());
  console.log(experienceData, "datos de experiencia a actualizar");

  if (!experienceData || typeof experienceData.id === 'undefined') {
    const error = "ID de experiencia no válido";
    console.error(error);
    dispatch(updateExperienceFailureReducer(error));
    return { payload: { error } };
  }

  const { id, ...rest } = experienceData;

  try {
    const response = await FetchWithIP(`experiencias-laborales-usuarios/${id}`, {
      method: 'PATCH'
    }, rest);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje_dev || 'Error en la solicitud');
    }

    const responseData = await response.json();
    dispatch(updateExperienceSuccessReducer(responseData.data));
    return { payload: { data: responseData.data } };
  } catch (error: any) {
    console.error("Error completo:", error);
    dispatch(updateExperienceFailureReducer(error.message));
    return { payload: { error: error.message } };
  }
};