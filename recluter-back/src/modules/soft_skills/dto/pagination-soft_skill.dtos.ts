import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationSoftSkillDto {
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
    soft_skill?: string;
  


    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';

  }