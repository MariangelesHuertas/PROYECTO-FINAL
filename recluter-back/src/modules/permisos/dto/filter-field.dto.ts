import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class FilterFieldPermisosUsuarios{

  
    @IsOptional()
    @IsString()
    sortOrder?: string;


    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsString()
    search?: string;

  }