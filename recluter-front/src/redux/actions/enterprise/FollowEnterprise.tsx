import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import FetchWithIP from '../utils/FetchHeaders';
import {
  FETCH_FAILED_FOLLOW_ENTERPRISES,
  FETCH_FOLLOW_ENTERPRISES,
  FETCH_SUCCESS_FOLLOW_ENTERPRISES
} from '../../../constants/company/FollowEnterprise';

export const FollowEnterpriseReducer = (
  empresa_id: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch: Dispatch, getState) => {

  dispatch({
    type: FETCH_FOLLOW_ENTERPRISES
  })

  try {

    const data = await FetchWithIP('empresas-seguidas', {
      method: 'POST'
    }, {
      empresa_id
    }).then(res => res.json());

    dispatch({
      type: FETCH_SUCCESS_FOLLOW_ENTERPRISES,
      payload: data
    })

    return data

  } catch (error) {
    console.log("error: ");
    console.log(error);

    dispatch({
      type: FETCH_FAILED_FOLLOW_ENTERPRISES,
      payload: error
    })
    throw error;
  }
};