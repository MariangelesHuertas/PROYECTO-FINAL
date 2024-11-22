import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  FETCH_SAVE_OFFER,
  FETCH_FAILED_SAVE_OFFER,
  FETCH_RESET_SAVE_OFFER,
  FETCH_SUCCESS_SAVE_OFFER
} from '../../../constants/offers/SaveOffer';
import FetchWithIP from '../utils/FetchHeaders';

export const SaveOfferReducer = (
  offerId: number): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch, getState) => {

    dispatch({
      type: FETCH_SAVE_OFFER
    })

    try {

      const data = await FetchWithIP('postulaciones-guardadas', {
        method: 'POST'
      }, {
        oferta_id: offerId
      }).then(res => res.json());

      //   {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     oferta_id: offerId
      //   }),
      // }).then(res => res.json());

      dispatch({
        type: FETCH_SUCCESS_SAVE_OFFER,
        payload: data
      })

      return data

    } catch (error) {
      dispatch({
        type: FETCH_FAILED_SAVE_OFFER
      })
      throw error;
    }
  };


export const ResetCreateOfferReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {
  dispatch({
    type: FETCH_RESET_SAVE_OFFER
  })
}