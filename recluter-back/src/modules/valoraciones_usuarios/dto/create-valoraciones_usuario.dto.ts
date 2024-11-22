import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateValoracionesUsuarioDto {



    @ApiProperty({description: 'Ingresa la valoracion del 1 al 9',example: 1})
    @IsNumber()
    valoracion: number;

    /* @ApiProperty({description: 'id de usuario_id',example: 1})
    @IsNumber()
    usuarios: number; */

    @ApiProperty({description: 'ingresa un link_valoracion de usuario',example: "link_valoracion"})
    @IsOptional()
    @IsString()
    link_valoracion?:string

    @ApiProperty({description: 'ingresa una observacion',example: "observacion"})
    @IsOptional()
    @IsString()
    observacion?:string
}
