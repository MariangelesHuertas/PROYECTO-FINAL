import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../redux/store/store';
import {
  FETCH_FOLLOWED_COMPANIES_REQUEST,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_FAILURE,
  FollowedCompaniesActionTypes
} from '../../../../constants/pages/followedCompanies/FollowedCompanies';
import FetchWithIP from '../../utils/FetchHeaders';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Action Creators
export const fetchFollowedCompaniesRequest = (): FollowedCompaniesActionTypes => ({
  type: FETCH_FOLLOWED_COMPANIES_REQUEST,
});

export const fetchFollowedCompaniesSuccess = (companies: any[]): FollowedCompaniesActionTypes => ({
  type: FETCH_FOLLOWED_COMPANIES_SUCCESS,
  payload: companies, // Almacena el array de objetos completos
});

export const fetchFollowedCompaniesFailure = (error: string): FollowedCompaniesActionTypes => ({
  type: FETCH_FOLLOWED_COMPANIES_FAILURE,
  payload: error,
});

// Thunk para obtener los datos completos de las empresas
export const getFollowedCompaniesReducer = (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(fetchFollowedCompaniesRequest());

  try {
    const response = await FetchWithIP(`empresas-seguidas/findAllSeguidosByUser`, { 
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    // Mapea el objeto completo con los datos que necesitas
    const companyData = responseData.data.map((company: any) => ({
      id: company.empresas.id,
      name: company.empresas.empresa, // El nombre de la empresa
      // Puedes agregar más campos aquí si los necesitas
    }));

    dispatch(fetchFollowedCompaniesSuccess(companyData));
  } catch (error) {
    dispatch(fetchFollowedCompaniesFailure('Error al obtener los nombres de las empresas'));
  }
};
