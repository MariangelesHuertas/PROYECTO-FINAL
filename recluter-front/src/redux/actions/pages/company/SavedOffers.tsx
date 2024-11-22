import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import { 
  FETCH_SAVED_OFFERS_REQUEST,
  FETCH_SAVED_OFFERS_SUCCESS,
  FETCH_SAVED_OFFERS_FAILURE,
  SavedOfferActionTypes 
} from '../../../../constants/company/SavedOffers';
import FetchWithIP from '../../utils/FetchHeaders'; // Si usas este método para peticiones

// Action Creators
export const fetchSavedOffersRequestReducer = (): SavedOfferActionTypes => ({
  type: FETCH_SAVED_OFFERS_REQUEST,
});

export const fetchSavedOffersSuccessReducer = (
  data: any[], 
  meta: { total: number; limit: number; page: number }
): SavedOfferActionTypes => ({
  type: FETCH_SAVED_OFFERS_SUCCESS,
  payload: { data, meta },
});

export const fetchSavedOffersFailureReducer = (error: string): SavedOfferActionTypes => ({
  type: FETCH_SAVED_OFFERS_FAILURE,
  payload: error,
});

export const GetSavedOffersReducer = (
  page: number = 1, 
  limit: number = 10
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => 
  async (dispatch) => {

    dispatch(fetchSavedOffersRequestReducer());

    try {
      // Hacemos la petición a la URL de borradores (ofertas guardadas)
      const response = await FetchWithIP(`ofertas/findAllStateBorradorToken?page=${page}&limit=${limit}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      
      if (Array.isArray(responseData.data)) {
        const { total, limit, page } = responseData.meta;
        dispatch(fetchSavedOffersSuccessReducer(responseData.data, { total, limit, page }));
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }

    } catch (error) {
      dispatch(fetchSavedOffersFailureReducer('Error al obtener las ofertas guardadas'));
    }
  };
