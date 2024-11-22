// src/actions/updateFasePostulacion.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  UPDATE_FASE_POSTULACION_REQUEST,
  UPDATE_FASE_POSTULACION_SUCCESS,
  UPDATE_FASE_POSTULACION_FAILURE,
  UpdateFasePostulacionActionTypes
} from '../../../../constants/common/fase/PatchApplicationPhases';
import FetchWithIP from '../../utils/FetchHeaders';

export const updateFasePostulacion = (
  postulacionId: number,
  fasePostulacionId: number
): ThunkAction<Promise<void>, RootState, unknown, UpdateFasePostulacionActionTypes> => async (dispatch) => {
  dispatch({ type: UPDATE_FASE_POSTULACION_REQUEST });

  try {
    const response = await FetchWithIP(`postulaciones/updateFasePostulacionNext/${postulacionId}`, {
      method: 'PATCH'},
      { fase_postulacion_id: fasePostulacionId },
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    dispatch({ type: UPDATE_FASE_POSTULACION_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: UPDATE_FASE_POSTULACION_FAILURE, payload: error.message || 'Error al actualizar la fase de postulación' });
  }
};