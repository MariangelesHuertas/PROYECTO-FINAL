import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationPostulacionesGuardadasDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  

      
    @IsString()
    @IsOptional()
    sector?: string;
    
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;
    
  }