import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 
import {
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_FAILURE,
  SectorsActionTypes
} from '../../../../constants/offers/sectors/Sectors';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Usar la URL de la variable de entorno

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

// Thunk Action para obtener los sectores desde la API con paginación y filtro
export const GetSectorsReducer = (
  search: string = '', // Valor de búsqueda
  page: number = 1,    // Página por defecto
  limit: number = 10   // Número máximo de resultados por página
): ThunkAction<Promise<any>, RootState, unknown, SectorsActionTypes> => async (dispatch) => {
    dispatch(fetchSectorsRequestReducer());
  
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
      console.log("Datos de la API de sectores:", responseData);  // Imprimir los datos completos de la API
  
      // Acceder a responseData.data ya que los datos relevantes están allí
      if (Array.isArray(responseData.data)) {
        dispatch(fetchSectorsSuccessReducer(responseData.data));  // Aquí pasamos solo el array de sectores
        return { payload: { data: responseData.data } };
      } else {
        throw new Error('Los datos obtenidos no son un array');
      }
  
    } catch (error) {
      dispatch(fetchSectorsFailureReducer('Error al mostrar datos'));
      return { payload: { data: [] } };
    }
  };
