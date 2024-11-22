import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationPalabrasClaveDto {
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
    palabra?: string;
  



    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }