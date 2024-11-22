export interface AuditoriaInterfaz {
    tipo_auditoria_id: number;
    user_token:string
    ip: string;
    jsonentrada: string;
    jsonsalida: string;
    descripcion: string;
    accion: any;
    ruta: string;
    log: string;
    tabla: string;
    pk_actualizado: number;
  }
  