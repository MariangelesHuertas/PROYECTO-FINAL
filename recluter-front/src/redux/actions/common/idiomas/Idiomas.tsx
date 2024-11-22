import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  CREATE_IDIOMAS_FAILURE,
  CREATE_IDIOMAS_REQUEST,
  CREATE_IDIOMAS_SUCCESS,
  DELETE_IDIOMAS_FAILURE,
  DELETE_IDIOMAS_REQUEST,
  DELETE_IDIOMAS_SUCCESS,
  FETCH_IDIOMAS_FAILURE,
  FETCH_IDIOMAS_REQUEST,
  FETCH_IDIOMAS_SUCCESS,
  FETCH_IDIOMAS_TABLE,
  IdiomasActionTypes,
  UPDATE_IDIOMAS_FAILURE,
  UPDATE_IDIOMAS_REQUEST,
  UPDATE_IDIOMAS_SUCCESS
} from '../../../../constants/common/idiomas/Idiomas';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchIdiomasRequestReducer = (): IdiomasActionTypes => ({
  type: FETCH_IDIOMAS_REQUEST,
});

export const fetchIdiomasSuccessReducer = (data: any[]): IdiomasActionTypes => ({
  type: FETCH_IDIOMAS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchIdiomasFailureReducer = (error: string): IdiomasActionTypes => ({
  type: FETCH_IDIOMAS_FAILURE,
  payload: error,
});

export const fetchIdiomasTableReducer = (data: any[], meta: any): IdiomasActionTypes => ({
  type: FETCH_IDIOMAS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createIdiomasRequest = (): IdiomasActionTypes => ({
  type: CREATE_IDIOMAS_REQUEST,
});

export const createIdiomasSuccess = (data: any): IdiomasActionTypes => ({
  type: CREATE_IDIOMAS_SUCCESS,
  payload: data,
});

export const createIdiomasFailure = (error: string): IdiomasActionTypes => ({
  type: CREATE_IDIOMAS_FAILURE,
  payload: error,
});

export const deleteIdiomasRequest = (): IdiomasActionTypes => ({
  type: DELETE_IDIOMAS_REQUEST,
});

export const deleteIdiomasSuccess = (id: number): IdiomasActionTypes => ({
  type: DELETE_IDIOMAS_SUCCESS,
  payload: id,
});

export const deleteIdiomasFailure = (error: string): IdiomasActionTypes => ({
  type: DELETE_IDIOMAS_FAILURE,
  payload: error,
});

export const updateIdiomasRequest = (): IdiomasActionTypes => ({
  type: UPDATE_IDIOMAS_REQUEST,
});

export const updateIdiomasSuccess = (data: any): IdiomasActionTypes => ({
  type: UPDATE_IDIOMAS_SUCCESS,
  payload: data,
});

export const updateIdiomasFailure = (error: string): IdiomasActionTypes => ({
  type: UPDATE_IDIOMAS_FAILURE,
  payload: error,
});

export const GetIdiomasTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'idioma',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>,
  RootState, unknown,
  IdiomasActionTypes> => async (dispatch) => {
    dispatch(fetchIdiomasRequestReducer()); // Dispatch para iniciar la petición

    try {
      const response = await fetch(`${API_URL}idiomas?idioma=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
        dispatch(fetchIdiomasTableReducer(responseData.data, responseData.meta));
        return {
          payload: {
            data: responseData.data,
            meta: responseData.meta, // Devuelve también la meta para paginación
          }
        };
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }

    } catch (error) {
      dispatch(fetchIdiomasFailureReducer('Error al mostrar datos paginados'));
      return { payload: { data: [] } };
    }
  };

export const CreateIdiomasReducer = (idiomasData: any):
  ThunkAction<Promise<any>,
    RootState, unknown,
    IdiomasActionTypes> => async (dispatch) => {
      dispatch(createIdiomasRequest());

      try {
        const response = await fetch(`${API_URL}idiomas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(idiomasData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(createIdiomasSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createIdiomasFailure('Error al crear el sector'));
        throw error;
      }
};

export const UpdateIdiomasReducer = (
  id: number,
  IdiomasData: any
): ThunkAction<Promise<any>, RootState, unknown, IdiomasActionTypes> => async (dispatch) => {
  dispatch(updateIdiomasRequest());
  
  try {
    const response = await fetch(`${API_URL}idiomas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(IdiomasData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateIdiomasSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateIdiomasFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteIdiomasReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, IdiomasActionTypes> => async (dispatch) => {
  dispatch(deleteIdiomasRequest());
  
  try {
    const response = await fetch(`${API_URL}idiomas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteIdiomasSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Idiomas
  } catch (error) {
    dispatch(deleteIdiomasFailure('Error al eliminar la aptitud'));
    throw error;
  }
};