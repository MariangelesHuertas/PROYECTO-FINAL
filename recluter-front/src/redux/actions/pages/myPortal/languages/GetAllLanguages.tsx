// src/actions/pages/myPortal/languages/getAllLanguagesActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  GET_ALL_LANGUAGES_REQUEST,
  GET_ALL_LANGUAGES_SUCCESS,
  GET_ALL_LANGUAGES_FAILURE,
  GetAllLanguagesActionTypes,
} from '../../../../../constants/pages/myPortal/languages/GetAllLanguages';
import FetchWithIP from '../../../utils/FetchHeaders';

export const getAllLanguagesRequestReducer = (): GetAllLanguagesActionTypes => ({
  type: GET_ALL_LANGUAGES_REQUEST,
});

export const getAllLanguagesSuccessReducer = (data: any): GetAllLanguagesActionTypes => ({
  type: GET_ALL_LANGUAGES_SUCCESS,
  payload: {
    data: data.data,
    meta: data.meta,
  },
});

export const getAllLanguagesFailureReducer = (error: string): GetAllLanguagesActionTypes => ({
  type: GET_ALL_LANGUAGES_FAILURE,
  payload: error,
});

export const GetAllLanguagesReducer = (): ThunkAction<Promise<any>, RootState, unknown, GetAllLanguagesActionTypes> => async (dispatch) => {
  dispatch(getAllLanguagesRequestReducer());

  try {
    const response = await FetchWithIP('idiomas', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(getAllLanguagesSuccessReducer(responseData));
    return responseData;
  } catch (error: any) {
    dispatch(getAllLanguagesFailureReducer(error.message || 'Error al obtener los idiomas'));
    return { error: error.message };
  }
};