// src/reducers/pages/myPortal/ratings/getUserRatingsReducer.ts

import {
  GET_USER_RATINGS_REQUEST,
  GET_USER_RATINGS_SUCCESS,
  GET_USER_RATINGS_FAILURE,
  GetUserRatingsActionTypes,
  UserRating
} from '../../../../constants/pages/searchCV/GetRatings';

interface GetUserRatingsState {
  rex_loading: boolean;
  rex_userRatings: UserRating[] | null;
  rex_meta_userRatings: any;
  rex_error: string | null;
}

const initialState: GetUserRatingsState = {
  rex_loading: false,
  rex_userRatings: null,
  rex_meta_userRatings: null,
  rex_error: null
};

const getUserRatingsReducer = (
  state = initialState, action: GetUserRatingsActionTypes
): GetUserRatingsState => {
  switch (action.type) {
    case GET_USER_RATINGS_REQUEST:
      return { ...state, rex_loading: true, rex_error: null };

    case GET_USER_RATINGS_SUCCESS:
      console.log("action.payload: ----")
      console.log(action.payload)
      return {
        ...state,
        rex_loading: false,
        rex_userRatings: action.payload.data,
        rex_meta_userRatings: action.payload.meta,
        rex_error: null
      };

    case GET_USER_RATINGS_FAILURE:
      return { ...state, rex_loading: false, rex_error: action.payload, rex_userRatings: [] };

    default:
      return state;
  }
};

export default getUserRatingsReducer;