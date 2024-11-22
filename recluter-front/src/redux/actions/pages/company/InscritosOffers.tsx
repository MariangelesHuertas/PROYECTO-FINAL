import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_INSCRITOS_OFFERS_REQUEST,
  FETCH_INSCRITOS_OFFERS_SUCCESS,
  FETCH_INSCRITOS_OFFERS_FAILURE,
  FETCH_INSCRITOS_OFFERS_SUCCESS_ALL,
  InscritosOfferActionTypes
} from '../../../../constants/company/InscritosOffers';
import FetchWithIP from '../../utils/FetchHeaders';

interface ApiResponse {
  respuesta: boolean;
  mensaje: string;
  data: any;
  mensaje_dev: string | null;
  meta: {
    limit: number;
    page: number;
  };
}

// Reducers for actions
export const fetchInscritosOffersRequestReducer = (): InscritosOfferActionTypes => ({
  type: FETCH_INSCRITOS_OFFERS_REQUEST,
});

export const fetchInscritosOffersSuccessReducer = (data: ApiResponse['data']): InscritosOfferActionTypes => ({
  type: FETCH_INSCRITOS_OFFERS_SUCCESS,
  payload: {
    data: data,
  },
});

export const fetchInscritosOffersFailureReducer = (error: string): InscritosOfferActionTypes => ({
  type: FETCH_INSCRITOS_OFFERS_FAILURE,
  payload: error,
});

export const fetchInscritosOffersSuccessAllReducer = (data: ApiResponse['data']): InscritosOfferActionTypes => ({
  type: FETCH_INSCRITOS_OFFERS_SUCCESS_ALL,
  payload: {
    data: data,
  },
});

// Thunk actions
export const GetIncritosOffersHoy = (): ThunkAction<void, RootState, unknown, Action<string>> => 
  async (dispatch) => {
    dispatch(fetchInscritosOffersRequestReducer());

    try {
      const requestBody = { hoy: true };

      const response = await FetchWithIP(
        'dashboard/incritosOferta',
        {
          method: 'POST',
        },
        requestBody 
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData: ApiResponse = await response.json();

      if (responseData.respuesta) {
        dispatch(fetchInscritosOffersSuccessReducer(responseData.data));
      } else {
        throw new Error(responseData.mensaje || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error in GetIncritosOffersHoy:', error);
      dispatch(fetchInscritosOffersFailureReducer('Error al mostrar las ofertas'));
    }
  };

  export const GetIncritosOffersAll = (): ThunkAction<void, RootState, unknown, Action<string>> => 
    async (dispatch) => {
      dispatch(fetchInscritosOffersRequestReducer());
  
      try {
        const requestBody = { hoy: true, allOfertas: true };
  
        const response = await FetchWithIP(
          'dashboard/incritosOferta',
          {
            method: 'POST',
          },
          requestBody 
        );
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const responseData: ApiResponse = await response.json();
  
        if (responseData.respuesta) {
          dispatch(fetchInscritosOffersSuccessAllReducer(responseData.data)); // Para la segunda API
        } else {
          throw new Error(responseData.mensaje || 'Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error('Error in GetIncritosOffersAll:', error);
      }
    };
