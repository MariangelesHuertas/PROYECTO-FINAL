import {
  FETCH_USER_EDUCATION_REQUEST,
  FETCH_USER_EDUCATION_SUCCESS,
  FETCH_USER_EDUCATION_FAILURE,
  UserEducationActionTypes,
} from '../../../../../../constants/pages/offers/candidate/education/GetEducation';

interface Education {
  id: number;
  tipo_educacion_id: number;
  centro_educativo_id: number;
  usuario_id: number;
  carrera_id: number;
  fecha_inicio: string;
  fecha_final: string;
  nombre_centro_educativo: string;
  carrera: string;
  ubicacion: string;
  createdAt: string;
  updatedAt: string;
}

interface UserEducationState {
  loading: boolean;
  education: Education[];
  error: string | null;
}

const initialState: UserEducationState = {
  loading: false,
  education: [],
  error: null,
};

export const userEducationByIdReducer = (
  state = initialState,
  action: UserEducationActionTypes
): UserEducationState => {
  switch (action.type) {
    case FETCH_USER_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        education: action.payload.data,
        error: null,
      };
    case FETCH_USER_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        education: [],
      };
    default:
      return state;
  }
};

export default userEducationByIdReducer;