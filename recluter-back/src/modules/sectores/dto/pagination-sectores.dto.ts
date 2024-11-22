import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationSectoresDto {
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
    sector?: string;

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }