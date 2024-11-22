import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import { Action, Dispatch } from 'redux';
import {
  FETCH_FAILED_SIGNUP_OFFER,
  FETCH_SIGNUP_OFFER,
  FETCH_SUCCESS_SIGNUP_OFFER
} from '../../../constants/offers/SignUpOffer';
import FetchWithIP from '../utils/FetchHeaders';

export const SignUpOfferReducer = (
  offerId: number,
  cvUsuarioId: number | null,
  portafolioUsuarioId: number | null
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch, getState) => {

  dispatch({
    type: FETCH_SIGNUP_OFFER
  })

  try {
    const data = await FetchWithIP('postulaciones/createOrDelete', {
      method: 'POST'
    }, {
      "oferta_id": offerId,
      "cv_usuario_id": cvUsuarioId,
      "portafolio_usuario_id": portafolioUsuarioId
    }).then(res => res.json());

    console.log("data: ---");
    console.log(data);

    dispatch({
      type: FETCH_SUCCESS_SIGNUP_OFFER,
      payload: data
    })

    return data

  } catch (error) {
    dispatch({
      type: FETCH_FAILED_SIGNUP_OFFER
    })
    throw error;
  }
};