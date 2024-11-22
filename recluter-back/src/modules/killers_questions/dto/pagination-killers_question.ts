import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationKillerQuestionDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page?: number;
  // INICIO -----------

  @IsOptional()
  @IsString()
  pregunta?: string;


  //FIN ----------------------

  @IsOptional()
  @IsString()
  sortColumn?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

}