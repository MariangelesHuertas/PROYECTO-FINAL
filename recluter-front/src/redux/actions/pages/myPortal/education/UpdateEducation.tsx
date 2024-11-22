import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../../store/store';
import {
  EDIT_EDUCATION_REQUEST,
  EDIT_EDUCATION_SUCCESS,
  EDIT_EDUCATION_FAILURE,
  EducationEditActionTypes,
  EducationData,
} from '../../../../../constants/pages/myPortal/education/UpdateEducation';
import FetchWithIP from '../../../utils/FetchHeaders';

export const editEducationRequestReducer = (): EducationEditActionTypes => ({
  type: EDIT_EDUCATION_REQUEST,
});

export const editEducationSuccessReducer = (data: EducationData): EducationEditActionTypes => ({
  type: EDIT_EDUCATION_SUCCESS,
  payload: { data },
});

export const editEducationFailureReducer = (error: string): EducationEditActionTypes => ({
  type: EDIT_EDUCATION_FAILURE,
  payload: error,
});

// Thunk Action
export const EditUserEducationReducer = (educationData: any): ThunkAction<Promise<any>, RootState, unknown, EducationEditActionTypes> => async (dispatch) => {
  dispatch(editEducationRequestReducer());
  console.log(educationData, "error de la data")

  if (!educationData || typeof educationData.id === 'undefined') {
    const error = "ID de educación no válido";
    console.error(error);
    dispatch(editEducationFailureReducer(error));
    return { payload: { error } };
  }
  const {id, ...rest} = educationData
  try {
    const response = await FetchWithIP(`educacion-usuarios/${educationData.id}`, {
      method: 'PATCH'},
     rest
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje_dev || 'Error en la solicitud');
    }

    const responseData = await response.json();
    dispatch(editEducationSuccessReducer(responseData.data));
    return { payload: { data: responseData.data } };
  } catch (error: any) {
    console.error("Error completo:", error);
    dispatch(editEducationFailureReducer(error.message));
    return { payload: { error: error.message } };
  }
};