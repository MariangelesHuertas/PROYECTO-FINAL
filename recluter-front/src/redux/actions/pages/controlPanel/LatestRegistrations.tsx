import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';

import {
FETCH_LATEST_INSCRITOS_FAILURE , FETCH_LATEST_INSCRITOS_REQUEST , FETCH_LATEST_INSCRITOS_SUCCESS , LatestInscritosActionTypes
} from '../../../../constants/pages/controlPanel/LatestRegistrations'
import FetchWithIP from '../../utils/FetchHeaders';


export const fetchLatestInscritosRequestReducer = (): LatestInscritosActionTypes => ({
  type: FETCH_LATEST_INSCRITOS_REQUEST,
});

export const fetchLatestInscritosSuccessReducer = (data: any[]): LatestInscritosActionTypes => ({

  type: FETCH_LATEST_INSCRITOS_SUCCESS,
  payload: { data },
});

export const fetchLatestInscritosFailureReducer = (error: string): LatestInscritosActionTypes => ({
  type: FETCH_LATEST_INSCRITOS_FAILURE,
  payload: error,
});
export const GetLatestInscritosReducer = ( 
   page: number = 1, 
  limit: number = 10
): ThunkAction<Promise<any>, RootState, unknown, LatestInscritosActionTypes> => async (dispatch) => {
  dispatch(fetchLatestInscritosRequestReducer());
  
  try {
    const respuesta = await FetchWithIP(`empresas/findAlllastInscritosEmpresaByToken?page=${page}&limit=${limit}`, {
      method: 'GET'},
    );
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    if (Array.isArray(data.data)) {
      console.log(")))))))) >>>" , data.data[0])
      dispatch(fetchLatestInscritosSuccessReducer(data.data[0]));  
      return { payload: { data:data.data[0] } };
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchLatestInscritosFailureReducer('Error '));
    return { payload: [] };
  }
};