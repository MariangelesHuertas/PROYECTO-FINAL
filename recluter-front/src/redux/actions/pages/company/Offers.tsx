import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_OFFERS_REQUEST,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  FETCH_OFFERS_SUCCESS_TABLE,
  FETCH_OFFERS_REQUEST_TABLE,
  FETCH_OFFERS_FAILURE_TABLE,
  OfferActionTypes
} from '../../../../constants/company/Offers';
import FetchWithIP from '../../utils/FetchHeaders';

// Action Creators
export const fetchOffersRequestReducer = (): OfferActionTypes => ({
  type: FETCH_OFFERS_REQUEST,
});

export const fetchOffersSuccessReducer = (data: any[], meta: any): OfferActionTypes => ({
  type: FETCH_OFFERS_SUCCESS,
  payload: { 
    data: data,
    meta: meta
  },
});

export const fetchOffersFailureReducer = (error: string): OfferActionTypes => ({
  type: FETCH_OFFERS_FAILURE,
  payload: error,
});

export const fetchOffersRequestReducerTable  = (): OfferActionTypes => ({
  type: FETCH_OFFERS_REQUEST_TABLE,
});


export const fetchOffersSuccessReducerTable = (data: any[], meta: any): OfferActionTypes => ({
  type: FETCH_OFFERS_SUCCESS_TABLE,
  payload: { 
    data: data,
    meta: meta
  },
});

export const fetchOffersFailureReducerTable = (error: string): OfferActionTypes => ({
  type: FETCH_OFFERS_FAILURE_TABLE,
  payload: error,
});


export const GetOffersReducer = (
  page: number = 1, 
  limit: number = 10
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {

    const { rex_user } = getState().auth;
    const empresa_id = rex_user?.empresa?.id;

    // Verificamos que empresa_id esté disponible
    if (!empresa_id) {
      console.log("Empresa ID no está disponible. No se puede obtener ofertas.");
      return;
    }

    dispatch(fetchOffersRequestReducer());

    try {
      const response = await FetchWithIP(`ofertas/${empresa_id}/getAllByEmpresaId?page=${page}&limit=${limit}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      if (Array.isArray(responseData.data)) {
        dispatch(fetchOffersSuccessReducer(
          responseData.data,
          responseData.meta
        ));     
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }

    } catch (error) {
      dispatch(fetchOffersFailureReducer('Error al mostrar las ofertas'));
    }
  };


  export const GetOffersReducerTable = (
    page: number = 1, 
    limit: number = 10
  ): ThunkAction<Promise<void>, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
  
      const { rex_user } = getState().auth;
      const empresa_id = rex_user?.empresa?.id;
  
      // Verificamos que empresa_id esté disponible
      if (!empresa_id) {
        console.log("Empresa ID no está disponible. No se puede obtener ofertas.");
        return;
      }
  
      dispatch(fetchOffersRequestReducerTable());
  
      try {
        const response = await FetchWithIP(`ofertas/${empresa_id}/getAllByEmpresaId?page=${page}&limit=${limit}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        if (Array.isArray(responseData.data)) {
          dispatch(fetchOffersSuccessReducerTable(
            responseData.data,
            responseData.meta
          ));     
        } else {
          throw new Error('Los datos obtenidos no son un array');
        }
  
      } catch (error) {
        dispatch(fetchOffersFailureReducerTable('Error al mostrar las ofertas'));
      }
    };


  