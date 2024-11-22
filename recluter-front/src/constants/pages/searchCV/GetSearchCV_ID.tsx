// constants.ts
export const FETCH_CV_GENERAL_BY_ID_REQUEST = 'FETCH_CV_GENERAL_BY_ID_REQUEST';
export const FETCH_CV_GENERAL_BY_ID_SUCCESS = 'FETCH_CV_GENERAL_BY_ID_SUCCESS';
export const FETCH_CV_GENERAL_BY_ID_FAILURE = 'FETCH_CV_GENERAL_BY_ID_FAILURE';

export interface CvGeneralById {
  respuesta: boolean;
  mensaje: string;
  data: {
    id: number;
    usuario: string;
    ubicacion: string;
    imagen: string,
    imagen_banner: string,
    sobreMi: string,
    meses_experiencia: number;
    personas: {
      nombre: string;
      apellido_materno: string;
      apellido_paterno: string;
    };
    cargo: string;
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
    cvs_usuarios: Array<any>;
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
  };
}


export interface FetchCvGeneralByIdRequestAction {
  type: typeof FETCH_CV_GENERAL_BY_ID_REQUEST;
}

export interface FetchCvGeneralByIdSuccessAction {
  type: typeof FETCH_CV_GENERAL_BY_ID_SUCCESS;
  payload: CvGeneralById;
}

export interface FetchCvGeneralByIdFailureAction {
  type: typeof FETCH_CV_GENERAL_BY_ID_FAILURE;
  payload: string;
}

export type CvGeneralByIdActionTypes =
  | FetchCvGeneralByIdRequestAction
  | FetchCvGeneralByIdSuccessAction
  | FetchCvGeneralByIdFailureAction;