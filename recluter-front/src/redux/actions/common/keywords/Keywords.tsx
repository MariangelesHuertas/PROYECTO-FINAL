import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_KEYWORDS_REQUEST,
  FETCH_KEYWORDS_SUCCESS,
  FETCH_KEYWORDS_FAILURE,
  FETCH_KEYWORDS_TABLE,
  KeywordsActionTypes,
  CREATE_KEYWORDS_REQUEST,
  CREATE_KEYWORDS_SUCCESS,
  CREATE_KEYWORDS_FAILURE,
  DELETE_KEYWORDS_REQUEST,
  DELETE_KEYWORDS_SUCCESS,
  DELETE_KEYWORDS_FAILURE,
  UPDATE_KEYWORDS_REQUEST,
  UPDATE_KEYWORDS_SUCCESS,
  UPDATE_KEYWORDS_FAILURE
} from '../../../../constants/common/keywords/Keywords';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchKeywordsRequestReducer = (): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_REQUEST,
});

export const fetchKeywordsSuccessReducer = (data: any[]): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_SUCCESS,
  payload: { data },
});

export const fetchKeywordsFailureReducer = (error: string): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_FAILURE,
  payload: error,
});

export const fetchKeywordsTableReducer = (data: any[], meta: any): KeywordsActionTypes => ({
  type: FETCH_KEYWORDS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createKeywordsRequest = (): KeywordsActionTypes => ({
  type: CREATE_KEYWORDS_REQUEST,
});

export const createKeywordsSuccess = (data: any): KeywordsActionTypes => ({
  type: CREATE_KEYWORDS_SUCCESS,
  payload: data,
});

export const createKeywordsFailure = (error: string): KeywordsActionTypes => ({
  type: CREATE_KEYWORDS_FAILURE,
  payload: error,
});

export const deleteKeywordsRequest = (): KeywordsActionTypes => ({
  type: DELETE_KEYWORDS_REQUEST,
});

export const deleteKeywordsSuccess = (id: number): KeywordsActionTypes => ({
  type: DELETE_KEYWORDS_SUCCESS,
  payload: id,
});

export const deleteKeywordsFailure = (error: string): KeywordsActionTypes => ({
  type: DELETE_KEYWORDS_FAILURE,
  payload: error,
});

export const updateKeywordsRequest = (): KeywordsActionTypes => ({
  type: UPDATE_KEYWORDS_REQUEST,
});

export const updateKeywordsSuccess = (data: any): KeywordsActionTypes => ({
  type: UPDATE_KEYWORDS_SUCCESS,
  payload: data,
});

export const updateKeywordsFailure = (error: string): KeywordsActionTypes => ({
  type: UPDATE_KEYWORDS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las palabras clave desde la API
export const GetKeywordsReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
): ThunkAction<Promise<any>, RootState, unknown, KeywordsActionTypes> => async (dispatch) => {
  dispatch(fetchKeywordsRequestReducer());

  try {
    const response = await fetch(`${API_URL}palabras-clave?palabra=${search}&page=${page}&limit=${limit}&sortColumn=palabra&sortOrder=asc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (Array.isArray(responseData.data)) {
      dispatch(fetchKeywordsSuccessReducer(responseData.data));
      return {
        payload: {
          data: responseData.data,
          meta: responseData.meta,
        }
      };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchKeywordsFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const GetKeywordsTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'palabra',
  sortOrder: 'asc' | 'desc' | 'asc' = 'asc'
): ThunkAction<Promise<any>, 
RootState, unknown, 
KeywordsActionTypes> => async (dispatch) => {
  dispatch(fetchKeywordsRequestReducer());

  try {
    const response = await fetch(`${API_URL}palabras-clave?palabra=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (Array.isArray(responseData.data)) {
      dispatch(fetchKeywordsTableReducer(responseData.data, responseData.meta));
      return {
        payload: {
          data: responseData.data,
          meta: responseData.meta,
        }
      };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchKeywordsFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const CreateKeywordsReducer = (keywordsData: any):
  ThunkAction<Promise<any>,
    RootState,
    unknown,
    KeywordsActionTypes> => async (dispatch) => {
      dispatch(createKeywordsRequest());

      try {
        const response = await fetch(`${API_URL}palabras-clave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(keywordsData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(createKeywordsSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createKeywordsSuccess('Error al crear el Keywords'));
        throw error;
      }
};

export const UpdateKeywordsReducer = (
  id: number,
  KeywordsData: any
): ThunkAction<Promise<any>, RootState, unknown, KeywordsActionTypes> => async (dispatch) => {
  dispatch(updateKeywordsRequest());
  
  try {
    const response = await fetch(`${API_URL}palabras-clave/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(KeywordsData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateKeywordsSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateKeywordsFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteKeywordsReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, KeywordsActionTypes> => async (dispatch) => {
  dispatch(deleteKeywordsRequest());
  
  try {
    const response = await fetch(`${API_URL}palabras-clave/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteKeywordsSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Keywords
  } catch (error) {
    dispatch(deleteKeywordsFailure('Error al eliminar la aptitud'));
    throw error;
  }
};