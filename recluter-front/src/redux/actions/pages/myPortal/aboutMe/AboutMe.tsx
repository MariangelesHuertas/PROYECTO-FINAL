import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  UPDATE_SOBRE_MI_REQUEST,
  UPDATE_SOBRE_MI_SUCCESS,
  UPDATE_SOBRE_MI_FAILURE,
  UpdateSobreMiActionTypes,
} from '../../../../../constants/pages/myPortal/aboutMe/AboutMe';
import FetchWithIP from '../../../utils/FetchHeaders';

export const updateSobreMiRequestReducer = (): UpdateSobreMiActionTypes => ({
  type: UPDATE_SOBRE_MI_REQUEST,
});

export const updateSobreMiSuccessReducer = (data: any): UpdateSobreMiActionTypes => ({
  type: UPDATE_SOBRE_MI_SUCCESS,
  payload: { data },
});

export const updateSobreMiFailureReducer = (error: string): UpdateSobreMiActionTypes => ({
  type: UPDATE_SOBRE_MI_FAILURE,
  payload: error,
});

export const UpdateSobreMiReducer = (
  sobreMi: string
): ThunkAction<Promise<any>, RootState, unknown, UpdateSobreMiActionTypes> => async (dispatch) => {
  dispatch(updateSobreMiRequestReducer());

  try {
    const response = await FetchWithIP('auth/updateFieldSobreMi', {
      method: 'PATCH',
    }, { sobreMi });
    

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateSobreMiSuccessReducer(responseData.data));
    return responseData; // Retornamos la respuesta para manejarla en el frontend
  } catch (error: any) {
    dispatch(updateSobreMiFailureReducer(error.message || 'Error al actualizar sobreMi'));
    return { error: error.message };
  }
};