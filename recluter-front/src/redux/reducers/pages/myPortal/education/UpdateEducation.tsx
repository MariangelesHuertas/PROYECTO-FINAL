import {
  EDIT_EDUCATION_REQUEST,
  EDIT_EDUCATION_SUCCESS,
  EDIT_EDUCATION_FAILURE,
  EducationEditActionTypes,
  EducationData,
} from '../../../../../constants/pages/myPortal/education/UpdateEducation';

// Estado inicial
interface EducationEditState {
  rex_loading: boolean;
  rex_education: EducationData | null;
  rex_error: string | null;
}

const initialState: EducationEditState = {
  rex_loading: false,
  rex_education: null,
  rex_error: null,
};

// Reducer
export const educationEditReducer = (
  state = initialState,
  action: EducationEditActionTypes
): EducationEditState => {
  switch (action.type) {
    case EDIT_EDUCATION_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case EDIT_EDUCATION_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_education: action.payload.data,
        rex_error: null,
      };
    case EDIT_EDUCATION_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    default:
      return state;
  }
};

export default educationEditReducer;