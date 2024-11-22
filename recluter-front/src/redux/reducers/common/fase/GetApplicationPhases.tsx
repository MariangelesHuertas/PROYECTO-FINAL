import {
    FETCH_APPLICATION_PHASES_REQUEST,
    FETCH_APPLICATION_PHASES_SUCCESS,
    FETCH_APPLICATION_PHASES_FAILURE,
    ApplicationPhasesActionTypes,
    ApplicationPhase
  } from '../../../../constants/common/fase/GetApplicationPhases';
  
  interface ApplicationPhasesState {
    rex_loadingp: boolean;
    rex_phases: ApplicationPhase[];
    rex_error: string | null;
  }
  
  const initialState: ApplicationPhasesState = {
    rex_loadingp: false,
    rex_phases: [],
    rex_error: null,
  };
  
  const applicationPhasesReducer = (
    state = initialState,
    action: ApplicationPhasesActionTypes
  ): ApplicationPhasesState => {
    switch (action.type) {
      case FETCH_APPLICATION_PHASES_REQUEST:
        return {
          ...state,
          rex_loadingp: true,
        };
      case FETCH_APPLICATION_PHASES_SUCCESS:
        return {
          ...state,
          rex_loadingp: false,
          rex_phases: action.payload,
          rex_error: null,
        };
      case FETCH_APPLICATION_PHASES_FAILURE:
        return {
          ...state,
          rex_loadingp: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
export default applicationPhasesReducer;