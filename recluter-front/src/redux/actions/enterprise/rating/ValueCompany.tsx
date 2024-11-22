import { ThunkAction } from 'redux-thunk';
import {
  FETCH_VALUE_COMPANY_FAILURE,
  FETCH_VALUE_COMPANY_REQUEST,
  FETCH_VALUE_COMPANY_SUCCESS,
  ValueCompanyActionTypes
} from '../../../../constants/company/rating/ValueCompany';
import { RootState } from '../../../store/store';
import FetchWithIP from '../../utils/FetchHeaders';

export const fetchValueCompanyRequestReducer = (): ValueCompanyActionTypes => ({
  type: FETCH_VALUE_COMPANY_REQUEST,
});

export const fetchValueCompanySuccessReducer = (data: any): ValueCompanyActionTypes => ({
  type: FETCH_VALUE_COMPANY_SUCCESS,
  payload: data,
});

export const fetchValueCompanyFailureReducer = (error: string): ValueCompanyActionTypes => ({
  type: FETCH_VALUE_COMPANY_FAILURE,
  payload: error,
});

export const ValueCompanyReducer = (
  data: {}
): ThunkAction<Promise<void>, RootState, unknown, ValueCompanyActionTypes> =>
  async (dispatch) => {
    dispatch(fetchValueCompanyRequestReducer());

    try {
      const response = await FetchWithIP(`valoraciones-empresas`, {
        method: 'POST'
      }, data);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.data) {
        dispatch(fetchValueCompanySuccessReducer(responseData.data));
      } else {
        throw new Error('No se encontraron datos de la oferta');
      }

    } catch (error) {
      dispatch(fetchValueCompanyFailureReducer('Error al obtener los detalles de la oferta'));
    }
  };

  export const ValueCandidateReducer = (
    data: {}
  ): ThunkAction<Promise<void>, RootState, unknown, ValueCompanyActionTypes> =>
    async (dispatch) => {
      dispatch(fetchValueCompanyRequestReducer());
  
      try {
        const response = await FetchWithIP(`valoraciones-usuarios`, {
          method: 'POST'
        }, data);
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        if (responseData.data) {
          dispatch(fetchValueCompanySuccessReducer(responseData.data));
        } else {
          throw new Error('No se encontraron datos de la oferta');
        }
  
      } catch (error) {
        dispatch(fetchValueCompanyFailureReducer('Error al obtener los detalles de la oferta'));
      }
    };