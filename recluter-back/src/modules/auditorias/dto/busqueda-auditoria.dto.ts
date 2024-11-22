import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsString } from "class-validator";

export class BusquedaAuditoria {
    @ApiProperty({ description: 'nombre de la tabla', example: 1 })
    @IsString()
    tabla: string


    @ApiProperty({ description: 'Id del registro actualizado', example: 1 })
    @IsNumber()
    @Transform(({ value }) => Number(value))
    pk_actualizado: number;
}