import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateValoracionesEmpresaDto {
/*     @ApiProperty({description: 'id de empresa_id',example: 1})
    @IsNumber()
    empresa_id: number; */


    @ApiProperty({description: 'ingresa un link_valoracion de usuario',example: "link_valoracion"})
    @IsOptional()
    @IsString()
    link_valoracion?:string


    @ApiProperty({description: 'ingresa una observacion',example: "observacion"})
    @IsOptional()
    @IsString()
    observacion?:string

    @ApiProperty({description: 'Ingresa la valoracion del 1 al 9',example: 1})
    @IsNumber()
    valoracion: number;
}
