import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationCondicionKillerQuestionsDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minimo?: number;
  
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maximo?: number;

    @IsString()
    @IsOptional()
    valor?: string;

    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }