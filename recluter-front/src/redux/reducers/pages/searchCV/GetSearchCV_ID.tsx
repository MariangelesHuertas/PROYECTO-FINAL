import {
  FETCH_CV_GENERAL_BY_ID_REQUEST,
  FETCH_CV_GENERAL_BY_ID_SUCCESS,
  FETCH_CV_GENERAL_BY_ID_FAILURE,
  CvGeneralByIdActionTypes,
  CvGeneralById
  }  from '../../../../constants/pages/searchCV/GetSearchCV_ID';
  
  interface CvGeneralByIdState {
    loading: boolean;
    cvGeneralById: CvGeneralById | null;
    error: string | null;
  }
  
  const initialState: CvGeneralByIdState = {
    loading: false,
    cvGeneralById: null,
    error: null,
  };
  
  export const cvGeneralByIdReducer = (
    state = initialState,
    action: CvGeneralByIdActionTypes
  ):CvGeneralByIdState => {
    switch (action.type) {
      case FETCH_CV_GENERAL_BY_ID_REQUEST:
        console.log('Solicitando datos...');
        return {
          ...state,
          loading: true,
        };
      case FETCH_CV_GENERAL_BY_ID_SUCCESS:
        console.log('Datos recibidos:', action.payload);
        return {
          ...state,
          loading: false,
          cvGeneralById: action.payload,
          error: null,
        };
      case FETCH_CV_GENERAL_BY_ID_FAILURE:
        console.log('Error recibido:', action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
          cvGeneralById: null,
        };
      default:
        return state;
    }
  };
  
  export default cvGeneralByIdReducer;