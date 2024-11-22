import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, Min, Max, IsOptional } from 'class-validator';

export class ValoracionStatsDto {
  @ApiProperty({ description: 'Valoración (1-5)', example: 4 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  valoracion?: number;

  @ApiProperty({ description: 'Porcentaje de usuarios que dieron esta valoración', example: 35.5 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  porcentaje?: number;

  @ApiProperty({ description: 'Cantidad de usuarios que dieron esta valoración', example: 42 })
  @IsInt()
  @Min(0)
  @IsOptional()
  cantidadUsuarios?: number;

  @ApiProperty({ description: 'Promedio de valoración de la empresa', example: 4.2 })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  promedioValoracion?: number;
}