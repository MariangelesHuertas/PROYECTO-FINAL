import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../redux/store/store';
import {
  FETCH_COMPANY_DETAIL_REQUEST,
  FETCH_COMPANY_DETAIL_SUCCESS,
  FETCH_COMPANY_DETAIL_FAILURE,
  CompanyDetailActionTypes
} from '../../../../constants/pages/company/CompanyDetail';
import FetchWithIP from '../../utils/FetchHeaders';

export type empresaType = {
  descripcion: string,
  empresa: string,
  empresa_seguida: []
}

// Action Creators
export const fetchCompanyDetailRequest = (): CompanyDetailActionTypes => ({
  type: FETCH_COMPANY_DETAIL_REQUEST,
});

export const fetchCompanyDetailSuccess = (companyName: empresaType): CompanyDetailActionTypes => ({
  type: FETCH_COMPANY_DETAIL_SUCCESS,
  payload: companyName, // Almacena solo el nombre de la empresa
});

export const fetchCompanyDetailFailure = (error: string): CompanyDetailActionTypes => ({
  type: FETCH_COMPANY_DETAIL_FAILURE,
  payload: error,
});

// Thunk para obtener el detalle de la empresa por ID
export const getCompanyDetailReducer = (
  id: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(fetchCompanyDetailRequest());

  try {
    const response = await FetchWithIP(`empresas/${id}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("data: --");
    console.log(responseData);

    const enterprise: empresaType = responseData.data[0]?.empresa; // Acceder al nombre de la empresa en el array

    console.log(enterprise);

    if (enterprise) {
      dispatch(fetchCompanyDetailSuccess(enterprise));
    } else {
      throw new Error('No se encontró el nombre de la empresa');
    }
  } catch (error) {
    dispatch(fetchCompanyDetailFailure('Error al obtener el detalle de la empresa'));
  }
};
