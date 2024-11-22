import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_CENTROS_EDUCATIVOS_REQUEST,
  FETCH_CENTROS_EDUCATIVOS_SUCCESS,
  FETCH_CENTROS_EDUCATIVOS_FAILURE,
  CentrosEducativosActionTypes,
  FETCH_CENTROS_EDUCATIVOS_TABLE,
  CREATE_CENTROS_EDUCATIVOS_REQUEST,
  CREATE_CENTROS_EDUCATIVOS_SUCCESS,
  CREATE_CENTROS_EDUCATIVOS_FAILURE,
  DELETE_CENTROS_EDUCATIVOS_REQUEST,
  DELETE_CENTROS_EDUCATIVOS_SUCCESS,
  DELETE_CENTROS_EDUCATIVOS_FAILURE,
  UPDATE_CENTROS_EDUCATIVOS_REQUEST,
  UPDATE_CENTROS_EDUCATIVOS_SUCCESS,
  UPDATE_CENTROS_EDUCATIVOS_FAILURE
} from '../../../../constants/common/centroEducativo/CentroEducativo';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchCentrosEducativosRequestReducer = (): CentrosEducativosActionTypes => ({
  type: FETCH_CENTROS_EDUCATIVOS_REQUEST,
});

export const fetchCentrosEducativosSuccessReducer = (data: any[]): CentrosEducativosActionTypes => ({
  type: FETCH_CENTROS_EDUCATIVOS_SUCCESS,
  payload: { data },
});

export const fetchCentrosEducativosFailureReducer = (error: string): CentrosEducativosActionTypes => ({
  type: FETCH_CENTROS_EDUCATIVOS_FAILURE,
  payload: error,
});

export const fetchCentrosEducativosTableReducer = (data : any[], meta : any): CentrosEducativosActionTypes => ({
  type: FETCH_CENTROS_EDUCATIVOS_TABLE,
  payload: { 
    data:data,
    meta:meta
  }, // Almacena los datos recibidos de la API
});

export const createCentrosEducativosRequest = (): CentrosEducativosActionTypes => ({
  type: CREATE_CENTROS_EDUCATIVOS_REQUEST,
});

export const createCentrosEducativosSuccess = (data: any): CentrosEducativosActionTypes => ({
  type: CREATE_CENTROS_EDUCATIVOS_SUCCESS,
  payload: data,
});

export const createCentrosEducativosFailure = (error: string): CentrosEducativosActionTypes => ({
  type: CREATE_CENTROS_EDUCATIVOS_FAILURE,
  payload: error,
});

export const deleteCentrosEducativosRequest = (): CentrosEducativosActionTypes => ({
  type: DELETE_CENTROS_EDUCATIVOS_REQUEST,
});

export const deleteCentrosEducativosSuccess = (id: number): CentrosEducativosActionTypes => ({
  type: DELETE_CENTROS_EDUCATIVOS_SUCCESS,
  payload: id,
});

export const deleteCentrosEducativosFailure = (error: string): CentrosEducativosActionTypes => ({
  type: DELETE_CENTROS_EDUCATIVOS_FAILURE,
  payload: error,
});

export const updateCentrosEducativosRequest = (): CentrosEducativosActionTypes => ({
  type: UPDATE_CENTROS_EDUCATIVOS_REQUEST,
});

export const updateCentrosEducativosSuccess = (data: any): CentrosEducativosActionTypes => ({
  type: UPDATE_CENTROS_EDUCATIVOS_SUCCESS,
  payload: data,
});

export const updateCentrosEducativosFailure = (error: string): CentrosEducativosActionTypes => ({
  type: UPDATE_CENTROS_EDUCATIVOS_FAILURE,
  payload: error,
});

// Thunk Action para obtener los centros educativos desde la API
export const GetCentrosEducativosReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
): ThunkAction<Promise<any>, RootState, unknown, CentrosEducativosActionTypes> => async (dispatch) => {
  dispatch(fetchCentrosEducativosRequestReducer());

  try {
    const response = await fetch(`${API_URL}centros-educativos?centro_educativo=${search}&page=${page}&limit=${limit}`, {
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
      dispatch(fetchCentrosEducativosSuccessReducer(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchCentrosEducativosFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const GetCentrosEducativosTableReducer = (
  search: string = '', 
  page: number = 1, 
  limit: number = 10,
  sortColumn: string = 'sector',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, RootState, unknown, CentrosEducativosActionTypes> => async (dispatch) => {
  dispatch(fetchCentrosEducativosRequestReducer()); // Dispatch para iniciar la petición
  
  try {
    const response = await fetch(`${API_URL}centros-educativos?centro_educativo=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchCentrosEducativosTableReducer(responseData.data, responseData.meta)); 
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
    dispatch(fetchCentrosEducativosFailureReducer('Error al mostrar datos paginados'));
    return { payload: { data: [] } };
  }
};

export const CreateCentrosEducativosReducer = (CentrosEducativosData: any): ThunkAction<Promise<any>, RootState, unknown, CentrosEducativosActionTypes> => async (dispatch) => {
  dispatch(createCentrosEducativosRequest());
  
  try {
    const response = await fetch(`${API_URL}centros-educativos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CentrosEducativosData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createCentrosEducativosSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createCentrosEducativosFailure('Error al crear el sector'));
    throw error;
  }
};

export const UpdateCentrosEducativosReducer = (
  id: number,
  CentrosEducativosData: any
): ThunkAction<Promise<any>, RootState, unknown, CentrosEducativosActionTypes> => async (dispatch) => {
  dispatch(updateCentrosEducativosRequest());
  
  try {
    const response = await fetch(`${API_URL}centros-educativos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CentrosEducativosData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateCentrosEducativosSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateCentrosEducativosFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteCentrosEducativosReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, CentrosEducativosActionTypes> => async (dispatch) => {
  dispatch(deleteCentrosEducativosRequest());
  
  try {
    const response = await fetch(`${API_URL}aptitudes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteCentrosEducativosSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted CentrosEducativos
  } catch (error) {
    dispatch(deleteCentrosEducativosFailure('Error al eliminar la aptitud'));
    throw error;
  }
};