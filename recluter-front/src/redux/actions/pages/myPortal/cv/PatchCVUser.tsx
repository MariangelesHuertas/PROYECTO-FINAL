// src/actions/pages/myPortal/cv/changeDefaultCVActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  CHANGE_DEFAULT_CV_REQUEST,
  CHANGE_DEFAULT_CV_SUCCESS,
  CHANGE_DEFAULT_CV_FAILURE,
  ChangeDefaultCVActionTypes,
} from '../../../../../constants/pages/myPortal/cv/PatchCVUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const ChangeDefaultCVReducer = (csvId: number): ThunkAction<Promise<any>, RootState, unknown, ChangeDefaultCVActionTypes> => async (dispatch) => {
  dispatch({ type: CHANGE_DEFAULT_CV_REQUEST });

  try {
    const response = await FetchWithIP(`cvs-usuarios/changeDefaultCsv/${csvId}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    dispatch({ type: CHANGE_DEFAULT_CV_SUCCESS, payload: csvId });
    return csvId;
  } catch (error: any) {
    console.error('Error en ChangeDefaultCVReducer:', error);
    dispatch({ type: CHANGE_DEFAULT_CV_FAILURE, payload: error.message });
    throw error;
  }
};