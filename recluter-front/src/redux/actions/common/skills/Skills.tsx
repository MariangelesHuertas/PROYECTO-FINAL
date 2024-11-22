import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_SKILLS_REQUEST,
  FETCH_SKILLS_SUCCESS,
  FETCH_SKILLS_FAILURE,
  SkillsActionTypes,
  FETCH_SKILLS_TABLE,
  CREATE_SKILLS_REQUEST,
  CREATE_SKILLS_FAILURE,
  CREATE_SKILLS_SUCCESS,
  DELETE_SKILLS_REQUEST,
  DELETE_SKILLS_SUCCESS,
  DELETE_SKILLS_FAILURE,
  UPDATE_SKILLS_REQUEST,
  UPDATE_SKILLS_SUCCESS,
  UPDATE_SKILLS_FAILURE
} from '../../../../constants/common/skills/Skills';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchSkillsRequestReducer = (): SkillsActionTypes => ({
  type: FETCH_SKILLS_REQUEST,
});

export const fetchSkillsSuccessReducer = (data: any[]): SkillsActionTypes => ({
  type: FETCH_SKILLS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchSkillsTableReducer = (data: any[], meta: any): SkillsActionTypes => ({
  type: FETCH_SKILLS_TABLE,
  payload: {
    data: data,
    meta: meta
  }, // Almacena los datos recibidos de la API
});

export const fetchSkillsFailureReducer = (error: string): SkillsActionTypes => ({
  type: FETCH_SKILLS_FAILURE,
  payload: error,
});

export const createSkillRequest = (): SkillsActionTypes => ({
  type: CREATE_SKILLS_REQUEST,
});

export const createSkillSuccess = (data: any): SkillsActionTypes => ({
  type: CREATE_SKILLS_SUCCESS,
  payload: data,
});

export const createSkillFailure = (error: string): SkillsActionTypes => ({
  type: CREATE_SKILLS_FAILURE,
  payload: error,
});

export const deleteSkillRequest = (): SkillsActionTypes => ({
  type: DELETE_SKILLS_REQUEST,
});

export const deleteSkillSuccess = (id: number): SkillsActionTypes => ({
  type: DELETE_SKILLS_SUCCESS,
  payload: id,
});

export const deleteSkillFailure = (error: string): SkillsActionTypes => ({
  type: DELETE_SKILLS_FAILURE,
  payload: error,
});

export const updateSkillRequest = (): SkillsActionTypes => ({
  type: UPDATE_SKILLS_REQUEST,
});

export const updateSkillSuccess = (data: any): SkillsActionTypes => ({
  type: UPDATE_SKILLS_SUCCESS,
  payload: data,
});

export const updateSkillFailure = (error: string): SkillsActionTypes => ({
  type: UPDATE_SKILLS_FAILURE,
  payload: error,
});

export const GetSkillsReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
): ThunkAction<Promise<any>, RootState, unknown, SkillsActionTypes> => async (dispatch) => {
  dispatch(fetchSkillsRequestReducer());

  try {
    const response = await fetch(`${API_URL}aptitudes?aptitud=${search}&page=${page}&limit=${limit}&sortColumn=aptitud&sortOrder=asc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    // Acceder a responseData.data ya que los datos relevantes están allí
    if (Array.isArray(responseData.data)) {
      dispatch(fetchSkillsSuccessReducer(responseData.data));  // Aquí pasamos solo el array de aptitudes
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
    dispatch(fetchSkillsFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const GetSkillsTableReducer = (
  search: string = '',
  page: number = 1,
  limit: number = 10,
  sortColumn: string = 'aptitud',
  sortOrder: 'asc' | 'desc' | null = 'asc'
): ThunkAction<Promise<any>, 
RootState, 
unknown, 
SkillsActionTypes> => async (dispatch) => {
  dispatch(fetchSkillsRequestReducer());

  try {
    const response = await fetch(`${API_URL}aptitudes?aptitud=${search}&page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`, {
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
      dispatch(fetchSkillsTableReducer(responseData.data, responseData.meta));
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
    dispatch(fetchSkillsFailureReducer('Error al mostrar datos'));
    return { payload: { data: [] } };
  }
};

export const CreateSkillReducer = (skillData: any): ThunkAction<Promise<any>, RootState, unknown, SkillsActionTypes> => async (dispatch) => {
  dispatch(createSkillRequest());
  
  try {
    const response = await fetch(`${API_URL}aptitudes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(createSkillSuccess(responseData));
    return responseData;
  } catch (error) {
    dispatch(createSkillSuccess('Error al crear el Skill'));
    throw error;
  }
};

export const UpdateSkillReducer = (
  id: number,
  skillData: any
): ThunkAction<Promise<any>, RootState, unknown, SkillsActionTypes> => async (dispatch) => {
  dispatch(updateSkillRequest());
  
  try {
    const response = await fetch(`${API_URL}aptitudes/${id}`, {
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
    dispatch(updateSkillSuccess(responseData.data[0]));
    return responseData;
  } catch (error) {
    dispatch(updateSkillFailure('Error al actualizar la aptitud'));
    throw error;
  }
};

export const DeleteSkillReducer = (id: number): ThunkAction<Promise<any>, RootState, unknown, SkillsActionTypes> => async (dispatch) => {
  dispatch(deleteSkillRequest());
  
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

    dispatch(deleteSkillSuccess(id)); // Just pass the id
    return id; // Return the id of the deleted skill
  } catch (error) {
    dispatch(deleteSkillFailure('Error al eliminar la aptitud'));
    throw error;
  }
};