// src/actions/pages/myPortal/languages/getUserLanguagesActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_USER_LANGUAGES_REQUEST,
  GET_USER_LANGUAGES_SUCCESS,
  GET_USER_LANGUAGES_FAILURE,
  GetUserLanguagesActionTypes,
} from '../../../../../constants/pages/myPortal/languages/GetLanguagesUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getUserLanguagesRequestReducer = (): GetUserLanguagesActionTypes => ({
  type: GET_USER_LANGUAGES_REQUEST,
});

export const getUserLanguagesSuccessReducer = (data: any): GetUserLanguagesActionTypes => ({
  type: GET_USER_LANGUAGES_SUCCESS,
  payload: { data: data.data }, // Asumiendo que la API devuelve { data: [...] }
});

export const getUserLanguagesFailureReducer = (error: string): GetUserLanguagesActionTypes => ({
  type: GET_USER_LANGUAGES_FAILURE,
  payload: error,
});

export const GetUserLanguagesReducer = (): ThunkAction<Promise<any>, RootState, unknown, GetUserLanguagesActionTypes> => async (dispatch) => {
  dispatch(getUserLanguagesRequestReducer());

  try {
    const response = await FetchWithIP('idiomas-usuarios/findAllNivelesIdiomaByUserToken', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getUserLanguagesSuccessReducer(responseData));
    return responseData;
  } catch (error: any) {
    dispatch(getUserLanguagesFailureReducer(error.message || 'Error al obtener los idiomas del usuario'));
    return { error: error.message };
  }
};