import {
    FETCH_CV_GENERAL_REQUEST,
    FETCH_CV_GENERAL_SUCCESS,
    FETCH_CV_GENERAL_FAILURE,
    CvGeneralActionTypes,
    CvGeneral
  }  from '../../../../constants/pages/searchCV/GetSearchCV';
  
  interface CvGeneralState {
    loading: boolean;
    cvGeneral: CvGeneral[];
    error: string | null;
  }
  
  const initialState: CvGeneralState = {
    loading: false,
    cvGeneral: [],
    error: null,
  };
  
  export const cvGeneralReducer = (
    state = initialState,
    action: CvGeneralActionTypes
  ): CvGeneralState => {
    switch (action.type) {
      case FETCH_CV_GENERAL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CV_GENERAL_SUCCESS:
        return {
          ...state,
          loading: false,
          cvGeneral: action.payload.data,
          error: null,
        };
      case FETCH_CV_GENERAL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          cvGeneral: [],
        };
      default:
        return state;
    }
  };
  
  export default cvGeneralReducer;