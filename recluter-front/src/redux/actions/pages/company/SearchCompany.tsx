import { Dispatch } from "redux";
import axios from "axios";
import {
  SEARCH_COMPANY_REQUEST,
  SEARCH_COMPANY_SUCCESS,
  SEARCH_COMPANY_FAILURE,
} from "../../../../constants/company/SearchCompany";
import { RootState } from "../../../store/store";
import FetchWithIP from "../../utils/FetchHeaders";
import { FETCH_COMPANIES_SUCCESS } from "../../../../constants/pages/company/Company";
import { fetchCompanySuccessReducer } from "./Company";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Thunk Action para buscar empresas por nombre
export const searchCompanyAction = (
  companyId: number,
  companyName: string,
  page: number = 1,
  limit: number = 10
) => async (dispatch: Dispatch, getState: () => RootState) => {
  // Limpiar el estado antes de la búsqueda
  dispatch({
    type: SEARCH_COMPANY_SUCCESS,
    payload: { companies: [], page: 1 }  // Resetea el estado a vacío
  });

  dispatch({ type: SEARCH_COMPANY_REQUEST });

  try {
    const response = await FetchWithIP(
      `empresas?empresa=${companyName}&page=${page}&limit=${limit}&sortOrder=desc&sortColumn=createdAt`,{
        method: 'GET'
      }
    ).then(res => res.json());
    
    if (response.respuesta) {

      // dispatch(fetchCompanySuccessReducer(response.data, {total: 1, limi1:1, page:1}))
      // dispatch({
      //   // type: SEARCH_COMPANY_SUCCESS,
      //   type: FETCH_COMPANIES_SUCCESS,
      //   payload: {
      //     data: response.data,
      //     meta: response.meta,
      //   },
      // });
    } else {
      throw new Error('No se encontraron resultados para la empresa buscada');
    }
  } catch (error) {
    dispatch({
      type: SEARCH_COMPANY_FAILURE,
      payload: (error as Error).message || 'Error desconocido',
    });
  }
};
