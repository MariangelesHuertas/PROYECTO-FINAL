// src/actions/pages/myPortal/cv/deleteCVActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  DELETE_CV_REQUEST,
  DELETE_CV_SUCCESS,
  DELETE_CV_FAILURE,
  DeleteCVActionTypes,
} from '../../../../../constants/pages/myPortal/cv/DeleteCVUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const DeleteCVReducer = (csvId: number): ThunkAction<Promise<any>, RootState, unknown, DeleteCVActionTypes> => async (dispatch) => {
  dispatch({ type: DELETE_CV_REQUEST });

  try {
    const response = await FetchWithIP(`cvs-usuarios/deleteCsv/${csvId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    dispatch({ type: DELETE_CV_SUCCESS, payload: csvId });
    return csvId;
  } catch (error: any) {
    console.error('Error en DeleteCVReducer:', error);
    dispatch({ type: DELETE_CV_FAILURE, payload: error.message });
    throw error;
  }
};