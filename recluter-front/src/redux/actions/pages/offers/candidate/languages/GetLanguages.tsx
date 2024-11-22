// src/actions/pages/offers/candidate/languages/GetLanguages.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../../store/store';
import {
  FETCH_USER_LANGUAGES_REQUEST,
  FETCH_USER_LANGUAGES_SUCCESS,
  FETCH_USER_LANGUAGES_FAILURE,
  UserLanguagesActionTypes
} from '../../../../../../constants/pages/offers/candidate/languages/GetLanguages';
import FetchWithIP from '../../../../utils/FetchHeaders';

export const fetchUserLanguagesRequest = (): UserLanguagesActionTypes => ({
  type: FETCH_USER_LANGUAGES_REQUEST,
});

export const fetchUserLanguagesSuccess = (data: any[]): UserLanguagesActionTypes => ({
  type: FETCH_USER_LANGUAGES_SUCCESS,
  payload: { data },
});

export const fetchUserLanguagesFailure = (error: string): UserLanguagesActionTypes => ({
  type: FETCH_USER_LANGUAGES_FAILURE,
  payload: error,
});

export const GetUserLanguagesByIdReducer = (
  userId: number,
  limit: number = 4
): ThunkAction<Promise<any>, RootState, unknown, UserLanguagesActionTypes> => async (dispatch) => {
  dispatch(fetchUserLanguagesRequest());

  try {
    const response = await FetchWithIP(`idiomas-usuarios/findAllNivelesIdiomaByUser/${userId}?limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && responseData.data) {
      dispatch(fetchUserLanguagesSuccess(responseData.data));
      return responseData;
    } else {
      throw new Error('Datos vacíos en la respuesta');
    }
  } catch (error: any) {
    dispatch(fetchUserLanguagesFailure(error.message || 'Error al cargar los idiomas del usuario'));
    return { error: error.message };
  }
};