import {
    GET_USER_RATINGS_BY_TOKEN_REQUEST,
    GET_USER_RATINGS_BY_TOKEN_SUCCESS,
    GET_USER_RATINGS_BY_TOKEN_FAILURE,
    GetUserRatingsByTokenActionTypes,
    UserRatingByToken
} from '../../../../../constants/pages/myPortal/ratings/GetRatingPortal';
  
  interface GetUserRatingsByTokenState {
    rex_loading: boolean;
    rex_userRatingsByToken: UserRatingByToken[] | null;
    rex_error: string | null;
  }
  
  const initialState: GetUserRatingsByTokenState = {
    rex_loading: false,
    rex_userRatingsByToken: null,
    rex_error: null
  };
  
  const getUserRatingsByTokenReducer = (
    state = initialState,
    action: GetUserRatingsByTokenActionTypes
  ): GetUserRatingsByTokenState => {
    switch (action.type) {
      case GET_USER_RATINGS_BY_TOKEN_REQUEST:
        return {
          ...state,
          rex_loading: true,
          rex_error: null
        };
      case GET_USER_RATINGS_BY_TOKEN_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_userRatingsByToken: action.payload,
          rex_error: null
        };
      case GET_USER_RATINGS_BY_TOKEN_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
          rex_userRatingsByToken: null
        };
      default:
        return state;
    }
  };
  
  export default getUserRatingsByTokenReducer;