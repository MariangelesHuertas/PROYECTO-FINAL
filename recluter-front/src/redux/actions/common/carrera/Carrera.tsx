import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_CARRERAS_REQUEST,
  FETCH_CARRERAS_SUCCESS,
  FETCH_CARRERAS_FAILURE,
  CarrerasActionTypes,
  FETCH_CARRERAS_TABLE,
  CREATE_CARRERAS_REQUEST,
  CREATE_CARRERAS_SUCCESS,
  CREATE_CARRERAS_FAILURE,
  DELETE_CARRERAS_REQUEST,
  DELETE_CARRERAS_SUCCESS,
  DELETE_CARRERAS_FAILURE,
  UPDATE_CARRERAS_REQUEST,
  UPDATE_CARRERAS_SUCCESS,
  UPDATE_CARRERAS_FAILURE
} from '../../../../constants/common/carrera/Carrera';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchCarrerasRequestReducer = (): CarrerasActionTypes => ({
  type: FETCH_CARRERAS_REQUEST,
});

export const fetchCarrerasSuccessReducer = (data: any[]): CarrerasActionTypes => ({
  type: FETCH_CARRERAS_SUCCESS,
  payload: { data },
});

export const fetchCarrerasFailureReducer = (error: string): CarrerasActionTypes => ({
  type: FETCH_CARRERAS_FAILURE,
  payload: error,
});

export const fetchCarrerasTableReducer = (data: any[], meta: any): CarrerasActionTypes => ({
  type: FETCH_CARRERAS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createCarrerasRequest = (): CarrerasActionTypes => ({
  type: CREATE_CARRERAS_REQUEST,
});

export const createCarrerasSuccess = (data: any): CarrerasActionTypes => ({
  type: CREATE_CARRERAS_SUCCESS,
  payload: data,
});

export const createCarrerasFailure = (error: string): CarrerasActionTypes => ({
  type: CREATE_CARRERAS_FAILURE,
  payload: error,
});

export const deleteCarrerasRequest = (): CarrerasActionTypes => ({
  type: DELETE_CARRERAS_REQUEST,
});

export const deleteCarrerasSuccess = (id: number): CarrerasActionTypes => ({
  type: DELETE_CARRERAS_SUCCESS,
  payload: id,
});

export const deleteCarrerasFailure = (error: string): CarrerasActionTypes => ({
  type: DELETE_CARRERAS_FAILURE,
  payload: error,
});

export const updateCarrerasRequest = (): CarrerasActionTypes => ({
  type: UPDATE_CARRERAS_REQUEST,
});

export const updateCarrerasSuccess = (data: any): CarrerasActionTypes => ({
  type: UPDATE_CARRERAS_SUCCESS,
  payload: data,
});

export const updateCarrerasFailure = (error: string): CarrerasActionTypes => ({
  type: UPDATE_CARRERAS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las carreras desde la API
export const GetCarrerasReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
): ThunkAction<Promise<any>, RootState, unknown, CarrerasActionTypes> => async (dispatch) => {
  dispatch(fetchCarrerasRequestReducer());

  try {
    const response = await fetch(`${API_URL}carreras?carrera=${search}&page=${page}&limit=${limit}`, {
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
      dispatch(fetchCarrerasSuccessReducer(responseData.data));
      return { payload: { data: responseData.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchCarrerasFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const GetCarrerasTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'carrera',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, 
RootState, 
unknown, 
CarrerasActionTypes> => async (dispatch) => {
  dispatch(fetchCarrerasRequestReducer());

  try {
    const response = await fetch(`${API_URL}carreras?carrera=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchCarrerasTableReducer(responseData.data, responseData.meta));
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
    dispatch(fetchCarrerasFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const CreateCarrerasReducer = (keywordsData: any):
  ThunkAction<Promise<any>,
    RootState,
    unknown,
    CarrerasActionTypes> => async (dispatch) => {
      dispatch(createCarrerasRequest());

      try {
        const response = await fetch(`${API_URL}carreras`, {
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
        dispatch(createCarrerasSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createCarrerasSuccess('Error al crear el Carreras'));
        throw error;
      }
};

export const UpdateCarrerasReducer = (
  id: number,
  CarrerasData: any
): ThunkAction<Promise<any>, RootState, unknown, CarrerasActionTypes> => async (dispatch) => {
  dispatch(updateCarrerasRequest());
  
  try {
    const response = await fetch(`${API_URL}carreras/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(CarrerasData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateCarrerasSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateCarrerasFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteCarrerasReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, CarrerasActionTypes> => async (dispatch) => {
  dispatch(deleteCarrerasRequest());
  
  try {
    const response = await fetch(`${API_URL}carreras/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteCarrerasSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Carreras
  } catch (error) {
    dispatch(deleteCarrerasFailure('Error al eliminar la aptitud'));
    throw error;
  }
};