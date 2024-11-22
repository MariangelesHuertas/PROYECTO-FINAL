import {
  UPDATE_USER_LANGUAGES_REQUEST,
  UPDATE_USER_LANGUAGES_SUCCESS,
  UPDATE_USER_LANGUAGES_FAILURE,
  UpdateUserLanguagesActionTypes,
} from '../../../../../constants/pages/myPortal/languages/PostLanguagesUser';

interface UpdateUserLanguagesState {
  rex_updating: boolean;
  rex_data: any | null;
  rex_error: string | null;
}

const initialState: UpdateUserLanguagesState = {
  rex_updating: false,
  rex_data: null,
  rex_error: null,
};

export const updateUserLanguagesReducer = (
  state = initialState,
  action: UpdateUserLanguagesActionTypes
): UpdateUserLanguagesState => {
  switch (action.type) {
    case UPDATE_USER_LANGUAGES_REQUEST:
      return {
        ...state,
        rex_updating: true,
      };
    case UPDATE_USER_LANGUAGES_SUCCESS:
      return {
        ...state,
        rex_updating: false,
        rex_data: action.payload,
        rex_error: null,
      };
    case UPDATE_USER_LANGUAGES_FAILURE:
      return {
        ...state,
        rex_updating: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default updateUserLanguagesReducer;