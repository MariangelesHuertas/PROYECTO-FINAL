import {
  GET_DATA_USER_LOGIN_AUTH,
  VALIDATE_USER_AUTH
} from "../../../constants/auth/Auth";

interface AuthState {
  rex_user: {
    empresa: { id: number; } | null;
    id: number
  } | null;
  rex_validate_user: boolean;
}

const INIT_STATE: AuthState = {
  rex_user: null,
  rex_validate_user: false
};

export default (state = INIT_STATE, action: any): AuthState => {
  switch (action.type) {
    case GET_DATA_USER_LOGIN_AUTH: {
      return {
        ...state,
        rex_user: action.payload,
        rex_validate_user: true
      };
    }
    case VALIDATE_USER_AUTH: {
      return {
        ...state,
        rex_validate_user: action.payload,
        
      }
    }

    default:
      return state;
  }
}
