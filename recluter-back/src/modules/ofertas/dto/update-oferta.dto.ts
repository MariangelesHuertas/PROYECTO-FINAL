import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOfertaDto  {
    
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  empresa_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  sector_id?: number;

  @ApiProperty({ example: "inserte cargo" })
  @IsString()
  @IsOptional()
  cargo?: string;

  @ApiProperty({ example: "inserte descripcion" })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: "inserte tipo" })
  @IsString()
  @IsOptional()
  tipo?: string;

  @ApiProperty({ example: "inserte provincia" })
  @IsString()
  @IsOptional()
  ubi_provincia?: string;

  @ApiProperty({ example: "inserte poblacion" })
  @IsString()
  @IsOptional()
  ubi_poblacion?: string;

  @ApiProperty({ example: 1000.0 })
  @IsNumber()
  @IsOptional()
  sal_min?: number;

  @ApiProperty({ example: 2000.0 })
  @IsNumber()
  @IsOptional()
  sal_max?: number;

  @ApiProperty({ example: "inserte abanico salarial" })
  @IsString()
  @IsOptional()
  abanico_salarial?: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsOptional()
  anios_experiencia?: number;

  @ApiProperty({ example: "inserte estudios minimos" })
  @IsString()
  @IsOptional()
  estudios_minimos?: string;

  @ApiProperty({ example: "inserte tipo de contrato" })
  @IsString()
  @IsOptional()
  tipo_contrato?: string;

  @ApiProperty({ example: "inserte jornada laboral" })
  @IsString()
  @IsOptional()
  jornada_laboral?: string;

}
