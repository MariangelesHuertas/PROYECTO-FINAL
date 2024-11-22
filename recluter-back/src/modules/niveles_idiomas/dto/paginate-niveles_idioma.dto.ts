import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationNivelesIdiomaDto {
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
    nivel?: string;


    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }