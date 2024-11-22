// reducer/GetApplicationsReducer.ts
import {
    FETCH_GET_APPLICATIONS_REQUEST,
    FETCH_GET_APPLICATIONS_SUCCESS,
    FETCH_GET_APPLICATIONS_FAILURE,
  } from '../../../constants/applications/GetApplications';
  
  interface ApplicationState {
    rex_loading: boolean;
    rex_data: any[];
    rex_error: string | null;
  }
  
  const initialState: ApplicationState = {
    rex_loading: false,
    rex_data: [],
    rex_error: null,
  };
  
  const GetApplicationsReducer = (state = initialState, action: any): ApplicationState => {
    switch (action.type) {
      case FETCH_GET_APPLICATIONS_REQUEST:
        return { ...state, rex_loading: true, rex_error: null };
      case FETCH_GET_APPLICATIONS_SUCCESS:
        return { ...state, rex_loading: false, rex_data: action.payload.data };
      case FETCH_GET_APPLICATIONS_FAILURE:
        return { ...state, rex_loading: false, rex_error: action.error };
      default:
        return state;
    }
  };
  
  export default GetApplicationsReducer;
  