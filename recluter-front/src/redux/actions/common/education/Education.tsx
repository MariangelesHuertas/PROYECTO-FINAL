
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_TIPOS_EDUCACION_REQUEST,
  FETCH_TIPOS_EDUCACION_SUCCESS,
  FETCH_TIPOS_EDUCACION_FAILURE,
  TiposEducacionActionTypes,
  FETCH_EDUCACION_TABLE,
  CREATE_EDUCACION_REQUEST,
  CREATE_EDUCACION_SUCCESS,
  CREATE_EDUCACION_FAILURE,
  DELETE_EDUCACION_REQUEST,
  DELETE_EDUCACION_SUCCESS,
  DELETE_EDUCACION_FAILURE,
  UPDATE_EDUCACION_REQUEST,
  UPDATE_EDUCACION_SUCCESS,
  UPDATE_EDUCACION_FAILURE
} from '../../../../constants/common/education/Education';
import { CREATE_SECTOR_FAILURE, CREATE_SECTOR_REQUEST, CREATE_SECTOR_SUCCESS } from '../../../../constants/common/sectors/Sectors';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchTiposEducacionRequestReducer = (): TiposEducacionActionTypes => ({
  type: FETCH_TIPOS_EDUCACION_REQUEST,
});

export const fetchTiposEducacionSuccessReducer = (data: any[]): TiposEducacionActionTypes => ({
  type: FETCH_TIPOS_EDUCACION_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchTiposEducacionFailureReducer = (error: string): TiposEducacionActionTypes => ({
  type: FETCH_TIPOS_EDUCACION_FAILURE,
  payload: error,
});

export const fetchTiposEducacionTableReducer = (data : any[], meta : any): TiposEducacionActionTypes => ({
  type: FETCH_EDUCACION_TABLE,
  payload: { 
    data:data,
    meta:meta
  }, // Almacena los datos recibidos de la API
});

export const createTiposEducacionRequest = (): TiposEducacionActionTypes => ({
  type: CREATE_EDUCACION_REQUEST,
});

export const createTiposEducacionSuccess = (data: any): TiposEducacionActionTypes => ({
  type: CREATE_EDUCACION_SUCCESS,
  payload: data,
});

export const createTiposEducacionFailure = (error: string): TiposEducacionActionTypes => ({
  type: CREATE_EDUCACION_FAILURE,
  payload: error,
});

export const deleteTiposEducacionRequest = (): TiposEducacionActionTypes => ({
  type: DELETE_EDUCACION_REQUEST,
});

export const deleteTiposEducacionSuccess = (id: number): TiposEducacionActionTypes => ({
  type: DELETE_EDUCACION_SUCCESS,
  payload: id,
});

export const deleteTiposEducacionFailure = (error: string): TiposEducacionActionTypes => ({
  type: DELETE_EDUCACION_FAILURE,
  payload: error,
});

export const updateTiposEducacionRequest = (): TiposEducacionActionTypes => ({
  type: UPDATE_EDUCACION_REQUEST,
});

export const updateTiposEducacionSuccess = (data: any): TiposEducacionActionTypes => ({
  type: UPDATE_EDUCACION_SUCCESS,
  payload: data,
});

export const updateTiposEducacionFailure = (error: string): TiposEducacionActionTypes => ({
  type: UPDATE_EDUCACION_FAILURE,
  payload: error,
});

// En tu acción de `GetTiposEducacionReducer`
export const GetTiposEducacionReducer = (
  page: number = 1,    // Página por defecto
  limit: number = 10   // Límite por defecto como número
): ThunkAction<Promise<any>, RootState, unknown, TiposEducacionActionTypes> => async (dispatch) => {
  dispatch(fetchTiposEducacionRequestReducer());

  try {
    const response = await fetch(`${API_URL}tipos-educacion?page=${page}&limit=${limit}`, {
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
      dispatch(fetchTiposEducacionSuccessReducer(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchTiposEducacionFailureReducer('Error al mostrar los tipos de educación'));
    return { payload: { data: [] } };
  }
};

export const GetTiposEducacionTableReducer = (
  search: string = '', 
  page: number = 1, 
  limit: number = 10,
  sortColumn: string = 'sector',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, RootState, unknown, TiposEducacionActionTypes> => async (dispatch) => {
  dispatch(fetchTiposEducacionRequestReducer()); // Dispatch para iniciar la petición
  
  try {
    const response = await fetch(`${API_URL}tipos-educacion?tipo_educacion=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchTiposEducacionTableReducer(responseData.data, responseData.meta)); 
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
    dispatch(fetchTiposEducacionFailureReducer('Error al mostrar datos paginados'));
    return { payload: { data: [] } };
  }
};

export const CreateTiposEducacionReducer = (tipoEducacionData: any): ThunkAction<Promise<any>, RootState, unknown, TiposEducacionActionTypes> => async (dispatch) => {
  dispatch(createTiposEducacionRequest());
  
  try {
    const response = await fetch(`${API_URL}tipos-educacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tipoEducacionData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createTiposEducacionSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createTiposEducacionFailure('Error al crear el sector'));
    throw error;
  }
};

export const UpdateTipoEducacionReducer = (
  id: number,
  TiposEducacionData: any
): ThunkAction<Promise<any>, RootState, unknown, TiposEducacionActionTypes> => async (dispatch) => {
  dispatch(updateTiposEducacionRequest());
  
  try {
    const response = await fetch(`${API_URL}tipos-educacion/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TiposEducacionData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateTiposEducacionSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateTiposEducacionFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteTiposEducacionReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, TiposEducacionActionTypes> => async (dispatch) => {
  dispatch(deleteTiposEducacionRequest());
  
  try {
    const response = await fetch(`${API_URL}tipos-educacion/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteTiposEducacionSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted TiposEducacion
  } catch (error) {
    dispatch(deleteTiposEducacionFailure('Error al eliminar la aptitud'));
    throw error;
  }
};

