import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../redux/store/store';
import {
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE,
  CompanyActionTypes
} from '../../../../constants/pages/company/Company';
import FetchWithIP from '../../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Obtiene la URL base de las variables de entorno

// Action Creators
export const fetchCompanyRequestReducer = (): CompanyActionTypes => ({
  type: FETCH_COMPANIES_REQUEST,
});

export const fetchCompanySuccessReducer = (data: any[], meta: { total: number; limit: number; page: number }): CompanyActionTypes => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload: { data, meta }, // Almacena los datos y la información meta (total, limit, page)
});

export const fetchCompanyFailureReducer = (error: string): CompanyActionTypes => ({
  type: FETCH_COMPANIES_FAILURE,
  payload: error,
});

export const GetCompanyReducer = (page: number, limit: number): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(fetchCompanyRequestReducer());

  try {
    const response = await FetchWithIP(`empresas?page=${page}&limit=${limit}&sortOrder=desc&sortColumn=createdAt`,{
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (Array.isArray(responseData.data)) {
      const { total, limit, page } = responseData.meta; // Extraemos los datos de la API
      dispatch(fetchCompanySuccessReducer(responseData.data, { total, limit, page }));
    } else {
      throw new Error('Los datos obtenidos no son un array');
    }

  } catch (error) {
    dispatch(fetchCompanyFailureReducer('Error al mostrar datos'));
  }
};


