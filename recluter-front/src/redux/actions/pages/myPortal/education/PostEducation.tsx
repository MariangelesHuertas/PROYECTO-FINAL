// src/actions/pages/myPortal/education/addEducationActions.ts

import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAILURE,
  AddEducationActionTypes,
} from '../../../../../constants/pages/myPortal/education/PostEducation';
import FetchWithIP from '../../../utils/FetchHeaders';

// Action Creators
export const addEducationRequestReducer = (): AddEducationActionTypes => ({
  type: ADD_EDUCATION_REQUEST,
});

export const addEducationSuccessReducer = (data: any): AddEducationActionTypes => ({
  type: ADD_EDUCATION_SUCCESS,
  payload: { data },
});

export const addEducationFailureReducer = (error: string): AddEducationActionTypes => ({
  type: ADD_EDUCATION_FAILURE,
  payload: error,
});

// Thunk Action para agregar una nueva educación
export const AddEducationReducer = (
  educationData: any
): ThunkAction<Promise<any>, RootState, unknown, AddEducationActionTypes> => async (dispatch) => {
  dispatch(addEducationRequestReducer());

  try {
    const response = await FetchWithIP('educacion-usuarios', {
      method: 'POST',
    }, educationData);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const responseData = await response.json();
    dispatch(addEducationSuccessReducer(responseData.data));
    return responseData; // Retornamos la respuesta para manejarla en el frontend
  } catch (error: any) {
    dispatch(addEducationFailureReducer(error.message || 'Error al agregar la educación'));
    return { error: error.message };
  }
};