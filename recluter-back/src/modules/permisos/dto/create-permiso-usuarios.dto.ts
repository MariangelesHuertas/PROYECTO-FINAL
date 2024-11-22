import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber } from "class-validator";

export class CreatePermisosUsuario {
    @ApiProperty({type:Number, description: 'array de ID de permisos' , example: [1, 2, 3]})
    @IsNumber({},{ each: true })
    permiso_id: number[];
    
    @ApiProperty({type:Number, description: 'ID de tipo_usuario', example: 1 })
    @IsNumber()
    tipo_usuario_id: number
}