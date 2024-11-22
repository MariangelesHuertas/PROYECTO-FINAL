import {
  FETCH_USER_EXPERIENCES_REQUEST,
  FETCH_USER_EXPERIENCES_SUCCESS,
  FETCH_USER_EXPERIENCES_FAILURE,
  UserExperienceActionTypes,
} from '../../../../../../constants/pages/offers/candidate/workExperience/GetWorkExperience';

interface Experience {
  cargo: string;
  descripcion: string;
  nombre_empresa: string;
  nombre_sector: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface UserExperienceState {
  rex_loading: boolean;
  rex_experiences: Experience[];
  rex_error: string | null;
}

const initialState: UserExperienceState = {
  rex_loading: false,
  rex_experiences: [],
  rex_error: null,
};

export const userExperiencesByIdReducer = (
  state = initialState,
  action: UserExperienceActionTypes
): UserExperienceState => {
  switch (action.type) {
    case FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_USER_EXPERIENCES_SUCCESS:
      console.log('Updating state with experiences:', action.payload.data);
      return {
        ...state,
        rex_loading: false,
        rex_experiences: action.payload.data.map((exp: any) => ({
          cargo: exp.cargo,
          descripcion: exp.descripcion,
          nombre_empresa: exp.nombre_empresa,
          nombre_sector: exp.nombre_sector,
          fecha_inicio: exp.fecha_inicio,
          fecha_fin: exp.fecha_fin,
        })),
        rex_error: null,
      };
    case FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
        rex_experiences: [],
      };
    default:
      return state;
  }
};

export default userExperiencesByIdReducer;