import { Permiso } from "./Permiso.interface";

export interface TipoPermiso {
  id_tipo_permiso: number;
  tipo_permiso: string;
  permisos: Permiso[];
}
