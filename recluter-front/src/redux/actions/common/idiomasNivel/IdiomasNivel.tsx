import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import { 
  CREATE_IDIOMAS_NIVEL_FAILURE, 
  CREATE_IDIOMAS_NIVEL_REQUEST, 
  CREATE_IDIOMAS_NIVEL_SUCCESS, 
  DELETE_IDIOMAS_NIVEL_FAILURE, 
  DELETE_IDIOMAS_NIVEL_REQUEST, 
  DELETE_IDIOMAS_NIVEL_SUCCESS, 
  FETCH_IDIOMAS_NIVEL_FAILURE, 
  FETCH_IDIOMAS_NIVEL_REQUEST, 
  FETCH_IDIOMAS_NIVEL_SUCCESS, 
  FETCH_IDIOMAS_NIVEL_TABLE, 
  IdiomasNivelActionTypes, 
  UPDATE_IDIOMAS_NIVEL_FAILURE, 
  UPDATE_IDIOMAS_NIVEL_REQUEST,
  UPDATE_IDIOMAS_NIVEL_SUCCESS}
from '../../../../constants/common/idiomasNivel/IdiomasNivel';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchIdiomasNivelRequestReducer = (): IdiomasNivelActionTypes => ({
  type: FETCH_IDIOMAS_NIVEL_REQUEST,
});

export const fetchIdiomasNivelSuccessReducer = (data: any[]): IdiomasNivelActionTypes => ({
  type: FETCH_IDIOMAS_NIVEL_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchIdiomasNivelFailureReducer = (error: string): IdiomasNivelActionTypes => ({
  type: FETCH_IDIOMAS_NIVEL_FAILURE,
  payload: error,
});

export const fetchIdiomasNivelTableReducer = (data: any[], meta: any): IdiomasNivelActionTypes => ({
  type: FETCH_IDIOMAS_NIVEL_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createIdiomasNivelRequest = (): IdiomasNivelActionTypes => ({
  type: CREATE_IDIOMAS_NIVEL_REQUEST,
});

export const createIdiomasNivelSuccess = (data: any): IdiomasNivelActionTypes => ({
  type: CREATE_IDIOMAS_NIVEL_SUCCESS,
  payload: data,
});

export const createIdiomasNivelFailure = (error: string): IdiomasNivelActionTypes => ({
  type: CREATE_IDIOMAS_NIVEL_FAILURE,
  payload: error,
});

export const deleteIdiomasNivelRequest = (): IdiomasNivelActionTypes => ({
  type: DELETE_IDIOMAS_NIVEL_REQUEST,
});

export const deleteIdiomasNivelSuccess = (id: number): IdiomasNivelActionTypes => ({
  type: DELETE_IDIOMAS_NIVEL_SUCCESS,
  payload: id,
});

export const deleteIdiomasNivelFailure = (error: string): IdiomasNivelActionTypes => ({
  type: DELETE_IDIOMAS_NIVEL_FAILURE,
  payload: error,
});

export const updateIdiomasNivelRequest = (): IdiomasNivelActionTypes => ({
  type: UPDATE_IDIOMAS_NIVEL_REQUEST,
});

export const updateIdiomasNivelSuccess = (data: any): IdiomasNivelActionTypes => ({
  type: UPDATE_IDIOMAS_NIVEL_SUCCESS,
  payload: data,
});

export const updateIdiomasNivelFailure = (error: string): IdiomasNivelActionTypes => ({
  type: UPDATE_IDIOMAS_NIVEL_FAILURE,
  payload: error,
});

export const GetIdiomasNivelTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'nivel',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>,
  RootState, 
  unknown,
  IdiomasNivelActionTypes> => async (dispatch) => {
    dispatch(fetchIdiomasNivelRequestReducer()); // Dispatch para iniciar la petición

    try {
      const response = await fetch(`${API_URL}niveles-idiomas?nivel=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
        dispatch(fetchIdiomasNivelTableReducer(responseData.data, responseData.meta));
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
      dispatch(fetchIdiomasNivelFailureReducer('Error al mostrar datos paginados'));
      return { payload: { data: [] } };
    }
  };

export const CreateIdiomasNivelReducer = (idiomasData: any):
  ThunkAction<Promise<any>,
    RootState, unknown,
    IdiomasNivelActionTypes> => async (dispatch) => {
      dispatch(createIdiomasNivelRequest());

      try {
        const response = await fetch(`${API_URL}niveles-idiomas`, {
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
        dispatch(createIdiomasNivelSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createIdiomasNivelFailure('Error al crear el sector'));
        throw error;
      }
};

export const UpdateIdiomasNivelReducer = (
  id: number,
  IdiomasNivelData: any
): ThunkAction<Promise<any>, RootState, unknown, IdiomasNivelActionTypes> => async (dispatch) => {
  dispatch(updateIdiomasNivelRequest());
  
  try {
    const response = await fetch(`${API_URL}niveles-idiomas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(IdiomasNivelData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateIdiomasNivelSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateIdiomasNivelFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteIdiomasNivelReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, IdiomasNivelActionTypes> => async (dispatch) => {
  dispatch(deleteIdiomasNivelRequest());
  
  try {
    const response = await fetch(`${API_URL}niveles-idiomas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteIdiomasNivelSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted IdiomasNivel
  } catch (error) {
    dispatch(deleteIdiomasNivelFailure('Error al eliminar la aptitud'));
    throw error;
  }
};