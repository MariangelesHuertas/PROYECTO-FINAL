import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationCvUsuariosGeneral{
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;


    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    apellido_paterno?: string;

    @IsString()
    @IsOptional()
    apellido_materno?: string;


    @IsString()
    @IsOptional()
    usuario?: string;

    @IsString()
    @IsOptional()
    cargo?: string;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    meses_experiencia?: number;


    @IsString()
    @IsOptional()
    ubicacion?: string;

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }