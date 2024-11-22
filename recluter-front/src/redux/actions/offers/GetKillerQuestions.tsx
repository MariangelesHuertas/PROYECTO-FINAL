import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store/store";
import { Action, Dispatch } from "redux";
import FetchWithIP from "../utils/FetchHeaders";
import { FETCH_GET_KILLER_QUESTIONS_OFFER, FETCH_GET_SUCCESS_KILLER_QUESTIONS_OFFER } from "../../../constants/offers/GetKillerQuestions";

export const GetKillersQuestionsReducer = (offerId: any): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  dispatch({
    type: FETCH_GET_KILLER_QUESTIONS_OFFER
  })

  try {
    const data = await FetchWithIP('killers-questions/details/' + offerId, {
      method: 'GET'
    }).then(res => res.json())

    console.log("data: ---");
    console.log(data);

    dispatch({
      type: FETCH_GET_SUCCESS_KILLER_QUESTIONS_OFFER,
      payload: data
    })

  } catch (error) {

    // dispatch({
    //   type: FETCH_FAILED_CREATE_OFFER,
    //   payload: error
    // })
    throw error;
  }

}