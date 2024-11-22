import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationInscritosDiaOfertaDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    dias?: number;

      
    @ApiProperty({ description: "obtener todas las postulaciones de todas las empresas correspondiente a este usuario", example: true })
    @IsOptional()
    @IsBoolean()
    allOfertas?:boolean

    


  }