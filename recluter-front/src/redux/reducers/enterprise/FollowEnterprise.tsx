import {
  FETCH_FAILED_FOLLOW_ENTERPRISES,
  FETCH_FOLLOW_ENTERPRISES,
  FETCH_RESET_FOLLOW_ENTERPRISES,
  FETCH_SUCCESS_FOLLOW_ENTERPRISES
} from "../../../constants/company/FollowEnterprise";

interface FollowEnterpriseType {
  rex_loading_follow: boolean;
  rex_failed: boolean;
  rex_request_follow: object | null;
  rex_request_failed: object | null;
}

const INIT_STATE: FollowEnterpriseType = {
  rex_loading_follow: false,
  rex_failed: false,
  rex_request_follow: null,
  rex_request_failed: null,
};

export default (state = INIT_STATE, action: any): FollowEnterpriseType => {
  switch (action.type) {
    case FETCH_FOLLOW_ENTERPRISES: {
      return {
        ...state,
        rex_loading_follow: true
      };
    }
    case FETCH_FAILED_FOLLOW_ENTERPRISES: {
      return {
        ...state,
        rex_loading_follow: false,
        rex_failed: true,
        rex_request_failed: action.payload
      }
    }
    case FETCH_SUCCESS_FOLLOW_ENTERPRISES: {
      return {
        ...state,
        rex_loading_follow: false,
        rex_request_follow: action.payload
      }
    }
    case FETCH_RESET_FOLLOW_ENTERPRISES: {
      return {
        ...state,
        rex_loading_follow: false,
        rex_failed: false,
        rex_request_follow: null
      }
    }
    default:
      return state;
  }
}
