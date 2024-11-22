import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class PaginationInscritosOfertaDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;


  }