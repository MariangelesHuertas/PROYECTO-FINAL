import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import axios from 'axios';
import {
  SEARCH_OFFERS_EMPL_REQUEST,
  SEARCH_OFFERS_EMPL_SUCCESS,
  SEARCH_OFFERS_EMPL_FAILURE,
} from '../../../constants/offers/SearchOffers';
import FetchWithIP from '../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Thunk Action para buscar ofertas de empleo por cargo
export const SearchOffersEmplReducer = (
  cargo: string,
  page: number = 1,
  limit: number = 10
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  // Limpiar el estado antes de la búsqueda
  dispatch({
    type: SEARCH_OFFERS_EMPL_SUCCESS,
    payload: { rex_offersEmpl: [], page: 1 } // Cambiado a 'rex_offersEmpl' para mantener consistencia
  });

  dispatch({ type: SEARCH_OFFERS_EMPL_REQUEST });

  try {
    // Verificación de la URL
    const apiUrl = `ofertas?cargo=${cargo}&page=${page}&limit=${limit}`;

    const response = await FetchWithIP(apiUrl,{
      method: 'GET'
    }).then(res => res.json());

    if (response && response.data) {
      dispatch({
        type: SEARCH_OFFERS_EMPL_SUCCESS,
        payload: {
          rex_offersEmpl: response.data, // Cambiado a 'rex_offersEmpl'
          page,
        },
      });
    } else {
      throw new Error('No se encontraron ofertas para el cargo buscado');
    }
  } catch (error) {
    dispatch({
      type: SEARCH_OFFERS_EMPL_FAILURE,
      payload: (error as Error).message || 'Error desconocido',
    });
    console.error('Error al buscar ofertas de empleo', error);
  }
};
