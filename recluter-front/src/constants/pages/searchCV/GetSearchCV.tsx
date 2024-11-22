// constants.ts
export const FETCH_CV_GENERAL_REQUEST = 'FETCH_CV_GENERAL_REQUEST';
export const FETCH_CV_GENERAL_SUCCESS = 'FETCH_CV_GENERAL_SUCCESS';
export const FETCH_CV_GENERAL_FAILURE = 'FETCH_CV_GENERAL_FAILURE';

export interface CvGeneral {
  id: number;
  usuario: string;
  imagen: string;
  ubicacion: string;
  meses_experiencia: number;
  personas: {
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
  };
  soft_skills_usuarios: [
        {
          soft_skills : {
            soft_skill: string
          },
          nivel: number,
          porcentaje: number
        }
  ]
  aptitudes_usuarios: Array<{
    aptitudes: {
      id: number;
      aptitud: string;
    };
  }>;
  educacion_usuarios: Array<{
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
  }>;
  idiomas_usuarios: Array<{
    id: number;
    nivel_idioma_id: number;
    usuario_id: number;
    niveles_idiomas: {
      nivel: string;
      idiomas: {
        idioma: string;
      };
    };
  }>;
  cvs_usuarios: Array<any>; // You may want to define a more specific type here
  experiencias_laborales_usuarios: Array<{
    id: number;
    empresa_id: number;
    usuario_id: number;
    sector_id: number;
    cargo: string;
    descripcion: string;
    nombre_empresa: string;
    fecha_inicio: string;
    fecha_fin: string;
    nombre_sector: string;
  }>;
  valoraciones_usuarios: Array<{
    id: number;
    usuario_id: number;
    usuarios: number;
    valoracion: number;
  }>;
  valoracionesPromedio: number;
  valoracionesCount: number
}

export interface FetchCvGeneralRequestAction {
  type: typeof FETCH_CV_GENERAL_REQUEST;
}

export interface FetchCvGeneralSuccessAction {
  type: typeof FETCH_CV_GENERAL_SUCCESS;
  payload: {
    data: CvGeneral[];
  };
}

export interface FetchCvGeneralFailureAction {
  type: typeof FETCH_CV_GENERAL_FAILURE;
  payload: string;
}

export type CvGeneralActionTypes =
  | FetchCvGeneralRequestAction
  | FetchCvGeneralSuccessAction
  | FetchCvGeneralFailureAction;