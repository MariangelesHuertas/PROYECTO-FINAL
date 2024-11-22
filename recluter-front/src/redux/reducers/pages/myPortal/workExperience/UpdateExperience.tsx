// src/redux/reducers/pages/myPortal/workExperience/UpdateWorkExperience.ts

import {
    UPDATE_EXPERIENCE_REQUEST,
    UPDATE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_FAILURE,
    UpdateExperienceActionTypes,
  } from '../../../../../constants/pages/myPortal/workExperience/UpdateExperience';
  
  // Estado inicial
  // src/redux/reducers/pages/myPortal/workExperience/UpdateWorkExperience.ts

interface UpdateExperienceState {
  rex_updating: boolean;
  rex_updated_experience: {
    id: number;
    empresa_id: number;
    usuario_id: number;
    sector_id: number;
    cargo: string;
    descripcion: string;
    nombre_empresa: string;
    fecha_inicio: string;
    fecha_fin: string;
    meses_experiencia: number;
    nombre_sector: string;
  } | null;
  rex_update_error: string | null;
}

const initialState: UpdateExperienceState = {
  rex_updating: false,
  rex_updated_experience: null,
  rex_update_error: null,
};

export const updateExperienceReducer = (
  state = initialState,
  action: UpdateExperienceActionTypes
): UpdateExperienceState => {
  switch (action.type) {
    case UPDATE_EXPERIENCE_REQUEST:
      return {
        ...state,
        rex_updating: true,
      };
    case UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        rex_updating: false,
        rex_updated_experience: action.payload.data,
        rex_update_error: null,
      };
    case UPDATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        rex_updating: false,
        rex_update_error: action.payload,
      };
    default:
      return state;
  }
};