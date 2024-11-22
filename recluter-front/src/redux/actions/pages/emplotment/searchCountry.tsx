import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 

import { 
  FETCH_PAISES_FAILURE, 
  FETCH_PAISES_REQUEST, 
  FETCH_PAISES_SUCCESS, 
  PaisesActionTypes 
} from '../../../../constants/pages/emplotment/searchCountry';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPaisesRequestReducer = (): PaisesActionTypes => ({
  type: FETCH_PAISES_REQUEST,
});

export const fetchPaisesSuccessReducer = (data: any[]): PaisesActionTypes => ({
  type: FETCH_PAISES_SUCCESS,
  payload: {data}, // Almacena los datos recibidos de la API
});

export const fetchPaisesFailureReducer = (error: string): PaisesActionTypes => ({
  type: FETCH_PAISES_FAILURE,
  payload: error,
});

export const GetPaisesReducer = (
): ThunkAction<Promise<any>, RootState, unknown, PaisesActionTypes> => async (dispatch) => {
  dispatch(fetchPaisesRequestReducer());
  
  try {
    const respuesta = await fetch(`${API_URL}paises`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    console.log('pais', data)
    if (Array.isArray(data.data)) {
      dispatch(fetchPaisesSuccessReducer(data.data));  
      return { payload: { data:data.data } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchPaisesFailureReducer('Error al mostrar datos paginados'));
    return { payload: [] };
  }
};