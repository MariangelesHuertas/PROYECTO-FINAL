import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import { 
  CREATE_USERS_FAILURE,
  CREATE_USERS_REQUEST, 
  CREATE_USERS_SUCCESS, 
  DELETE_USERS_FAILURE, 
  DELETE_USERS_REQUEST, 
  DELETE_USERS_SUCCESS, 
  FETCH_USERS_FAILURE, 
  FETCH_USERS_REQUEST, 
  FETCH_USERS_SUCCESS, 
  FETCH_USERS_TABLE, 
  UPDATE_USERS_FAILURE, 
  UPDATE_USERS_REQUEST, 
  UPDATE_USERS_SUCCESS, 
  UsersActionTypes 
} from '../../../../constants/common/usuario/Users';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchUsersRequestReducer = (): UsersActionTypes => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccessReducer = (data: any[]): UsersActionTypes => ({
  type: FETCH_USERS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchUsersFailureReducer = (error: string): UsersActionTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsersTableReducer = (data: any[], meta: any): UsersActionTypes => ({
  type: FETCH_USERS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createUsersRequest = (): UsersActionTypes => ({
  type: CREATE_USERS_REQUEST,
});

export const createUsersSuccess = (data: any): UsersActionTypes => ({
  type: CREATE_USERS_SUCCESS,
  payload: data,
});

export const createUsersFailure = (error: string): UsersActionTypes => ({
  type: CREATE_USERS_FAILURE,
  payload: error,
});

export const deleteUsersRequest = (): UsersActionTypes => ({
  type: DELETE_USERS_REQUEST,
});

export const deleteUsersSuccess = (id: number): UsersActionTypes => ({
  type: DELETE_USERS_SUCCESS,
  payload: id,
});

export const deleteUsersFailure = (error: string): UsersActionTypes => ({
  type: DELETE_USERS_FAILURE,
  payload: error,
});

export const updateUsersRequest = (): UsersActionTypes => ({
  type: UPDATE_USERS_REQUEST,
});

export const updateUsersSuccess = (data: any): UsersActionTypes => ({
  type: UPDATE_USERS_SUCCESS,
  payload: data,
});

export const updateUsersFailure = (error: string): UsersActionTypes => ({
  type: UPDATE_USERS_FAILURE,
  payload: error,
});

export const GetUsersTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'usuario',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>,
  RootState, unknown,
  UsersActionTypes> => async (dispatch) => {
    dispatch(fetchUsersRequestReducer()); // Dispatch para iniciar la petición

    try {
      const response = await fetch(`${API_URL}auth?sortOrder=${sortOrder}&sortColumn=${sortColumn}&page=${page}&limit=${limit}`, {
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
        dispatch(fetchUsersTableReducer(responseData.data, responseData.meta));
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
      dispatch(fetchUsersFailureReducer('Error al mostrar datos paginados'));
      return { payload: { data: [] } };
    }
  };

export const CreateUsersReducer = (USERSData: any):
  ThunkAction<Promise<any>,
    RootState, unknown,
    UsersActionTypes> => async (dispatch) => {
      dispatch(createUsersRequest());

      try {
        const response = await fetch(`${API_URL}auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(USERSData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(createUsersSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createUsersFailure('Error al crear el sector'));
        throw error;
      }
};

export const UpdateUsersReducer = (
  id: number,
  UsersData: any
): ThunkAction<Promise<any>, RootState, unknown, UsersActionTypes> => async (dispatch) => {
  dispatch(updateUsersRequest());
  
  try {
    const response = await fetch(`${API_URL}auth/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UsersData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateUsersSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateUsersFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteUsersReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, UsersActionTypes> => async (dispatch) => {
  dispatch(deleteUsersRequest());
  
  try {
    const response = await fetch(`${API_URL}auth/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteUsersSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Users
  } catch (error) {
    dispatch(deleteUsersFailure('Error al eliminar la aptitud'));
    throw error;
  }
};