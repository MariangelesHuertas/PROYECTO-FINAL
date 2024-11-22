import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_EMPRESAS_REQUEST,
  FETCH_EMPRESAS_SUCCESS,
  FETCH_EMPRESAS_FAILURE,
  EmpresasActionTypes,
  FETCH_EMPRESAS_TABLE,
  CREATE_EMPRESAS_REQUEST,
  CREATE_EMPRESAS_SUCCESS,
  CREATE_EMPRESAS_FAILURE,
  DELETE_EMPRESAS_REQUEST,
  DELETE_EMPRESAS_SUCCESS,
  DELETE_EMPRESAS_FAILURE,
  UPDATE_EMPRESAS_REQUEST,
  UPDATE_EMPRESAS_SUCCESS,
  UPDATE_EMPRESAS_FAILURE
} from '../../../../constants/common/company/Company';
import FetchWithIP from '../../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchEmpresasRequestReducer = (): EmpresasActionTypes => ({
  type: FETCH_EMPRESAS_REQUEST,
});

export const fetchEmpresasSuccessReducer = (data: any[]): EmpresasActionTypes => ({
  type: FETCH_EMPRESAS_SUCCESS,
  payload: { data },
});

export const fetchEmpresasFailureReducer = (error: string): EmpresasActionTypes => ({
  type: FETCH_EMPRESAS_FAILURE,
  payload: error,
});

export const fetchEmpresasTableReducer = (data: any[], meta: any): EmpresasActionTypes => ({
  type: FETCH_EMPRESAS_TABLE,
  payload: {
    data: data, 
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const createEmpresasRequest = (): EmpresasActionTypes => ({
  type: CREATE_EMPRESAS_REQUEST,
});

export const createEmpresasSuccess = (data: any): EmpresasActionTypes => ({
  type: CREATE_EMPRESAS_SUCCESS,
  payload: data,
});

export const createEmpresasFailure = (error: string): EmpresasActionTypes => ({
  type: CREATE_EMPRESAS_FAILURE,
  payload: error,
});

export const deleteEmpresasRequest = (): EmpresasActionTypes => ({
  type: DELETE_EMPRESAS_REQUEST,
});

export const deleteEmpresasSuccess = (id: number): EmpresasActionTypes => ({
  type: DELETE_EMPRESAS_SUCCESS,
  payload: id,
});

export const deleteEmpresasFailure = (error: string): EmpresasActionTypes => ({
  type: DELETE_EMPRESAS_FAILURE,
  payload: error,
});

export const updateEmpresasRequest = (): EmpresasActionTypes => ({
  type: UPDATE_EMPRESAS_REQUEST,
});

export const updateEmpresasSuccess = (data: any): EmpresasActionTypes => ({
  type: UPDATE_EMPRESAS_SUCCESS,
  payload: data,
});

export const updateEmpresasFailure = (error: string): EmpresasActionTypes => ({
  type: UPDATE_EMPRESAS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las empresas desde la API
export const GetEmpresasReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
): ThunkAction<Promise<any>, RootState, unknown, EmpresasActionTypes> => async (dispatch) => {
  dispatch(fetchEmpresasRequestReducer());

  try {
    const response = await FetchWithIP(`empresas?empresa=${search}&page=${page}&limit=${limit}&sortOrder=desc&sortColumn=createdAt`,{
      method: 'GET'
    }).then(res => res.json())

    if (Array.isArray(response.data)) {
      dispatch(fetchEmpresasSuccessReducer(response.data));
      return { payload: { data: response.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchEmpresasFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const GetEmpresasTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'empresa',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>,
  RootState, unknown,
  EmpresasActionTypes> => async (dispatch) => {
    dispatch(fetchEmpresasRequestReducer()); // Dispatch para iniciar la petición

    try {
      const response = await fetch(`${API_URL}empresas?empresa=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
        dispatch(fetchEmpresasTableReducer(responseData.data, responseData.meta));
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
      dispatch(fetchEmpresasFailureReducer('Error al mostrar datos paginados'));
      return { payload: { data: [] } };
    }
  };

  export const CreateEmpresasReducer = (empresasData: any):
  ThunkAction<Promise<any>,
    RootState, unknown,
    EmpresasActionTypes> => async (dispatch) => {
      dispatch(createEmpresasRequest());

      try {
        const response = await fetch(`${API_URL}empresas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: empresasData.nombre,
            apellido_paterno: empresasData.apellido_paterno,
            apellido_materno: empresasData.apellido_materno,
            usuario: empresasData.usuario,
            email: empresasData.email,
            contrasena: empresasData.contrasena,
            tipo_usuario_id: empresasData.tipo_usuario_id,
            sector_id: empresasData.sector_id,
            empresa: empresasData.empresa,
            logo: empresasData.logo,
            banner: empresasData.banner,
            pagina_web: empresasData.pagina_web,
            sede_fiscal: empresasData.sede_fiscal,
            tamanio: empresasData.tamanio,
            descripcion: empresasData.descripcion,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(createEmpresasSuccess(responseData));
        return responseData;
      } catch (error) {
        dispatch(createEmpresasFailure('Error al crear la empresa'));
        throw error;
      }
};

export const UpdateEmpresasReducer = (
  id: number,
  EmpresasData: any
): ThunkAction<Promise<any>, RootState, unknown, EmpresasActionTypes> => async (dispatch) => {
  dispatch(updateEmpresasRequest());
  
  try {
    const response = await fetch(`${API_URL}empresas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(EmpresasData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateEmpresasSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateEmpresasFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteEmpresasReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, EmpresasActionTypes> => async (dispatch) => {
  dispatch(deleteEmpresasRequest());
  
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

    dispatch(deleteEmpresasSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted Empresas
  } catch (error) {
    dispatch(deleteEmpresasFailure('Error al eliminar la aptitud'));
    throw error;
  }
};