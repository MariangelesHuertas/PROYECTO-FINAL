import { IsInt } from "class-validator"

export class permisoTipoUsuarioDto {

    @IsInt()
    permiso_id:number

    @IsInt()
    tipo_usuario_id:number
}