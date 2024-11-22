// src/redux/reducers/pages/myPortal/aptitudes/getAptitudReducer.ts

import {
  FETCH_USER_APTITUDES_REQUEST,
  FETCH_USER_APTITUDES_SUCCESS,
  FETCH_USER_APTITUDES_FAILURE,
  UserAptitudesActionTypes,
  UserAptitude
} from '../../../../../constants/pages/myPortal/aptitudes/GetAptitud';

interface AptitudState {
  rex_aptitudes: UserAptitude[];
  rex_loading: boolean;
  rex_error: string | null;
}

const initialState: AptitudState = {
  rex_aptitudes: [],
  rex_loading: false,
  rex_error: null
};

const getAptitudReducer = (
  state = initialState,
  action: UserAptitudesActionTypes
): AptitudState => {
  switch (action.type) {
    case FETCH_USER_APTITUDES_REQUEST:
      return {
        ...state,
        rex_loading: true,
        rex_error: null
      };
    case FETCH_USER_APTITUDES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_aptitudes: action.payload,
        rex_error: null
      };
    case FETCH_USER_APTITUDES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload
      };
    default:
      return state;
  }
};

export default getAptitudReducer;