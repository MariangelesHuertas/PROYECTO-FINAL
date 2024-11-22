import { ApiProperty } from "@nestjs/swagger";

import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, } from "class-validator";

export class FilterInscritosOfertas {

    @ApiProperty({ description: "inserta el estado , si es true retorna desde las 00:00 hasta la hora actual", example: true })
    @IsOptional()
    @IsBoolean()
    hoy?: boolean


    @ApiProperty({ description: "filtro por horas", example: 1 })
    @IsOptional()
    @IsInt()
    horas?: number


    @ApiProperty({ description: "filtro por dias", example: 2 })
    @IsOptional()
    @IsInt()
    dias?: number

    
    @ApiProperty({ description: "obtener todas las postulaciones de todas las empresas correspondiente a este usuario", example: true })
    @IsOptional()
    @IsBoolean()
    allOfertas?:boolean


}




