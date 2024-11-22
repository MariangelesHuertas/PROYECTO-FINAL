import {
    UPDATE_SOBRE_MI_REQUEST,
    UPDATE_SOBRE_MI_SUCCESS,
    UPDATE_SOBRE_MI_FAILURE,
    UpdateSobreMiActionTypes,
  } from '../../../../../constants/pages/myPortal/aboutMe/AboutMe';
  
  interface UpdateSobreMiState {
    rex_loading: boolean;
    rex_sobreMi: any | null;
    rex_error: string | null;
  }
  
  const initialState: UpdateSobreMiState = {
    rex_loading: false,
    rex_sobreMi: null,
    rex_error: null,
  };
  
  export const updateSobreMiReducer = (
    state = initialState,
    action: UpdateSobreMiActionTypes
  ): UpdateSobreMiState => {
    switch (action.type) {
      case UPDATE_SOBRE_MI_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case UPDATE_SOBRE_MI_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_sobreMi: action.payload.data,
          rex_error: null,
        };
      case UPDATE_SOBRE_MI_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default updateSobreMiReducer;