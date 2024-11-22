import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AptitudesArray } from 'src/modules/aptitudes_oferta/dto/create-aptitudes_oferta.dto';
import { CreatePalabrasClaveOfertaDto, PalabraClaveArray } from 'src/modules/palabras_clave_oferta/dto/create-palabras_clave_oferta.dto';

export class CreateOfertaDto {

  /* @ApiProperty({ example: 1 })
  @IsNumber()
  empresa_id: number; */

  @ApiProperty({ example: 1 })
  @IsNumber()
  sector_id: number;

  @ApiProperty({ example: "inserte cargo" })
  @IsString()
  cargo: string;

  @ApiProperty({ example: "inserte descripcion" })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: "inserte tipo" })
  @IsString()
  tipo: string;

  @ApiProperty({ example: "inserte provincia" })
  @IsString()
  ubi_provincia: string;

  @ApiProperty({ example: "inserte poblacion" })
  @IsString()
  ubi_poblacion: string;

  @ApiProperty({ example: 1000.0 })
  @IsNumber()
  sal_min: number;

  @ApiProperty({ example: 2000.0 })
  @IsNumber()
  sal_max: number;

  @ApiProperty({ example: "inserte abanico salarial" })
  @IsString()
  abanico_salarial: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  anios_experiencia: number;

  @ApiProperty({ example: "inserte estudios minimos" })
  @IsString()
  estudios_minimos: string;

  @ApiProperty({ example: "inserte tipo de contrato" })
  @IsString()
  tipo_contrato: string;

  @ApiProperty({ example: "inserte jornada laboral" })
  @IsString()
  jornada_laboral: string;

  @ApiProperty({ example: "true / false" })
  @IsOptional()
  @IsBoolean()
  borrador: boolean;

  /*   @ApiProperty({ type: () =>any, description: 'Detalles de la oferta con palabras clave' })
    @ValidateNested()
    @Type(() => any)
    palabras_clave_ofertas: any
   */
  /* @IsOptional() 
  palabras_clave_ofertas: PalabraClaveArray[]; // Puedes dejarlo como 'any' */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PalabraClaveArray)
  palabras_clave_ofertas: PalabraClaveArray[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AptitudesArray)
  aptitudes_ofertas: AptitudesArray[];
}