import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsString } from "class-validator";

export class SwaggerTiposAuditoriaDto {
    @ApiProperty({ example: 2 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Ingrese el ID del tipo_auditoria', example: 1 })
    @IsNumber()
    tipo_auditoria_id: number

    @ApiProperty({ description: 'Ingrese el ID del usuario_id', example: 1 })
    @IsNumber()
    usuario_id: number

    @ApiProperty({ description: 'Ingrese la IP', example: '192.168.0.0' })
    @IsString()
    ip: string

    @ApiProperty({ description: 'Ingrese en json de entrada', example: '{json}' })
    @IsString()
    jsonentrada: string

    @ApiProperty({ description: 'Ingrese el nuevo json', example: '{json}' })
    @IsString()
    jsonsalida: string

    @ApiProperty({ description: 'Ingrese una descripcion', example: 'descripcion' })
    @IsString()
    descripcion: string

    @ApiProperty({ description: 'Ingrese una accion', example: 'accion' })
    @IsString()
    accion: string

    @ApiProperty({ description: 'Ingrese una ruta', example: 'ruta' })
    @IsString()
    ruta: string

    @ApiProperty({ description: 'Ingrese los posibles errores', example: 'logs ' })
    @IsString()
    log: string

    @ApiProperty({ description: 'Ingrese el nombre de la tabla manipulada', example: "empresas , ofertas ..." })
    @IsString()
    tabla: string
    
    @ApiProperty({ description: 'Ingrese el ID del objeto manipulado', example: 1 })
    @IsNumber()
    pk_actualizado:number

    @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
    @IsDate()
    createdAt: Date;
  
    @ApiProperty({ example: '2024-07-08T15:46:33.224Z' })
    @IsDate()
    updatedAt: Date;
}
