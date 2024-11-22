import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationAptitudeDto {
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
    aptitud?: string;
  


    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) // Asegurarse de que solo puede ser 'asc' o 'desc'
    sortOrder?: 'asc' | 'desc';

  }