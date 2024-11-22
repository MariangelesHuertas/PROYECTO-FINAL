import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationPaisesDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsOptional()
  @IsString()
  @IsIn(['id', 'pais']) // Asegúrate de incluir todas las columnas válidas
  sortColumn?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}