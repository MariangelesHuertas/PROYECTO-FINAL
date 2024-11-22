import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  UPDATE_USER_LANGUAGES_REQUEST,
  UPDATE_USER_LANGUAGES_SUCCESS,
  UPDATE_USER_LANGUAGES_FAILURE,
  UpdateUserLanguagesActionTypes,
} from '../../../../../constants/pages/myPortal/languages/PostLanguagesUser';
import FetchWithIP from '../../../utils/FetchHeaders';

export const updateUserLanguagesRequest = (): UpdateUserLanguagesActionTypes => ({
  type: UPDATE_USER_LANGUAGES_REQUEST,
});

export const updateUserLanguagesSuccess = (data: any): UpdateUserLanguagesActionTypes => ({
  type: UPDATE_USER_LANGUAGES_SUCCESS,
  payload: data,
});

export const updateUserLanguagesFailure = (error: string): UpdateUserLanguagesActionTypes => ({
  type: UPDATE_USER_LANGUAGES_FAILURE,
  payload: error,
});

export const UpdateUserLanguagesReducer = (
  languagesData: { nivel_idioma_id: number[] }
): ThunkAction<Promise<any>, RootState, unknown, UpdateUserLanguagesActionTypes> => async (dispatch) => {
  dispatch(updateUserLanguagesRequest());

  try {
    const response = await FetchWithIP('idiomas-usuarios', {
      method: 'POST',
    }, languagesData);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(updateUserLanguagesSuccess(responseData.data));
    return responseData;
  } catch (error: any) {
    dispatch(updateUserLanguagesFailure(error.message || 'Error al actualizar los idiomas del usuario'));
    return { error: error.message };
  }
};