import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import { 
  FETCH_CLOSED_OFFERS_REQUEST,
  FETCH_CLOSED_OFFERS_SUCCESS,
  FETCH_CLOSED_OFFERS_FAILURE,
  FETCH_CLOSED_OFFERS_SUCCESS_TABLE,
  FETCH_CLOSED_OFFERS_REQUEST_TABLE,
  FETCH_CLOSED_OFFERS_FAILURE_TABLE,
  ClosedOfferActionTypes
} from '../../../../constants/company/ClosedOffers';
import FetchWithIP from '../../utils/FetchHeaders';

// Action Creators
export const fetchClosedOffersRequestReducer = (): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_REQUEST,
});

export const fetchClosedOffersSuccessReducer = (
  data: any[], 
  meta: { total: number; limit: number; page: number }
): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_SUCCESS,
  payload: { data, meta },
});

export const fetchClosedOffersFailureReducer = (error: string): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_FAILURE,
  payload: error,
});


export const fetchClosedOffersRequestReducerTable  = (): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_REQUEST_TABLE,
});


export const fetchClosedOffersSuccessReducerTable = (data: any[], meta: any): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_SUCCESS_TABLE,
  payload: { 
    data: data,
    meta: meta
  },
});

export const fetchClosedOffersFailureReducerTable = (error: string): ClosedOfferActionTypes => ({
  type: FETCH_CLOSED_OFFERS_FAILURE_TABLE,
  payload: error,
});


export const GetClosedOffersReducer = (
  page: number = 1, 
  limit: number = 10
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => 
  async (dispatch) => {

    dispatch(fetchClosedOffersRequestReducer());

    try {
      // Realiza la petición sin incluir el empresaId
      const response = await FetchWithIP(`ofertas/findAllStateFinalizadoToken?page=${page}&limit=${limit}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      if (Array.isArray(responseData.data)) {
        const { total, limit, page } = responseData.meta;
        dispatch(fetchClosedOffersSuccessReducer(responseData.data, { total, limit, page }));
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }

    } catch (error) {
      dispatch(fetchClosedOffersFailureReducer('Error al obtener las ofertas finalizadas'));
    }
  };


  export const GetClosedOffersReducerTable = (
    page: number = 1, 
    limit: number = 10
  ): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => 
    async (dispatch) => {
  
      dispatch(fetchClosedOffersRequestReducer());
  
      try {
        // Realiza la petición sin incluir el empresaId
        const response = await FetchWithIP(`ofertas/findAllStateFinalizadoToken?page=${page}&limit=${limit}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        if (Array.isArray(responseData.data)) {
          const { total, limit, page } = responseData.meta;
          dispatch(fetchClosedOffersSuccessReducer(responseData.data, { total, limit, page }));
        } else {
          throw new Error('Los datos obtenidos no son un array');
        }
  
      } catch (error) {
        dispatch(fetchClosedOffersFailureReducer('Error al obtener las ofertas finalizadas'));
      }
    };
  
