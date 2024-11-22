import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_APPLICATION_PHASES_REQUEST,
  FETCH_APPLICATION_PHASES_SUCCESS,
  FETCH_APPLICATION_PHASES_FAILURE,
  ApplicationPhasesActionTypes,
  ApplicationPhase
} from '../../../../constants/common/fase/GetApplicationPhases';
import FetchWithIP from '../../utils/FetchHeaders';

export const fetchApplicationPhasesRequest = (): ApplicationPhasesActionTypes => ({
  type: FETCH_APPLICATION_PHASES_REQUEST,
});

export const fetchApplicationPhasesSuccess = (data: ApplicationPhase[]): ApplicationPhasesActionTypes => ({
  type: FETCH_APPLICATION_PHASES_SUCCESS,
  payload: data,
});

export const fetchApplicationPhasesFailure = (error: string): ApplicationPhasesActionTypes => ({
  type: FETCH_APPLICATION_PHASES_FAILURE,
  payload: error,
});

export const fetchApplicationPhasesReducer = (): ThunkAction<Promise<void>, RootState, unknown, ApplicationPhasesActionTypes> => async (dispatch) => {
  dispatch(fetchApplicationPhasesRequest());

  try {
    const response = await FetchWithIP('fases-postulaciones', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchApplicationPhasesSuccess(responseData.data));
    } else {
      throw new Error('No data in response');
    }
  } catch (error: any) {
    dispatch(fetchApplicationPhasesFailure(error.message || 'An error occurred while fetching application phases'));
  }
};