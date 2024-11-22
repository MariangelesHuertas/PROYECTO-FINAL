import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationOfertasDto {
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
    cargo?: string;

    @IsOptional()
    @IsString()
    sector?: string;


    @IsOptional()
    @IsString()
    ubi_provincia?: string;

    
    @IsOptional()
    @IsString()
    ubi_poblacion?: string;
  

    @IsOptional()
    @Type(() => Number)
    valoracion?: number;

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';

  }