import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store'; 

import { 
  FETCH_INSCRITOS_BY_DIA_FAILURE , FETCH_INSCRITOS_BY_DIA_REQUEST , FETCH_INSCRITOS_BY_DIA_SUCCESS , InscritosByDiaActionTypes
} from '../../../../constants/pages/controlPanel/RegisteredCandidates' 
import FetchWithIP from '../../utils/FetchHeaders';


export const fetchInscritosByDiaRequestReducer = (): InscritosByDiaActionTypes => ({
  type: FETCH_INSCRITOS_BY_DIA_REQUEST,
});

export const fetchInscritosByDiaSuccessReducer = (data: any[]): InscritosByDiaActionTypes => ({
  
  type: FETCH_INSCRITOS_BY_DIA_SUCCESS,
  payload: {data}, 
});

export const fetchInscritosByDiaFailureReducer = (error: string): InscritosByDiaActionTypes => ({
  type: FETCH_INSCRITOS_BY_DIA_FAILURE,
  payload: error,
});

export const GetInscritosByDiaReducer = (
): ThunkAction<Promise<any>, RootState, unknown, InscritosByDiaActionTypes> => async (dispatch) => {
  dispatch(fetchInscritosByDiaRequestReducer());
  
  try {
    const respuesta = await FetchWithIP(`dashboard/inscritosByDia/`, {
      method: 'GET'},
    );
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    if (Array.isArray(data.data)) {
      dispatch(fetchInscritosByDiaSuccessReducer(data.data[0]));  
      return { payload: { data:data.data[0] } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchInscritosByDiaFailureReducer('Error '));
    return { payload: [] };
  }
};