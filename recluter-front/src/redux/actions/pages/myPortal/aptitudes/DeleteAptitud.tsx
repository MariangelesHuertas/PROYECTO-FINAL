import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  DELETE_APTITUD_USUARIO_REQUEST,
  DELETE_APTITUD_USUARIO_SUCCESS,
  DELETE_APTITUD_USUARIO_FAILURE,
  DeleteAptitudUsuarioActionTypes
} from '../../../../../constants/pages/myPortal/aptitudes/DeleteAptitud';
import FetchWithIP from '../../../utils/FetchHeaders';

export const DeleteAptitudUsuarioReducer = (
  aptitudeId: number
): ThunkAction<Promise<void>, RootState, unknown, DeleteAptitudUsuarioActionTypes> => async (dispatch) => {
  dispatch({ type: DELETE_APTITUD_USUARIO_REQUEST });

  try {
    const response = await FetchWithIP(`aptitudes-usuarios/${aptitudeId}/deleteByUser`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    dispatch({ type: DELETE_APTITUD_USUARIO_SUCCESS, payload: aptitudeId });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    dispatch({ type: DELETE_APTITUD_USUARIO_FAILURE, payload: errorMessage });
    throw error;
  }
};