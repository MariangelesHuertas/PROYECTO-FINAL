import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationEmpresaOfertaNombreDto {
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
    cargo?: string;


    @IsString()
    @IsOptional()
    nombre?: string;

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }