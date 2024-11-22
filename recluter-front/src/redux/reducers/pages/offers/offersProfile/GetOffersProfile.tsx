import {
  FETCH_POSTULACIONES_REQUEST,
  FETCH_POSTULACIONES_SUCCESS,
  FETCH_POSTULACIONES_FAILURE,
  PostulacionesActionTypes,
  Postulacion
} from '../../../../../constants/pages/offers/offersProfile/GetOffersProfile';

interface PostulacionesState {
  loading: boolean;
  postulaciones: Postulacion[];
  error: string | null;
}

const initialState: PostulacionesState = {
  loading: false,
  postulaciones: [],
  error: null,
};

export const postulacionesByOfertaReducer = (
  state = initialState,
  action: PostulacionesActionTypes
): PostulacionesState => {
  switch (action.type) {
    case FETCH_POSTULACIONES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTULACIONES_SUCCESS:
      return {
        ...state,
        loading: false,
        postulaciones: action.payload.data,
        error: null,
      };
    case FETCH_POSTULACIONES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        postulaciones: [],
      };
    default:
      return state;
  }
};

export default postulacionesByOfertaReducer;