import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_FAILURE,
  FETCH_SECTORS_TABLE,
  SectorsActionTypes,
  CREATE_SECTOR_REQUEST,
  CREATE_SECTOR_SUCCESS,
  CREATE_SECTOR_FAILURE,
  DELETE_SECTOR_REQUEST,
  DELETE_SECTOR_SUCCESS,
  DELETE_SECTOR_FAILURE,
  UPDATE_SECTOR_REQUEST,
  UPDATE_SECTOR_SUCCESS,
  UPDATE_SECTOR_FAILURE
} from '../../../../constants/common/sectors/Sectors';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchSectorsRequestReducer = (): SectorsActionTypes => ({
  type: FETCH_SECTORS_REQUEST,
});

export const fetchSectorsSuccessReducer = (data: any[]): SectorsActionTypes => ({
  type: FETCH_SECTORS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchSectorsFailureReducer = (error: string): SectorsActionTypes => ({
  type: FETCH_SECTORS_FAILURE,
  payload: error,
});

export const fetchSectorsTableReducer = (data : any[], meta : any): SectorsActionTypes => ({
  type: FETCH_SECTORS_TABLE,
  payload: { 
    data:data,
    meta:meta
  }, // Almacena los datos recibidos de la API
});

export const createSectorRequest = (): SectorsActionTypes => ({
  type: CREATE_SECTOR_REQUEST,
});

export const createSectorSuccess = (data: any): SectorsActionTypes => ({
  type: CREATE_SECTOR_SUCCESS,
  payload: data,
});

export const createSectorFailure = (error: string): SectorsActionTypes => ({
  type: CREATE_SECTOR_FAILURE,
  payload: error,
});

export const deleteSectorRequest = (): SectorsActionTypes => ({
  type: DELETE_SECTOR_REQUEST,
});

export const deleteSectorSuccess = (id: number): SectorsActionTypes => ({
  type: DELETE_SECTOR_SUCCESS,
  payload: id,
});

export const deleteSectorFailure = (error: string): SectorsActionTypes => ({
  type: DELETE_SECTOR_FAILURE,
  payload: error,
});

export const updateSectorRequest = (): SectorsActionTypes => ({
  type: UPDATE_SECTOR_REQUEST,
});

export const updateSectorSuccess = (data: any): SectorsActionTypes => ({
  type: UPDATE_SECTOR_SUCCESS,
  payload: data,
});

export const updateSectorFailure = (error: string): SectorsActionTypes => ({
  type: UPDATE_SECTOR_FAILURE,
  payload: error,
});

// Thunk Action para obtener los sectores desde la API con paginación y filtro
export const GetSectorsReducer = (
  search: string = '', 
  page: number = 1, 
  limit: number = 10 
): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
  dispatch(fetchSectorsRequestReducer()); // Dispatch para iniciar la petición
  
  try {
    const response = await fetch(`${API_URL}sectores?sector=${search}&page=${page}&limit=${limit}&sortColumn=sector&sortOrder=asc`, {
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
      dispatch(fetchSectorsSuccessReducer(responseData.data));  
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
    dispatch(fetchSectorsFailureReducer('Error al mostrar datos paginados'));
    return { payload: { data: [] } };
  }
};

export const GetSectorsTableReducer = (
  filters: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'sector',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
  dispatch(fetchSectorsRequestReducer());
  
  try {
    const response = await fetch(`${API_URL}sectores?sector=${filters}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchSectorsTableReducer(responseData.data, responseData.meta));
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
    dispatch(fetchSectorsFailureReducer('Error al mostrar datos paginados'));
    return { payload: { data: [] } };
  }
};

export const CreateSectorReducer = (sectorData: any): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
  dispatch(createSectorRequest());
  
  try {
    const response = await fetch(`${API_URL}sectores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sectorData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createSectorSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createSectorFailure('Error al crear el sector'));
    throw error;
  }
};

export const UpdateSectorReducer = (
  id: number,
  SectorData: any
): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
  dispatch(updateSectorRequest());
  
  try {
    const response = await fetch(`${API_URL}sectores/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SectorData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateSectorSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateSectorFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteSectorReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
  dispatch(deleteSectorRequest());
  
  try {
    const response = await fetch(`${API_URL}sectores/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteSectorSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Sector
  } catch (error) {
    dispatch(deleteSectorFailure('Error al eliminar la aptitud'));
    throw error;
  }
};

