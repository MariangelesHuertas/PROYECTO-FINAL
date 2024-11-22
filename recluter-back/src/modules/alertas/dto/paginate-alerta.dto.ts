import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationAlertaDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
  
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    page?: number;

    @ApiProperty({ example: "nombre", })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ example: "cargo", })
    @IsString()
    @IsOptional()
    cargo?: string;

    @ApiProperty({ example: "temporalidad", })
    @IsString()
    @IsOptional()
    temporalidad?: string;


    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsIn(['asc', 'desc']) 
    sortOrder?: 'asc' | 'desc';
    
  }