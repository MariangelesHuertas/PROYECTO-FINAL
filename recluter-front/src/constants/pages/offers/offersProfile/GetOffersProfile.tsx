export const FETCH_POSTULACIONES_REQUEST = 'FETCH_POSTULACIONES_REQUEST';
export const FETCH_POSTULACIONES_SUCCESS = 'FETCH_POSTULACIONES_SUCCESS';
export const FETCH_POSTULACIONES_FAILURE = 'FETCH_POSTULACIONES_FAILURE';

export interface Postulacion {
  usuarios: {
    id: number;
    usuario: string;
    imagen: string | null;
    ubicacion: string;
    cargo: string;
    tipos_usuarios: {
      id: number;
      tipo_usuario: string;
    };
    personas: {
      apellido_materno: string;
      apellido_paterno: string;
      nombre: string;
    };
    meses_experiencia: number;
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
    cvs_usuarios: Array<{
      id: number;
      usuario_id: number;
      nombre: string;
      nombre_archivo: string;
      cv: string;
      default: boolean;
    }>;
    aptitudes_usuarios: Array<{
      id: number;
      aptitud:string;
      usuario_id: number;
    }>;
    valoraciones_usuarios: Array<{
      valoracion: number;
    }>;
    promedioValoraciones: number;
  };
  ofertas: {
    id: number;
    sectores: {
      id: number;
      sector: string;
    };
  };
  id: number;
}

export interface FetchPostulacionesRequestAction {
  type: typeof FETCH_POSTULACIONES_REQUEST;
}

export interface FetchPostulacionesSuccessAction {
  type: typeof FETCH_POSTULACIONES_SUCCESS;
  payload: {
    data: Postulacion[];
  };
}

export interface FetchPostulacionesFailureAction {
  type: typeof FETCH_POSTULACIONES_FAILURE;
  payload: string;
}

export type PostulacionesActionTypes =
  | FetchPostulacionesRequestAction
  | FetchPostulacionesSuccessAction
  | FetchPostulacionesFailureAction;