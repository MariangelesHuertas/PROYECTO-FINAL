import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_SKILLS_REQUEST,
  FETCH_SKILLS_SUCCESS,
  FETCH_SKILLS_FAILURE,
  SkillsActionTypes
} from '../../../../constants/offers/skills/Skills';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

// Action Creators
export const fetchSkillsRequestReducer = (): SkillsActionTypes => ({
  type: FETCH_SKILLS_REQUEST,
});

export const fetchSkillsSuccessReducer = (data: any[]): SkillsActionTypes => ({
  type: FETCH_SKILLS_SUCCESS,
  payload: { data }, // Almacena los datos recibidos de la API
});

export const fetchSkillsFailureReducer = (error: string): SkillsActionTypes => ({
  type: FETCH_SKILLS_FAILURE,
  payload: error,
});

// Thunk Action para obtener las aptitudes desde la API con paginación y filtro
export const GetSkillsReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
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
      console.log("Datos de la API:", responseData);  // Imprimir los datos completos de la API
  
      // Acceder a responseData.data ya que los datos relevantes están allí
      if (Array.isArray(responseData.data)) {
        dispatch(fetchSkillsSuccessReducer(responseData.data));  // Aquí pasamos solo el array de aptitudes
        return { payload: { data: responseData.data } };
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }
  
    } catch (error) {
      dispatch(fetchSkillsFailureReducer('Error al mostrar datos'));
      return { payload: { data: [] } };
    }
  };
