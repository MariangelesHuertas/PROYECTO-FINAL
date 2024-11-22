import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  CREATE_TIPO_USUARIO_FAILURE,
  CREATE_TIPO_USUARIO_REQUEST,
  CREATE_TIPO_USUARIO_SUCCESS,
  DELETE_TIPO_USUARIO_FAILURE,
  DELETE_TIPO_USUARIO_REQUEST,
  DELETE_TIPO_USUARIO_SUCCESS,
  FETCH_TIPO_USUARIO_FAILURE,
  FETCH_TIPO_USUARIO_REQUEST,
  FETCH_TIPO_USUARIO_SUCCESS,
  FETCH_TIPO_USUARIO_TABLE,
  TipoUsuarioActionTypes,
} from '../../../../constants/common/TipoUsuario/TipoUsuario';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchTipoUsuarioRequestReducer = (): TipoUsuarioActionTypes => ({
  type: FETCH_TIPO_USUARIO_REQUEST,
});

export const fetchTipoUsuarioSuccessReducer = (data: any[]): TipoUsuarioActionTypes => ({
  type: FETCH_TIPO_USUARIO_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchTipoUsuarioFailureReducer = (error: string): TipoUsuarioActionTypes => ({
  type: FETCH_TIPO_USUARIO_FAILURE,
  payload: error,
});

export const fetchTipoUsuarioTableReducer = (data: any[], meta: any): TipoUsuarioActionTypes => ({
  type: FETCH_TIPO_USUARIO_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createTipoUsuarioRequest = (): TipoUsuarioActionTypes => ({
  type: CREATE_TIPO_USUARIO_REQUEST,
});

export const createTipoUsuarioSuccess = (data: any): TipoUsuarioActionTypes => ({
  type: CREATE_TIPO_USUARIO_SUCCESS,
  payload: data,
});

export const createTipoUsuarioFailure = (error: string): TipoUsuarioActionTypes => ({
  type: CREATE_TIPO_USUARIO_FAILURE,
  payload: error,
});

export const deleteTipoUsuarioRequest = (): TipoUsuarioActionTypes => ({
  type: DELETE_TIPO_USUARIO_REQUEST,
});

export const deleteTipoUsuarioSuccess = (id: number): TipoUsuarioActionTypes => ({
  type: DELETE_TIPO_USUARIO_SUCCESS,
  payload: id,
});

export const deleteTipoUsuarioFailure = (error: string): TipoUsuarioActionTypes => ({
  type: DELETE_TIPO_USUARIO_FAILURE,
  payload: error,
});

export const GetTipoUsuarioTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'tipo_usuario',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>,
  RootState, unknown,
  TipoUsuarioActionTypes> => async (dispatch) => {
    dispatch(fetchTipoUsuarioRequestReducer()); // Dispatch para iniciar la petición

    try {
      const response = await fetch(`${API_URL}tipo-usuarios?tipo_usuario=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
        dispatch(fetchTipoUsuarioTableReducer(responseData.data, responseData.meta));
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
      dispatch(fetchTipoUsuarioFailureReducer('Error al mostrar datos paginados'));
      return { payload: { data: [] } };
    }
  };

export const CreateTipoUsuarioReducer = (TipoUsuarioData: any):
  ThunkAction<Promise<any>,
    RootState, unknown,
    TipoUsuarioActionTypes> => async (dispatch) => {
      dispatch(createTipoUsuarioRequest());

      try {
        const response = await fetch(`${API_URL}tipo-usuarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(TipoUsuarioData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(createTipoUsuarioSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createTipoUsuarioFailure('Error al crear el sector'));
        throw error;
      }
};

export const DeleteTipoUsuarioReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, TipoUsuarioActionTypes> => async (dispatch) => {
  dispatch(deleteTipoUsuarioRequest());

  try {
    const response = await fetch(`${API_URL}tipo-usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteTipoUsuarioSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted skill
  } catch (error) {
    dispatch(deleteTipoUsuarioFailure('Error al eliminar la aptitud'));
    throw error;
  }
};