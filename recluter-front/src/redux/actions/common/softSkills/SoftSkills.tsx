import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_SOFT_SKILLS_REQUEST,
  FETCH_SOFT_SKILLS_SUCCESS,
  FETCH_SOFT_SKILLS_FAILURE,
  SoftSkillsActionTypes,
  FETCH_SOFT_SKILLS_TABLE,
  CREATE_SOFT_SKILLS_REQUEST,
  CREATE_SOFT_SKILLS_SUCCESS,
  CREATE_SOFT_SKILLS_FAILURE,
  DELETE_SOFT_SKILLS_REQUEST,
  DELETE_SOFT_SKILLS_SUCCESS,
  DELETE_SOFT_SKILLS_FAILURE,
  UPDATE_SOFT_SKILLS_REQUEST,
  UPDATE_SOFT_SKILLS_SUCCESS,
  UPDATE_SOFT_SKILLS_FAILURE
}  from '../../../../constants/common/softSkills/SoftSkills';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSoftSkillsRequestReducer = (): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_REQUEST,
});

export const fetchSoftSkillsSuccessReducer = (data: any[]): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_SUCCESS,
  payload: { data }, 
});

export const fetchSoftSkillsFailureReducer = (error: string): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_FAILURE,
  payload: error,
});

export const fetchSoftSkillsTableReducer = (data : any[], meta : any): SoftSkillsActionTypes => ({
  type: FETCH_SOFT_SKILLS_TABLE,
  payload: { 
    data:data,
    meta:meta
  }, // Almacena los datos recibidos de la API
});

export const createSoftSkillsRequest = (): SoftSkillsActionTypes => ({
  type: CREATE_SOFT_SKILLS_REQUEST,
});

export const createSoftSkillsSuccess = (data: any): SoftSkillsActionTypes => ({
  type: CREATE_SOFT_SKILLS_SUCCESS,
  payload: data,
});

export const createSoftSkillsFailure = (error: string): SoftSkillsActionTypes => ({
  type: CREATE_SOFT_SKILLS_FAILURE,
  payload: error,
});

export const deleteSoftSkillsRequest = (): SoftSkillsActionTypes => ({
  type: DELETE_SOFT_SKILLS_REQUEST,
});

export const deleteSoftSkillsSuccess = (id: number): SoftSkillsActionTypes => ({
  type: DELETE_SOFT_SKILLS_SUCCESS,
  payload: id,
});

export const deleteSoftSkillsFailure = (error: string): SoftSkillsActionTypes => ({
  type: DELETE_SOFT_SKILLS_FAILURE,
  payload: error,
});

export const updateSoftSkillsRequest = (): SoftSkillsActionTypes => ({
  type: UPDATE_SOFT_SKILLS_REQUEST,
});

export const updateSoftSkillsSuccess = (data: any): SoftSkillsActionTypes => ({
  type: UPDATE_SOFT_SKILLS_SUCCESS,
  payload: data,
});

export const updateSoftSkillsFailure = (error: string): SoftSkillsActionTypes => ({
  type: UPDATE_SOFT_SKILLS_FAILURE,
  payload: error,
});

export const GetSoftSkillsReducer = (
  search: string = '',
  page: number = 1, 
  limit: number = 10
): 
ThunkAction<Promise<any>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
    dispatch(fetchSoftSkillsRequestReducer());
  
    try {
      const response = await fetch(`${API_URL}soft-skills?soft_skill=${search}&page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Datos de la API de soft skills:", responseData);
      if (Array.isArray(responseData.data)) {
        dispatch(fetchSoftSkillsSuccessReducer(responseData.data));
        return { payload: { data: responseData.data } };
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }
  
    } catch (error) {
      dispatch(fetchSoftSkillsFailureReducer('Error al mostrar datos'));
      return { payload: { data: [] } };
    }
};

export const GetSoftSkillsTableReducer = (
  search: string = '', 
  page: number = 1, 
  limit: number = 10,
  sortColumn: string = 'soft_skill',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
  dispatch(fetchSoftSkillsRequestReducer());
  
  try {
    const response = await fetch(`${API_URL}soft-skills?soft_skill=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchSoftSkillsTableReducer(responseData.data, responseData.meta)); 
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
    dispatch(fetchSoftSkillsFailureReducer('Error al mostrar datos paginados'));
    return { payload: { data: [] } };
  }
};

export const CreateSoftSkillsReducer = (softSkillsData: any): ThunkAction<Promise<any>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
  dispatch(createSoftSkillsRequest());
  
  try {
    const response = await fetch(`${API_URL}soft-skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(softSkillsData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createSoftSkillsSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createSoftSkillsFailure('Error al crear el sector'));
    throw error;
  }
};

export const UpdateSoftSkillsReducer = (
  id: number,
  skillData: any
): ThunkAction<Promise<any>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
  dispatch(updateSoftSkillsRequest());
  
  try {
    const response = await fetch(`${API_URL}soft-skills/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateSoftSkillsSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateSoftSkillsFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteSoftSkillsReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, SoftSkillsActionTypes> => async (dispatch) => {
  dispatch(deleteSoftSkillsRequest());
  
  try {
    const response = await fetch(`${API_URL}soft-skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    dispatch(deleteSoftSkillsSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted skill
  } catch (error) {
    dispatch(deleteSoftSkillsFailure('Error al eliminar la aptitud'));
    throw error;
  }
};