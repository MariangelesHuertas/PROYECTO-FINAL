import {
  FETCH_UPDATE_PROFILE_FAILURE,
  FETCH_UPDATE_PROFILE_REQUEST,
  FETCH_UPDATE_PROFILE_SUCCESS,
  UpdateProfileActionTypes
} from '../../../../../constants/pages/myPortal/profile/Profile';

interface ProfileState {
  rex_loading: boolean;
  rex_user_updated: any | null;
  rex_error: string | null;
}

const initialState: ProfileState = {
  rex_loading: false,
  rex_user_updated: null,
  rex_error: null,
};

const offerDetailReducer = (
  state = initialState, action: UpdateProfileActionTypes
): ProfileState => {
  switch (action.type) {
    case FETCH_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_user_updated: action.payload,
        rex_error: null,
      };
    case FETCH_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_user_updated: null,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default offerDetailReducer;