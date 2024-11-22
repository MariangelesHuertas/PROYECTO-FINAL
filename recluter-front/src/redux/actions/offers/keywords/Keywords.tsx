import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_KEYWORDS_REQUEST,
  FETCH_KEYWORDS_SUCCESS,
  FETCH_KEYWORDS_FAILURE,
  KeywordsActionTypes
} from '../../../../constants/offers/keywords/Keywords';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchKeywordsRequest = (): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_REQUEST,
});

export const fetchKeywordsSuccess = (data: any[]): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_SUCCESS,
  payload: { data },
});

export const fetchKeywordsFailure = (error: string): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las palabras clave desde la API
export const GetKeywordsReducer = (): ThunkAction<Promise<any>, RootState, unknown, KeywordsActionTypes> => async (dispatch) => {
  dispatch(fetchKeywordsRequest());

  try {
    const response = await fetch(`${API_URL}palabras-clave`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Datos de la API:", responseData);

    if (Array.isArray(responseData.data)) {
      dispatch(fetchKeywordsSuccess(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchKeywordsFailure('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};
