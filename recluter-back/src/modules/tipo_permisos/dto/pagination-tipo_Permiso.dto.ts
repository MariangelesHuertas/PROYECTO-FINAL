import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationTipoPermisoDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;
  
    @IsOptional()
    @IsString()
    tipo?: string;

  

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) // Asegurarse de que solo puede ser 'asc' o 'desc'
    sortOrder?: 'asc' | 'desc';

  }