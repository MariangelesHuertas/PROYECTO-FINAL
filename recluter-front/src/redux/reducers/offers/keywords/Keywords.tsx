import {
    FETCH_KEYWORDS_REQUEST,
    FETCH_KEYWORDS_SUCCESS,
    FETCH_KEYWORDS_FAILURE,
    KeywordsActionTypes
  } from '../../../../constants/offers/keywords/Keywords';
  
  // Estado inicial para las palabras clave
  interface KeywordsState {
    loading: boolean;
    keywords: any[];
    error: string | null;
  }
  
  const initialState: KeywordsState = {
    loading: false,
    keywords: [],
    error: null,
  };
  
  const keywordsReducer = (state = initialState, action: KeywordsActionTypes): KeywordsState => {
    switch (action.type) {
      case FETCH_KEYWORDS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_KEYWORDS_SUCCESS:
        console.log('Palabras clave recibidas en el reducer:', action.payload.data);
        return {
          ...state,
          loading: false,
          keywords: action.payload.data,
          error: null,
        };
      case FETCH_KEYWORDS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default keywordsReducer;
  