import { Dispatch } from "redux";
import axios from "axios";
import {
  SEARCH_OFFERS_REQUEST,
  SEARCH_OFFERS_SUCCESS,
  SEARCH_OFFERS_FAILURE,
} from "../../../../constants/company/SearchOffers";
import { RootState } from "../../../store/store";  // O el path correcto

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Thunk Action para buscar ofertas por cargo
export const searchOffersAction = (
  empresaId: number,  // Cambiado de cargo a empresaId, tipo número
  searchTerm: string, 
  page: number = 1, 
  limit: number = 10
) => async (dispatch: Dispatch, getState: () => RootState) => {

  // Obtener el estado de autenticación
  const {
    rex_user
  } = getState().auth;

  let empresa_id = empresaId || (rex_user && rex_user.empresa ? rex_user.empresa.id : 0);

  // Limpiar el estado antes de la búsqueda
  dispatch({
    type: SEARCH_OFFERS_SUCCESS, 
    payload: { offers: [], page: 1 }  // Resetea el estado a vacío
  });

  dispatch({ type: SEARCH_OFFERS_REQUEST });

  try {
    const response = await axios.get(
      `${API_URL}ofertas/${empresa_id}/getAllByEmpresaId?cargo=${searchTerm}&page=${page}&limit=${limit}`
    );

    if (response.data && response.data.data) {
      dispatch({
        type: SEARCH_OFFERS_SUCCESS,
        payload: {
          offers: response.data.data,
          page,
        },
      });
    } else {
      throw new Error('No se encontraron ofertas para el cargo buscado');
    }
  } catch (error) {
    dispatch({
      type: SEARCH_OFFERS_FAILURE,
      payload: (error as Error).message || 'Error desconocido',
    });
  }
};